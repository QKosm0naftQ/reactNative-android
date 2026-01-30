import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSystemBars } from "@/hooks/useSystemBars";
import { StatusBar, useColorScheme } from "react-native";
import { store } from "@/store";
import { Provider } from "react-redux";


export default function RootLayout() {
  const isDark = useColorScheme() === "dark";

  useSystemBars();

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaProvider>
      </Provider >
    </>
  );
}


