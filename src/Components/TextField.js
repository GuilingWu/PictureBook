import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {width, height, scale, px2dp} from '../Utils/DeviceUtil';

export default class TextField extends Component {
  render() {
    const {label, placeholder, type, onChange} = this.props;
    return (
      <View style={styles.textField}>
        <Text style={styles.label}> {label} </Text>
        <TextInput
          style={styles.edit}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={true}
          placeholder={placeholder}
          secureTextEntry={type === 'password'}
          keyboardType="ascii-capable"
          selectTextOnFocus={false}
          onChangeText={onChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    height: px2dp(60),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: px2dp(17),
    width: px2dp(85),
    paddingVertical: px2dp(2),
  },
  edit: {
    flex: 1,
    fontSize: px2dp(17),
    height: px2dp(50),
  },
});
