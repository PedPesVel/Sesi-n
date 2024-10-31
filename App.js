import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [imageUri, setImageUri] = useState('https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Usuario y contraseña predeterminados
  const DEFAULT_USERNAME = 'admin';
  const DEFAULT_PASSWORD = '123456';

  const pickImageGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri || result.assets[0].uri);
    }
  };

  const pickImageFoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri || result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      Alert.alert('Éxito', 'Usuario registrado');
    } else {
      Alert.alert('Error', 'Usuario no registrado');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        
        <TouchableOpacity onPress={pickImageGaleria}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Sharing.shareAsync(imageUri)} style={styles.button3}>
          <Text style={styles.buttontext}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={pickImageFoto}>
          <Text style={styles.buttontext}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>

        <View style={styles.subcontainer2}>
          <Text style={styles.subtitle}>Nombre de usuario:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nombre" 
            value={username} 
            onChangeText={setUsername} 
          />

          <Text style={styles.subtitle}>Contraseña:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            secureTextEntry 
            value={password} 
            onChangeText={setPassword} 
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttontext}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F8FF', alignItems: 'center', justifyContent: 'center' },
  subcontainer2: { marginTop: 25, marginBottom: 15 },
  subcontainer: { borderColor: '#A4C3B2', backgroundColor: '#D1E8E2', borderWidth: 2, alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: 20 },
  title: { fontSize: 24, fontFamily: 'Georgia', fontWeight: 'bold', color: '#2A6049' },
  subtitle: { fontSize: 16, fontFamily: 'Georgia', color: '#5F7A61' },
  image: { height: 180, width: 180, borderRadius: 20, marginBottom: 15, marginTop: 25, borderColor: '#A4C3B2', borderWidth: 3 },
  input: { padding: 5, height: 40, width: 200, borderRadius: 8, backgroundColor: '#FFFFFF', color: '#000000', marginTop: 5, marginBottom: 10, borderColor: '#A4C3B2', borderWidth: 2 },
  button: { height: 35, width: 100, backgroundColor: '#2A6049', borderRadius: 10, borderColor: '#5F7A61', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  button2: { height: 35, width: 150, backgroundColor: '#2A6049', borderRadius: 10, borderColor: '#5F7A61', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  button3: { padding: 5, marginBottom: 10, height: 35, width: 100, backgroundColor: '#2A6049', borderRadius: 10, borderColor: '#5F7A61', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  buttontext: { color: '#F0F8FF', fontSize: 14, fontFamily: 'Georgia' }
});

export default App;
