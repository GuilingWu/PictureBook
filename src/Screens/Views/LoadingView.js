import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

export default class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show() {
    this.setState({show: true});
  }
  hide() {
    this.setState({show: false});
  }

  render() {
    if (this.state.show) {
        return (
            <View style={styles.loadingContainer}>
                <View style={this.styles.loadingView}>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={{ marginLeft: 10,color:"#FFF",marginTop:10 }}>正在加载...</Text>
                </View>
            </View>
        );
    } else {
        return <View />
    }
  }
}

const styles = StyleSheet.create({
    loadingContainer: {
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0)",
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingView: {
        width: 100,
        height: 100,
        backgroundColor: "rgba(0,0,0,0.6)",
        opacity: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:7
    }
};