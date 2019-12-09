import React, {Component} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';
// import DatePicker from 'react-native-datepicker';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerView from './Views/ImagePickerView';
import DatePickerView from './Views/DatePickerView';

import moment from 'moment';
import styles from './styles';
import * as Paths from '../Configs/PathConfig';
import URLUtil, {localImageSource} from '../Utils/URLUtil';
import {Request, requestWithToken, removeTokens} from '../Utils/RequestUtil';
import {storage, userData} from '../Utils/StorageUtil';
import * as NavigationUtil from '../Utils/NavigationUtil';
import UserData from '../Utils/UserData';
import {px2dp} from '../Utils/DeviceUtil';

export default class UserDefaultScreen extends Component {
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
      userData: null,

      imgSource: null,
    };
  }
  componentDidMount() {
    userData(result => {
      this.setState({
        userData: new UserData(result),
      });
      this.state.userData.getInfo();
    });
  }

  _createInfoSection() {
    if (!this.state.settingData) {
      return;
    }
    return this.state.settingData.item1.map((item, index) => {
      return this._createInfoBanner(item);
    });
  }
  _createInfoBanner(item) {
    // var titleImgURL = URLUtil(Paths.mePath + '/' + item.titleImg);
    var nextImgURL = URLUtil(Paths.imagePath + 'icons/next.png');
    console.log('========nextImgURL======' + nextImgURL);
    return (
      <TouchableOpacity
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
    if (!this.state.userData) {
      return null;
    }

    return (
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <ScrollView>
          <View style={[styles.userDefault, {paddingVertical: 20}]}>
            <TouchableOpacity
              onPress={() => {
                //更换头像
                this.imagePicker.show();
              }}>
              {!this.state.userData.newPath ||
              this.state.userData.newPath == '' ? (
                <Image
                  source={{
                    uri: URLUtil(this.state.userData.imagePath),
                  }}
                  style={[styles.userImage, {margin: 20}]}
                  loadingIndicatorSource={Paths.userHeadDefaultImage}
                />
              ) : (
                <Image
                  source={{uri: this.state.userData.newPath}}
                  style={[styles.userImage, {margin: 20}]}
                  loadingIndicatorSource={Paths.userHeadDefaultImage}
                />
              )}
            </TouchableOpacity>

            <Text style={{margin: 20}}>更换头像 </Text>

            <View style={[styles.twoColCounselView, {backgroundColor: ''}]}>
              <TouchableOpacity
                style={[styles.conselButton, {margin: 20}]}
                onPress={() => {
                  //更换性别 男孩
                  let data = this.state.userData;

                  data.sex = 'boy';
                  this.setState({
                    userData: data,
                  });
                }}>
                {this.state.userData.sex == 'boy' ? (
                  <View style={styles.twoColCounselView}>
                    <Image
                      source={{uri: URLUtil(Paths.imagePath + 'icons/boy.png')}}
                      style={[styles.tabIcon]}
                    />
                    <Text style={styles.conselText}>男孩</Text>
                  </View>
                ) : (
                  <View style={styles.twoColCounselView}>
                    <Image
                      source={{
                        uri: URLUtil(Paths.imagePath + 'icons/boy_h.png'),
                      }}
                      style={[styles.tabIcon]}
                    />
                    <Text style={[styles.conselText, {color: 'gray'}]}>
                      男孩
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.conselButton, {margin: 20}]}
                onPress={() => {
                  //更换性别 女孩
                  let data = this.state.userData;
                  data.sex = 'girl';
                  this.setState({
                    userData: data,
                  });
                }}>
                {this.state.userData.sex == 'boy' ? (
                  <View style={styles.twoColCounselView}>
                    <Image
                      source={{
                        uri: URLUtil(Paths.imagePath + 'icons/girl_h.png'),
                      }}
                      style={styles.tabIcon}
                    />
                    <Text style={[styles.conselText, {color: 'gray'}]}>
                      女孩
                    </Text>
                  </View>
                ) : (
                  <View style={styles.twoColCounselView}>
                    <Image
                      source={{
                        uri: URLUtil(Paths.imagePath + 'icons/girl.png'),
                      }}
                      style={styles.tabIcon}
                    />
                    <Text style={styles.conselText}>女孩</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.userInfoTitle}>宝贝名字 </Text>

            <TextInput
              style={styles.edit}
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit={true}
              //   placeholder={this.state.userData.ename}
              secureTextEntry={false}
              keyboardType="ascii-capable"
              selectTextOnFocus={false}
              onChangeText={value => {
                let data = this.state.userData;
                data.ename = value;
                this.setState({
                  ename: data,
                });
              }}>
              {this.state.userData.ename}
            </TextInput>

            <Text style={styles.userInfoTitle}>宝贝生日 </Text>
            <TouchableOpacity
              onPress={() => {
                this.datePicker.show();
              }}>
              <Text style={styles.userInfoText}>
                {moment(this.state.userData.birth).format('YYYY年MM月DD日')}
              </Text>
            </TouchableOpacity>
            {/* <DatePicker
              style={{width: 150, borderRadius: 20}}
              mode="date"
              date={this.state.userData.birth}
              format="YYYY年MM月DD日"
              confirmBtnText={'确定'}
              showIcon={false}
              maxDate={new Date()}
              onDateChange={date => {
                let dateStr = date.toString();

                dateStr = dateStr.replace('年', '-');
                dateStr = dateStr.replace('月', '-');
                dateStr = dateStr.replace('日', '');
                let newDate = moment(dateStr).format('YYYY-MM-DD');
                let data = this.state.userData;
                data.birth = newDate;
                console.log('==onDateChange=date====' + dateStr);
                this.setState({
                  userData: data,
                });
              }}
            /> */}
          </View>
        </ScrollView>

        <View style={{marginHorizontal: 80, marginVertical: 10}}>
          <TouchableOpacity
            onPress={() => {
              this.state.userData.getInfo();
              console.log(
                '==onDateChange=date====' + this.state.userData.birth,
              );
              this.props.navigation.state.params.callback(this.state.userData);
              NavigationUtil.popToTop(this.props.navigation);
            }}>
            <View style={[styles.conselButton, {backgroundColor: 'green'}]}>
              <Text
                style={{
                  flex: 1,
                  color: 'black',
                  fontSize: 24,
                  textAlign: 'center',
                  height: 50,
                }}>
                保存
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ImagePickerView
          ref={value => {
            this.imagePicker = value;
          }}
          visible={false}
          animationType="slide"
          transparent={true}
          onRequestClose={image => {
            let data = this.state.userData;
            data.newPath = image.path;
            this.setState({
              userData: data,
            });
          }}
        />
        <DatePickerView
          ref={value => (this.datePicker = value)}
          choose="确定"
          cancel="取消"
          onChoose={dateStr => {
            
            let newDate = moment(dateStr).format('YYYY-MM-DD');
            let userData = this.state.userData;
            userData.birth = newDate;
            console.log('====birth='+userData.birth);
            
            this.setState({
              userData: userData,
            });
          }}
        />
      </View>
    );
  }
}
