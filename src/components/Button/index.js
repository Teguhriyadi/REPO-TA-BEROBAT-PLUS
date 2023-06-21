import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ onpress, textbutton }) => {
    return (
        <LinearGradient colors={['#FF6B6B', '#0000FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} style={styles.button}>
            <TouchableOpacity onPress={onpress}>
                <Text style={styles.textbutton}>
                    {textbutton}
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    textbutton: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
    }
});

export default Button;