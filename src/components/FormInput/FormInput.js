import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, TextInput} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default function FormInput({labelName, ...rest}) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
});