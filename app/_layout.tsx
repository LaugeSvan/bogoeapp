import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { ThemeProvider } from "../styles/theme";

export default function RootLayout() {
  const router = useRouter();
  const hasChecked = useRef(false);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    if (hasChecked.current) return;

    hasChecked.current = true;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    })();
  }, [fontsLoaded, router]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <Stack screenOptions={{ animation: "none", headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}