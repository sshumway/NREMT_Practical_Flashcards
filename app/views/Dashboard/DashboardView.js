import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

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

  showExam(exam) {
    this.props.navigation.navigate('Exam', { exam: exam });
  }

  render() {
    return (
      <ScrollView style={styles.wrapper} contentInset={{top: 0, bottom: 100}}>
        <TouchableOpacity onPress={this.showExam.bind(this, "trauma")} style={styles.borderBottom}>
          <Text style={styles.examLink}>Patient Assessment/Management - Trauma</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "medical")} style={styles.borderBottom}>
          <Text style={styles.examLink}>Patient Assessment/Management - Medical</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "bvm")} style={styles.borderBottom}>
          <Text style={styles.examLink}>BVM Ventilation Of An Apneic Adult Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "oxygen")} style={styles.borderBottom}>
          <Text style={styles.examLink}>Oxygen Administration By Non-Rebreather Mask</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "seatedSpine")} style={styles.borderBottom}>
          <Text style={styles.examLink}>Spinal Immobilization (Seated Patient)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "supineSpine")} style={styles.borderBottom}>
          <Text style={styles.examLink}>Spinal Immobilization (Supine Patient)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "bleeding")} style={styles.borderBottom}>
          <Text style={styles.examLink}>Bleeding Control/Shock Management</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "cardiac")} style={styles.borderBottom}>
          <Text style={styles.examLink}>Cardiac Arrest Management/AED</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "joint")} style={styles.borderBottom}>
          <Text style={styles.examLink}>Joint Immobilization</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showExam.bind(this, "longBone")}>
          <Text style={styles.examLink}>Long Bone Immobilization</Text>
        </TouchableOpacity>
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
