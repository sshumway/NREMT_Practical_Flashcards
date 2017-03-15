import { AsyncStorage } from 'react-native';
import { oneUpdateIntervalAgo } from '../helpers/dateHelpers';

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
    return {
      version: -1
    };
  }
}

export async function loadDateLastUpdated() {
  try {
    const lastUpdateDate = await AsyncStorage.getItem('@NREMTPracticalFlashcards:lastUpdateDate');
    if (!lastUpdateDate) {
      return oneUpdateIntervalAgo();
    }
    return new Date(JSON.parse(lastUpdateDate));
  } catch (error) {
    return oneUpdateIntervalAgo();
  }
}

export async function saveExams(exams) {
  try {
    await AsyncStorage.setItem('@NREMTPracticalFlashcards:exams', JSON.stringify(exams));
    return true;
  } catch(error) {
    return false;
  }
}

export async function saveExamsVersion(version) {
  try {
    await AsyncStorage.setItem('@NREMTPracticalFlashcards:version', JSON.stringify(version));
    return true;
  } catch(error) {
    return false;
  }
}

export async function saveDateLastUpdated(date) {
  try {
    await AsyncStorage.setItem('@NREMTPracticalFlashcards:lastUpdateDate', JSON.stringify(date));
    return true;
  } catch (error) {
    return false;
  }
}
