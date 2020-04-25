import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/MyProfileScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import EducationalContent from './screens/EducationalContent';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabNavigator = createBottomTabNavigator(
  {
    Chatbot: {
      screen: ChatbotScreen,
      navigationOptions: {
        tabBarLabel: 'Chatbot',
        tabBarIcon: ({tintColor}) => (
          <Icon name="comment" size={25} color={'#3caffa'} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'My Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" size={25} color={'#3caffa'} />
        ),
      },
    },
    EducationalContent: {
      screen: EducationalContent,
      navigationOptions: {
        tabBarLabel: 'EDU',
        tabBarIcon: ({tintColor}) => (
          <Icon name="graduation-cap" size={25} color={'#3caffa'} />
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
