import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';

export default class IconButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selected: false,
      iconIndex: 0,
    };
  }

  setSelected(selected) {
    console.log('=======setSelected===' + selected);

    // this.setState( {
    //   selected: selected,
    // });
    this.setState({
      // selected:!this.state.selected,
      iconIndex: selected % (this.props.images.length),
    });
  }
  updateIcon() {
    this.setState({
      // selected:!this.state.selected,
      iconIndex:
        (this.state.iconIndex + 1) % (this.props.images.length),
    });
  }

  render() {
    const {images, onPress, style} = this.props;
    this.iconCount = images.length;
    
    return (
      <TouchableOpacity
        style={{margin: 5, width: 50, height: 50}}
        onPress={() => {
          this.setState({
            // selected: !this.state.selected,
            iconIndex: (this.state.iconIndex + 1) % this.iconCount,
          });

          onPress();
        }}>
        <Image source={images[this.state.iconIndex]} style={style} />
      </TouchableOpacity>
    );
  }
}
