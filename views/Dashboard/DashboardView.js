import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

class DashboardView extends Component {
  static navigationOptions = {
    title: 'Exams'
  };

  showExam(exam) {
    this.props.navigation.navigate('Exam', { exam: exam });
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.showExam.bind(this, "trauma")}>
          <Text>Patient Assessment/Management - Trauma</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "medical")}>
          <Text>Patient Assessment/Management - Medical</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "bvm")}>
          <Text>BVM Ventilation Of An Apneic Adult Patient</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "oxygen")}>
          <Text>Oxygen Administration By Non-Rebreather Mask</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "seatedSpine")}>
          <Text>Spinal Immobilization (Seated Patient)</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "supineSpine")}>
          <Text>Spinal Immobilization (Supine Patient)</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "bleeding")}>
          <Text>Bleeding Control/Shock Management</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "cardiac")}>
          <Text>Cardiac Arrest Management/AED</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "joint")}>
          <Text>Joint Immobilization</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.showExam.bind(this, "longBone")}>
          <Text>Long Bone Immobilization</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default DashboardView;
