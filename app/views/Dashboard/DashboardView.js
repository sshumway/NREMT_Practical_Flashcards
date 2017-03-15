import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NetInfo
} from 'react-native';

import getExams from '../../repositories/examsRepository';

class DashboardView extends Component {
  state = {
    exams: [],
    loading: true,
    hasError: false
  };

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

  componentDidMount() {
    getExams().then((exams) => {
      this.setState({
        exams,
        loading: false
      })
    }).catch(() => {
      this.setState({
        loading: false,
        hasError: true
      });
    }).done();
  }

  render() {
    if (this.state.loading || this.state.hasError) {
      const message = this.state.loading ? 'Loading...' : 'Oops, something went wrong loading the exams';
      return (
        <View style={[styles.wrapper, styles.loadingWrapper]}>
          <Text style={styles.loadingText}>{message}</Text>
        </View>
      );
    }

    return (
      <ScrollView style={[styles.wrapper, styles.scrollViewWrapper]} contentInset={{top: 0, bottom: 100}}>
        {this.state.exams.map((exam, idx) => {
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
    paddingTop: 8,
    paddingLeft: 6,
    paddingRight: 6
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 22
  },
  scrollViewWrapper: {
    height: '100%',
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
