import Login from './pages/login';
import Invite from './pages/invite';
import Student from './pages/student';

export const routes = [
  {
    path: '/stud',
    name: 'Student',
    component: Student,
  },
  {
    path: '/invite',
    name: 'Invite',
    component: Invite,
    isPrivate: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Main',
    component: Login,
    isExact: true,
  },
];
