import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from "react-native";
import { colors } from '../../../utils';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';

const Profile = () => {
    return (
        <View style={styles.background}>
            <View style={{backgroundColor: '#051f84', height: 50, padding: 15, elevation: 10}}>
                <Text style={{color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 14, textAlign: 'center'}}>Profil Saya</Text>
            </View>
            <StatusBarComponent/>
        </View> 
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    }
});

export default Profile;