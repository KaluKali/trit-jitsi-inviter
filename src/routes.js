import Login from './pages/login';
import InvitePage from './pages/invitePage';

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/invite',
    name: 'InvitePage',
    component: InvitePage,
    isPrivate: true
  }
];
