import { StyleSheet } from "react-native";
import { AppColors } from "./color";

export const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
    },

    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      padding: 3,
    },

    text: {
      fontFamily: "Nunito_400Regular",
      fontSize: 24,
      color: colors.text,
    },

    title: {
      fontSize: 48,
      fontFamily: "Nunito_700Bold",
      marginBottom: 10,
      color: colors.text,
    },

    card: {
      backgroundColor: colors.header,
      width: "90%",
      marginVertical: 12,
      padding: 12,
      alignSelf: "center",
    },

    cardTitle: {
      fontSize: 28,
      marginBottom: 10,
      fontFamily: "Nunito_700Bold",
      color: colors.text,
    },

    cardText: {
      fontSize: 18,
      fontFamily: "Nunito_400Regular",
      lineHeight: 24,
      color: colors.text,
    },

    cardImage: {
      width: "100%",
      aspectRatio: 1,
      marginTop: 10,
      borderRadius: 10,
    },

    fullImage: {
      width: "95%",
      height: "80%",
    },

    link: {
      color: colors.link,
      textDecorationLine: "underline",
      fontSize: 18,
    },

    welcomeBtn: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginBottom: 20,
    },

    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },

    modalContent: {
      backgroundColor: colors.background,
      width: "85%",
      padding: 20,
      borderRadius: 15,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },

    closeButton: {
      position: "absolute",
      top: 15,
      right: 15,
      zIndex: 1,
    },

    inputContainer: { width: "80%", marginBottom: 20, },

    input: {
      backgroundColor: colors.input,
      padding: 12,
      marginBottom: 12,
      borderRadius: 8,
      fontSize: 16,
      fontFamily: "Nunito_400Regular",
      color: colors.text,
      width: "100%",
    },

    chip: {
      backgroundColor: colors.input,
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: 5,
      alignSelf: "center",
    },

    chipActive: {
      backgroundColor: colors.primary,
    },

    chipText: {
      fontSize: 14,
      color: colors.text,
    },

    chipTextActive: {
      fontFamily: "Nunito_700Bold",
    },

    filterContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 5,
    },

    fab: {
      position: "absolute",
      right: 20,
      bottom: 20,
      backgroundColor: colors.primary,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
    },

    tabBarItem: {
      borderRadius: 10,
      marginHorizontal: 5,
      marginVertical: 4,
      overflow: "hidden",
    },
  });