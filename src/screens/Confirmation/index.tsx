import React from "react";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { Container, Content, Footer, Message, Title } from "./styles";
import { useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params {
  title: string;
  message: string;
  nextScreen: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { title, message, nextScreen } = route.params as Params;

  function handleHome() {
    navigation.navigate(nextScreen);
  }
  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleHome} />
      </Footer>
    </Container>
  );
}
