import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from "react-native";
import AnimatedLoader from 'react-native-animated-loader';

const LoadingScreen = () => {
    const {visible} = useState('');

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
            <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    }
})

export default LoadingScreen;