import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';

const InputChat = ({value, onChangeText, onButtonPress}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tulis Pesan"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="black"
      />
      <TouchableOpacity
        onPress={onButtonPress}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
        }}>
        <Icon name="send" style={{color: 'white', fontSize: 20}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    maxHeight: 45,
    color: 'black',
  },
});

export default InputChat;
