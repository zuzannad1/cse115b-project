import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/MyProfileScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import ReadingsScreen from './screens/ReadingsScreen';
import EducationalContent from './screens/EducationalContent'
import Icon from 'react-native-vector-icons/FontAwesome';

const TabNavigator = createBottomTabNavigator(
  {
    MyReadings: {
      screen: ReadingsScreen,
      navigationOptions: {
        tabBarLabel: 'My Readings',
        tabBarIcon: ({tintColor}) => (
          <Icon name="file-o" size={25} color={tintColor} />
        ),
      },
    },
    Chatbot: {
      screen: ChatbotScreen,
      navigationOptions: {
        tabBarLabel: 'Chatbot',
        tabBarIcon: ({tintColor}) => (
          <Icon name="question" size={25} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'My Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" size={25} color={tintColor} />
        ),
      },
    },
    EducationalContent: {
      screen: EducationalContent,
      navigationOptions: {
        tabBarLabel: 'EDU',
        tabBarIcon: ({tintColor}) => (
          <Icon name="graduation-cap" size={25} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Chatbot',
  },
);

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    Tabs: {
      screen: TabNavigator,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(SwitchNavigator);
