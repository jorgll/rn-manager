import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center', // center vertically
        alignItems: 'center', // center horizontally
        height: 100,
        paddingTop: 40,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
    },
    textStyle: {
        fontSize: 30
    }
});

export interface HeaderProps {
    headerText: string
}

export class Header extends React.Component<HeaderProps> {
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{this.props.headerText}</Text>
        </View>
        );
    }
}
  