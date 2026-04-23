import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HeaderIcons } from "../components";
import styles from "../styles/global";

interface User {
  name: string;
  email: string;
  password: string;
  isOnBogø: boolean;
}

const HomeScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AsyncStorage.getItem("currentUser");
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      } else {
        router.push("/login");
      }
    };
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUser");
    router.replace("/home");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          gestureEnabled: false,
          headerRight: () => (
            <HeaderIcons
              onNotifications={() => router.push("/notifications")}
              onLogout={handleLogout}
              onThemeToggle={() => setIsDark((prev) => !prev)}
              isDark={isDark}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Velkommen, {user.name}!</Text>
        <Text style={[styles.text, styles.tagline]}>Et lokalt fællesskab</Text>
      </View>
    </>
  );
};

export default HomeScreen;
