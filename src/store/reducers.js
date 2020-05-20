import { AUTHORIZATION_SUCCESS, AUTHORIZATION_FAIL, CLICK_JITSI_PRIVATE_LINK } from './actionTypes';

const auth = (state = false, action) => {
  switch (action.type) {
    case AUTHORIZATION_SUCCESS:
      return action.payload;
    case CLICK_JITSI_PRIVATE_LINK:// если изменяемые данные "action.payload" вернуть обратно - со страницы кикать не будет тк dispatcher оставил state нетронутым
    case AUTHORIZATION_FAIL:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};

export default auth;
