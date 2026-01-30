import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

import { ImagePickerButton } from "@/components/form/ImagePickerButton";
import { InputField } from "@/components/form/InputField";
import { PasswordField } from "@/components/form/PasswordField";
import { useRegisterMutation } from "@/services/authService";
import { IRegister } from "@/types/auth/IRegister";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  const { form, setForm, onChange } = useForm<IRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Доступ до галереї потрібен для вибору фото.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setForm((prev) => ({
        ...prev,
        imageFile: {
          uri: result.assets[0].uri,
          name: "avatar.jpg",
          type: "image/jpeg",
        },
      }));
    }
  };

  const onSubmit = async () => {
    if (form.password !== confirmPassword) {
      alert("Паролі не співпадають");
      return;
    }

    try {
      const res = await register(form).unwrap();
      console.log("REGISTER SUCCESS, TOKEN:", res.token);
      router.replace("/");
    } catch (e: any) {
      console.log("Register error:", e);
      alert(e.data?.message || "Помилка при реєстрації");
    }
  };

  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <StatusBar barStyle="default" />

      <LinearGradient
        colors={["rgba(16,185,129,0.35)", "transparent"]}
        className="absolute w-full h-[380px] rounded-full blur-[120px]"
      />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
            className="px-6 py-8"
            keyboardShouldPersistTaps="handled"
          >
            <View className="items-center">
              <Text className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">Реєстрація</Text>
              <View className="h-[2px] w-12 bg-emerald-500 my-6 rounded-full" />
              <Text className="text-zinc-500 dark:text-zinc-400 text-center text-lg leading-7 font-medium">
                Створіть свій профіль, щоб почати використовувати додаток
              </Text>
            </View>

            <View className="items-center my-8">
              <ImagePickerButton imageUri={form.imageFile?.uri ?? null} onPress={pickImage} />
              <Text className="text-zinc-400 dark:text-zinc-500 mt-2">Натисніть, щоб обрати фото</Text>
            </View>

            <View className="gap-y-4">
              <View className="flex-row gap-4">
                <View className="flex-1">
                  <InputField
                    placeholder="Ім'я"
                    value={form.firstName}
                    onChangeText={onChange("firstName")}
                  />
                </View>
                <View className="flex-1">
                  <InputField
                    placeholder="Прізвище"
                    value={form.lastName}
                    onChangeText={onChange("lastName")}
                  />
                </View>
              </View>

              <InputField
                placeholder="Пошта"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={onChange("email")}
              />

              <PasswordField
                placeholder="Пароль"
                value={form.password}
                onChangeText={onChange("password")}
              />

              <PasswordField
                placeholder="Підтвердьте пароль"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <View className="mt-10 mb-6">
              <TouchableOpacity
                onPress={onSubmit}
                disabled={isLoading}
                className={`bg-emerald-500 py-5 rounded-2xl items-center shadow-md ${isLoading ? "opacity-70" : ""}`}
                activeOpacity={0.85}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-xl font-bold tracking-tight">Створити профіль</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
