import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { height } from 'react-native-dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Textinput from '../../Components/Textinput/Textinput';
import Style from './Style';
import Button from '../../Components/Button/Button';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../../Service/Auth';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
const { container, headingtext, buttonStyle, register } = Style;

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassowrd: '',
      spinner: false
    };
  }
  validation = () => {
    if (this.state.username === "") {
      alert("Please Enter Your Username")
    }
    else if (reg.test(this.state.email) === false) {
      alert("Please Enter Valid Email Address")
    }
    else if (this.state.password.length < 6) {
      alert("Password lenght must be grater then 6")
    }
    else if (this.state.confirmPassowrd !== this.state.password) {
      alert("Your Password dose not match")
    }
    else {
      {
        this.makeRequest()
      }
    }
  }
  makeRequest = () => {
    const { navigation } = this.props;

    this.setState({
      spinner: true
    })

    axios({
      method: 'post',
      url: 'http://68.183.48.101:3333/users/register',
      data:
      {
        "username": this.state.username, "email": this.state.email, "password": this.state.password
      }

    }).then(async resposne => {
      console.log("response", resposne);
      console.log("succeess", resposne.data.meta.status);
      console.log("Status-code", resposne.status);
      if (resposne.data.meta.status === "ok") {

        await AsyncStorage.setItem('@Token', resposne.data.data.token.token);
        await AsyncStorage.setItem('@User', JSON.stringify(resposne.data.data.user))
        this.setState({
          spinner: false
        })
        navigation.navigate('homescreen')
      }
      else if (resposne.meta.status === "fail") {
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Oops!', resposne.data.meta.message);
        }, 1000);
      }


    }).catch((error) => {
      console.log("Error", error.resposne)
    })

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[container]}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
          <View style={{ height: '20%' }}>
            <Text style={[headingtext]}> SIGN UP</Text>
          </View>
          <View>
            <Textinput
              value={this.state.username}

              Title="Enter Username"
              onChangeText={(text) => this.setState({ username: text })}
            />
            <Textinput
              value={this.state.email}
              KeyBoardType="email-address"
              Title="Enter Email"
              onChangeText={(text) => this.setState({ email: text })}
            />
            <Textinput
              value={this.state.password}
              Title="Enter Password"
              SecureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <Textinput
              value={this.state.confirmPassowrd}
              Title="Enter Confirm Password"
              SecureTextEntry={true}
              onChangeText={(text) => this.setState({ confirmPassowrd: text })}
            />
          </View>
          <View style={{ height: '40%', marginTop: height(10), width: '100%' }}>
            <Button Buttontext="SignUp" onclick={() => this.validation()} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
