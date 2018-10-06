import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { AppState } from '../../App';

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        paddingTop: 20
    }
});

export interface LoginFormProps {
    emailChanged: (text: string) => void;
    passwordChanged: (text: string) => void;
    loginUser: (email: string, password: string) => void;
    email: string;
    password: string;
    error: string;
    loading: boolean;
}

interface LoginFormState {
}

const mapStateToProps = (state: AppState) => {
    if (!state.auth) return {};

    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    emailChanged, passwordChanged, loginUser }, dispatch);

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    constructor(props: LoginFormProps) {
        super(props);
    }

    onEmailChange(text: string) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text: string) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        this.props.loginUser(this.props.email, this.props.password);
    }

    renderError()  {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
        else { 
            return;
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size='large' />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@email.com"
                        label="Email"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="password"
                        label="Password"
                        isSecure
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);