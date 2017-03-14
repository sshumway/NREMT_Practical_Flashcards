import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import exams from '../../../data/exams';

class DashboardView extends Component {
  static navigationOptions = {
    title: 'Exams',
    header: {
      style: {
        backgroundColor: '#15396a'
      },
      titleStyle: {
        color: 'white'
      }
    }
  };

  _showExam(examID) {
    this.props.navigation.navigate('Exam', { examID });
  }

  render() {
    return (
      <ScrollView style={styles.wrapper} contentInset={{top: 0, bottom: 100}}>
        {exams.map((exam, idx) => {
          return (
            <TouchableOpacity key={idx} onPress={this._showExam.bind(this, exam.examID)} style={styles.borderBottom}>
              <Text style={styles.examLink}>{exam.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 8,
    paddingLeft: 6,
    paddingRight: 6
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },
  examLink: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  }
});

export default DashboardView;
