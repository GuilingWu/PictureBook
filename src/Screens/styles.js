import {StyleSheet} from 'react-native';
import {Dimensions, Platform} from 'react-native';
import {width, height, scale, px2dp} from '../Utils/DeviceUtil';

// let {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  fullScreen: {
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    // width: width,
    // height: height,
    backgroundColor: 'white',
    // transform: [
    //   {translateX: -width * 0.5},
    //   {translateY: -height * 0.5},
    //   {scale: scale},
    //   {translateX: width * 0.5},
    //   {translateY: height * 0.5},
    // ],
  },
  titleView: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#27b5ee',
  },
  titleText: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  titleText2: {
    color: 'black',
    fontSize: 24,
    paddingLeft: 10,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  twoColCounselView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  conselButton: {
    flexDirection: 'row',
    // height: 50,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    // borderWidth:1,
    borderRadius: 10,
    backgroundColor: '#fbfbfb',
  },
  conselText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    // fontWeight: 'bold'
  },
  meSectionView: {
    flex: 1,
    // borderWidth:5,
    marginBottom: 10,
  },
  meBannerView: {
    flex: width,
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meBannerIcon: {
    marginLeft: 10,
    height: 30,
    width: 30,
  },
  meBannerTitle: {
    paddingLeft: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  meBannerTip: {
    marginRight: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  meBannerNextIcon: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  userDefault: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  userView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  userImage: {
    height: px2dp(100),
    width: px2dp(100),
    borderRadius: 85,
  },
  userInfoTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: px2dp(20),
    fontWeight: 'bold',
  },
  userInfoText: {
    color: 'black',
    textAlign: 'center',
    fontSize: px2dp(16),
    marginVertical: px2dp(15),
  },
  tabIcon: {
    width: px2dp(40),
    height: px2dp(40),
  },
  edit: {
    // flex: 1,
    fontSize: px2dp(17),
    height: px2dp(50),
  },
});

export default styles;
