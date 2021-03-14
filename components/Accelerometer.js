import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";

var ws = new WebSocket("ws://192.168.0.73:1337");

ws.onopen = () => {
  // connection opened
  console.log("connected to server");
  ws.send("CONNECTEDMOBILE"); // send a message
};

ws.onerror = e => {
  console.log(e.message);
};

export default class AccelerometerScreen extends React.Component {
  state = {
    accelerometerData: {}
  };

  static navigationOptions = {
    title: "Akcelerometr",
    headerStyle: {
      backgroundColor: "#F9A825"
    },
    headerTitleStyle: {
      color: "#ffffff"
    }
  };

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
      this.sendData();
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  sendData() {
    var data = JSON.stringify(this.state.accelerometerData);
    ws.send(data);
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;
    return (
      <View style={styles.root}>
        <Text style={styles.text}>
          Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
        </Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={styles.button}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  text: {
    flex: 1,
    color: "#000000",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 50
  },
  button: {
    flex: 1,
    textAlignVertical: "center",
    fontSize: 40,
    backgroundColor: "#F9A825",
    borderColor: "#FFFFFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid"
  },
  buttonContainer: {
    flex: 1,
    textAlignVertical: "center",
    fontSize: 40,
    backgroundColor: "#F9A825",
    borderColor: "#FFFFFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid"
  }
});
