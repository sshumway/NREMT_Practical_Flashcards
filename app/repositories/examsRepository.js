import defaultExamData from '../../data/exams';
import defaultExamsVersion from '../../data/version';
import { examDataUrl, versionUrl } from '../constants';
import store from '../store';
import { oneUpdateIntervalAgo, updateIntervalExceeded } from '../helpers/dateHelpers';

const {
  loadExamsVersion,
  loadExams,
  loadDateLastUpdated,
  saveExamsVersion,
  saveExams,
  saveDateLastUpdated
} = store;

const repo = {
  isTimeForUpdateCheck: async function() {
    const lastUpdate = await loadDateLastUpdated();
    const isUpdateIntervalExceeded = updateIntervalExceeded(lastUpdate);

    return isUpdateIntervalExceeded;
  },

  needsInitialSetup: async function() {
    try {
      const storedVersion = await loadExamsVersion();

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

      let currentVersion = null;

      if (needsInitialSetup) {
        currentVersion = defaultExamsVersion;
        await saveExamsVersion(defaultExamsVersion);
        await saveExams(defaultExamData);
      }

      if (!currentVersion) {
        currentVersion = await loadExamsVersion();
      }

      const isTimeForUpdateCheck = await repo.isTimeForUpdateCheck();
      if (isTimeForUpdateCheck) {
        await saveDateLastUpdated(new Date());

        const newVersion = await repo.fetchExamsVersion();
        const needsUpdate = newVersion && newVersion.version && currentVersion.version !== newVersion.version;

        return {
          needsUpdate,
          version: newVersion
        };
      }

      return {
        needsUpdate: false,
        version: currentVersion
      };
    } catch(error) {
      return {
        needsUpdate: false,
        version: { version: -1 }
      };
    }
  },

  fetchExams: async function() {
    try {
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
      const newExams = await repo.fetchExams();

      if (newExams && newExams.length) {
        updateSuccess = await saveExams(newExams) && await saveExamsVersion(needsUpdate.version);

        if (!updateSuccess) {
          await saveDateLastUpdated(oneUpdateIntervalAgo());
        }

        exams = newExams;
      }
    }

    if (!needsUpdate.needsUpdate || (needsUpdate.needsUpdate && !updateSuccess)) {
      exams = await loadExams();
    }

    if (!exams && !exams.length) {
      exams = defaultExamData;
    }

    return exams;
  } catch(error) {
    return defaultExamData;
  }
}
