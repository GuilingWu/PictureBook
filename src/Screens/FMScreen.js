import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  findNodeHandle,
  Platform,
  Slider,
  Animated,
  Easing,
} from 'react-native';
import Video from 'react-native-video';
import URLUtil from '../Utils/URLUtil';
import * as Paths from '../Configs/PathConfig';
import {storage, userData, saveUser} from '../Utils/StorageUtil';
import * as DeviceUtil from '../Utils/DeviceUtil';

import {VibrancyView, BlurView} from 'react-native-blur';
import IconButton from '../Components/IconButton';

const AudioPlayMode = {
  normal: 0,
  singleRepeat: 1,
  random: 2,
};
export default class Course extends Component {
  static navigationOptions = {
    tabBarLabel: 'FM频道',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../assets/images/icons/course.png')}
        style={[styles.tabIcon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      musicInfo: null,
      viewRef: null,
      paused: false,
      duration: 0,
      slideValue: 0,
      currentTime: 0,
      currentIndex: 0,
      playeMode: AudioPlayMode.normal,
      spinValue: new Animated.Value(0),
      fadeValue: new Animated.Value(0),
      playIcon: '',
      playeModeIcon: '',
      sharedModalVisible: false,
    };
    this.isRotate = false;
    this.isSlide = true;
    this.spinAnimated = Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 6000,
      easing: Easing.inOut(Easing.linear),
    });
    this.fadeAnimated = Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    });
    Animated.sequence();
    this.firstTime = true;
    userData(result => {
      this.userId = result.id;
    });
    // bind this._fetchData  下面_fetchData回调要用this state赋值
    // this._fetchData = this._fetchData.bind(this);
  }
  componentDidMount() {
    this._getMusicInfo();
    this._spin();
    this.fadeAnimated.start();
  }
  componentWillUnmount() {
    this.isRotate = false;
  }
  _getMusicInfo() {
    fetch(URLUtil(Paths.musicPath))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          musicInfo: responseJson.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  _spinRepeate() {
    if (this.isRotate) {
      console.log('=======_spinRepeate===');
      // this.state.spinValue.setValue(0);
      // this.spinAnimated.start(() => {
      //   this._spinRepeate();
      // });
      Animated.loop(this.spinAnimated).start(() => {
        console.log('=======_spinRepeate end===');
        this.state.spinValue.setValue(0);
      });
    }
  }
  _spin() {
    console.log('=======spin===');
    this.isRotate = !this.isRotate;
    if (this.isRotate) {
      this.spinAnimated.start(() => {
        console.log('=======start callback===');
        if (this.firstTime) {
        } else {
          this.spinAnimated = Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear),
          });
        }
        this._spinRepeate();
      });
      console.log('==========');

      // if (this.firstTime) {
      // } else {
      //   this.spinAnimated = Animated.timing(this.state.spinValue, {
      //     toValue: 1,
      //     duration: 6000,
      //     easing: Easing.inOut(Easing.linear),
      //   });
      // }
      // this._spinRepeate();
    } else {
      this.state.spinValue.stopAnimation(oneTimeRotate => {
        this.spinAnimated = Animated.timing(this.state.spinValue, {
          toValue: 1,
          duration: (1 - oneTimeRotate) * 6000,
          easing: Easing.inOut(Easing.linear),
        });
      });
    }
  }
  _imageLoaded() {
    this.setState({
      viewRef: findNodeHandle(this.backgroundImage),
    });
  }
  _onUpdatePlayMode() {
    this.setState({
      playeMode: (this.state.playeMode + 1) % 3,
    });
    this.playModeIcon.updateIcon();
  }
  _onPlaySong() {
    this.firstTime = false;
    this._spin();
    this.setState({
      paused: !this.state.paused,
    });
  }
  _onNextSong() {
    let currentIndex = this.state.currentIndex;
    console.log('=====this.state.playeMode=='+this.state.playeMode);
    console.log('=====curindex=='+currentIndex);
    if(this.state.playeMode==AudioPlayMode.random){
      currentIndex += Math.floor(Math.random()*(this.state.musicInfo.length-1)+1);
    }else{
      currentIndex++;
    }
    if (currentIndex >= this.state.musicInfo.length) {
      currentIndex = 0;
    }
    console.log('=====curindex22=='+currentIndex);
    this._resetSong(currentIndex);
  }
  _onPreSong() {
    let currentIndex = this.state.currentIndex;
    console.log('=====curindex=='+currentIndex);
    
    if(this.state.playeMode==AudioPlayMode.random){
      currentIndex = Math.random()*(this.state.musicInfo.length-1);
    }else{
      currentIndex--;
    }
    if (currentIndex < 0) {
      currentIndex = this.state.musicInfo.length + currentIndex;
    }
    console.log('=====curindex2=='+currentIndex);
    this._resetSong(currentIndex);
  }
  _resetSong(currentIndex) {
    // this.props.resetMusicInfo();
    this.setState({
      currentIndex: currentIndex,
      currentTime: 0.0,
      slideValue: 0.0,
    });
    if (this.state.paused) {
      this._onPlaySong();
      console.log('=======setSelected===');
      this.playerBtn.setSelected(false);
    }
  }
  _loadStart() {}
  _onEnd() {
    console.log('=======_onEnd===');
    this._onNextSong();
  }
  _setTime(data) {
    if (this.isSlide) return;
    let slideValue = parseInt(this.state.currentTime);
    this.setState({
      slideValue: slideValue,
      currentTime: data.currentTime,
    });
  }
  _setDuration(data) {
    this.setState({
      duration: data.duration,
    });
  }
  _onBuffer() {}
  _onTimedMetadata() {}
  _videoError() {}
  _renderPlayer() {
    let musicInfo = this.state.musicInfo;
    if (!musicInfo) return;
    // console.log(
    //   '====musicInfo[this.state.currentIndex]==' +
    //     musicInfo[this.state.currentIndex],
    // );

    // console.log(
    //   '========' +
    //     URLUtil(Paths.musicPath) +
    //     '/' +
    //     musicInfo[this.state.currentIndex].audio,
    // );

    return (
      <View style={styles.bgContainer}>
        <Video
          source={{uri: URLUtil(musicInfo[this.state.currentIndex].audio)}} // Can be a URL or a local file
          ref={ref => {
            this.player = ref;
          }} // Store reference
          rate={1.0} // 0 is paused, 1 is normal.
          volume={1.0} // 0 is muted, 1 is normal.
          muted={false} // Mutes the audio entirely.
          paused={this.state.paused} // Pauses playback entirely.
          resizeMode="cover" // Fill the whole screen at aspect ratio.*
          repeat={false} // Repeat forever.
          playInBackground={false} // Audio continues to play when app entering background.
          playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown.
          ignoreSilentSwitch={'ignore'} // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
          progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
          onLoadStart={this._loadStart} // Callback when video starts to load
          onLoad={data => this._setDuration(data)} // Callback when video loads
          onProgress={data => this._setTime(data)} // Callback every ~250ms with currentTime
          onEnd={this._onEnd.bind(this)} // Callback when playback finishes
          onError={data => this._videoError(data)} // Callback when video cannot be loaded
          onBuffer={this._onBuffer} // Callback when remote video is buffering
          onTimedMetadata={this._onTimedMetadata} // Callback when the stream receive some metadata
        />

        {/* <View style={styles.navBar}>
<View style={styles.navBarContent}>
  <TouchableOpacity style={{margin:5}} onPress={()=>Actions}>
  </View>
  </View> */}
        <Animated.Image
          style={[
            styles.coverImage,
            {
              opacity: this.state.fadeValue,
              transform: [
                {
                  // 利用 interpolate 方法将数值 0~1 映射到了 0deg~360deg
                  rotate: this.state.spinValue.interpolate({
                    inputRange: [0, 1], // [0,0.5,1]改成这样会有不同的效果
                    outputRange: ['0deg', '360deg'], //  ['0deg', '360deg','0deg']改成这样会有不同的效果，
                  }),
                },
              ],
            },
          ]}
          source={{uri: URLUtil(`test/user/${this.userId}.png`)}}
        />
        <View>
          <Slider
            style={styles.slider}
            value={this.state.slideValue}
            maximumValue={this.state.duration}
            minimumTrackTintColor={'white'}
            maximumTrackTintColor={'gray'}
            step={1}
            onValueChange={value => {
              this.setState({currentTime: value});
              this.isSlide = true;
            }}
            onSlidingComplete={value => {
              this.player.seek(value);
              this.isSlide = false;
            }}
          />
        </View>
        <View style={styles.playModelBtn}>
          <IconButton
          ref={value=>this.playModeIcon=value}
            style={{width: 50, height: 50}}
            images={[
              Paths.musicRepeatImage,
              Paths.musicRepeatSingleImage,
              Paths.musicRandomImage,
            ]}
            onPress={this._onUpdatePlayMode.bind(this)}
          />
        </View>
        <View style={styles.toolBar}>
          <IconButton
            style={{width: 50, height: 50}}
            // normal={Paths.musicPreImage}
            images={[Paths.musicPreImage]}
            onPress={this._onPreSong.bind(this)}
          />
          <IconButton
            ref={ref => {
              this.playerBtn = ref;
            }}
            style={{width: 50, height: 50}}
            images={[Paths.musicPlayImage, Paths.musicPauseImage]}
            // normal={Paths.musicPlayImage}
            // highlight={Paths.musicPauseImage}
            onPress={this._onPlaySong.bind(this)}
          />
          <IconButton
            style={{width: 50, height: 50}}
            // normal={Paths.musicNextImage}
            images={[Paths.musicNextImage]}
            onPress={this._onNextSong.bind(this)}
          />
        </View>
        {/* </View> */}
      </View>
    );
  }
  render() {
    const data = this.state.musicInfo;

    return (
      <View style={{flex: 1, backgroundColor: 'green'}}>
        {data && data.length && data[this.state.currentIndex].url ? (
          <View style={styles.container}>
            <Image
              ref={img => {
                this.backgroundImage = img;
              }}
              style={styles.absolute}
              source={{uri: URLUtil(data[this.state.currentIndex].url)}}
              resizeMode="cover"
              onLoadEnd={this._imageLoaded.bind(this)}
            />
            {this.state.viewRef ? (
              <View style={styles.bgContainer}>
                {Platform.OS === 'ios' ? (
                  <VibrancyView
                    blurType="light"
                    blurAmount={20}
                    style={styles.container}
                  />
                ) : (
                  <BlurView
                    style={styles.absolute}
                    viewRef={this.state.viewRef}
                    blurType="light"
                    blurAmount={10}
                  />
                )}
              </View>
            ) : (
              <View />
            )}
            {this._renderPlayer()}
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: DeviceUtil.winWidth,
    height: DeviceUtil.winHeigth - 80,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  coverImage: {
    width: 170,
    height: 170,
    borderRadius: 85,
    // top:50,
  },
  toolBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    // marginHorizontal: 100,
    // paddingTop:50,
    bottom: 30,
    position: 'absolute',

    // backgroundColor: 'green',
  },
  playModelBtn: {
    left: 10,
    bottom: 30,
    position: 'absolute',
  },
  slider: {
    marginHorizontal: 5,
    width: 260,
    top: 50,
  },
});
