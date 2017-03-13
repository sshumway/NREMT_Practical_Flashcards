import React, { Component } from 'react';
import {
  View,
  Text,
  Stylesheet,
  TouchableHighlight
} from 'react-native';

class DashboardView extends Component {
  static navigationOptions = {
    title: 'Exams'
  };

  showExam() {
    this.props.navigation.navigate('Exam');
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.showExam.bind(this)}>
          <Text>Patient Assessment/Management - Trauma</Text>
        </TouchableHighlight>
        <Text>Patient Assessment/Management - Medical</Text>
        <Text>BVM Ventilation Of An Apneic Adult Patient</Text>
        <Text>Oxygen Administration By Non-Rebreather Mask</Text>
        <Text>Spinal Immobilization (Seated Patient)</Text>
        <Text>Spinal Immobilization (Supine Patient)</Text>
        <Text>Bleeding Control/Shock Management</Text>
        <Text>Cardian Arrest Management/AED</Text>
        <Text>Joint Immobilization</Text>
        <Text>Long Bone Immobilization</Text>
      </View>
    );
  }
}

export default DashboardView;
