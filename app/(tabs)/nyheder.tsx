import { AppImage } from "@/components";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { getCache, setCache } from "../../lib/cache";
import { useTheme } from "../../styles";

type NewsItem = {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  created_at: string;
};

function NewsCard({
  item,
  styles,
}: {
  item: NewsItem;
  styles: any;
}) {
  const [expanded, setExpanded] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const previewText =
    item.body.length > 120 ? item.body.slice(0, 120) : item.body;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>

      <Pressable onPress={() => setExpanded((v) => !v)}>
        <Text style={styles.cardText}>
          {expanded ? item.body : previewText}
          {!expanded && item.body.length > 120 && (
            <Text style={styles.link}> Læs mere</Text>
          )}
          {expanded && <Text style={styles.link}> Vis mindre</Text>}
        </Text>
      </Pressable>

      {item.image_url && (
        <Pressable onPress={() => setOpenImage(true)}>
          <AppImage
            source={{ uri: item.image_url }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </Pressable>
      )}

      <Modal visible={openImage} transparent>
        <Pressable
          style={styles.modalBackground}
          onPress={() => setOpenImage(false)}
        >
          {item.image_url && (
            <AppImage
              source={{ uri: item.image_url }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

export default function Nyheder() {
  const { colors, styles } = useTheme();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchNews = async () => {
        const cached = getCache<NewsItem[]>("news");
        if (cached) { setNews(cached); setLoading(false); return; }
        setLoading(true);
        const { data } = await supabase
          .from("news")
          .select("*")
          .order("created_at", { ascending: false });
        if (data) { setNews(data); setCache("news", data); }
        setLoading(false);
      };

      fetchNews();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NewsCard item={item} styles={styles} />
          )}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 40,
          }}
          ListEmptyComponent={
            <Text style={[styles.text, { marginTop: 40 }]}>
              Ingen nyheder endnu
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}