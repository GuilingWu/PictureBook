import React, {Component} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  View,
  Text,
} from 'react-native';
import styles from './styles';
import * as Paths from '../Configs/PathConfig';
import URLUtil from '../Utils/URLUtil';
import {Request, requestWithToken, removeTokens} from '../Utils/RequestUtil';
import {storage, userData} from '../Utils/StorageUtil';
import * as NavigationUtil from '../Utils/NavigationUtil';


export default class SettingScreen extends Component {
  //   static navigationOptions = {
  //     tabBarLabel: '我的',
  //     tabBarIcon: ({tintColor}) => (
  //       <Image
  //         source={require('../assets/images/icons/nickname.png')}
  //         style={[styles.tabIcon, {tintColor: tintColor}]}
  //       />
  //     ),
  //   };
  constructor(props) {
    super(props);
    this.state = {
      settingData: {
        item1: ['清除缓存', '上传日志', '注销账户'],
        item2: '退出登录',
      },
    };
  }
  componentDidMount() {}
  _createInfoSection() {
    if (!this.state.settingData) {
      return;
    }
    return this.state.settingData.item1.map((item, index) => {
      return this._createInfoBanner(item,index);
    });
  }
  _createInfoBanner(item,index) {
    // var titleImgURL = URLUtil(Paths.mePath + '/' + item.titleImg);
    var nextImgURL = URLUtil(Paths.imagePath + 'icons/next.png');
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          Alert.alert('selected ' + item.title);
        }}>
        <View style={styles.meBannerView}>
          <View style={styles.itemContainer}>
            <Text style={styles.meBannerTitle}>{item}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image source={{uri: nextImgURL}} style={styles.meBannerNextIcon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={(styles.fullScreen, {backgroundColor: '#f0f0f0'})}>
        <ScrollView>
          <View style={styles.meSectionView}>{this._createInfoSection()}</View>

          <View style={{marginHorizontal: 40, marginVertical: 10}}>
            <TouchableOpacity
              onPress={() => {
                requestWithToken({
                  method: 'GET',
                  url: '/logout',
                });
                removeTokens();
                // NavigationUtil.popToTop(this.props.navigation);
                NavigationUtil.reset(this.props.navigation, 'Login');
              }}>
              <View style={styles.conselButton}>
                <Text
                  style={{
                    flex: 1,
                    color: 'black',
                    fontSize: 24,
                    textAlign: 'center',
                    height: 50,
                  }}>
                  {this.state.settingData.item2}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
