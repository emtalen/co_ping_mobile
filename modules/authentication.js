import JtockAuth from "j-tockauth";
import { AUTHENTICATE, LOGOUT } from "../state/actions/actionTypes";

const auth = new JtockAuth({
  host: "https://co-ping.herokuapp.com",
});

const onLogin = async (email, password, dispatch) => {
  try {
    event.preventDefault();
    let response = await auth.signIn(email, password);
    dispatch({
      type: AUTHENTICATE,
      payload: {
        authenticated: true,
        userEmail: response.data.email,
        userName: response.data.name,
        userId: response.data.id,
        loginMessage: `Welcome ${response.data.name}`,
        logoutMessage: "",
        showLoginForm: false,
        communityId: response.data.community_id,
        communityStatus: response.data.community_status,
      },
    });
  } catch (error) {
    let errorMessage = error.response.data.errors[0];
    dispatch({ type: AUTHENTICATE, payload: { loginMessage: errorMessage } });
  }
};

const onLogout = (dispatch) => {
  auth.signOut().then(() => {
    dispatch({
      type: LOGOUT,
      payload: {
        authenticated: false,
        userEmail: null,
        userName: null,
        logoutMessage: "Hasta la vista!",
        loginMessage: "",
      },
    });
  });
};

export { onLogin, onLogout };
