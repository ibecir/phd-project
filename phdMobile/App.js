
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';


type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      range: '',
      visible: false,
    }
    this._onTestPress = this.onTestPress.bind(this)
  }
  onTestPress(){
    console.log("Pressed");
    fetch('http://10.10.2.224:8080/car',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify({
          car: 'ford,escort model,Polovan,Dizel,l7,0-45,Manuelni,l5,braon,three,2 x 2,no,no,no,no,no,no,no,no,no,no,no,no,no,no,no,no,NaN',
      }),
    })
    .then((response) =>  response.json())
    .then((responseJson) => {
      this.setState({
        range: responseJson.content,
        visible: true,
      })
    })
    .catch((error) => {
      console.error(error);
    });;
  }


  render() {
    return (
      <View style={styles.container}>
        <Button
            style={{marginBottom: 25}}
            onPress={this._onTestPress}
            title="Send Data"
          />
        <Text style={[styles.topMargin,this.state.visible ? '' : styles.hide]}>Predicted Range {this.state.range} BAM</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  hide: {
    display: 'none'
  },
  topMargin: {
    marginTop: 25
  }
});
