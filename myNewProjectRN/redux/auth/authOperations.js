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
  ({ login, email, password }, image) =>
  async (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: image,
        }).then(() => {
          const { uid, displayName, photoURL } = user;
          console.log("photoURL", photoURL);
          console.log("uid, displayName", uid, displayName);
          dispatch(
            updateUserProfile({
              userId: uid,
              login: displayName,
              avatar: photoURL,
            })
          );
          console.log(user);
        });
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
          avatar: user.photoURL,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
