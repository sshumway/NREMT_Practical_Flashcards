import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Navigator from './app/views/Navigator/NavigatorView';

export default class NREMT_Practical_Flashcards extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}

AppRegistry.registerComponent('NREMT_Practical_Flashcards', () => NREMT_Practical_Flashcards);
