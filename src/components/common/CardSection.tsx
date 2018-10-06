import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
    }
});

export interface CardSectionProps {
    children?: any;
}

export class CardSection extends React.Component<CardSectionProps> {
    
    constructor(props: CardSectionProps) {
        super(props);
    }

    render() {
        if (!this.props.children) { return null; }
        return (
            <View style={styles.containerStyle}>
                {this.props.children}
            </View>
        );
    }
};
