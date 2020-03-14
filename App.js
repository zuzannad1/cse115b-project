import * as React from 'react';
import TabNavigator from './Navigator';
import SwitchNavigator from './Navigator';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

export default function App() {
  return <SwitchNavigator />;
}
