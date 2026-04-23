import { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";

type AppImageProps = React.ComponentProps<typeof Image>;

export function AppImage(props: AppImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ position: "relative" }}>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      )}

      <Image
        {...props}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}
