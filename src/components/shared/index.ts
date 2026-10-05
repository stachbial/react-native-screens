import { Image, type ImageResolvedAssetSource } from 'react-native';
import type {
  PlatformIconAndroid,
  PlatformIconAndroidTinting,
} from '../shared/types';

export function parseAndroidIconToNativeProps(
  icon: PlatformIconAndroid | undefined,
): {
  imageIconResource?: ImageResolvedAssetSource | undefined;
  drawableIconResourceName?: string | undefined;
  iconTinting?: PlatformIconAndroidTinting | undefined;
} {
  if (!icon) {
    return {};
  }

  let parsedIconResource;
  if (icon.type === 'imageSource') {
    parsedIconResource = Image.resolveAssetSource(icon.imageSource);
    if (!parsedIconResource) {
      console.error('[RNScreens] Failed to resolve an asset.');
    }

    return {
      // I'm keeping undefined as a fallback if `Image.resolveAssetSource` has failed for some reason.
      // It won't render any icon, but it will prevent from crashing on the native side which is expecting
      // ReadableMap. Passing `iconResource` directly will result in crash, because `require` API is returning
      // double as a value.
      imageIconResource: parsedIconResource || undefined,
      iconTinting: icon.tinting,
    };
  } else if (icon.type === 'drawableResource') {
    return {
      drawableIconResourceName: icon.name,
      iconTinting: icon.tinting,
    };
  } else {
    throw new Error(
      '[RNScreens] Incorrect icon format for Android. You must provide `imageSource` or `drawableResource`.',
    );
  }
}
