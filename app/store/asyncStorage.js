import { AsyncStorage } from 'react-native';

export async function loadExams() {
  try {
    const examJson = await AsyncStorage.getItem('@NREMTPracticalFlashcards:exams');
    if (!examJson) {
      return [];
    }
    return JSON.parse(examJson);
  } catch(error) {
    return [];
  }
}

export async function loadExamsVersion() {
  try {
    const versionJson = await AsyncStorage.getItem('@NREMTPracticalFlashcards:version');
    if (!versionJson) {
      return {
        version: -1
      };
    }
    return JSON.parse(versionJson);
  } catch(error) {
    return "";
  }
}

export async function updateExams(exams) {
  try {
    await AsyncStorage.setItem('@NREMTPracticalFlashcards:exams', JSON.stringify(exams));
    return true;
  } catch(error) {
    return false;
  }
}

export async function updateExamsVersion(version) {
  try {
    await AsyncStorage.setItem('@NREMTPracticalFlashcards:version', JSON.stringify(version));
    return true;
  } catch(error) {
    return false;
  }
}
