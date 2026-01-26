import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import "./global.css";

export default function App() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="flex-1 items-center justify-center p-6 mt-10">
        <Text className="text-3xl font-bold text-slate-800 mb-8">Реєстрація</Text>

        <TouchableOpacity
          onPress={pickImage}
          className="w-32 h-32 bg-slate-200 rounded-full items-center justify-center mb-6 overflow-hidden border-2 border-blue-400"
        >
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full" />
          ) : (
            <Text className="text-slate-500 text-center px-2">Додати фото</Text>
          )}
        </TouchableOpacity>

        {/* Поля вводу */}
        <View className="w-full space-y-4">
          <TextInput
            placeholder="Ім'я"
            className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
          />
          <TextInput
            placeholder="Пароль"
            secureTextEntry
            className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
          />
        </View>

        <TouchableOpacity
          className="w-full bg-blue-600 p-4 rounded-xl mt-8 active:bg-blue-700"
        >
          <Text className="text-white text-center font-semibold text-lg">Створити аккаунт</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
