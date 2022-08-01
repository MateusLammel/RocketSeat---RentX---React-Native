import { Text, TouchableOpacityProps, View } from "react-native";
import React, { Component } from "react";
import GasolineSvg from "../../assets/gasoline.svg";
import {
  About,
  Brand,
  CarImage,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type,
} from "./styles";
import { getAcessoryIcon } from "../../utils/getAcessoryIcon";
import { Car as ModelCar } from "../../database/models/Car";
import { useNetInfo } from "@react-native-community/netinfo";

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface Props extends TouchableOpacityProps {
  data: ModelCar;
}

export function Car({ data, ...rest }: Props) {
  const EngineIcon = getAcessoryIcon(data.fuel_type);
  const netInfo = useNetInfo();

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>R$ {netInfo.isConnected ? data.price : "-"}</Price>
          </Rent>
          <Type>
            <EngineIcon />
          </Type>
        </About>
      </Details>
      <CarImage
        source={{
          uri: `${data.thumbnail}`,
        }}
      />
    </Container>
  );
}
