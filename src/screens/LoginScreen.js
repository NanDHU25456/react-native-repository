import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null
        }
    }
    componentDidMount() {
        this.initAsync()
    }

    initAsync = async () => {
        try {
            await GoogleSignIn.initAsync({
                // You may ommit the clientId when the firebase `googleServicesFile` is configured
                clientId: '157984067676-9g5fsl5bndol29jg0rhi4ph9v39jot5s.apps.googleusercontent.com',
            });
            this._syncUserWithStateAsync();
        } catch (error) {
            alert(JSON.stringify(error))
        }
    };

    _syncUserWithStateAsync = async () => {
        try {
            const user = await GoogleSignIn.signInSilentlyAsync();
            console.log("User From SIGN IN ", user)
            this.setState({ user });
        } catch (error) {
            alert(JSON.stringify(error))
        }
    };

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.setState({ user: null });
    };

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                this._syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this.signInAsync}>Login</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});