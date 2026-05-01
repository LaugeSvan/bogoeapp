import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { HeaderIcons } from "../../components";
import { supabase } from "../../lib/supabase";
import { useTheme } from "../../styles";

export default function TabLayout() {
  const router = useRouter();
  const { isDark, setIsDark, colors, styles } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.activeItem,
        tabBarInactiveTintColor: colors.symbol,
        tabBarActiveBackgroundColor: colors.activeItemBg,
        tabBarInactiveBackgroundColor: "transparent",
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: {
          backgroundColor: colors.header,
          height: 60,
        },

        headerStyle: {
          backgroundColor: colors.header,
        },

        headerTitleStyle: {
          fontFamily: "Nunito_700Bold",
          color: colors.text,
          fontSize: 18,
        },

        headerTintColor: colors.text,

        headerTitle: "Bogø App",
        headerTitleAlign: "center",

        headerRight: () => (
          <HeaderIcons
            onNotifications={() =>
              console.log("Notifications ikke implementeret endnu")
            }
            onLogout={handleLogout}
            onThemeToggle={() => setIsDark(!isDark)}
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