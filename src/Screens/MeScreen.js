import React, {Component} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  View,
  Text,
  Platform,
} from 'react-native';
import styles from './styles';
import * as Paths from '../Configs/PathConfig';
import URLUtil, {localImageSource} from '../Utils/URLUtil';
import Request, {paramsSerializer} from '../Utils/RequestUtil';
import {storage, userData, saveUser} from '../Utils/StorageUtil';
import * as NavigationUtil from '../Utils/NavigationUtil';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import UserData from '../Utils/UserData';

export default class Me extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../assets/images/icons/nickname.png')}
        style={[styles.tabIcon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      meData: null,
      userData: null,
    };
    // bind this._fetchData  下面_fetchData回调要用this state赋值
    this._fetchData = this._fetchData.bind(this);
    this._userInfoPressed = this._userInfoPressed.bind(this);
    this._saveUserInfo = this._saveUserInfo.bind(this);
  }
  componentDidMount() {
    this._fetchDatas();
    
  }
  _fetchDatas() {
    // Request({
    //   method: 'POST',
    //   url: 'url',
    //   data: {username},
    // })
    //   .then(() => {
    //   })
    //   .catch(error => {
    //   });

    var meData = require('../../src/assets/data/me.json');
    this.setState({
      meData: meData.data,
    });

    userData(result => {
      console.log('==userDetail===' + result);

      this.setState({
        userData: new UserData(result),
      });
      this.state.userData.getInfo();
    }); 
  }
  _fetchData(url, callback) {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        callback(responseJson);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('提示', '=====' + error);
      });
  }
  _userInfoPressed() {
    NavigationUtil.push(this.props.navigation, 'UserDefault', {
      callback: this._saveUserInfo,
    });
  }
  _saveUserInfo(userData) {
    if (this.state.userData.isSame(userData)) return;
    // Alert.alert('提示', '=====');
    const formData = new FormData();
    if (userData.newPath && userData.newPath != '') {
      let file = {
        uri: userData.newPath,
        type: 'multipart/form-data',
        name: 'image.png',
      }; // file 中这三个元素缺一不可。 type 必须为 multipart/form-data。

      formData.append('img', file);
    }
    formData.append('name', userData.name);
    formData.append('id', userData.id);
    formData.append('ename', userData.ename);
    formData.append('sex', userData.sex);
    formData.append('birth', userData.birth);

    let url = URLUtil('updateUser');
    // console.log('========url===' + url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        Alert.alert('个人信息修改成功');
        userData.newPath = '';
        if(response.imagePath){
          userData.imagePath = response.imagePath;
        }
        this.setState({
          userData: userData,
        });
        saveUser(userData);
      })
      .catch(error => {
        Alert.alert('个人信息修改失败', error.message || error);
      });
  }
  _createUserInfo() {
    if (!this.state.userData) {
      return;
    }

    let date = new Date(this.state.userData.birth);
    let today = new Date();
    console.log('===date====' + this.state.userData.birth);
    console.log('===date====' + date);
    console.log('===today====' + today);
    let month = today.getMonth() - date.getMonth();
    let year = today.getFullYear() - date.getFullYear();
    if (month < 0) {
      month += 12;
      year--;
    }

    return (
      <View style={styles.userView}>
        <TouchableOpacity onPress={this._userInfoPressed}>
          <Image
            source={{
              uri:URLUtil(this.state.userData.imagePath)
            }}
            loadingIndicatorSource={Paths.userHeadDefaultImage}
            style={styles.userImage}
          />

          <View
            style={[
              styles.twoColCounselView,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={(styles.titleText, {fontSize: 20})}>
              {this.state.userData.ename}
            </Text>
            <Image
              source={{uri: URLUtil(Paths.imagePath + 'icons/edit.png')}}
              style={{width: 25, height: 25}}
            />
          </View>
          <Text style={{fontSize: 18, marginTop: 10, textAlign: 'center'}}>
            {year > 0 ? year + '年' : ''}
            {month > 0 ? month + '个月' : ''}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  _createSections(type) {
    if (!this.state.meData) {
      return;
    }
    return this.state.meData.map((section, index) => {
      return (
        <View style={styles.meSectionView} key={index}>
          {this._createInfoSection(section)}
        </View>
      );
    });
  }
  _createInfoSection(section) {
    return section.map((item, index) => {
      return this._createInfoBanner(item,index);
    });
  }
  _createInfoBanner(item, index) {
    var titleImgURL = URLUtil(Paths.mePath + '/' + item.titleImg);
    var nextImgURL = URLUtil(Paths.mePath + '/' + item.nextImg);

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          if (item.title === '设置') {
            NavigationUtil.push(this.props.navigation, 'Setting');
          } else {
            Alert.alert('selected ' + item.title);
          }
        }}>
        <View style={styles.meBannerView}>
          <View style={styles.itemContainer}>
            <Image source={{uri: titleImgURL}} style={styles.meBannerIcon} />
            <Text style={styles.meBannerTitle}>{item.title}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.meBannerTip}>{item.tip}</Text>
            <Image source={{uri: nextImgURL}} style={styles.meBannerNextIcon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={(styles.container, {backgroundColor: '#fbfbfb'})}>
        <ScrollView>
          {this._createUserInfo()}
          {this._createSections()}
        </ScrollView>
      </View>
    );
  }
}
