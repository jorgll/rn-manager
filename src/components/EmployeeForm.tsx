import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CardSection, Input } from './common'
import { Picker, Text, StyleSheet, View } from 'react-native';
import { employeeUpdate } from '../actions';
import { AppState } from '../../App';

const styles = StyleSheet.create({
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
});

export interface EmployeeFormProps {
    employeeUpdate: (prop: any, value: string) => void;
    name: string;
    phone: string;
    shift: string;
}

interface EmployeeFormState {
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
    employeeUpdate }, dispatch);

class EmployeeForm extends React.Component<EmployeeFormProps, EmployeeFormState> {
    
    constructor(props: EmployeeFormProps) {
        super(props);
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate('name', value )}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-867-5309"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate('phone', value )}
                    />                    
                </CardSection>
                <CardSection>
                    <Text style={styles.pickerLabelStyle}>Shift</Text>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate('shift', value)}
                    >
                        <Picker.Item label="Monday" value="mon" />
                        <Picker.Item label="Tuesday" value="tue" />
                        <Picker.Item label="Wednesday" value="wed" />
                        <Picker.Item label="Thursday" value="thu" />
                        <Picker.Item label="Friday" value="fri" />
                        <Picker.Item label="Saturday" value="sat" />
                        <Picker.Item label="Sunday" value="sun" />
                    </Picker>
                </CardSection>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);