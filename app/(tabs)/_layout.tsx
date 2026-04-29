import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, useRouter } from "expo-router";
import { useState } from "react";
import { HeaderIcons } from "../../components";
import { colors } from "../../styles/global";

export default function TabLayout() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUser");
    router.replace("/");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.symbol,
        tabBarStyle: { backgroundColor: colors.header },
        headerStyle: { backgroundColor: colors.header },
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
        headerTitle: "Bogø App",
        headerTitleAlign: "center",
        headerRight: () => (
          <HeaderIcons
            onNotifications={() =>
              console.log("Notifications ikke implementeret endnu")
            }
            onLogout={handleLogout}
            onThemeToggle={() => setIsDark((prev) => !prev)}
            isDark={isDark}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hjem",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nyheder"
        options={{
          title: "Nyheder",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="børsen"
        options={{
          title: "Børsen",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fællesskab"
        options={{
          title: "Fællesskab",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}