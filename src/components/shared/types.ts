import type { ImageSourcePropType } from 'react-native';

export type BlurEffect =
  | 'none'
  | 'extraLight'
  | 'light'
  | 'dark'
  | 'regular'
  | 'prominent'
  | 'systemUltraThinMaterial'
  | 'systemThinMaterial'
  | 'systemMaterial'
  | 'systemThickMaterial'
  | 'systemChromeMaterial'
  | 'systemUltraThinMaterialLight'
  | 'systemThinMaterialLight'
  | 'systemMaterialLight'
  | 'systemThickMaterialLight'
  | 'systemChromeMaterialLight'
  | 'systemUltraThinMaterialDark'
  | 'systemThinMaterialDark'
  | 'systemMaterialDark'
  | 'systemThickMaterialDark'
  | 'systemChromeMaterialDark';

export type ColorScheme = 'light' | 'dark';

export type Direction = 'ltr' | 'rtl';

export type InterfaceOrientation =
  | 'all'
  | 'allButUpsideDown'
  | 'portrait'
  | 'portraitUp'
  | 'portraitDown'
  | 'landscape'
  | 'landscapeLeft'
  | 'landscapeRight';

export type ScrollEdgeEffect = 'automatic' | 'hard' | 'soft' | 'hidden';

export type UserInterfaceStyle = 'unspecified' | 'light' | 'dark';

export type PlatformIconIOSImageRenderingMode =
  | 'default'
  | 'template'
  | 'original';

export type PlatformIconIOSSymbolRenderingMode =
  | 'default'
  | 'monochrome'
  | 'original';

export type PlatformIconAndroidTinting = 'default' | 'tinted' | 'original';

type WithImageRenderingMode<Icon> = Icon & {
  /**
   * @summary How the image is rendered: `template` draws its shape in the
   * container's icon color, `original` keeps the image's own colors.
   *
   * `default`, also used when unset, keeps the image's own colors, as in
   * previous versions. This is not UIKit's automatic mode, in which tab bars
   * and bar button items would draw the image as a template image.
   */
  renderingMode?: PlatformIconIOSImageRenderingMode | undefined;
};

type WithTinting<Icon> = Icon & {
  /**
   * @summary How the icon is tinted: `tinted` lets the container tint it (the
   * tab bar with its item icon color, a header with the tint colors configured
   * for the icon), `original` keeps the icon's own colors even when a tint
   * color is set.
   *
   * `default`, also used when unset, keeps the container's default: the tab
   * bar tints the icon, a header tints it only when a tint color is configured.
   */
  tinting?: PlatformIconAndroidTinting | undefined;
};

export type PlatformIconShared = {
  type: 'imageSource';
  imageSource: ImageSourcePropType;
};

export type PlatformIconAndroidDrawableResource = {
  type: 'drawableResource';
  name: string;
  /**
   * @summary How the icon is tinted: `tinted` lets the container tint it (the
   * tab bar with its item icon color, a header with the tint colors configured
   * for the icon), `original` keeps the icon's own colors even when a tint
   * color is set.
   *
   * `default`, also used when unset, keeps the container's default: the tab
   * bar tints the icon, a header tints it only when a tint color is configured.
   */
  tinting?: PlatformIconAndroidTinting | undefined;
};

/**
 * @deprecated Use `{ type: 'imageSource', imageSource, renderingMode: 'template' }` instead.
 */
export type PlatformIconIOSTemplate = {
  type: 'templateSource';
  templateSource: ImageSourcePropType;
};

export type PlatformIconIOSSfSymbol = {
  type: 'sfSymbol';
  name: string;
  /**
   * @summary How the symbol is rendered: `monochrome` draws it in the
   * container's icon color, `original` keeps its own colors (Apple's
   * "multicolor" rendering).
   *
   * `default`, also used when unset, keeps the system behavior.
   */
  renderingMode?: PlatformIconIOSSymbolRenderingMode | undefined;
};

/**
 * @deprecated Use `{ type: 'sfSymbol', name }` for custom symbols from the asset
 * catalog, or `{ type: 'imageSource', imageSource: { uri: 'name' } }` for asset
 * catalog images (append `.png` to names containing a dot). `imageSource` keeps
 * the image's own colors by default, so for an asset whose "Render As" is not
 * `Original Image`, add `renderingMode: 'template'`.
 */
export type PlatformIconIOSXcasset = {
  type: 'xcasset';
  name: string;
};

export type PlatformIconIOS =
  | PlatformIconIOSSfSymbol
  | PlatformIconIOSXcasset
  | PlatformIconIOSTemplate
  | WithImageRenderingMode<PlatformIconShared>;

export type PlatformIconAndroid =
  | PlatformIconAndroidDrawableResource
  | WithTinting<PlatformIconShared>;
