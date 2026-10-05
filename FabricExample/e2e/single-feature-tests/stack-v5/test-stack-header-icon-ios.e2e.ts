import { device, expect, element, by } from 'detox';
import { selectSingleFeatureTestsScreen } from '@e2e/app/test-screen-navigation';
import { menuRowIcon } from '@e2e/framework/context-menu-ios';
import { barButtonIcon, headerTitle } from '@e2e/framework/header-items-ios';
import {
  CLASS_NAME_UI_CONTEXT_MENU_CELL_CONTENT_VIEW,
  CLASS_NAME_UI_CONTEXT_MENU_SUBMENU_TITLE_VIEW,
} from '@e2e/framework/native-classes-ios';
import { describeIfIOS } from '@e2e/framework/platform';

// Number of rows in the header item menu that render an icon:
// Toggle 1, Toggle 2, Toggle 3 and Submenu.
const MENU_ROW_COUNT = 4;

// `imageSource` and `templateImage` ids are the bundled paths of the `require`d
// asset files — renaming or moving those assets requires updating them here.
const ICON_IDS = {
  sfSymbol: 'star.fill',
  customSymbol: 'nano.swm',
  imageSource: 'assets/_apps/assets/search_black.png',
  templateImage: 'assets/_apps/assets/search_white.png',
  originalSymbol: 'heart.fill',
} as const;

type IconVariant = keyof typeof ICON_IDS;

const CYCLE: IconVariant[] = [
  'customSymbol',
  'imageSource',
  'templateImage',
  'originalSymbol',
  'sfSymbol',
];

// The icon of a single menu row, addressed by its icon id and its position in
// the menu.
const menuRowIconAt = (iconId: string, index: number) =>
  element(
    by
      .id(iconId)
      .withAncestor(by.type(CLASS_NAME_UI_CONTEXT_MENU_CELL_CONTENT_VIEW)),
  ).atIndex(index);

// Asserts that every menu row renders the icon carrying `iconId`.
const expectAllMenuRowIconsToBeVisible = async (
  iconId: string,
  rowCount: number = MENU_ROW_COUNT,
) => {
  for (let index = 0; index < rowCount; index++) {
    await expect(menuRowIconAt(iconId, index)).toBeVisible();
  }
};

// Titles of the rows inside the nested submenu.
const SUBMENU_ROWS = ['Sub Toggle 1', 'Sub Toggle 2', 'Sub Toggle 3'] as const;

// Asserts every submenu row renders `iconId`. Addressed by title, not index:
// the parent menu's cells stay attached while the submenu is open.
const expectAllSubmenuRowIconsToBeVisible = async (iconId: string) => {
  for (const rowTitle of SUBMENU_ROWS) {
    await expect(menuRowIcon(iconId, rowTitle)).toBeVisible();
  }
};

describeIfIOS('Stack Header Icon (iOS)', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
    await selectSingleFeatureTestsScreen(
      'Stackv5',
      'test-stack-header-icon-ios',
    );
  });

  it('should display the header with a star sfSymbol icon on the trailing item', async () => {
    await expect(element(headerTitle('Header Icons'))).toExist();
    await expect(barButtonIcon(ICON_IDS.sfSymbol)).toBeVisible();
  });

  describe('cycling the bar button item icon', () => {
    it('should cycle the item icon through a custom symbol, imageSource, a template image, an original symbol and back to sfSymbol', async () => {
      let previous: IconVariant = 'sfSymbol';
      for (const variant of CYCLE) {
        await element(by.id('cycle-item-icon-button')).tap();
        await expect(
          element(by.id('current-item-icon').and(by.text(variant))),
        ).toBeVisible();
        await expect(barButtonIcon(ICON_IDS[variant])).toBeVisible();
        await expect(barButtonIcon(ICON_IDS[previous])).not.toExist();
        previous = variant;
      }
    });
  });

  describe('the header item menu', () => {
    it('should open the menu on long press and show its items with the star icon', async () => {
      await element(by.label('Actions')).atIndex(0).longPress();

      await expect(element(by.text('Toggle 1'))).toBeVisible();
      await expect(element(by.text('Toggle 2'))).toBeVisible();
      await expect(element(by.text('Toggle 3'))).toBeVisible();
      await expect(element(by.text('Submenu'))).toBeVisible();

      await expect(element(by.text('Cycle icons (sfSymbol)'))).toBeVisible();
      await expectAllMenuRowIconsToBeVisible(ICON_IDS.sfSymbol);

      await element(by.text('Submenu')).tap();
      await expectAllSubmenuRowIconsToBeVisible(ICON_IDS.sfSymbol);

      // Tapping the submenu title acts as "back", returning to the parent menu
      // so the next test starts with the menu still open.
      await element(
        by.type(CLASS_NAME_UI_CONTEXT_MENU_SUBMENU_TITLE_VIEW),
      ).tap();
    });

    it('should cycle the menu icon variant when repeatedly tapping "Cycle icons" inside the menu', async () => {
      let previous: IconVariant = 'sfSymbol';
      for (const variant of CYCLE) {
        await element(by.text(`Cycle icons (${previous})`)).tap();
        await expect(
          element(by.text(`Cycle icons (${variant})`)),
        ).toBeVisible();
        await expectAllMenuRowIconsToBeVisible(ICON_IDS[variant]);
        previous = variant;
      }
    });
  });
});
