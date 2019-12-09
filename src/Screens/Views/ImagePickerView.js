import React, {Component} from 'react';
import {
  Alert,
  TouchableHighlight,
  StyleSheet,
  Image,
  View,
  Text,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {width, height, scale, px2dp} from '../../Utils/DeviceUtil';

export default class ImagePickerView extends Component {
  constructor(props) {
    super(props);
    // this.props = {
    //   animationType: null, //string none:无  /silde：从底部  /fade：淡入淡出
    //   transparent: true, //是否默认半透明
    //   onRequestClose: null,
    // };
    this.state = {
      visible: false,
      avatarSource: null,
    };
    this._openCamera = this._openCamera.bind(this);
    this._openPicker = this._openPicker.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onRequestClose = this._onRequestClose.bind(this);
    // this._saveImage = this._saveImage.bind(this);
  }
  show() {
    this.setState({
      visible: true,
    });
  }
  _onRequestClose() {
    this.props.onRequestClose(this.state.avatarSource);
  }
  _openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this._saveImage(image);
    });
  }
  _openPicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this._saveImage(image);
    });
  }
  _closeModal() {
    this.setState({
      visible: false,
    });
  }
  _saveImage(image) {
    // let source = {uri: image.path};

    this.setState({
      avatarSource: image,
    });
    this._closeModal();
    this._onRequestClose(image);
  }
  render() {
    return (
      <View>
        <Modal
          visible={this.state.visible}
          //   visible={true}
          animationType={this.props.animationType}
          transparent={this.props.transparent}
          onRequestClose={() => this.setState({visible: false})}>
          <View style={styles.alertBackground}>
            <View style={styles.alertBox}>
              <Text style={styles.modalTitle}>请选择</Text>
              <TouchableHighlight
                underlayColor={'#F5F5F5'}
                onPress={this._openCamera}>
                <Text style={styles.modalItem}>打开相机</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'#F5F5F5'}
                onPress={this._openPicker}>
                <Text style={styles.modalItem}>打开相册</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'#F5F5F5'}
                onPress={this._closeModal}>
                <Text style={styles.modalItem}>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
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
    width: px2dp(300),
    height: px2dp(175),
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: px2dp(18),
    paddingVertical: px2dp(10),
    paddingLeft: px2dp(10),
  },
  modalItem: {
    fontSize: px2dp(14),
    paddingVertical: px2dp(10),
    paddingLeft: px2dp(10),
  },
});
