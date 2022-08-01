import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { synchronize } from "@nozbe/watermelondb/sync";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { Car as ModelCar } from "../../database/models/Car";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { LoadAnimation } from "../../components/LoadAnimation";
import { database } from "../../database";
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

type Navigator = {
  navigate: any;
};

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<Navigator>();
  const theme = useTheme();
  const netInfo = useNetInfo();

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
     

        const { changes, latestVersion } = response.data;
   console.log("#############TESTE" + changes + "###########TESTE");
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post(`users/sync`, user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>("cars");
        const carsConst = await carCollection.query().fetch();

        if (isMounted) {
          setCars(carsConst);
        }
      } catch (error) {
        console.log(error, "Erro ao buscar carros");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

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

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert("Você está conectado!");
    } else {
      Alert.alert("Você está sem internet");
    }
  }, []);

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
