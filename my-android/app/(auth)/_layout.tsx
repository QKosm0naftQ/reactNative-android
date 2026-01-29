import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function AuthTabsLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#09090b" : "#fafafa", // zinc-950 або zinc-50
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "#10b981", // emerald-500
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Головна",
          // Тут потім можна додати іконки
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Вхід",
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Реєстрація",
        }}
      />
    </Tabs>
  );
}
