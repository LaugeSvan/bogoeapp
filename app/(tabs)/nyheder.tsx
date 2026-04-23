import { useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import styles from "../../styles/global";

type NewsCardProps = {
  title: string;
  text: string;
  image: string;
  tallImage?: boolean;
};

function NewsCard({ title, text, image, tallImage = false }: NewsCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const toggleExpanded = () => setExpanded((v) => !v);

  const previewText = text.length > 120 ? text.slice(0, 120) : text;

  const handleImagePress = () => {
    if (tallImage) {
      setOpenImage(true);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>

      <Pressable onPress={toggleExpanded}>
        <Text style={styles.cardText}>
          {expanded ? text : previewText}

          {!expanded && text.length > 120 && (
            <Text style={styles.readMoreText}> Læs mere</Text>
          )}

          {expanded && <Text style={styles.readMoreText}> Vis mindre</Text>}
        </Text>
      </Pressable>

      <Pressable onPress={handleImagePress}>
        <Image
          source={{ uri: image }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </Pressable>

      {tallImage && (
        <Modal visible={openImage} transparent>
          <Pressable
            style={styles.modalBackground}
            onPress={() => setOpenImage(false)}
          >
            <Image
              source={{ uri: image }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

export default function Nyheder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nyheder</Text>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <NewsCard
          title="Nyhed 1"
          image="https://i.imgur.com/6y6l0fv.jpeg"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic amet nostrum delectus eveniet perspiciatis, minus quam esse doloribus distinctio, modi explicabo, ex dolorum veritatis? Quibusdam sapiente labore incidunt repudiandae..."
          tallImage={false}
        />

        <NewsCard
          title="Nyhed 2"
          image="https://i.imgur.com/6y6l0fv.jpeg"
          text="Kort tekst til nyhed 2"
          tallImage={false}
        />

        <NewsCard
          title="Nyhed 3"
          image="https://i.imgur.com/6y6l0fv.jpeg"
          text="Kort tekst til nyhed 3"
          tallImage={true}
        />

        <NewsCard
          title="Nyhed 4"
          image="https://i.imgur.com/6y6l0fv.jpeg"
          text="Kort tekst til nyhed 4"
          tallImage={false}
        />
      </ScrollView>
    </View>
  );
}
