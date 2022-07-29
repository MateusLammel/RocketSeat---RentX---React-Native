import React from "react";
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
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAcessoryIcon } from "../../utils/getAcessoryIcon";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleScheduling() {
    navigation.navigate("Scheduling", { car });
  }

  function handleGoBack() {
    navigation.goBack();
  }

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
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              name={accessory.name}
              key={accessory.name}
              icon={getAcessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          enabled={true}
          title="Escolher período do aluguel"
          onPress={handleScheduling}
        />
      </Footer>
    </Container>
  );
}
