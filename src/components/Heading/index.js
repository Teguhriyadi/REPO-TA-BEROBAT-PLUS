import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Heading = ({ textHeading, navigasi }) => {
    return (
        <LinearGradient colors={['#FF6B6B', '#0000FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={styles.heading}>
            <TouchableOpacity onPress={navigasi}>
                <Icon name='arrow-back' style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.textHeading}>
                {textHeading}
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        padding: 10,
        height: 60,
        elevation: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    icon: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },

    textHeading: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'justify'
    }
});

export default Heading;