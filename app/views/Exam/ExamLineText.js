import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const ExamLineText = ({lineType, text, points}) => {
  let lineStyle = lineType === 'header' || lineType === 'note' ? styles.highlightLine : styles.normalLine;

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
    paddingTop: 16,
    paddingBottom: 16
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
    paddingRight: 4,
    fontSize: 18
  }
});

ExamLineText.propTypes = {
  lineType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired
};

export default ExamLineText;
