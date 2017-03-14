import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import ExamLineView from './ExamLineView';
import exams from '../../data/exams';

class ExamView extends Component {
  static navigationOptions = {
    title: ({ state }) => exams.find((exam) => exam.examID === state.params.exam).shortTitle,
    header: {
      style: {
        backgroundColor: '#15396a'
      },
      titleStyle: {
        color: 'white'
      },
      tintColor: 'white'
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    const exam = exams.find((exam) => exam.examID === params.exam);
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{exam.title}</Text>
        </View>
        <ScrollView style={styles.scrollView} contentInset={{top: 0, bottom: 100}}>
          {exam.steps.map((step, idx) => {
            return (
                <ExamLineView key={idx} {...step} />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    fontSize: 22,
    paddingTop: 8,
    paddingBottom: 0
  },
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginLeft: 6,
    marginRight: 6
  },
  scrollView: {
    paddingTop: 8,
    paddingLeft: 6,
    paddingRight: 6
  }
});

export default ExamView;
