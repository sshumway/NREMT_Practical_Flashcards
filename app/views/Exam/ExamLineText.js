import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const ExamLineText = ({lineType, text, points}) => {
  const lineStyle = lineType === 'header' || lineType === 'note' ? styles.bigLine : styles.normalLine;
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
  bigLine: {
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 26,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray'
  }
});

ExamLineText.propTypes = {
  lineType: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  points: React.PropTypes.number.isRequired
};

export default ExamLineText;
