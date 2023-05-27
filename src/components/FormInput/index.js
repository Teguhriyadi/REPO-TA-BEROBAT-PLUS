import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet} from "react-native";

const FormInput = ({placeholder, placeholderTextColor, value, keyBoardType, onChangeText, secureTextEntry}) => {
    return (
        <View style={{marginHorizontal: 10}}>
            <TextInput style={styles.textInput} placeholder={placeholder} placeholderTextColor={placeholderTextColor} value={value} keyboardType={keyBoardType} secureTextEntry={secureTextEntry} onChangeText={onChangeText} />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        paddingHorizontal: 10,
        color: 'grey',
        fontSize: 12,
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: 'Poppins-Medium',
        paddingVertical: 5
    }
});

export default FormInput;