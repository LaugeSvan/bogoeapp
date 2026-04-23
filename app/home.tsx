import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen, {user.name}!</Text>
      <Text style={[styles.text, styles.tagline]}>Et lokalt fællesskab</Text>
      <TouchableOpacity style={styles.welcomeBtn} onPress={handleLogout}>
        <Text style={styles.text}>Log ud</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
