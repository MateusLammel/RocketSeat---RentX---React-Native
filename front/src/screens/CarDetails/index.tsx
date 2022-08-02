import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import {
  Name,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Header,
  Period,
  Price,
  Rent,
  About,
  Accessories,
  Footer,
  OfflineInfo,
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Car as ModelCar } from "../../database/models/Car";
import { getAcessoryIcon } from "../../utils/getAcessoryIcon";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
  car: ModelCar;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleScheduling() {
    navigation.navigate("Scheduling", { car });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);

      setCarUpdated(response.data);
    }
    if (netInfo.isConnected == true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : "-"}</Price>
          </Rent>
        </Details>
        {!!carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                name={accessory.name}
                key={accessory.name}
                icon={getAcessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          enabled={netInfo.isConnected ? true : false}
          title="Escolher período do aluguel"
          loading={false}
          onPress={handleScheduling}
        />

        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu aluguel.
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}
