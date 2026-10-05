import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import {
  Screen,
  ScreenStack,
  ScreenStackHeaderConfig,
  type HeaderBarButtonItem,
  type PlatformIconIOS,
} from 'react-native-screens';
import { SettingsPicker } from '@apps/shared';
import { createScenario } from '@apps/tests/shared/helpers';
import { scenarioDescription } from './scenario-description';

type IconVariant =
  | 'sfSymbol'
  | 'customSymbol'
  | 'imageSource'
  | 'templateImage'
  | 'originalSymbol'
  | 'templateSource'
  | 'xcasset';

const ICON_VARIANTS: IconVariant[] = [
  'sfSymbol',
  'customSymbol',
  'imageSource',
  'templateImage',
  'originalSymbol',
  'templateSource',
  'xcasset',
];

function iconForVariant(variant: IconVariant): PlatformIconIOS {
  switch (variant) {
    case 'sfSymbol':
      return { type: 'sfSymbol', name: 'star.fill' };
    case 'customSymbol':
      return { type: 'sfSymbol', name: 'nano.swm' };
    case 'imageSource':
      return {
        type: 'imageSource',
        imageSource: require('@assets/search_black.png'),
      };
    case 'templateImage':
      return {
        type: 'imageSource',
        imageSource: require('@assets/search_white.png'),
        renderingMode: 'template',
      };
    case 'originalSymbol':
      return {
        type: 'sfSymbol',
        name: 'heart.fill',
        renderingMode: 'original',
      };
    case 'templateSource':
      return {
        type: 'templateSource',
        templateSource: require('@assets/search_white.png'),
      };
    case 'xcasset':
      return { type: 'xcasset', name: 'custom-icon-fill' };
  }
}

function buildHeaderItems(variant: IconVariant): HeaderBarButtonItem[] {
  const icon = iconForVariant(variant);
  return [
    {
      type: 'button',
      icon,
      accessibilityLabel: 'Icon button',
      onPress: () => Alert.alert('Icon button pressed'),
    },
    {
      type: 'menu',
      title: 'Menu',
      menu: {
        title: 'Menu',
        items: [
          {
            type: 'action',
            title: 'Action',
            icon,
            onPress: () => Alert.alert('Action pressed'),
          },
          {
            type: 'submenu',
            title: 'Submenu',
            icon,
            items: [
              {
                type: 'action',
                title: 'Nested action',
                icon,
                onPress: () => Alert.alert('Nested action pressed'),
              },
            ],
          },
        ],
      },
    },
  ];
}

function TestStackV4HeaderItemIcon() {
  const [variant, setVariant] = useState<IconVariant>('sfSymbol');

  return (
    <ScreenStack style={styles.fill}>
      <Screen key="home" activityState={2} isNativeStack>
        <ScreenStackHeaderConfig
          title="Header Item Icon"
          headerRightBarButtonItems={buildHeaderItems(variant)}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.content}>
          <Text>
            The header button and the menu items use the icon selected below.
          </Text>
          <SettingsPicker<IconVariant>
            testID="header-item-icon-variant-picker"
            label="icon"
            value={variant}
            onValueChange={setVariant}
            items={ICON_VARIANTS}
          />
        </ScrollView>
      </Screen>
    </ScreenStack>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
});

export default createScenario(TestStackV4HeaderItemIcon, scenarioDescription);
