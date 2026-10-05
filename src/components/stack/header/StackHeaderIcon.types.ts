import type {
  PlatformIconAndroid,
  PlatformIconAndroidTinting,
  PlatformIconIOSImageRenderingMode,
  PlatformIconIOSSfSymbol,
  PlatformIconIOSSymbolRenderingMode,
  PlatformIconShared,
  WithImageRenderingMode,
  WithSymbolRenderingMode,
} from '../../shared/types';

/**
 * How a header item renders an `imageSource` icon on iOS. The names follow
 * `UIImage.RenderingMode`.
 *
 * - `default` - the header's default for images, also used when
 *   `renderingMode` is unset: the image keeps its own colors, as with
 *   `original`.
 * - `template` - the image is used as a template image: its shape is drawn in
 *   the item's tint color.
 * - `original` - the image keeps its own colors and ignores the tint color.
 */
export type StackHeaderIconIOSImageRenderingMode =
  PlatformIconIOSImageRenderingMode;

/**
 * How a header item renders an `sfSymbol` icon on iOS. The names follow the
 * SF Symbols rendering modes.
 *
 * - `default` - the system behavior (UIKit's automatic mode), also used when
 *   `renderingMode` is unset: system symbols are drawn in the item's tint
 *   color; for custom symbols the rendering mode set in the asset catalog may
 *   change it.
 * - `monochrome` - the symbol is drawn in a single color: the item's tint
 *   color.
 * - `original` - the symbol keeps its own colors (Apple's "multicolor"
 *   rendering) and ignores the tint color. A symbol without color layers is
 *   drawn as authored.
 */
export type StackHeaderIconIOSSymbolRenderingMode =
  PlatformIconIOSSymbolRenderingMode;

export type StackHeaderIconIOS =
  | WithSymbolRenderingMode<PlatformIconIOSSfSymbol>
  | WithImageRenderingMode<PlatformIconShared>;

/**
 * How a header icon is tinted on Android.
 *
 * - `default` - the header's default, also used when `tinting` is unset: the
 *   icon is tinted with the tint colors configured for it (e.g.
 *   `iconTintColorNormal`, `backButtonTintColorNormal`,
 *   `overflowIconTintColorNormal`). Without a configured tint color it keeps
 *   its own colors.
 * - `tinted` - same as `default`.
 * - `original` - the icon keeps its own colors and ignores the configured tint
 *   colors, e.g. a multicolor VectorDrawable.
 */
export type StackHeaderIconAndroidTinting = PlatformIconAndroidTinting;

export type StackHeaderIconAndroid = PlatformIconAndroid;
