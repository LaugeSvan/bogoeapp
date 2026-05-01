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
import { useTheme } from "../../styles";

const categories = ["Alle", "Begivenheder", "Spørgsmål", "Nyheder", "Andet"];

type Post = {
  id: string;
  title: string;
  description: string;
  category: string;
  user_name: string;
  created_at: string;
};

function PostCard({
  post,
  styles,
}: {
  post: Post;
  styles: any;
}) {
  const [expanded, setExpanded] = useState(false);

  const previewText =
    post.description.length > 120
      ? post.description.slice(0, 120)
      : post.description;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{post.title}</Text>

      <Text style={[styles.chipText, { marginBottom: 6 }]}>
        {post.category}
      </Text>

      <Pressable onPress={() => setExpanded((v) => !v)}>
        <Text style={styles.cardText}>
          {expanded ? post.description : previewText}
          {!expanded && post.description.length > 120 && (
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
        {post.user_name}
      </Text>
    </View>
  );
}

export default function Fællesskab() {
  const { colors, styles } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Begivenheder");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const filteredPosts =
    selectedCategory === "Alle"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleCreatePost = async () => {
    if (!title.trim()) return;

    setPosting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setPosting(false);
      return;
    }

    await supabase.from("posts").insert({
      title: title.trim(),
      description,
      category: newPostCategory,
      user_id: user.id,
      user_name: user.user_metadata?.name ?? "Anonym",
    });

    setTitle("");
    setDescription("");
    setNewPostCategory("Begivenheder");
    setIsModalVisible(false);
    setPosting(false);

    fetchPosts();
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
            data={filteredPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostCard post={item} styles={styles} />
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

            <Text
              style={[
                styles.title,
                {
                  fontSize: 24,
                  marginBottom: 20,
                  textAlign: "center",
                },
              ]}
            >
              Opret nyt opslag
            </Text>

            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Titel"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[
                styles.input,
                { width: "100%", height: 100, textAlignVertical: "top" },
              ]}
              placeholder="Beskrivelse"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={[styles.text, { fontSize: 16, marginBottom: 10 }]}>
              Vælg kategori:
            </Text>

            <View
              style={{
                width: "100%",
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              {categories
                .filter((cat) => cat !== "Alle")
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
              style={[
                styles.welcomeBtn,
                { width: "100%", alignItems: "center" },
              ]}
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