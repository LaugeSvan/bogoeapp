import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { getCache, setCache } from "../../lib/cache";
import { useTheme } from "../../styles";

type RecentItem = {
  id: string;
  title: string;
  created_at: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const { colors, styles } = useTheme();
  const [userName, setUserName] = useState("");
  const [recentNews, setRecentNews] = useState<RecentItem[]>([]);
  const [recentPosts, setRecentPosts] = useState<RecentItem[]>([]);
  const [recentListings, setRecentListings] = useState<RecentItem[]>([]);

  useEffect(() => {
    const load = async () => {
      // Load user name
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserName(user.user_metadata?.name ?? "");

      // Load recent items - use cache if available
      const fetchRecent = async (table: string, setter: (d: RecentItem[]) => void) => {
        const cacheKey = `${table}_recent`;
        const cached = getCache<RecentItem[]>(cacheKey);
        if (cached) { setter(cached); return; }
        const { data } = await supabase
          .from(table)
          .select("id, title, created_at")
          .order("created_at", { ascending: false })
          .limit(3);
        if (data) { setter(data); setCache(cacheKey, data); }
      };

      fetchRecent("news", setRecentNews);
      fetchRecent("posts", setRecentPosts);
      fetchRecent("listings", setRecentListings);
    };
    load();
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("da-DK", { day: "numeric", month: "short" });
  };

  const Section = ({
    title,
    items,
    onPress,
  }: {
    title: string;
    items: RecentItem[];
    onPress: () => void;
  }) => (
    <View style={[styles.card, { width: "90%" }]}>
      <Pressable
        onPress={onPress}
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}
      >
        <Text style={[styles.cardTitle, { flex: 1, marginRight: 8 }]} numberOfLines={1}>{title}</Text>
        <Text style={[styles.link, { fontSize: 13, flexShrink: 0 }]}>Se alle →</Text>
      </Pressable>
      {items.length === 0 ? (
        <Text style={[styles.cardText, { color: colors.symbol }]}>Ingen endnu</Text>
      ) : (
        items.map((item) => (
          <View key={item.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <Text style={[styles.cardText, { flex: 1 }]} numberOfLines={1}>{item.title}</Text>
            <Text style={[styles.cardText, { color: colors.symbol, fontSize: 12, marginLeft: 8 }]}>
              {formatDate(item.created_at)}
            </Text>
          </View>
        ))
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}>
        <View style={{ width: "90%", marginBottom: 20 }}>
          <Text style={[styles.title, { fontSize: 26 }]}>
            {userName ? `Hej, ${userName}! 👋` : "Hej! 👋"}
          </Text>
          <Text style={[styles.cardText, { color: colors.symbol }]}>
            Velkommen til Bogø Appen
          </Text>
        </View>

        <Section
          title="Seneste nyheder"
          items={recentNews}
          onPress={() => router.navigate("/(tabs)/nyheder")}
        />
        <Section
          title="Seneste fra fællesskab"
          items={recentPosts}
          onPress={() => router.navigate("/(tabs)/fællesskab")}
        />
        <Section
          title="Seneste fra børsen"
          items={recentListings}
          onPress={() => router.navigate("/(tabs)/børsen")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}