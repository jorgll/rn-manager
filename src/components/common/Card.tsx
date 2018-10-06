import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 100,
    }
});

export interface CardProps {
    children: any;
}

export class Card extends React.Component<CardProps> {
    
    constructor(props: CardProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                {this.props.children}
            </View>
        );
    }
};
