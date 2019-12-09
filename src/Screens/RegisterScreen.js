import React, {Component} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';

import TextField from '../Components/TextField';
import Request from '../Utils/RequestUtil';
import * as NavigationUtil from '../Utils/NavigationUtil';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this._register = this._register.bind(this);
  }

  _register() {
    const {username, password} = this.state;
    if (username == '' || password == '') {
      Alert.alert('用户名和密码不能为空');
      return;
    }

    // const self = this;
    Request({
      method: 'POST',
      url: 'register',
      data: {username, password},
    })
      .then(() => {
        Alert.alert('注册成功');
        NavigationUtil.pop(this.props.navigation);
        // this.props.navigation.back();
      })
      .catch(error => {
        Alert.alert('注册失败', error.message || error);
      });
  }

  render() {
    const {username, password} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.registerView}>
          <TextField
            label="用户名"
            placeholder="请设置用户名"
            onChange={value => {
              this.setState({
                username: value,
              });
            }}
          />
          <TextField
            label="密码"
            placeholder="请设置密码"
            type="password"
            onChange={value => {
              this.setState({
                password: value,
              });
            }}
          />
          <Button
            title="注册"
            isDisabled={!username || !password}
            onPress={this._register}
          />
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
  registerView: {
    // flex: 1,
    height: 400,
    paddingVertical: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 16,
    // backgroundColor: '#fff',
  },
  //   textButtonContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //   },
});
