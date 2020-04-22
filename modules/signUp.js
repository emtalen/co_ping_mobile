import axios from "axios"
import JtockAuth from "j-tockauth"
import { SIGN_UP, AUTHENTICATE } from "../state/actions/actionTypes"

const auth = new JtockAuth({
  host: "https://co-ping.herokuapp.com",
})

const sendCommunityCode = async (code, dispatch) => {
  let response = await axios.get("https://co-ping.herokuapp.com/communities/", {
    params: {
      q: code,
    },
  })
  if (response.data.community_id) {
    dispatch({
      type: SIGN_UP,
      payload: {
        communityId: response.data.community_id,
      },
    })
  } else {
    dispatch({
      type: SIGN_UP,
      payload: {
        codeErrorMessage: response.data.message,
      },
    })
  }
}

// const sendSignUp = async (email, password, passwordConfirmation, dispatch) => {
//   try {
//     debugger
//     event.preventDefault()
//     let response = await auth.signUp(email, password, passwordConfirmation)
//     debugger
//     dispatch({
//       type: AUTHENTICATE,
//       payload: {
//         authenticated: true,
//         userId: response.data.id
//       },
//     })
//   } catch (error) {
//     let errorMessage = error.response.data.errors[0]
//     dispatch({ type: AUTHENTICATE, payload: { loginMessage: errorMessage } })
//   }
// }

// const sendSignUp = async (
//   // name,
//   email,
//   password,
//   passwordConfirmation,
//   // communityId,
//   // phoneNumber,
//   // address,
//   dispatch
// ) => {
//   try {
//     event.preventDefault()
//     debugger
//     let signUpResponse = await auth.signUp(
//       email,
//       password,
//       passwordConfirmation
//     )
//     debugger
//     dispatch({
//       type: AUTHENTICATE,
//       payload: {
//         authenticated: true,
//         userEmail: signUpResponse.data.email,
//         userName: signUpResponse.data.name,
//         userId: signUpResponse.data.id,
//       },
//     })
//   } catch (error) {
//     let errorMessage = error.response.data.errors[0]
//     dispatch({ type: AUTHENTICATE, payload: { signupMessage: errorMessage } })
//   }

const sendSignUp = async (
  name,
  email,
  password,
  passwordConfirmation,
  communityId,
  phoneNumber,
  address,
  dispatch
) => {
  debugger
  try {
    let response = await auth.signUp(
      {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        community_id: communityId,
        phone_number: phoneNumber,
        address: address,
        name: name,
      },
      { "Access-Control-Allow-Origin": "*" }
    )
    debugger
    dispatch({
      type: AUTHENTICATE,
      payload: {
        authenticated: true,
        userEmail: response.data.data.email,
        userName: response.data.data.name,
        userId: response.data.data.id,
        loginMessage: `Welcome ${response.data.data.name}`,
        logoutMessage: "",
        showLoginForm: false,
        communityId: response.data.data.community_id,
        communityStatus: response.data.data.community_status,
      },
    })
    debugger
  } catch (error) {
    let errorMessage = error.response.data.errors[0]
    dispatch({ type: AUTHENTICATE, payload: { signupMessage: errorMessage } })
  }
}

export { sendCommunityCode, sendSignUp }
