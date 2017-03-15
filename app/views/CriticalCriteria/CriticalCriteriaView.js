import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native';

const CriticalCriteriaView = (nav) => {
  let exam = nav.navigation.state.params.exam;
  let criticalCriteria = exam.criticalCriteria;
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        {criticalCriteria.map((cc, idx) => {
          return (
            <View key={idx} style={styles.row}>
              <Text style={[styles.text, styles.bullet]}>•</Text>
              <Text style={styles.text}>{cc}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  bullet: {
    flex: 0.05
  },
  text: {
    flex: 0.95,
    fontSize: 16,
    paddingTop: 6,
    paddingBottom: 6
  }
});

export default CriticalCriteriaView;
