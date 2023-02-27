import db from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authRegistration =
  ({ login, email, password }) =>
  async (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: login,
        }).then(() => {
          const { uid, displayName } = user;
          console.log("uid, displayName", uid, displayName);
          dispatch(
            updateUserProfile({
              userId: uid,
              login: displayName,
            })
          );
          console.log(user);
        });
        // user.updateProfile({ displayName: login });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

export const authLogin =
  ({ email, password }) =>
  async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
export const authSignOutUser = () => async (dispatch) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  await getAuth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
