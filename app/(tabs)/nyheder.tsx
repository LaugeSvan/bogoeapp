import { ScrollView, Text, View } from "react-native";
import styles from "../../styles/global";

export default function Nyheder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nyheder</Text>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nyhed 1</Text>
          <Text style={styles.cardText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic amet
            nostrum delectus eveniet perspiciatis, minus quam esse doloribus
            distinctio, modi explicabo, ex dolorum veritatis? Quibusdam sapiente
            labore incidunt repudiandae, sequi doloribus maxime corrupti nihil.
            Porro, illum possimus saepe dignissimos eligendi nesciunt vero,
            corrupti dolorem unde maiores neque commodi officiis aspernatur.
          </Text>
        </View>
        <View style={styles.card}>
          <Text>Nyhed 2</Text>
        </View>
        <View style={styles.card}>
          <Text>Nyhed 3</Text>
        </View>
        <View style={styles.card}>
          <Text>Nyhed 4</Text>
        </View>
      </ScrollView>
    </View>
  );
}
