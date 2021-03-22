import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ListView from '../../Components/ListView/ListView';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ContactPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      spinner: false,
      count: 1,
      hasScrolled: false,
      userList: []
    };
  }
  async componentDidMount() {

    this.setState({
      spinner: true,
      token: await AsyncStorage.getItem('@Token'),
    });
    const value = await AsyncStorage.getItem('@User');
    if (value !== null) {
      // We have data!!
      console.log("User object", JSON.parse(value));
    }

    console.log("Token", this.state.token);
    this.getData()
  }
  getData = () => {
    axios({
      method: 'GET',
      url: 'http://68.183.48.101:3333/users/list?page=' + this.state.count,
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }
    }).then(resposne => {
      console.log("response", resposne);
      this.setState({
        // count: this.state.count + 1,
        userList: [...this.state.userList, ...resposne.data.data.users],
        spinner: false
      })
    }).catch(error => console.log("-----!Error!----", error))
  }
  LoadMoreRandomData = () => {
    this.setState({
      count: this.state.count + 1
    }, () => this.getData())
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontSize: totalSize(3),
                marginTop: height(3),
              }}>
              User List
          </Text>

          </View>
          <FlatList
            data={this.state.userList}
            style={{ marginBottom: height(10) }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={this.LoadMoreRandomData}
            renderItem={(data, item) => {
              return (
                <ListView
                  data={data}
                  usertype={this.state.usertype}

                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
