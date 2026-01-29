import React, { useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "@/components/form/InputField";
import { PasswordField } from "@/components/form/PasswordField";

import { apiService } from "@/services/api";
import { useRouter } from "expo-router";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Введіть пошту та пароль");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.login({
        email: email.trim(),
        password: password,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Token:", result.token);
        router.replace("/");
      } else {
        const errorMessage = result.errors?.Email || "Помилка авторизації";
        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
      alert("Сервер недоступний");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-950 px-6 py-12">
      <StatusBar barStyle="default" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled">
          <View className="items-center mb-12">
            <Text className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">Вхід</Text>
            <View className="h-[2px] w-12 bg-emerald-500 my-6 rounded-full" />
            <Text className="text-zinc-500 dark:text-zinc-400 text-center text-lg leading-7 font-medium px-4">
              Увійдіть у свій акаунт, щоб продовжити
            </Text>
          </View>

          <View className="gap-y-4">
            <InputField
              placeholder="Пошта"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <PasswordField placeholder="Пароль" value={password} onChangeText={setPassword} />

            <TouchableOpacity className="self-end mt-1">
              <Text className="text-emerald-500 dark:text-emerald-400 font-medium">Забув пароль?</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-8">
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-emerald-500 py-5 rounded-2xl items-center shadow-md" activeOpacity={0.85}>
              <Text className="text-white text-xl font-bold tracking-tight">Увійти</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
