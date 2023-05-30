import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { colors } from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';
import { getData, baseUrl } from '../../../../utils';
import axios from 'axios';

const AllArtikel = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            getDataUserLocal();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, []);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    return (
        <View style={styles.backgroundBelakang}>
            <StatusBarComponent />
            <Heading navigasi={() => {
                navigation.goBack();
            }} textHeading={"Semua Data Artikel"} />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundBelakang: {
        flex: 1,
        backgroundColor: colors.backgroundDasarBelakang
    }
});

export default AllArtikel;