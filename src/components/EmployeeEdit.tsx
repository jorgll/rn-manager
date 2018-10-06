import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CardSection, Card, Button, Confirm } from './common'
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { AppState } from '../../App';
import EmployeeForm from './EmployeeForm';
import Communications from 'react-native-communications';

export interface EmployeeEditProps {
    employeeUpdate: any;
    employeeSave: any;
    employeeDelete: any;
    employee: any;
    name: string;
    phone: string;
    shift: string;
}

interface EmployeeEditState {
    isModalVisible: boolean;
}

const mapStateToProps = (state: AppState) => {
    if (!state.employeeForm) return {};
    
    return {
        name: state.employeeForm.name,
        phone: state.employeeForm.phone,
        shift: state.employeeForm.shift,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    employeeUpdate, 
    employeeSave,
    employeeDelete
}, dispatch);


class EmployeeEdit extends React.Component<EmployeeEditProps, EmployeeEditState> {

    constructor(props: EmployeeEditProps) {
        super(props);
        this.state = { isModalVisible: false };
    }

    componentWillMount(): void {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate(prop, value);
        });
    }

    onSavePress(): void {
        this.props.employeeSave(
            this.props.name, 
            this.props.phone, 
            this.props.shift, 
            this.props.employee.uid);
    }

    onTextPress(): void {
        Communications.text(
            this.props.phone, 
            `Your upcoming shift is on ${this.props.shift}`);
    }

    onTerminatePress(): void {
        this.setState({isModalVisible: true});
    }

    onModalConfirm(): void {
        this.props.employeeDelete(this.props.employee.uid);
    }

    onModalCancel(): void {
        this.setState({isModalVisible: false});
    }

    render () {
        return (
            <Card>
                <EmployeeForm { ...this.props }/>
                <CardSection>
                    <Button onPress={this.onSavePress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onTerminatePress.bind(this)}>
                        Terminate
                    </Button>
                </CardSection>

                <Confirm
                    onAccept={this.onModalConfirm.bind(this)}
                    onDecline={this.onModalCancel.bind(this)}
                    visible={this.state.isModalVisible}
                >
                    Are you sure you want to terminate employee?
                </Confirm>
            </Card>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);