import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import ExamLineView from './ExamLineView';
import data from '../../data/data';

class ExamView extends Component {
  static navigationOptions = {
    title: ({ state }) => data[state.params.exam].shortTitle,
  };

  render() {
    const { params } = this.props.navigation.state;
    const exam = data[params.exam];
    return (
      <View>
        <Text style={styles.title}>{exam.title}</Text>
        <ScrollView style={styles.scrollView} contentInset={{top: 0, bottom: 100}}>
          {exam.steps.map((step, idx) => {
            return (<ExamLineView key={idx} {...step}></ExamLineView>);
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    paddingTop: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8
  },
  scrollView: {
    paddingTop: 8,
    paddingLeft: 6,
    paddingRight: 6
  }
});

export default ExamView;
