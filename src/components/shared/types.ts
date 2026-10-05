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

export type WithImageRenderingMode<Icon> = Icon & {
  /**
   * @summary How the image is rendered: `template` draws its shape in the
   * container's icon color, `original` keeps the image's own colors.
   *
   * `default`, also used when unset, keeps the container's default.
   */
  renderingMode?: PlatformIconIOSImageRenderingMode | undefined;
};

export type WithSymbolRenderingMode<Icon> = Icon & {
  /**
   * @summary How the symbol is rendered: `monochrome` draws it in the
   * container's icon color, `original` keeps its own colors (Apple's
   * "multicolor" rendering).
   *
   * `default`, also used when unset, keeps the system behavior.
   */
  renderingMode?: PlatformIconIOSSymbolRenderingMode | undefined;
};

export type WithTinting<Icon> = Icon & {
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

export type PlatformIconIOSTemplate = {
  type: 'templateSource';
  templateSource: ImageSourcePropType;
};

export type PlatformIconIOSSfSymbol = {
  type: 'sfSymbol';
  name: string;
};

export type PlatformIconIOSXcasset = {
  type: 'xcasset';
  name: string;
};

export type PlatformIconIOS =
  | PlatformIconIOSSfSymbol
  | PlatformIconIOSXcasset
  | PlatformIconIOSTemplate
  | PlatformIconShared;

export type PlatformIconAndroid =
  | PlatformIconAndroidDrawableResource
  | WithTinting<PlatformIconShared>;
