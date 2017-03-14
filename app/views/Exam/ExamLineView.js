import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import ExamLineText from './ExamLineText';

class ExamLineView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLine: true//this.props.lineType === 'header' || this.props.lineType === 'note'
    };
  }

  changeLineVisibility() {
    this.setState({ showLine: !this.state.showLine });
  }

  render() {
    let line = this.props.lineType === 'header' || this.props.lineType === 'note'
      ? (<View style={styles.highlightLine}>
          <ExamLineText {...this.props} />
        </View>)
      : (<TouchableOpacity onPress={this.changeLineVisibility.bind(this)}>
          <View style={styles.lineWrapper}>
            <Text style={styles.lineIndicator}>►</Text>
            {this.state.showLine && <ExamLineText {...this.props} />}
          </View>
        </TouchableOpacity>);

    return (
      <View>
        {line}
      </View>
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
    backgroundColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray'
  }
});

ExamLineView.propTypes = {
  lineType: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  points: React.PropTypes.number.isRequired
};

export default ExamLineView;
