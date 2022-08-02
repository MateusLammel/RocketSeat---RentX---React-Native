import React, { useEffect } from "react";
import { Container } from "./styles";
import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export function Splash() {
  const navigation = useNavigation<any>();

  function startApp() {
    navigation.navigate("Home");
  }

  const logoAnimation = useSharedValue(0);
  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(logoAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            logoAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(logoAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(logoAnimation.value, [0, 50], [-50, 0]),
        },
      ],
    };
  });

  useEffect(() => {
    logoAnimation.value = withTiming(
      50,
      {
        duration: 3000,
      },
      () => {
        "worklet";
        runOnJS(startApp)();
      }
    );
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg width={120} height={120} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
