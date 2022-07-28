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
import { CarDTO } from "../../dtos/CarDTO";
import { getAcessoryIcon } from "../../utils/getAcessoryIcon";

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface Props extends TouchableOpacityProps{
  data: CarDTO;
}

export function Car({ data, ...rest }: Props) {

  const EngineIcon = getAcessoryIcon(data.fuel_type)
 
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>R$ {data.rent.price}</Price>
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
