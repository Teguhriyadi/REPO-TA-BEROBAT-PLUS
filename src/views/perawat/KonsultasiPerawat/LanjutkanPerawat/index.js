import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../utils'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'

const LanjutkanPerawat = ({navigation}) => {
    return (
        <View style={styles.background}>
            <StatusBarComponent/>
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                <Icon name="arrow-back" style={{fontSize: 20, color: 'black'}} />
                </TouchableOpacity>
                <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium', marginLeft: 10}}>
                    Rekomendasi Perawat Terdekat Dengan Pasien
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },

    heading: {
        padding: 10,
        height: 50,
        backgroundColor: colors.backgroundPutih,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default LanjutkanPerawat;