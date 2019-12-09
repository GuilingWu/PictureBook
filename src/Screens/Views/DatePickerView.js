import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, View, Text, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {px2dp} from '../../Utils/DeviceUtil';

export default class DatePickerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      avatarSource: null,
    };
  }

  show = () => {
    this.setState({visible: true});
  };
  hide = () => {
    this.setState({visible: false});
  };

  _cancel() {
    this.hide();
  }
  _choose() {
    this.props.onChoose(this._date);
    this.hide();
  }
  render() {
    return (
      <View>
        <Modal
          styles={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          visible={this.state.visible}
          animationType={this.props.animationType}
          transparent={true}
          onRequestClose={() => this.setState({visible: false})}>
          {/* <View style={styles.alertBackground}> */}
          <TouchableHighlight
            style={styles.alertBackground}
            onPress={() => this._cancel()}>
            <View style={styles.alertBox}>
              <View style={styles.buttonRow}>
                <TouchableHighlight
                  underlayColor={'#F5F5F5'}
                  onPress={()=>this._cancel()}>
                  <Text style={styles.modalItem}>{this.props.cancel}</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'#F5F5F5'}
                  onPress={()=>this._choose()}>
                  <Text style={styles.modalItem}>{this.props.choose}</Text>
                </TouchableHighlight>
              </View>

              <DateTimePicker
                style={styles.dateTimePicker}
                mode="date"
                value={new Date()}
                maximumDate={new Date()}
                minimumDate={new Date(1900)}
                onChange={(event, date) => {
                  this._date = date.toString();
                }}
              />
            </View>
          </TouchableHighlight>
          {/* </View> */}
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  alertBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 如果要遮罩要显示成半透明状态，这里一定要设置，reba中的a控制透明度，取值在 0.0 ～ 1.0 范围内。
  },

  alertBox: {
    width: px2dp(500),
    height: px2dp(300),
    backgroundColor: 'white',
    bottom: px2dp(100),
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: px2dp(18),
    paddingVertical: px2dp(10),
    paddingLeft: px2dp(10),
  },
  modalItem: {
    fontSize: px2dp(16),
    // paddingVertical: px2dp(10),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
  },
  dateTimePicker: {
    width: px2dp(300),
    alignSelf: 'center',
    bottom: px2dp(20),
  },
});
