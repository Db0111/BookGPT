import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const Button = ({
  title,
  onPress,
  pressed,
}: {
  title: string;
  onPress: () => void;
  pressed: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

export const SubmitBtn = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.submitbtn} onPress={onPress}>
      <Text style={styles.textblackbg}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: 'grey',
    height: 38,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 18,
    marginTop: 5,
    marginRight: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    backgroundColor: 'lightblue',
  },
  submitbtn: {
    backgroundColor: 'black',
    height: 45,
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 5,
    marginRight: 10,
    padding: 10,
    justifyContent: 'center',
  },
  textblackbg: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
});
