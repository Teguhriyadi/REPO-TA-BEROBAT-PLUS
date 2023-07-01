import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatItem from '../../../components/ChatItem';
import InputChat from '../../../components/InputChat';
import Firebase from '../../../firebase/firebaseConfig';
import {
  getChatTime,
  getData,
  setDateChat,
  baseUrl,
  useForm,
} from '../../../utils';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';

const Chating = ({navigation, route}) => {
  const getDokter = route.params;

  const [form, setForm] = useForm({
    id_dokter: '',
    uid_partner: '',
  });

  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserLocal();
    const urlFirebase = `chatting/${user.uid}_${getDokter.data.data.id_dokter}/allChat/`;
    Firebase.database()
      .ref(urlFirebase)
      .on('value', snapshot => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const semuaDataChat = [];
          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            semuaDataChat.push({
              id: key,
              data: newDataChat,
            });
          });
          setChatData(semuaDataChat);
        }
      });
  }, [
    user.uid,
    getDokter.data.data.id_dokter,
    dataPribadi.idx,
    dataPribadi.token,
  ]);

  const getDataUserLocal = () => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
    });
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  const chatSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${user.uid}_${getDokter.data.data.id_dokter}`;

    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;

    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDokter = `messages/${getDokter.data.data.id_dokter}/${chatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: getDokter.data.data.id_dokter,
      namePartner: getDokter.data.data.user_id.nama,
    };

    const dataHistoryChatForDokter = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    Firebase.database()
      .ref(urlFirebase)
      .push(data)
      .then(response => {
        setChatContent('');
        Firebase.database().ref(urlMessageUser).set(dataHistoryChatForUser);
        Firebase.database().ref(urlMessageDokter).set(dataHistoryChatForDokter);
      })
      .catch(error => {
        console.log(error);
      });

    // Kirim ke Firebase
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBarComponent />
      <View
        style={{
          backgroundColor: 'white',
          elevation: 5,
          height: 70,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, marginLeft: 10}}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" style={{fontSize: 20, color: 'black'}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <View
            style={{justifyContent: 'center', alignItems: 'flex-end', flex: 3}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                fontWeight: 'bold',
              }}>
                {getDokter.data.data.user_id.nama}
            </Text>
            <Text style={{color: 'gray', fontSize: 12}}>
              {getDokter.data.data.kelas == 1 ? 'Dokter Spesialis' : 'Dokter Umum' }
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Image
              source={require('../../../assets/images/background-doctor.png')}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderColor: 'black',
                borderWidth: 1,
              }}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 11,
                    color: 'gray',
                    marginVertical: 20,
                    textAlign: 'center',
                  }}>
                  {chat.id}
                </Text>
                {chat.data.map(itemChat => {
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={itemChat.data.sendBy === user.uid}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chating;
