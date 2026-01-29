import React from "react";
import { View, Text, StatusBar, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {

  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <StatusBar barStyle="default" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled">
          <Stack.Screen options={{ title: "Упс!", headerShown: false }} />

          <View className="flex-1 items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
            <Text className="text-3xl font-black text-zinc-900 dark:text-white">
              Сторінку не знайдено
            </Text>

            <Link href="/(auth)" asChild>
              <TouchableOpacity className="mt-8 bg-emerald-500 px-8 py-4 rounded-2xl">
                <Text className="text-white font-bold">На головну</Text>
              </TouchableOpacity>
            </Link>
          </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}



