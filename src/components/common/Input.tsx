import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
      height: 40,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
  },
  labelStyle: {
      fontSize: 18,
      paddingLeft: 20,
      flex: 1
  },
  inputStyle: {
      color: '#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 18,
      lineHeight: 23,
      flex: 2
  }
});

export interface InputProps {
    label: string;
    value?: string;
    onChangeText?: any;
    placeholder: string;
    isSecure?: boolean;
}

export class Input extends React.Component<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{this.props.label}</Text>
            <TextInput 
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={this.props.isSecure}
                placeholder={this.props.placeholder}
                style={styles.inputStyle}
                value={this.props.value}
                onChangeText={this.props.onChangeText}
            />
        </View>
        );
    }
}