// import React, {Component} from 'react';
// import {Image, View, Text} from 'react-native';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-navigation-tabs';

// import {
//   createAppContainer,
//   //   createDrawerNavigatior,
//   //   createStackNavigator,
// } from 'react-navigation';

// import HomeScreen from '../TabNavScreens/HomeScreen';
// import CourseScreen from '../TabNavScreens/CourseScreen';
// import BookScreen from './BookScreen';
// import MeScreen from './MeScreen';
// import MyCourseScreen from './MyCourseScreen';
// import LoginScreen from './LoginScreen';
// import RegisterScreen from '../TabNavScreens/RegisterScreen';

// const BottomTab = createBottomTabNavigator(
//   {
//     // RootStack: {
//     //   screen: RootStack,
//     //   navigationOptions: {
//     //     //tab 的属性
//     //     tabBarLabel: '首页',
//     //     tabBarIcon: ({tintColor}) => (
//     //       <Image
//     //         source={require('../../assets/images/icons/home.png')}
//     //         style={[{height: 40, width: 40}, {tintColor: tintColor}]}
//     //       />
//     //     ),
//     //   },
//     // },
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: {
//         title: '首页',
//         // tabBarIcon: ({tintColor}) => (
//         //   <Image
//         //     source={require('../../assets/images/icons/home.png')}
//         //     style={[{height: 40, width: 40}, {tintColor: tintColor}]}
//         //   />
//         // ),
//       },
//     },
//     Course: {
//       screen: CourseScreen,
//       navigationOptions: {
//         tabBarLabel: '课程',
//         // tabBarIcon: ({tintColor}) => (
//         //   <Image
//         //     source={require('../../assets/images/icons/course.png')}
//         //     style={[{height: 40, width: 40}, {tintColor: tintColor}]}
//         //   />
//         // ),
//       },
//     },
//     Book: {
//       screen: BookScreen,
//       navigationOptions: {
//         tabBarLabel: '绘本',
//         // tabBarIcon: ({tintColor}) => (
//         //   <Image
//         //     source={require('../../assets/images/icons/scanread.png')}
//         //     style={[{height: 40, width: 40}, {tintColor: tintColor}]}
//         //   />
//         // ),
//       },
//     },
//     Me: {
//       screen: MeScreen,
//       navigationOptions: {
//         tabBarLabel: '我的',
//         // tabBarIcon: ({tintColor}) => (
//         //   <Image
//         //     source={require('../../assets/images/icons/nickname.png')}
//         //     style={[{height: 40, width: 40}, {tintColor: tintColor}]}
//         //   />
//         // ),
//       },
//     },
//   },
//   {
//     //设置TabNavigator的位置
//     tabBarPosition: 'bottom',
//     //是否在更改标签时显示动画
//     animationEnabled: true,
//     //是否允许在标签之间进行滑动
//     swipeEnabled: true,
//     //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
//     backBehavior: 'none',

//     //设置Tab标签的属性
//     tabBarOptions: {
//       //Android属性
//       upperCaseLabel: false, //是否使标签大写，默认为true
//       //共有属性
//       showIcon: true, //是否显示图标，默认关闭
//       showLabel: true, //是否显示label，默认开启
//       activeTintColor: '#70ff29', //label和icon的前景色 活跃状态下（选中）
//       inactiveTintColor: 'gray', //label和icon的前景色 活跃状态下（未选中）
//       style: {
//         //TabNavigator 的背景颜色
//         backgroundColor: 'white',
//         height: 55,
//       },
//       indicatorStyle: {
//         //标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
//         height: 0,
//       },
//       labelStyle: {
//         //文字的样式
//         fontSize: 13,
//         marginTop: -4,
//         marginBottom: 6,
//         fontWeight: 'bold',
//       },
//       iconStyle: {
//         //图标的样式
//         marginBottom: 5,
//       },
//     },
//   },
// );
// let initialRouteName = 'Login';
// const RootStack = createStackNavigator(
//   {
//     // Home: {
//     //   screen: HomeScreen,
//     //   navigationOptions: {
//     //     title: '首页',
//     //   }
//     // },
//     RootTab: {
//       screen: BottomTab,
//       navigationOptions: {
//         title: '首页',
//       },
//     },
//     Login: {
//       screen: LoginScreen,
//       navigationOptions: {
//         title: '登录',
//       },
//     },
//     Register: {
//       screen: RegisterScreen,
//       navigationOptions: {
//         title: '注册',
//       },
//     },
//   },
//   {
//     initialRouteName: 'Login',
//     // initialRouteName: 'Home',
//   },
// );
// // const NavigatorContainer = createAppContainer(RootStack);

// export default function configAppNavigator(isLoggedIn) {
//   if (isLoggedIn) {
//     initialRouteName = 'Main';
//   } else {
//     initialRouteName = 'Login';
//   }
//   return createAppContainer(RootStack);
// }
