import type { ReactElement } from 'react';
import type { StackHeaderIconIOS } from '../StackHeaderIcon.types';
import type { StackHeaderMenuIOS } from './StackHeaderMenu.ios.types';

export type StackHeaderItemPlacement =
  | 'leading'
  | 'trailing'
  | 'title'
  | 'subtitle'
  | 'largeSubtitle';

export type StackHeaderItemProps = {
  placement: StackHeaderItemPlacement;
  itemId?: string | undefined;
  identifier?: string | undefined;
  hidesSharedBackground?: boolean | undefined;
  title?: string | undefined;
  icon?: StackHeaderIconIOS | undefined;
  render?: (() => ReactElement) | undefined;
  menu?: StackHeaderMenuIOS | undefined;
  onPress?: (() => void) | undefined;
};
