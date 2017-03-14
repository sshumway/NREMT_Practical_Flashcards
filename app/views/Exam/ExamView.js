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
    title: ({ state }) => exams.find((ex) => ex.examID === state.params.examID).shortTitle,
    header: ({ state, setParams }) => ({
      right: (
        <Button
          title={'CC'}
          onPress={() => setParams({editing: state.params.editing ? false : true})}
        />
      ),
      style: {
        backgroundColor: '#15396a'
      },
      titleStyle: {
        color: 'white'
      },
      tintColor: 'white'
    })
  };

  constructor(props) {
    super(props);
    this.state = { showAll: false }
  }

  _showAll = () => {
    this.setState({ showAll: true });
  }

  _hideAll = () => {
    this.setState({ showAll: false });
  }

  render() {
    const { params } = this.props.navigation.state;
    const exam = exams.find((ex) => ex.examID === params.examID);

    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{exam.title}</Text>
        </View>
        <ScrollView style={styles.scrollView} contentInset={{top: 0, bottom: 10}}>
          {exam.steps.map((step, idx) =>
            <ExamLineView key={idx} forceShow={this.state.showAll} {...step} />
          )}
        </ScrollView>
        <View style={styles.buttonContainerWrapper}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={this._showAll} title="Show All" color="#15396a" />
          <Button style={styles.button} onPress={this._hideAll} title="Hide All" color="#15396a" />
        </View>
        </View>
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
    paddingBottom: 8
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
  },
  buttonContainerWrapper: {
    height: 40,
    borderTopWidth: 1,
    borderTopColor: 'lightgray'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    flex: 0.5,
    padding: 8
  }
});

export default ExamView;
