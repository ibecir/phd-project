
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';


type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      range: '',
      visible: false,
      inervalId: null,
      counter: 0,
      instances: [
        "0,41-44,2,0,NON-SMOKER,0,0,1,0,'NORMAL CHOLESTEROL','HYPERTENSIVE CRISIS SBP','HIGH SECOND STAGE DBP','OBESE',77,'NORMAL GLUCOSE',0",
        "0,37-40,2,1,11-20,0,0,1,0,'NORMAL CHOLESTEROL','HIGH SECOND STAGE SBP','HIGH SECOND STAGE DBP','NORMAL WEIGHT',95,'NORMAL GLUCOSE',1",
        "0,37-40,2,1,1-10,0,0,0,0,'INTERMEDIATE LOW CHOLESTEROL','ELEVATED SBP','HIGH FIRST STAGE DBP','NORMAL WEIGHT',75,'NORMAL GLUCOSE',0",
        "0,49-52,3,1,11-20,0,0,0,0,'NORMAL CHOLESTEROL','HIGH FIRST STAGE SBP','HIGH FIRST STAGE DBP','OVERWEIGHT',71,'NORMAL GLUCOSE',0",
        "1,45-48,4,1,11-20,0,0,0,0,'INTERMEDIATE HIGH CHOLESTEROL','NORMAL SBP','NORMAL DBP','NORMAL WEIGHT',62,'HYPOGLYCEMIA',1",
        "1,0-36,4,1,31-45,0,0,0,0,'INTERMEDIATE HIGH CHOLESTEROL','NORMAL SBP','NORMAL DBP','OVERWEIGHT',60,'HYPOGLYCEMIA',0",
        "1,49-52,1,0,NON-SMOKER,0,0,1,1,'INTERMEDIATE LOW CHOLESTEROL','HIGH SECOND STAGE SBP','HIGH SECOND STAGE DBP','OBESE',75,'DIABETES',0",
        "1,53-56,2,0,NON-SMOKER,0,0,0,0,'INTERMEDIATE LOW CHOLESTEROL','HIGH FIRST STAGE SBP','HIGH FIRST STAGE DBP','OVERWEIGHT',75,'PRE DIABETES',0",
        "0,53-56,3,0,NON-SMOKER,1,0,1,1,'HIGH CHOLESTEROL','HYPERTENSIVE CRISIS SBP','HIGH SECOND STAGE DBP','NORMAL WEIGHT',76,'DIABETES',1",
        "1,49-52,4,0,NON-SMOKER,0,0,0,0,'NORMAL CHOLESTEROL','NORMAL SBP','NORMAL DBP','NORMAL WEIGHT',90,'NORMAL GLUCOSE',0",
        "0,53-56,1,1,1-10,0,0,0,1,'INTERMEDIATE HIGH CHOLESTEROL','NORMAL SBP','NORMAL DBP','UNDERWEIGHT',88,'HYPOGLYCEMIA',0",
        "1,53-56,1,1,11-20,0,0,0,0,'NORMAL CHOLESTEROL','ELEVATED SBP','NORMAL DBP','NORMAL WEIGHT',78,'NORMAL GLUCOSE',0",
        "0,45-48,2,1,11-20,0,0,0,0,'INTERMEDIATE HIGH CHOLESTEROL','NORMAL SBP','NORMAL DBP','NORMAL WEIGHT',76,'NORMAL GLUCOSE',0",
        "0,41-44,1,1,11-20,0,0,1,0,'INTERMEDIATE LOW CHOLESTEROL','HIGH SECOND STAGE SBP','HIGH SECOND STAGE DBP','OBESE',85,'NORMAL GLUCOSE',0",
        "0,41-44,2,1,1-10,0,0,0,0,'NORMAL CHOLESTEROL','NORMAL SBP','NORMAL DBP','NORMAL WEIGHT',64,'NORMAL GLUCOSE',1",
        "1,57-60,1,1,11-20,0,0,1,0,'INTERMEDIATE LOW CHOLESTEROL','HIGH SECOND STAGE SBP','HIGH SECOND STAGE DBP','OVERWEIGHT',90,'NORMAL GLUCOSE',0",
        "0,61-64,1,0,NON-SMOKER,0,0,0,0,'INTERMEDIATE HIGH CHOLESTEROL','HIGH FIRST STAGE SBP','HIGH FIRST STAGE DBP','NORMAL WEIGHT',65,'NORMAL GLUCOSE',0",
        "1,37-40,2,1,11-20,0,0,0,0,'INTERMEDIATE HIGH CHOLESTEROL','HIGH FIRST STAGE SBP','HIGH FIRST STAGE DBP','NORMAL WEIGHT',75,'NORMAL GLUCOSE',0",
        "0,53-56,1,0,NON-SMOKER,0,0,1,0,'INTERMEDIATE HIGH CHOLESTEROL','HYPERTENSIVE CRISIS SBP','HIGH SECOND STAGE DBP','NORMAL WEIGHT',75,'PRE DIABETES',0",
      ]
    }
    this._onTestPress = this.onTestPress.bind(this)
  }
  getPredictionClass(intance){
    console.log(intance);
    fetch('http://10.20.30.41:8080/predict?instance='+intance)
    .then((response) =>  response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        range: responseJson.content,
        visible: true,
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onTestPress(){
    this.getPredictionClass(this.state.instances[this.state.counter++]);
    console.log(this.state, "####");
    this.state.intervalId = setInterval(() =>  {
      console.log(this.state);
      this.getPredictionClass(this.state.instances[this.state.counter%19]);
      this.state.counter++;
      if(this.state.counter == 19){
        this.state.counter=0;
        clearInterval(this.state.intervalId);
      }
    },5000);
  }


  render() {
    return (
      <View style={styles.container}>
        <Button
            style={{marginBottom: 25}}
            onPress={this._onTestPress}
            title="Start"
          />
        <Text style={[styles.topMargin,this.state.visible ? '' : styles.hide]}>Predicted class {this.state.range}</Text>
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
