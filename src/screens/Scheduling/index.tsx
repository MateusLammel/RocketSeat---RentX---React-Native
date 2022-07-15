import React from "react";
import { StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton";
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from "./styles";
import { useTheme } from "styled-components";
import ArrowSvg from "../../assets/arrow.svg";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleSchedulingDetails() {
    navigation.navigate("SchedulingDetails");
  }
  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar 
        translucent
        backgroundColor="transparent"/>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />
        <Title>Escolha uma data de início e fim do aluguel</Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false} />
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false} />
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
        <Footer>
          <Button title="Confirmar" onPress={handleSchedulingDetails} />
        </Footer>
      </Content>
    </Container>
  );
}
