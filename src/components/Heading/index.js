import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';

const Heading = ({ textHeading, navigasi }) => {
    return (
        <View style={styles.heading}>
            <TouchableOpacity onPress={navigasi}>
                <Icon name='arrow-back' style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.textHeading}>
                {textHeading}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        backgroundColor: colors.backgroundPutih,
        flexDirection: 'row',
        padding: 10,
        height: 50,
        elevation: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    icon: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },

    textHeading: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        color: 'black',
        marginLeft: 10
    }
});

export default Heading;