import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    const checkLogin = async () => {
      try {
        const currentUser = await AsyncStorage.getItem("currentUser");
        const parsed = currentUser ? JSON.parse(currentUser) : null;
        if (parsed && parsed.email && parsed.name) {
          router.replace("/(tabs)");
        } else {
          await AsyncStorage.removeItem("currentUser");
          router.replace("/");
        }
      } catch {
        await AsyncStorage.removeItem("currentUser");
        router.replace("/");
      }
    };
    checkLogin();
  }, [fontsLoaded, router]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}