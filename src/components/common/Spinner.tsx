import * as React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export interface SpinnerProps {
    size?: number | 'small' | 'large';
}

export class Spinner extends React.Component<SpinnerProps> {
    constructor(props: SpinnerProps) {
        super(props);
    }

    render() {
        return (
        <View style={styles.containerStyle}>
            <ActivityIndicator
                size={this.props.size || 'large'}
            />
        </View>
        );
    }
}