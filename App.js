import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  Dimensions
} from "react-native";
import Login from "./src/Screens/login";
import Chat from "./src/Screens/chat";
import Home from "./src/Screens/Home";
import SignUp from "./src/Screens/SignUp";

import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator} from 'react-navigation-tabs';


// Get screen dimensions to adjust width
// const WIDTH = Dimensions.get("window").width;
// const DrawerConfig = {
  //   drawerWidth: WIDTH * 0.83
  // };
  
  /*
  
  */

    
const AuthStack = createStackNavigator(
  // Routes
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null  // removes the header
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null  // removes the header
      }
    }
  }
  // Config
);
    
const AppDrawer = createDrawerNavigator(
  // Routes
  {
    Home: {
      screen: Home,
    },
    Login: {
      screen: AuthStack
    }
  }
  // Config
);
    
const AppSwitch = createSwitchNavigator(
  // Routes
  {
    Auth: {
      screen: AuthStack,
    },
    App: {
      screen: AppDrawer,
    }
  }
  // Config
);

/*
AppContainer is created by passing AppSwitch, which is a SwitchNavigator
that contains the AuthStack for authorization (Login, SignUp) and
AppDrawer which is used to switch between MainTabs and go back to Login.
MainTabs has routes to Home and Chat screens.
AppContainer -> AppSwitch [AuthStack,AppDrawer]
AppDrawer -> [MainTabs, AuthStack]
AuthStack -> [Login,SignUp]
MainTabs -> [Home, Chat]
*/
const AppContainer = createAppContainer(AppSwitch);
      
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
};