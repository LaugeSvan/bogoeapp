import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { HeaderIcons } from "../../components";
import { supabase } from "../../lib/supabase";
import styles, { colors } from "../../styles/global";

export default function TabLayout() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.symbol,
        tabBarActiveBackgroundColor: "#e8f5e9", // Global active background
        tabBarInactiveBackgroundColor: "transparent",
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: { backgroundColor: colors.header, height: 60 },
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
          // Example of individual styling:
          tabBarActiveTintColor: "#2e7d32", 
          tabBarActiveBackgroundColor: "#c8e6c9",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarButton: (props) => {
            const { ref, ...rest } = props;

            return (
              <Pressable
                {...rest}
                delayLongPress={600}
                onLongPress={
                  __DEV__ ? () => router.push("/_sitemap") : undefined
                }
              />
            );
          },
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
