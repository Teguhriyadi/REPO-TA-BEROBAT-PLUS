import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import Navigasi from '../../../../../partials/navigasi'

const Pembayaran = ({ navigation }) => {
    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.card}>
                <View style={styles.cardheader}>
                    <Text style={styles.textheader}>
                        RIWAYAT TRANSAKSI ANDA
                    </Text>
                </View>
                <View style={{ backgroundColor: 'white', marginVertical: 10, marginHorizontal: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16 }}> No. Transaksi </Text>
                    <Text style={{ color: 'blue', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16 }}> TRN-2083238292839 </Text>
                    <View style={{borderColor: 'black', borderWidth: 1}} />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate(Navigasi.MAIN_APP)
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                    KE HALAMAN RIWAYAT TRANSAKSI
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },

    card: {
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10
    },

    cardheader: {
        backgroundColor: 'green',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 10
    },

    textheader: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },

    button: {
        backgroundColor: 'brown',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5
    }
})

export default Pembayaran;