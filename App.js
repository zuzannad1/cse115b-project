import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatbotScreen from './screens/ChatbotScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import ReadingsScreen from './screens/ReadingsScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { DefaultTheme } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
import SwitchNavigator from './Navigator'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(30,110,255)',
    background: 'white',
    card: 'rgb(255, 255, 255)',
  },
};

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Profile" component={MyProfileScreen} />
      <Tab.Screen name="My readings" component={ReadingsScreen} />
      <Tab.Screen name="Q&A" component={ChatbotScreen} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component = {Signup}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}
