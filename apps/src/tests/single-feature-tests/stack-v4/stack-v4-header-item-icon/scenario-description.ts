import type { ScenarioDescription } from '@apps/tests/shared/helpers';

export const scenarioDescription: ScenarioDescription = {
  name: 'Header Item Icon',
  key: 'stack-v4-header-item-icon',
  details:
    'Tests header bar button item icons: system and custom SF Symbols, imageSource, `renderingMode` (`template` image, `original` symbol), and the deprecated templateSource and xcasset types.',
  platforms: ['ios'],
  e2eCoverage: 'tbd',
  smokeTest: false,
};
