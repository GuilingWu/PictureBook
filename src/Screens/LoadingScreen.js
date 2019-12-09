/**
 * LoadingScreen.js
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {refreshToken} from '../Utils/RequestUtil';
// import NavigationUtil from '../Utils/NavigationUtil';
import Route from '../Configs/Route';
import {loadUserInfo} from '../Utils/UserData';
import {px2dp, winWidth, winHeigth} from '../Utils/DeviceUtil';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFinished: false,
    };
    this.checkedLogin = false;
    this.isLoggedIn = false;
    this.loadingCount = 0;
    this.timer = null;
    this._checkLogin = this._checkLogin.bind(this);
  }
  componentDidMount() {
    this._checkLogin();
    this._loading();
    this.timer = setTimeout(() => {
      this._finishLoading();
    }, 3000);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  _checkLogin() {
    refreshToken()
      .then(() => {
        this.checkedLogin = true;
        this.isLoggedIn = true;
        this._finishLoading();
      })
      .catch(error => {
        console.log('======' + error);
        this.checkedLogin = true;
        this.isLoggedIn = false;
        this._finishLoading();
      });
  }
  _loading() {}
  _finishLoading() {
    if (++this.loadingCount < 2) return;
    if (this.isLoggedIn) {
      loadUserInfo();
    }
    this.setState({
      loadingFinished: true,
    });
  }

  render() {
    const {loadingFinished} = this.state;
    if (!this.checkedLogin || !loadingFinished) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loading}>
            <Text style={styles.loadingText}>loading</Text>
            <Dot duration={1000} dotCount={3} />
          </View>
        </View>
      );
    } else {
      const AppNavigator = Route(this.isLoggedIn);
      return <AppNavigator />;
    }
  }
}

class Dot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curCount: 1,
    };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        curCount: (this.state.curCount + 1) % (this.props.dotCount + 1),
      });
    }, this.props.duration);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  render() {
    let count = this.state.curCount;

    var dots = '';
    for (var i = 0; i <= count; i++) {
      if (i > 0) {
        dots += '. ';
      }
    }
    return (
      <View style={styles.dotView}>
        <Text style={styles.loadingText}>{dots}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'white',
    width: winWidth,
    height: winHeigth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingView: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  loading: {
    flex: 1,
    // paddingHorizontal: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotView: {
    // flex: 1,
    width: px2dp(50),
    flexDirection: 'row',
  },
  loadingText: {
    fontSize: px2dp(30),
  },
});
