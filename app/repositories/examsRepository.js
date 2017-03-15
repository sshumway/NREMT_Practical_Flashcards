import defaultExamData from '../../data/exams';
import defaultExamsVersion from '../../data/version';
import { examDataUrl, versionUrl } from '../constants';
import store from '../store';

const {
  loadExamsVersion,
  loadExams,
  updateExamsVersion,
  updateExams
} = store;

const repo = {
  needsInitialSetup: async function() {
    try {
      const storedVersion = await loadExamsVersion();
      console.log('needsInitialSetup version: ' + storedVersion + ' | ' + storedVersion.version);
      return !storedVersion || !storedVersion.version || storedVersion.version <= 0;
    } catch (error) {
      return true;
    }
  },
  fetchExamsVersion: async function() {
    try {
      let response = await fetch(versionUrl);
      if (response.ok) {
        let newVersion = await response.json();
        console.log('fetchExamsVersion version: ' + newVersion.version);
        return newVersion;
      }
      throw('fetchExamsVersion failed');
    } catch (error) {
      throw(error);
    }
  },
  checkForUpdate: async function() {
    try {
      const needsInitialSetup = await repo.needsInitialSetup();
      console.log('needsInitialSetup: ' + needsInitialSetup);
      let currentVersion = null;
      if (needsInitialSetup) {
        currentVersion = defaultExamsVersion;
        await updateExamsVersion(defaultExamsVersion);
        await updateExams(defaultExamData);
      }
      if (!currentVersion) {
        currentVersion = await loadExamsVersion();
      }
      console.log('currentVersion2: ' + currentVersion + ' | ' + currentVersion.version);
      const newVersion = await repo.fetchExamsVersion();
      console.log('newVersion1: ' + newVersion + ' | ' + newVersion.version);
      const needsUpdate = newVersion && newVersion.version && currentVersion.version !== newVersion.version;
      console.log('needsUpdate: ' + needsUpdate);
      return {
        needsUpdate,
        version: newVersion
      };
    } catch(error) {
      return {
        needsUpdate: false,
        version: -1
      };
    }
  },
  fetchExams: async function() {
    try {
      console.log('fetching exams');
      let response = await fetch(examDataUrl);
      if (response.ok) {
        return await response.json();
      }
      throw('fetchExams failed');
    } catch(error) {
      throw(error);
    }
  }
};

export default async function getExams() {
  let exams = null;

  try {
    const needsUpdate = await repo.checkForUpdate();
    let updateSuccess = false;
    if (needsUpdate.needsUpdate) {
      console.log('needs update was true');
      const newExams = await repo.fetchExams();
      if (newExams && newExams.length) {
        updateSuccess = await updateExams(newExams);
        await updateExamsVersion(needsUpdate.version);
        exams = newExams;
      }
    }

    if (!needsUpdate.needsUpdate || (needsUpdate.needsUpdate && !updateSuccess)) {
      exams = await loadExams();
      console.log('needs update was false ' + exams.length);
    }

    if (!exams && !exams.length) {
      console.log('no exams');
      exams = defaultExamData;
    }

    return exams;
  } catch(error) {
    return defaultExamData;
  }
}
