# Test Scenario: Stack Header Icons (iOS)

## Details

**Description:** This test focuses on handling icons and images in header with runtime updates.

**OS test creation version:** iOS 26.4, iPadOS 26.4

## E2E test

Full: all steps covered.

## Prerequisites

- iOS / iPadOS simulator

## Note

- Crossfade doesn't work when changing between async images.
- Changing items in menu while it is presented (default for this test) results in visible layout shifts.
This is native behavior, we can't do much here

## Steps on iPhone

1. Inspect the header right item
  - [ ] A "star" sfSymbol is visible
2. Repeatedly click on "Cycle item icon"
  - [ ] First, "star" changes to the Software Mansion logo (a custom symbol from the asset catalog)
  - [ ] Second, the logo changes to a black search icon (an image in its own colors)
  - [ ] Third, the black search icon changes to a search icon in the item's tint color, NOT white (a white image with `renderingMode: 'template'`)
  - [ ] Fourth, the search icon changes to a red heart (`renderingMode: 'original'`, multicolor)
  - [ ] Lastly, the red heart changes again to "star"
3. Inspect the menu
  - [ ] Long press on the header item shows the menu
  - [ ] both menu items and submenu items have "star" visible on the left side
4. Repeatedly click on "Cycle icons" action inside the menu
  - [ ] First, "star" changes to the Software Mansion logo
  - [ ] Second, the logo changes to a black search icon
  - [ ] Third, the black search icon changes to a search icon in the menu's text color, NOT white
  - [ ] Fourth, the search icon changes to a red heart
  - [ ] Lastly, the red heart changes again to "star"
