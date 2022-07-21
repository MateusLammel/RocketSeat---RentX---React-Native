import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import LoadCar from "../../assets/loading_animation.json";

import { Container } from "./styles";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={LoadCar}
        autoPlay
        loop
        style={{ height: 180 }}
        resizeMode="contain"
      />
    </Container>
  );
}
