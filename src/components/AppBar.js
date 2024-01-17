import React from "react";
import { View, Text } from "react-native";

const AppBar = ({ title, left, right }) => {
  return (
    <View
      style={{
        height: 55,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ width: 50 }}>{left}</View>
      <Text style={{ fontSize: 18, color: "white" }}>{title}</Text>
      <View style={{ width: 50 }}>{right}</View>
    </View>
  );
};

export { AppBar };
