import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CardSection, Card, Button } from './common'
import { employeeCreate } from '../actions';
import { AppState } from '../../App';
import EmployeeForm from './EmployeeForm';

export interface EmployeeCreateProps {
    employeeCreate: (name: string, phone: string, shift: string) => void;
    name: string;
    phone: string;
    shift: string;
}

interface EmployeeCreateState {
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
    employeeCreate 
}, dispatch);

class EmployeeCreate extends React.Component<EmployeeCreateProps, EmployeeCreateState> {
    
    constructor(props: EmployeeCreateProps) {
        super(props);
    }

    onButtonPress(): void {
        this.props.employeeCreate(this.props.name, this.props.phone, this.props.shift || 'mon');
    }

    render() {
        return (
            <Card>
                <EmployeeForm { ...this.props }/>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
                </CardSection>
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);