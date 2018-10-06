import * as React from 'react';
import { StyleSheet, Text, Modal, View } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const styles = StyleSheet.create({
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
});

export interface ConfirmProps {
    children?: any;
    onAccept: () => void;
    onDecline: () => void;
    visible: boolean;
}

export class Confirm extends React.Component<ConfirmProps> {
    constructor(props: ConfirmProps) {
        super(props);
    }

    render() {
        if (!this.props.children) { return null; }
        return (
            <Modal
                visible={this.props.visible}
                transparent
                animationType="slide"
                onRequestClose={() => {}}
            >
                <View style={styles.containerStyle}>
                    <CardSection>
                        <Text style={styles.textStyle}>
                            {this.props.children}
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.props.onAccept}>
                            Yes
                        </Button>
                        <Button onPress={this.props.onDecline}>
                            No
                        </Button>
                    </CardSection>
                </View>
            </Modal>
        );
    }
}