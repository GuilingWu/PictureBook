/**
 * 触摸事件
 */
import React, {Component} from 'react';
import {
  NativeModules,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  View,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {TextInput} from 'react-native-gesture-handler';
import * as DeviceUtil from '../../Utils/DeviceUtil';
import TextButton from '../../Components/TextButton';
import {getUserInfo} from '../../Utils/UserData';
import URLUtil from '../../Utils/URLUtil';
import Request, {paramsSerializer} from '../../Utils/RequestUtil';

let WEBVIEW_REF = 'webview';

export default class WebViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textMsg: '',
      textFocus: false,
      inputText: '',
    };
  }
  _comment() {
    if (!this.state.inputText) {
      return;
      // Alert.alert(`user:${getUserInfo().name}=id=${getUserInfo().id}==send==${this.state.inputText}`);
    }

    let formData = new FormData();
    // if (userData.newPath && userData.newPath != '') {
    let file = {
      // uri: userData.newPath,
      uri:
        'http://img1.imgtn.bdimg.com/it/u=2018939532,1617516463&fm=26&gp=0.jpg',
      type: 'multipart/form-data',
      name: 'image.png',
    }; // file 中这三个元素缺一不可。 type 必须为 multipart/form-data。

    formData.append('img', file);
    //   saveImage = true;
    // }
    // formData.append('user', {
    //   name: getUserInfo().name,
    //   id: getUserInfo().id,
    //   topicId: 1,
    //   message: this.state.inputText,
    // });
    formData.append('name', getUserInfo().name);
    formData.append('id', getUserInfo().id);
    formData.append('topicId', 1);
    formData.append('message', this.state.inputText);

    let url = URLUtil('comment');
    
    // console.log('formdata', JSON.stringify(formData));
    fetch(url, {
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'multipart/form-data',
      //   // Accept: 'application/json;charset=utf-8',
      //   // 'Content-Type': 'application/json;charset=utf-8',
      // },
      body: formData,
    })
    .then(response => {
      // isOk = !!response.ok;

      // Alert.alert('response.ok'+response.json());
      return response.json();
    })
      .then(json=> {
        Alert.alert('发表评论成功');
      })
      .catch(error => {
        Alert.alert('===', error.message || error);
      });

    // Request({
    //   method: 'POST',
    //   url: 'comment',
    //   data: {
    //     name: getUserInfo().name,
    //     id: getUserInfo().id,
    //     topicId: 1,
    //     message: this.state.inputText},
    // })
    //   .then(data => {
    //     Alert.alert('发表评论成功');
    //   })
    //   .catch(error => {
    //     Alert.alert('发表评论失败', error.message || error);
    //   });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={false} />
        <WebView
          ref={WEBVIEW_REF}
          source={{
            // uri: this.props.url,
            uri: this.props.navigation.state.params.url,
            // uri:'http://192.168.5.28:8888/test/topic/topic1/topic.html'
          }}
          // onMessage={this.props.navigation.state.params.onMessage}
          onMessage={event => {
            //             this.setState({
            //               textMsg :'==='+event.nativeEvent.data
            //             })
            //  if (event.nativeEvent.data) {
            //   const res = JSON.parse(event.nativeEvent.data)
            //   //接收h5返回的1009状态码  rn做出对应的提示
            //  if (res === 1009) {
            //             Alert.alert('===1009=='+event.nativeEvent.data);
            //  }else{

            Alert.alert('===_==' + event.nativeEvent.data);
            // this.props.navigation.state.params.onMessage;
            //  }
            // }
          }}
          onLoad={() => {
            //  var data = { token: this.props.navigation.state.params.token }
            var data = {token: 'token_test', id: 'id_test'};
            //h5加载完后 向H5发送一些上传图片需要的其它字段比如token  id等等
            this.refs.webview.postMessage(JSON.stringify(data));
          }}
          // startInLoadingState={true}
          // domStorageEnabled={true}
          // javaScriptEnabled={true}
          // automaticallyAdjustContentInsets={true}

          allowFileAccess={true} //是否允许访问系统文件
          startInLoadingState={true}
          scalesPageToFit={true}
          // scrollEnabled={false}
          allowsInlineMediaPlayback={true}
          allowsFullscreenVideo={true}
          originWhitelist={['*']}
        />
        <View
          style={{
            height: this.state.textFocus ? 480 : 50,
            width: DeviceUtil.winWidth,
            position: 'absolute',
            // justifyContent: 'center',
            // alignItems: 'center',
            paddingHorizontal: 10,
            paddingTop: 5,
            bottom: 0,
            backgroundColor: 'white',
          }}>
          {this.state.textFocus ? (
            <View
              style={{
                // flex: 1,
                width: DeviceUtil.winWidth - 20,
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'space-between',
                alignItems: 'center',
                // bottom: 0,
                // backgroundColor: 'white',
                marginTop: -10,
                // backgroundColor:'red',
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('src/assets/images/icons/image-outline.png')}
              />
              <TextButton
                // style={{alignSelf:'flex-end', marginLeft: 10}}
                text="发送"
                textColor={this.state.inputText ? 'black' : 'gray'}
                onPress={() => {
                  this._comment();
                }}
              />
            </View>
          ) : (
            <View />
          )}
          <TextInput
            style={{
              width: DeviceUtil.winWidth - 20,
              height: this.state.textFocus ? 90 : 40,
              textAlign: 'left',
              textAlignVertical: this.state.textFocus?'top':'center',
              // margin: 10,
              backgroundColor: '#ededed',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#eaeaea',
              position: 'relative',
            }}
            multiline={true}
            placeholder="  说点什么..."
            placeholderTextColor="red"
            onFocus={() =>
              this.setState({
                textFocus: true,
              })
            }
            onBlur={() =>
              this.setState({
                textFocus: false,
              })
            }
            onChangeText={text =>
              this.setState({
                inputText: text,
              })
            }/>

        </View> 
      </View>
    );
  }
}

{/* <Image
style={{width:30,height:30}}
  source={require('src/assets/images/icons/image-outline.png')}
/>
<Text style={{color:'gray'}}>说点什么...</Text> */} 