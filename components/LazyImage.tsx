import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

type LazyImageProps = {
  uri: string;
  style?: any;
  resizeMode?: "cover" | "contain" | "stretch";
};

export function LazyImage({
  uri,
  style,
  resizeMode = "cover",
}: LazyImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.wrapper, style]}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}

      <Image
        source={{ uri }}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
