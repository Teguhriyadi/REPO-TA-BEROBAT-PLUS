import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const Button = ({ onpress, textbutton }) => {
    return (
        <TouchableOpacity onPress={onpress} style={styles.button}>
            <Text style={styles.textbutton}>
                {textbutton}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textbutton: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
    }
});

export default Button;