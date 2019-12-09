import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {
  createAppContainer,
  createSwitchNavigator,
  //   createDrawerNavigatior,
  //   createStackNavigator,
} from 'react-navigation';

import HomeScreen from '../Screens/HomeScreen';
import CourseScreen from '../Screens/CourseScreen';
import BookScreen from '../Screens/BookScreen';
import MeScreen from '../Screens/MeScreen';
import MyCourseScreen from '../Screens/MyCourseScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
// import LoadingScreen from '../Screens/LoadingScreen';
import WebViewPage from '../Screens/Views/WebViewPage';
import TopicPage from '../Screens/Views/TopicPage';
import SettingScreen from '../Screens/SettingScreen';
import UserDefaultScreen from '../Screens/UserDefaultScreen';
import FMScreen from '../Screens/FMScreen';

import {px2dp} from '../Utils/DeviceUtil';
import styles from '../Screens/styles';

const Main = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Course: {
      screen: CourseScreen,
    },
    Book: {
      screen: BookScreen,
    },
    Me: {
      screen: MeScreen,
    },
  },
  {
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否允许滑动切换tab
    swipeEnabled: true,
    //是否在切换tab页时显示动画
    animationEnabled: true,
    // initalLayout:
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: 'none',

    //设置Tab标签的属性
    tabBarOptions: {
      //Android属性
      upperCaseLabel: false, //是否使标签大写，默认为true
      //共有属性
      showIcon: true, //是否显示图标，默认关闭
      showLabel: true, //是否显示label，默认开启
      activeTintColor: '#70ff29', //label和icon的前景色 活跃状态下（选中）
      inactiveTintColor: 'gray', //label和icon的前景色 活跃状态下（未选中）
      allowFontScaling: true, //文本字体大小是否可以缩放 默认true
      //tab bar的样式
      style: {
        //TabNavigator 的背景颜色
        backgroundColor: 'white',
        height: px2dp(60),
        // flexDirection: 'row',
      },
      indicatorStyle: {
        //标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
        height: 0,
      },
      //tab bar的文本样式
      labelStyle: {
        //文字的样式
        fontSize: px2dp(13),
        marginTop: -px2dp(4),
        marginBottom: px2dp(6),
        marginLeft: 0,
        fontWeight: 'bold',
      },
      //tab 页的样式
      tabStyle: {
        // backgroundColor: 'red',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      },
    },
  },
);
// let initialRouteName = 'Login';
// let isLoggedIn = false;
function RootStack(islogged) {
  return createStackNavigator(
    {
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          headerTitle: '登录',
        },
      },
      Register: {
        screen: RegisterScreen,
        navigationOptions: {
          headerTitle: '注册',
        },
      },
      Main: {
        screen: Main,
      },
      WebView: {
        screen: WebViewPage,
      },
      TopicView: {
        screen: TopicPage,
      },
      Setting: {
        screen: SettingScreen,
      },
      UserDefault: {
        screen: UserDefaultScreen,

      },
      FMView: {
        screen: FMScreen,

      }
    },
    {
      initialRouteName: islogged ? 'Main' : 'Login',
      // initialRouteName: 'Loading',
    },
  );
}

export default islogged => {
  let stack = RootStack(islogged);
  return createAppContainer(stack);
};
