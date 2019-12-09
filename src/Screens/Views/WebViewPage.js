/**
 * 触摸事件
 */
import React, {Component} from 'react';
import {
  NativeModules,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';

let WEBVIEW_REF = 'webview';

export default class WebViewPage extends Component {
  constructor(props){
    super(props);
    this.state={
      textMsg :''
    };
  }
  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar hidden={false} />
        <WebView
          ref={WEBVIEW_REF}
          source={{
            uri: this.props.navigation.state.params.url
          }}
          // onMessage={this.props.navigation.state.params.onMessage}
          onMessage={
            (event)=>{
              this.props.navigation.state.params.onMessage(event.nativeEvent.data)
  //             this.setState({
  //               textMsg :'==='+event.nativeEvent.data
  //             })
  //  if (event.nativeEvent.data) {
  //   const res = JSON.parse(event.nativeEvent.data)
  //   //接收h5返回的1009状态码  rn做出对应的提示
  //  if (res === 1009) {
  //             Alert.alert('===1009=='+event.nativeEvent.data);
  //  }else{

    // Alert.alert('===_=='+event.nativeEvent.data);
    // this.props.navigation.state.params.onMessage;
  //  }
  // }
            }
          }
          onLoad={() => {
              //  var data = { token: this.props.navigation.state.params.token }
               var data = { token: 'token_test',id:'id_test' }
                //h5加载完后 向H5发送一些上传图片需要的其它字段比如token  id等等
                this.refs.webview.postMessage(JSON.stringify(data));
           }}
          // startInLoadingState={true}
          // domStorageEnabled={true}
          // javaScriptEnabled={true}
          // automaticallyAdjustContentInsets={true}


    allowFileAccess={true}//是否允许访问系统文件
    startInLoadingState={true}
    scalesPageToFit={true}
    scrollEnabled={false}
    allowsInlineMediaPlayback={true}
    allowsFullscreenVideo={true}
    originWhitelist={['*']}
        />
      </View>
    );
  }
}
