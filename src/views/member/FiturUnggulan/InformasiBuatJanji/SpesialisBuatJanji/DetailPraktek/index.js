import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../../../../../../components/StatusBar/StatusBarComponent';

const DetailPraktek = ({ navigation, route }) => {

    const spesialis = route.params;

    console.log(spesialis);

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <LinearGradient colors={['#FF6B6B', '#0000FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }} style={{ paddingHorizontal: 10, paddingVertical: 15, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Icon name="arrow-back" style={{ color: 'white', fontSize: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16, textAlign: 'center' }}>
                        Detail Data Praktek
                    </Text>
                </View>
            </LinearGradient>
            <View style={{ marginTop: 10, flex: 2 }}>
                <View style={{ backgroundColor: 'white', elevation: 5, paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Image source={require("../../../../../../assets/images/people.png")} resizeMode='cover' style={{ width: 70, height: 70, borderRadius: 100, borderColor: 'blue', borderWidth: 1 }} />
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                            {spesialis.data.nama_dokter}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                            {spesialis.data.email}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                            {spesialis.data.nomor_hp}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    backgroundColor: colors.backgroundDasarBelakang,
                                    borderRadius: 5,
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                    marginVertical: 5,
                                    width: 100,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 3,
                                    }}>
                                    <Icon name="ios-location" style={{ color: 'black' }} />
                                </View>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontFamily: 'Poppins-Medium',
                                        fontWeight: 'bold',
                                    }}>
                                    100 Tahun
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, backgroundColor: 'white', elevation: 5, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            RS. Sumber Kasih
                        </Text>
                        <Text style={{ color: 'grey', fontFamily: 'Poppins-Medium', fontSize: 12, fontWeight: 'bold' }}>
                            Kejaksan, Kota Cirebon
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Image source={require("../../../../../../assets/images/gambar-rs.jpg")} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 10 }} />
                    </View>
                </View>
                <View style={{marginTop: 10, backgroundColor: 'skyblue', paddingHorizontal: 10, paddingVertical: 10}}>
                    <Text style={{color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium', fontWeight: 'bold'}}>
                        Pilih Tanggal & Waktu Kunjungan
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity style={{ backgroundColor: 'purple', paddingVertical: 15 }}>
                    <Text style={{ color: 'black' }}>
                        Hamdan
                    </Text>
                </TouchableOpacity>
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