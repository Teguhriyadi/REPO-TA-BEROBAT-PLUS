import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailPraktek = ({ navigation, route }) => {

    const spesialis = route.params;

    return (
        <View style={styles.background}>
            <View style={{ flexDirection: 'row', paddingTop: 15 , paddingHorizontal: 10 }}>
                <View style={styles.viewicon}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                    <Icon name="arrow-back" style={{ color: 'black', fontSize: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.detailjudul}>
                        {"Detail Data Praktek".toUpperCase()}
                    </Text>
                </View>
            </View>
            <View style={{marginTop: 20, backgroundColor: 'white', elevation: 5, padding: 10, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Image source={require("../../../../../../assets/images/people.png")} style={{width: 100, height: 100}} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={{color: 'black'}}>
                        Hamdan
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
    viewicon: {
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    detailjudul: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default DetailPraktek;