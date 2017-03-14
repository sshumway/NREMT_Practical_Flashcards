import { StackNavigator } from 'react-navigation';
import DashboardView from '../Dashboard/DashboardView';
import ExamView from '../Exam/ExamView';

const Navigator = StackNavigator({
  Dashboard: { screen: DashboardView },
  Exam: { screen: ExamView }
});

export default Navigator;
