import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const ExamLineText = ({lineType, text, points}) => {
  return (
    <View style={styles.wrapper}>
      {lineType === 'sub' && <View style={styles.indent}></View>}
      <Text style={[styles.text, styles[lineType]]}>{text}</Text>
      {points > 0 && <Text style={[styles.points, styles[lineType]]}>{points}</Text>}
    </View>
  );
};

class ExamLineView extends Component {
  constructor(props) {
    super(props);
    this.state = { showLine: this.props.lineType === 'header' || this.props.lineType === 'note' };
  }

  changeLineVisibility() {
    this.state.showLine = !this.state.showLine;
  }

  render() {
    let line = this.props.lineType === 'header' || this.props.lineType === 'note'
      ? <ExamLineText {...this.props} />
      : (<TouchableHighlight onPress={this.changeLineVisibility.bind(this)}>
          <View>
            {this.state.showLine && <ExamLineText {...this.props} />}
          </View>
        </TouchableHighlight>);

    return (
      <View>
        {line}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  indent: {
    flex: 1
  },
  text: {
    flex: 6
  },
  points: {
    flex: 1,
    textAlign: 'right',
  },
  header: {
    fontSize: 26,
    backgroundColor: 'gray',
  },
  note: {
    fontSize: 26,
    backgroundColor: 'gray',
  },
  default: {
    fontSize: 18
  },
  sub: {
    fontSize: 18
  }
});

ExamLineView.propTypes = {
  lineType: React.PropTypes.string,
  text: React.PropTypes.string,
  points: React.PropTypes.number
};

export default ExamLineView;
