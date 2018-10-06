import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    }
});

export interface ButtonProps {
    onPress?: any;
    children?: any;
}

export class Button extends React.Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }
    
    render() {
        return (
        <TouchableOpacity onPress={this.props.onPress} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>
                {this.props.children}
            </Text>
        </TouchableOpacity>
        );
    }
}
