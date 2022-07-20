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
import { Feather } from "@expo/vector-icons";

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
  Accessories,
  Footer,
  DateInfo,
  DateTitle,
  CalendarIcon,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceTotal,
  RentalPriceQuota,
  RentalPeriod,
  DateValue,
} from "./styles";
import { Button } from "../../components/Button";

import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

export function SchedulingDetails() {
  const navigation = useNavigation<any>();

  function handleSchedulingComplete() {
    navigation.navigate("SchedulingComplete");
  }

  function handleGoBack() {
    navigation.goBack();
  }

  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
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

          <RentalPeriod>
            <CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>18/06/2021</DateValue>
            </DateInfo>
            <Feather
              name="chevron-right"
              size={RFValue(20)}
              color={theme.colors.text}
            />
            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>18/06/2021</DateValue>
            </DateInfo>
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>

            <RentalPriceDetails>
              <RentalPriceQuota>R$ 590,00 x3</RentalPriceQuota>
              <RentalPriceTotal>R$ 2.300,00</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>
        </Accessories>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleSchedulingComplete}
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  );
}
