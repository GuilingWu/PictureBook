import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

export default class TextButton extends Component {
  render() {
    const {
      iconImage,
      text,
      textColor,
      onPress,
      style,
      bgColor,
      column,
    } = this.props;
    return (
      <TouchableOpacity
        style={[style, {margin: 10, backgroundColor: bgColor}]}
        onPress={onPress}>
        {iconImage ? (
          <View style={column ? styles.twoRowView : styles.twoColView}>
            {/* {iconImage} */}

            <Image
                source={iconImage.source}
                style={iconImage.style}
              />
            <Text style={{color: textColor, margin: 6}}>{text}</Text>
          </View>
        ) : (
          <Text style={{color: textColor, margin: 6}}>{text}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  twoColView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  twoRowView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
});
