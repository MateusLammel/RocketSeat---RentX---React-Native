import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { LoadAnimation } from "../../components/LoadAnimation";
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

type Navigator = {
  navigate: any;
};

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<Navigator>();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const MyCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd() {},
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {loading ? (
        <LoadAnimation />
      ) : (
        <>
          <Header>
            <HeaderContent>
              <Logo width={RFValue(108)} height={RFValue(12)} />
              {!!loading && <TotalCars>Total de {cars.length}</TotalCars>}
            </HeaderContent>
          </Header>

          <CarList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Car data={item} onPress={() => handleCarDetails(item)} />
            )}
          />
        </>
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            MyCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
              backgroundColor: theme.colors.main,
              borderRadius: 30,
            },
          ]}
        >
          <ButtonAnimated onPress={handleOpenMyCars} style={styles.button}>
            <Ionicons
              size={32}
              color={theme.colors.shape}
              name="ios-car-sport"
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
