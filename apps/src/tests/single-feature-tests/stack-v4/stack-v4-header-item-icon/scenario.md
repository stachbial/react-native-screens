# Test Scenario: Stack v4 Header Item Icon (iOS)

## Details

**Description:** Validates the icons of Stack v4 header bar button items and
their menus. `sfSymbol` icons resolve custom symbols from the app asset
catalog, `imageSource` icons take `renderingMode: 'template'`, and `sfSymbol`
icons take `renderingMode: 'original'` (multicolor). The deprecated
`templateSource` and `xcasset` types keep working.

**OS test creation version:** iOS 27.

## E2E test

TBD.

## Prerequisites

- iOS simulator.

## Note

- The header button and every menu row use the same icon.
- On iOS 26 and later, header items are drawn in the label color by default.

## Steps

1. Launch the app and navigate to **Stack v4** > **Header Item Icon**.

- [ ] The header button shows a "star" SF Symbol.

2. Select `customSymbol` in the **icon** picker.

- [ ] The header button shows the Software Mansion logo (a custom symbol from
      the asset catalog).

3. Select `imageSource`.

- [ ] The header button shows a black search icon (an image in its own colors).

4. Select `templateImage`.

- [ ] The header button shows a search icon in the item's tint color, NOT white
      (a white image with `renderingMode: 'template'`).

5. Select `originalSymbol`.

- [ ] The header button shows a red heart (`renderingMode: 'original'`,
      multicolor).

6. Select `templateSource`.

- [ ] The header button shows a search icon in the item's tint color, NOT white
      (deprecated `templateSource` still works).

7. Select `xcasset`.

- [ ] The header button shows the asset catalog image `custom-icon-fill`
      (deprecated `xcasset` still works).

8. Select `originalSymbol` and tap **Menu** in the header.

- [ ] **Action** and **Submenu** show the red heart.
- [ ] Inside **Submenu**, **Nested action** shows the red heart.
