import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import styles from './styles';

export default class Course extends Component {
  static navigationOptions = {
    tabBarLabel: '课程',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../assets/images/icons/course.png')}
        style={[styles.tabIcon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <View style={{flex:1,height:500,backgroundColor:'green'}}>
        <Text> CoursePage</Text>
      </View>
    );
  }
}
