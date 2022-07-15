import React from "react";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { Container, Content, Footer, Message, Title } from "./styles";
import { useTheme } from "styled-components";
import { useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";

export function SchedulingComplete() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX{"\n"}
          buscar o seu automóvel
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" />
      </Footer>
    </Container>
  );
}
