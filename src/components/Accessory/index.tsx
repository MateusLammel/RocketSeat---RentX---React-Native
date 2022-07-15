import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, Name } from "./styles";
import { useTheme } from "styled-components";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

interface Props {
  name: string;
  icon: React.FC<SvgProps>;
}

export function Accessory({ name, icon: Icon }: Props) {

  return (
    <Container>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Container>
  );
}
