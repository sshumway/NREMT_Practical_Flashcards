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
      <View style={styles.flipMeWrapper}>
        <TouchableOpacity onPress={this._flip} style={{backgroundColor: 'black', padding: 8}}>
          <Text style={{fontSize: 18, color: 'white'}}>Flip</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderBack = () => {
     return (
       <View style={styles.answerWrapper}>
        <TouchableOpacity onPress={this._flip} style={{backgroundColor: 'green', padding: 8}}>
          <ExamLineText {...this.props} />
        </TouchableOpacity>
      </View>
    );
    // <Text style={{fontSize: 18, color: 'white'}}>Flip back</Text>
  }

  render() {
    if (this.props.lineType === 'header' || this.props.lineType === 'note') {
      return (
        <View style={styles.highlightLine}>
          <ExamLineText {...this.props} />
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
  lineIndicator: {
    flex: 0.05
  },
  highlightLine: {
    backgroundColor: 'lightgray',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  flipMeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81D4FA'
  },
  answerWrapper: {
    flex: 1,
    backgroundColor: '#81D4FA',
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  cardContainer: {
    height: 100
  }
});

ExamLineView.propTypes = {
  lineType: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  points: React.PropTypes.number.isRequired
};

export default ExamLineView;
