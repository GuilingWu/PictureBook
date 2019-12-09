import React, {Component} from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import * as NavigationUtil from '../Utils/NavigationUtil';
import TextButton from '../Components/TextButton';

import styles from './styles';

export default class Book extends Component {
  static navigationOptions = {
    tabBarLabel: '绘本',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../assets/images/icons/scanread.png')}
        style={[styles.tabIcon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <View>
        <View style={styles.twoColCounselView}>
          <TextButton
            style={styles.conselButton}
            onPress={() => {
              NavigationUtil.push(this.props.navigation, 'FMView');
            }}
            // iconImage={
            //   <Image
            //     source={require('../assets/images/icons/FMRadio.png')}
            //     style={{height: 30, width: 30}}
            //   />
            // }
            iconImage={{
              source: require('../assets/images/icons/FMRadio.png'),
              style: {height: 30, width: 30},
            }}
            bgColor="#ff2222"
            textColor="white"
            text="FM频道"
          />
          <TextButton
            style={styles.conselButton}
            onPress={() => {
              // NavigationUtil.push(this.props.navigation, 'FMView');

              NavigationUtil.push(this.props.navigation, 'TopicView', {
                url: `http://192.168.5.28:8888/test/topic/topics/topics.html`,
                // onMessage: this._onRecommendMessage.bind(),
                user: 'sss',
              });
            }}
            iconImage={{
              source: require('../assets/images/icons/VideoCamera.png'),
              style: {height: 30, width: 30},
            }}
            // iconImage={
            //   <Image
            //     source={require('../assets/images/icons/VideoCamera.png')}
            //     style={{height: 30, width: 30}}
            //   />
            // }
            bgColor="#aa11aa"
            textColor="white"
            text="视频频道"
          />
        </View>
      </View>
    );
  }
}
