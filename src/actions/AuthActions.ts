import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Dispatch } from 'redux';
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const emailChanged = (text: string) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text: string) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: LOGIN_USER });

        // Sign in user with provided email and password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                // If that fails, create a new account with the same email and password
                console.error('Outer firebase error: ' + error);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch((error) => {
                        console.error('Inner firebase error: ' + error);
                        loginUserFail(dispatch, error.toString());   
                    });
            });
    };
};

const loginUserSuccess = (dispatch: Dispatch, user: any) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    Actions.main();
}

const loginUserFail = (dispatch: Dispatch, error: string) => {
    dispatch({ type: LOGIN_USER_FAIL, payload: error });
}