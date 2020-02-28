import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatbotScreen from './ChatbotScreen';
import MyProfileScreen from './MyProfileScreen';
import ReadingsScreen from './ReadingsScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Profile" component={MyProfileScreen} />
      <Tab.Screen name="My readings" component={ReadingsScreen} />
      <Tab.Screen name="Q&A" component={ChatbotScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

