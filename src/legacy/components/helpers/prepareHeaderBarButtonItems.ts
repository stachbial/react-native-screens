import { Image, processColor } from 'react-native';
import type { ImageResolvedAssetSource } from 'react-native';
import type {
  HeaderBarButtonItem,
  HeaderBarButtonItemWithMenu,
} from '../../types';
import type { PlatformIconIOS } from '../../../components/shared/types';

// Local nominal type so declaration emit doesn't resolve the RN alias down to
// the non-public `types_generated/.../AssetSourceResolver#ResolvedAssetSource`.
export interface ResolvedImageAsset extends ImageResolvedAssetSource {}

const prepareIcon = (
  icon: PlatformIconIOS | undefined,
): {
  sfSymbolName?: string | undefined;
  sfSymbolRenderingMode?: string | undefined;
  xcassetName?: string | undefined;
  imageSource?: ResolvedImageAsset | undefined;
  templateSource?: ResolvedImageAsset | undefined;
} => {
  switch (icon?.type) {
    case 'sfSymbol':
      return {
        sfSymbolName: icon.name,
        sfSymbolRenderingMode: icon.renderingMode,
      };
    case 'xcasset':
      return { xcassetName: icon.name };
    case 'imageSource': {
      const source = Image.resolveAssetSource(icon.imageSource);
      return icon.renderingMode === 'template'
        ? { templateSource: source }
        : { imageSource: source };
    }
    case 'templateSource':
      return { templateSource: Image.resolveAssetSource(icon.templateSource) };
    default:
      return {};
  }
};

const prepareMenu = (
  menu: HeaderBarButtonItemWithMenu['menu'],
  index: number,
  side: 'left' | 'right',
  path: string = '',
): HeaderBarButtonItemWithMenu['menu'] => {
  return {
    ...menu,
    items: menu.items.map((menuItem, menuIndex) => {
      const currentPath = path ? `${path}.${menuIndex}` : `${menuIndex}`;
      const icon = prepareIcon(menuItem.icon);

      if (menuItem.type === 'submenu') {
        return {
          ...menuItem,
          ...icon,
          ...prepareMenu(menuItem, index, side, currentPath),
        };
      }
      return {
        ...menuItem,
        ...icon,
        menuId: `${currentPath}-${index}-${side}`,
      };
    }),
  };
};

export const prepareHeaderBarButtonItems = (
  barButtonItems: HeaderBarButtonItem[],
  side: 'left' | 'right',
) => {
  return barButtonItems?.map((item, index) => {
    if (item.type === 'spacing') {
      return item;
    }
    const titleStyle = item.titleStyle
      ? { ...item.titleStyle, color: processColor(item.titleStyle.color) }
      : undefined;
    const tintColor = item.tintColor ? processColor(item.tintColor) : undefined;
    const badge = item.badge
      ? {
          ...item.badge,
          style: {
            ...item.badge.style,
            color: processColor(item.badge.style?.color),
            backgroundColor: processColor(item.badge.style?.backgroundColor),
          },
        }
      : undefined;
    const processedItem = {
      ...item,
      ...prepareIcon(item.icon),
      titleStyle,
      tintColor,
      badge,
    };
    if (item.type === 'button') {
      return {
        ...processedItem,
        buttonId: `${index}-${side}`,
      };
    }
    if (item.type === 'menu') {
      return {
        ...processedItem,
        menu: prepareMenu(item.menu, index, side),
      };
    }
    return null;
  });
};
