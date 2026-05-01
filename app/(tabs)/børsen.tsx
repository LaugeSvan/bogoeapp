import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { RadioOption } from "../../components";
import { supabase } from "../../lib/supabase";
import { createStyles, useTheme } from "../../styles";

const categories = ["Alle", "Sælger", "Søges", "Gives væk"];

type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
  user_name: string;
  created_at: string;
};

function ListingCard({
  listing,
  styles,
}: {
  listing: Listing;
  styles: ReturnType<typeof createStyles>;
}) {
  const [expanded, setExpanded] = useState(false);

  const previewText =
    listing.description.length > 120
      ? listing.description.slice(0, 120)
      : listing.description;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{listing.title}</Text>

      <Text style={[styles.chipText, { marginBottom: 6 }]}>
        {listing.category}
      </Text>

      <Pressable onPress={() => setExpanded((v) => !v)}>
        <Text style={styles.cardText}>
          {expanded ? listing.description : previewText}
          {!expanded && listing.description.length > 120 && (
            <Text style={styles.link}> Læs mere</Text>
          )}
          {expanded && <Text style={styles.link}> Vis mindre</Text>}
        </Text>
      </Pressable>

      <Text
        style={[
          styles.cardText,
          { color: "#888", marginTop: 8, fontSize: 12 },
        ]}
      >
        {listing.user_name}
      </Text>
    </View>
  );
}

export default function Børsen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Sælger");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchListings = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setListings(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchListings();
    }, [])
  );

  const filteredListings =
    selectedCategory === "Alle"
      ? listings
      : listings.filter((l) => l.category === selectedCategory);

  const handleCreatePost = async () => {
    if (!title.trim()) return;

    setPosting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("listings").insert({
      title: title.trim(),
      description,
      category: newPostCategory,
      user_id: user.id,
      user_name: user.user_metadata?.name ?? "Anonym",
    });

    setTitle("");
    setDescription("");
    setNewPostCategory("Sælger");
    setIsModalVisible(false);
    setPosting(false);

    fetchListings();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.chip,
                  selectedCategory === cat && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategory === cat && styles.chipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />
        ) : (
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={filteredListings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListingCard listing={item} styles={styles} />
            )}
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 100,
            }}
            ListEmptyComponent={
              <Text style={[styles.text, { marginTop: 40 }]}>
                Ingen opslag i denne kategori
              </Text>
            }
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>

            <Text style={styles.title}>Opret nyt opslag</Text>

            <TextInput
              style={styles.input}
              placeholder="Titel"
              placeholderTextColor={colors.symbol}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Beskrivelse"
              placeholderTextColor={colors.symbol}
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={[styles.text, { fontSize: 16, marginBottom: 10 }]}>
              Kategori:
            </Text>

            <View style={{ width: "100%", marginBottom: 20 }}>
              {categories
                .filter((c) => c !== "Alle")
                .map((cat) => (
                  <RadioOption
                    key={cat}
                    label={cat}
                    value={cat}
                    selected={newPostCategory === cat}
                    onSelect={setNewPostCategory}
                  />
                ))}
            </View>

            <TouchableOpacity
              style={styles.welcomeBtn}
              onPress={handleCreatePost}
              disabled={posting}
            >
              <Text style={styles.text}>
                {posting ? "Opretter..." : "Opret opslag"}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}