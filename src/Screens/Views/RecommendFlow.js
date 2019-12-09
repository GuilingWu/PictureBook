import React, {Component} from 'react';
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
} from 'react-native';
// import styles from '../styles';

import {Dimensions, Platform} from 'react-native';

let {width, height} = Dimensions.get('window');

//引入数据
// let ImageData = require('../../assets/data/recommend.json');
// let jsonURL = 'http://localhost:8081/src/assets/data/recommend.json';
export default class RecommendFlow extends Component {
  static defaultProps = {
    // 轮播图间隔时间
    duration: 2000,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      imageData: null,
    };
    // bind this._fetchData  下面_fetchData回调要用this state赋值
    this._fetchData = this._fetchData.bind(this);
  }
  componentDidMount() {
    this._fetchData();
    this._startTime();
  }
  _fetchData() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(responseJson => {
        // ImageData = responseJson;
        this.setState({
          imageData: responseJson.data,
        });
        if (!this.timer) {
          this._startTime();
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('提示', '=====' + error);
      });
  }
  _startTime() {
    if (!this.state.imageData) {
      return;
    }
    let scrollView = this.scrollView;
    let imageCount = this.state.imageData.length;
    let activePage = 0;
    this.timer = setInterval(() => {
      activePage = (this.state.currentPage + 1) % imageCount;
      this.setState({
        currentPage: activePage,
      });
      let offsetX = activePage * width;
      scrollView.scrollTo({x: offsetX, y: 0, animated: true});
    }, this.props.duration);
  }
  _onScrollBeginDrag() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  _onScrollEndDrag() {
    this._startTime();
  }
  _onAnimationEnd(e) {
    var offsetX = e.nativeEvent.contentOffset.x;
    var currentPage = Math.floor(offsetX / width);
    this.setState({
      currentPage: currentPage,
    });
  }

  _createImages() {
    if (!this.state.imageData) {
      return;
    }
    let allImage = [];
    let imageArrs = this.state.imageData;
    for (var i = 0; i < imageArrs.length; i++) {
      var imageItem = imageArrs[i];
      var imageURL = this.props.url + '/' + imageItem.img;
      let index = i;
      
      allImage.push(
        <TouchableOpacity key={index} onPress={() => this.props.onPress(index)}>
          <Image
            key={index}
            source={{
              uri: imageURL,
            }}
            style={styles.image}
          />
          <Text>{imageItem.title}</Text>
        </TouchableOpacity>,
      );
    }
    return allImage;
  }
  _renderPageIndex() {
    if (!this.state.imageData) {
      return;
    }
    let indicatorArry = [];
    let imageArrs = this.state.imageData;
    var style;
    for (let i = 0; i < imageArrs.length; i++) {
      style =
        i == this.state.currentPage ? {color: 'orange'} : {color: '#e8e8e8'};
      indicatorArry.push(
        <Text key={i} style={[{fontSize: 25, paddingLeft: 5}, style]}>
          •
        </Text>,
      );
    }
    return indicatorArry;
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={sc => {
            this.scrollView = sc;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={e => this._onAnimationEnd(e)}
          onScrollBeginDrag={e => this._onScrollBeginDrag(e)}
          onScrollEndDrag={e => this._onScrollEndDrag(e)}>
          {this._createImages()}
        </ScrollView>
        <View style={styles.pageDotView}>{this._renderPageIndex()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 20,
    marginTop: 5,
  },
  circlateView: {
    marginTop: 20,
    height: 20,
    width: width,
  },
  image: {
    width: width,
    height: 150,
  },
  pageDotView: {
    width: width,
    height: 25,
    backgroundColor: 'red',
    //   position:'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
