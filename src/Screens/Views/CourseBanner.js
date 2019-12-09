import React, {Component} from 'react';
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
// import styles from '../styles';

export default class CourseBanner extends Component {
  constructor(props) {
    super(props);
    // this.props = {
    //   title: '课程名',
    //   startDate: 'xx日开课',
    //   discount: '新用户立减',
    //   tip: '',
    //   price: 0,
    //   type: 0, //0体验课 1系统课
    //   num: 0,
    //   maxNum: 0,
    // };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('selected ' + this.props.title);
          }}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{this.props.title} </Text>
          </View>
          <View style={styles.tipView}>
            <Text style={styles.tipText}>{this.props.startDate}开课 </Text>
            <Text style={styles.tipText}>{this.props.tip} </Text>
          </View>
          <View style={styles.discountView}>
            <Text style={styles.discountText}>{this.props.discount} </Text>
          </View>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>¥{this.props.discountPrice} </Text>
            {/* <Text style={styles.detailText}>¥{this.props.price} </Text> */}
            <Text style={styles.detailText}>{this.props.detail} </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:500,
    margin: 8,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#eeeeee',
    borderWidth: 1,
    // borderBottomWidth:10,
    borderRadius: 20,
  },
  titleView: {
    flexDirection: 'row',
    // height: 50,
    paddingLeft: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    fontWeight: 'bold',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  tipView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#27b5ee',
  },
  tipText: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
  },
  discountView: {
    width: 130,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 18,
  },
  discountText: {
    color: 'red',
    fontSize: 13,
    textAlign: 'center',
    backgroundColor: 'orange',
  },
  priceView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: -10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    color: 'red',
    fontSize: 30,
    textAlign: 'center',
  },
  // detailView: {
  //   flexDirection: 'row',
  //   paddingLeft: 10,
  //   paddingTop: 5,
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   // backgroundColor: '#27b5ee',
  // },
  detailText: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
  },
});
