import { StackNavigator } from 'react-navigation';
import DashboardView from '../Dashboard/DashboardView';
import ExamView from '../Exam/ExamView';
import CriticalCriteriaView from '../CriticalCriteria/CriticalCriteriaView';

const Navigator = StackNavigator({
  Dashboard: { screen: DashboardView },
  Exam: { screen: ExamView },
  CriticalCriteria: {
    screen: CriticalCriteriaView,
    navigationOptions: {
      title: "Critical Criteria",
      headerStyle: {
        backgroundColor: '#15396a'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: 'white'
    }
  }
});

export default Navigator;
