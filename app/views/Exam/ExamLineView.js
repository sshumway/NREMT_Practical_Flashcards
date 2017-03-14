import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing
} from 'react-native';

import ExamLineText from './ExamLineText';
import FlipView from '../Animation/FlipView';

class ExamLineView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
  }

  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  _renderFront = () => {
    return (
      <View style={styles.linePosition}>
        <TouchableOpacity onPress={this._flip} style={{backgroundColor: 'black', padding: 8}}>
          <Text style={{fontSize: 18, color: 'white'}}>Flip</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderBack = () => {
     return (
       <View style={styles.linePosition}>
        <TouchableOpacity onPress={this._flip} style={{backgroundColor: 'black', padding: 8}}>
          <Text style={{fontSize: 18, color: 'white'}}>Flip back</Text>
        </TouchableOpacity>
      </View>
    );
    // <ExamLineText {...this.props} />
  }

  render() {
    if (this.props.lineType === 'header' || this.props.lineType === 'note') {
      return (
        <View style={styles.highlightLine}>
          <Text>Some Text</Text>
        </View>
      );
    }

    return (
      <FlipView style={styles.cardContainer}
                front={this._renderFront()}
                back={this._renderBack()}
                isFlipped={this.state.isFlipped}
                flipAxis="x"
                flipEasing={Easing.out(Easing.ease)}
                />
    );
  }
}

const styles = StyleSheet.create({
  lineWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  lineIndicator: {
    flex: 0.05
  },
  highlightLine: {
    backgroundColor: 'lightgray',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  linePosition: {
    backgroundColor: '#81D4FA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    flex: 1
  }
});

ExamLineView.propTypes = {
  lineType: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  points: React.PropTypes.number.isRequired
};

export default ExamLineView;
