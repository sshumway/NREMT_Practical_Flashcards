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
      return storedVersion == null || storedVersion <= 0;
    } catch (error) {
      return true;
    }
  },
  fetchExamsVersion: async function() {
    try {
      let response = await fetch(versionUrl);
      return response.json();
    } catch (error) {
      return defaultExamsVersion;
    }
  },
  checkForUpdate: async function() {
    try {
      const needsInitialSetup = await repo.needsInitialSetup();
      let currentVersion = null;
      if (needsInitialSetup) {
        currentVersion = defaultExamsVersion;
        await updateExamsVersion(defaultExamsVersion);
        await updateExams(defaultExamData);
      }

      currentVersion = currentVersion || await loadExamsVersion();
      const newVersion = await repo.fetchExamsVersion();
      const needsUpdate = newVersion && currentVersion !== newVersion;
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
      let response = await fetch(examDataUrl);
      return await response.json();
    } catch(error) {
      return [];
    }
  }
};

export default async function getExams() {
  let exams = null;

  try {
    const needsUpdate = await repo.checkForUpdate();
    let updateSuccess = false;
    if (needsUpdate.needsUpdate) {
      const newExams = await repo.fetchExams();
      if (newExams && newExams.length) {
        updateSuccess = await updateExams(newExams);
        await updateExamsVersion(needsUpdate.version);
        exams = newExams;
      }
    }

    if (!needsUpdate.needsUpdate || (needsUpdate.needsUpdate && !updateSuccess)) {
      exams = await getExams();
    }

    if (!exams && !exams.length) {
      exams = defaultExamData;
    }

    return exams;
  } catch(error) {
    return defaultExamData;
  }
}
