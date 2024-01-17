import React from "react";
import { Image, TouchableOpacity } from "react-native";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/btn_back.png")}
        style={{ width: 20, height: 20 }}
      />
    </TouchableOpacity>
  );
};

export { BackButton };
