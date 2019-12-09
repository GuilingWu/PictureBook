import React, {Component} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  View,
  Text,
} from 'react-native';
import stylesCommon from './styles';
import CourseBanner from './Views/CourseBanner';
import RecommendFlow from './Views/RecommendFlow';
import * as Paths from '../Configs/PathConfig';
import URLUtil from '../Utils/URLUtil';
import * as RequestUtil from '../Utils/RequestUtil';
import {getUserInfo} from '../Utils/UserData';

import * as NavigationUtil from '../Utils/NavigationUtil';
import WebViewPage from './Views/WebViewPage';
import {WebView} from 'react-native-webview';

export default class Home extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../assets/images/icons/home.png')}
        style={[stylesCommon.tabIcon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      courseData: null,
    };
    // bind this._fetchData  下面_fetchData回调要用this state赋值
    this._fetchData = this._fetchData.bind(this);
  }
  componentDidMount() {
    this._fetchData();
  }
  _fetchData() {
    fetch(URLUtil(Paths.coursePath))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          courseData: responseJson.data,
        });
      })
      .catch(error => {
        console.error(error);
        // Alert.alert('提示', '=====' + error);
      });
  }

  _createCourseBanners(type) {
    if (!this.state.courseData) {
      return;
    }
    let allCourse = [];
    let courseArr = null;

    if (type === 0) {
      courseArr = this.state.courseData.course1;
    } else if (type === 1) {
      courseArr = this.state.courseData.course2;
    }
    if (!courseArr) return;

    for (var i = 0; i < courseArr.length; i++) {
      var item = courseArr[i];
      allCourse.push(
        <CourseBanner
          key={i}
          title={item.title}
          startDate={item.startDate}
          discount={item.discount}
          tip={item.tip}
          discountPrice={item.discountPrice}
          price={item.price}
          type="0" //0体验课 1系统课
          detail={item.detail}
        />,
      );
    }
    return allCourse;
  }
  _onRecommendMessage() {
    // Alert.alert('===_onRecommendMessage==');
  }
  _onRecommendPress(index) {
    var num = 1+index;
    num = 1;
    NavigationUtil.push(this.props.navigation, 'TopicView', {
      url: URLUtil(`test/topic/topic${num}/topic.html`),
      onMessage: this._onRecommendMessage.bind(),
      user: getUserInfo(),
    });
  }
  render() {
    return (
      <View style={(stylesCommon.container, {backgroundColor: '#fbfbfb'})}>
        <ScrollView
          ref={sc => {
            this._scrollView = sc;
          }}
        >
          <View style={stylesCommon.titleView}>
            <Text style={stylesCommon.titleText}>XX英语课程</Text>
          </View>
          <RecommendFlow
            url={URLUtil(Paths.recommendPath)}
            onPress={index => {
              this._onRecommendPress(index);
            }}
          />
          <View style={stylesCommon.twoColCounselView}>
            <TouchableOpacity
              style={stylesCommon.conselButton}
              onPress={() => {
                Alert.alert('selected 如何上课');
              }}>
              <Image
                source={require('src/assets/images/icons/QA.png')}
                style={[{height: 60, width: 60}, {tintColor: '#70ff29'}]}
              />
              <Text style={stylesCommon.conselText}>如何上课</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={stylesCommon.conselButton}
              onPress={() => {
                Alert.alert('selected 购课咨询');
              }}>
              <Image
                source={require('src/assets/images/icons/message.png')}
                style={[{height: 60, width: 60}, {tintColor: '#70ff29'}]}
              />
              <Text style={stylesCommon.conselText}>购课咨询</Text>
            </TouchableOpacity>
          </View>

          <Text style={stylesCommon.titleText2}>
            {this.state.courseData ? '体验课' : ''}
          </Text>
          {this._createCourseBanners(0)}
          <Text style={stylesCommon.titleText2}>
            {this.state.courseData ? '系统课' : ''}
          </Text>

          {this._createCourseBanners(1)}
        </ScrollView>
      </View>
    );
  }
}
