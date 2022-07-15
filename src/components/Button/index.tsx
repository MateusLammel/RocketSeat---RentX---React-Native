import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, Title } from "./styles";
import { useTheme } from "styled-components";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
}

export function Button({ color, title, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container activeOpacity={0.8} {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}
