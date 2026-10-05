import type { PlatformIconIOS as ResolvedPlatformIconIOS } from '../../../../fabric/stack/StackHeaderItemIOSNativeComponent';
import type { StackHeaderIconIOS } from '../StackHeaderIcon.types';
import type {
  StackHeaderMenuIOS,
  StackHeaderMenuElementIOS,
} from './StackHeaderMenu.ios.types';
import { Image } from 'react-native';

export function resolveIconAssetSources(
  icon: StackHeaderIconIOS | undefined,
): ResolvedPlatformIconIOS | undefined {
  if (icon == null) {
    return undefined;
  }
  if (icon.type === 'imageSource') {
    const resolvedImageSource = Image.resolveAssetSource(icon.imageSource);

    if (!resolvedImageSource) {
      return undefined;
    }

    return {
      type: 'imageSource',
      imageSource: resolvedImageSource,
      renderingMode: icon.renderingMode,
    };
  }
  return icon;
}

export function resolveMenuElementIcons(
  element: StackHeaderMenuElementIOS,
): StackHeaderMenuElementIOS {
  if (element.type === 'menuItem') {
    if (element.icon == null) {
      return element;
    }
    return { ...element, icon: resolveIconAssetSources(element.icon) };
  }
  return resolveMenuIcons(element);
}

export function resolveMenuIcons(menu: StackHeaderMenuIOS): StackHeaderMenuIOS {
  const resolvedIcon = resolveIconAssetSources(menu.icon);
  const resolvedChildren = menu.children.map(resolveMenuElementIcons);
  return { ...menu, icon: resolvedIcon, children: resolvedChildren };
}
