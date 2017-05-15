import React, {Component} from 'react';
import {
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
 } from 'react-native';

 import {
   Text, View, Container, Header, Title, Content, Footer,
   FooterTab, Button, Left, Right, Body, Icon, Card, CardItem,Thumbnail
 } from 'native-base';

import FBSDK, { LoginManager } from 'react-native-fbsdk';

const ACCESS_TOKEN = "access_token";

class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username : 'admin',
      password : 'admin',
      token: ""
    }
  }
  pressButton() {
    return true
  }

  static navigationOptions = {
    header: null
  }

  _setStorage(){
    AsyncStorage.setItem(ACCESS_TOKEN, "RERtukj67456");
    this.setState({"token": "RERtukj67456"});
  }

  componentDidMount() {
    AsyncStorage.getItem(ACCESS_TOKEN).then((value) => {
        this.setState({"token": value});
    }).done();
  }

  _fbAuth() {
    let self = this
    LoginManager.logInWithReadPermissions(['public_profile',"email", "user_friends"]).then(function (result) {
      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        self._setStorage()
      }
    }, function (error) {
      console.log('An error has occured: ' + error);
    })
  }

  render() {
    AsyncStorage.getItem(ACCESS_TOKEN).then((value) => {
      if (value === "RERtukj67456") {
        this.props.navigation.navigate("MainScreen")
      }else {
        return false
      }
    }).done();
    return(
      <View style={styles.loginWrapper}>
        <View style={styles.logoImageWrapper}>
          <Image
            style={styles.logoImage}
            source={{uri: 'https://maxcdn.icons8.com/Share/icon/Animals//dolphin1600.png'}}
          />
          <Text style={styles.title}>DoFin</Text>
        </View>
        <View style={styles.container}>
          <StatusBar
            backgroundColor='#303F9F'
            barStyle='light-content'
          />
          <View>
            <TextInput
              placeholder= 'username'
              placeholderTextColor='rgba(255, 255, 255, 0.5)'
              style={styles.input}
              underlineColorAndroid='transparent'
              returnKeyType='next'
              onSubmitEditing={() => this.password.focus()}
              onChangeText={text => this.setState({username : text})}
            />
            <TextInput
              placeholder= 'password'
              secureTextEntry
              placeholderTextColor='rgba(255, 255, 255, 0.5)'
              style={styles.input}
              underlineColorAndroid='transparent'
              ref={(input) => this.password = input}
              onChangeText={text => this.setState({password : text})}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={()=> this.authCheck()}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

          </View>
        </View>
        <Footer>
          <FooterTab>
              <Button full onPress={() => this._fbAuth()}>
                <Text style={{fontSize: 15, color: "#FFF", marginBottom: 5}}>SIGN IN WITH FACEBOOK</Text>
                <Icon name="logo-facebook" style={{fontSize: 25, color: "#FFF"}}/>
              </Button>
          </FooterTab>
        </Footer>
      </View>

    )
  }
}

const styles = {
  loginWrapper: {
    flex: 1,
    backgroundColor: "#2196F3"
  },
  logoImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 30,
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    height: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: '#1565C0',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
};
export default SignIn
