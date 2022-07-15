import React from "react";
import { StatusBar, Text } from "react-native";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";
import ForceSvg from "../../assets/force.svg";

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
import { useNavigation } from "@react-navigation/native";

export function CarDetails() {
  const navigation = useNavigation<any>();

  function handleScheduling() {
    navigation.navigate("Scheduling");
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
        <ImageSlider
          imagesUrl={[
            "https://production.autoforce.com/uploads/version/profile_image/6737/model_main_comprar-tiptronic_13d79f3c1b.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>RS 5</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 120</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="280km/h" icon={SpeedSvg} />
          <Accessory name="3.9s" icon={AccelerationSvg} />
          <Accessory name="450 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="5 pessoas" icon={PeopleSvg} />
        </Accessories>

        <About>
          O Audi RS5 registra velocidade máxima de 280 km/h e aceleração de 0 a
          100 km/h em 3,9 segundos graças ao motor 2.9 V6 biturbo, de 450 cv de
          potência e 61,1 kgfm de torque.
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleScheduling}
        />
      </Footer>
    </Container>
  );
}
