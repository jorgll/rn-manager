import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
});

export interface EmployeeListItemProps {
    employee: any;
}

export default class EmployeeListItem extends React.Component<EmployeeListItemProps> {
    constructor(props: EmployeeListItemProps) {
        super(props);
    }
    
    onRowPress() {
        Actions.employeeEdit({ 
            employee: this.props.employee
        });    }

    render() {
        const { name } = this.props.employee;
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle} >
                            {name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}