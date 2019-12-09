import React, {Component} from 'react';
import {Image, Alert, StyleSheet, Button, View, Text} from 'react-native';

import TextField from '../Components/TextField';
import Request from '../Utils/RequestUtil';

import {saveToken,saveUser} from '../Utils/StorageUtil';
import * as NavigationUtil from '../Utils/NavigationUtil';
import {loadUserInfo} from '../Utils/UserData';
// import Route from '../Configs/Route';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this._login = this._login.bind(this);
    this._register = this._register.bind(this);
  }
  _login() {
    // NavigationUtil.reset(this.props.navigation, 'Main');return;
    const {username, password} = this.state;
    if (username == '' || password == '') {
      Alert.alert('用户名和密码不能为空');
      return;
    }
    // // const self = this;
    Request({
      method: 'POST',
      url: 'login',
      data: {username, password},
    })
      .then(data => {
        // Alert.alert('登录成功');

        saveToken(data.data);
        saveUser(data.data);
        loadUserInfo(data.data);
        NavigationUtil.reset(this.props.navigation, 'Main');
        // return<Route/>;
      })
      .catch(error => {
        Alert.alert('登录失败', error.message || error);
      });
  }

  _register() {
    const {navigation} = this.props;
    NavigationUtil.push(navigation, 'Register');
  }
  render() {
    const {username, password} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.loginView}>
          <TextField
            label="用户名"
            placeholder="请输入户名"
            onChange={value => {
              this.setState({
                username: value,
              });
            }}
          />
          <TextField
            label="密码"
            placeholder="请输入密码"
            type="password"
            onChange={value => {
              this.setState({
                password: value,
              });
            }}
          />
        </View>

        <View style={styles.twoColumnlView}>
            <View style={{width: 80,margin:20}}>
          <Button
            title="登录"
            isDisabled={!username || !password}
            onPress={this._login}
          />
            </View>
            <View style={{width: 80,margin:20}}>
              
          <Button title="注册" onPress={this._register} />
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  loginView: {
    // flex: 1,
    height: 200,
    paddingVertical: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  // textButtonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },

  twoColumnlView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
});
