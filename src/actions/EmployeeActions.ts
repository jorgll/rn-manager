import { Dispatch } from 'redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMPLOYEE_UPDATE, 
    EMPLOYEE_CREATE, 
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEES_FETCH_SUCCESS 
} from './types';

export const employeeUpdate = (prop: string, value: string) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = (name: string, phone: string, shift: string) => {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
        console.error ('CurrentUser is null!');
        return;
    }
    return (dispatch: Dispatch) => {  
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.employeeList({ type: 'reset' });
            });
    };
};

export const employeesFetch = () => {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
        console.error ('CurrentUser is null!');
        return;
    }
    return (dispatch: Dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const employeeSave = (name: string, phone: string, shift: string, uid: string) => {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
        console.error ('CurrentUser is null!');
        return;
    }
    return (dispatch: Dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift})
            .then(() => {
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                Actions.employeeList({ type: 'reset' });
            });
    };
};

export const employeeDelete = (uid: string) => {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
        console.error ('CurrentUser is null!');
        return;
    }
    return (dispatch: Dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                Actions.employeeList({ type: 'reset' });
            });
    };
};