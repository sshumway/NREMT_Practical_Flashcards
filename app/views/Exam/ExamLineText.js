import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const ExamLineText = ({lineType, text, points}) => {
  let lineStyle = styles.normalLine;
  if (lineType === 'header' || lineType === 'note') {
    lineStyle = [styles.highlightLine, styles[lineType]];
  }
  return (
    <View style={styles.textWrapper}>
      {lineType === 'sub' && <View style={styles.indent}></View>}
      <Text style={lineStyle}>{text}</Text>
      {points > 0 && <Text style={[lineStyle, styles.points]}>{points}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  indent: {
    flex: 0.1
  },
  points: {
    flex: 0.1,
    textAlign: 'right'
  },
  normalLine: {
    flex: 0.8,
    fontSize: 18
  },
  highlightLine: {
    paddingLeft: 4,
    paddingRight: 4
  },
  header: {
    fontSize: 22
  },
  note: {
    fontSize: 18
  }
});

ExamLineText.propTypes = {
  lineType: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  points: React.PropTypes.number.isRequired
};

export default ExamLineText;
