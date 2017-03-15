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
      showLine: this.props.lineType === 'header' || this.props.lineType === 'note'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceShow != null && nextProps.forceShow !== this.props.showAll && !(this.props.lineType === 'header' || this.props.lineType === 'note')) {
      this.setState({ showLine: nextProps.forceShow });
    }
  }

  _changeLineVisibility = () => {
    this.setState({ showLine: !this.state.showLine });
  }

  render() {
    const showIt = this.state.forceShow;
    const please = this.props.forceShow;
    if (this.props.lineType === 'header' || this.props.lineType === 'note') {
      return (
        <View style={styles.highlightLine}>
          <ExamLineText {...this.props} />
        </View>
      );
    }
    const lineText = this.state.showLine
      ? <ExamLineText {...this.props} />
      : <Text style={styles.showText}>Show</Text>;
    return (
      <TouchableOpacity onPress={this._changeLineVisibility}>
        {lineText}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  highlightLine: {
    backgroundColor: 'lightgray',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  showText: {
    fontSize: 18,
    paddingBottom: 16,
    paddingTop: 16,
    color: 'gray',
    textAlign: 'center'
  }
});

ExamLineView.propTypes = {
  lineType: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  points: React.PropTypes.number.isRequired,
  forceShow: React.PropTypes.bool
};

export default ExamLineView;
