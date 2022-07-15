import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Container } from "./styles";
import { useTheme } from "styled-components";
import { TouchableHighlightProps } from "react-native";

interface Props extends TouchableHighlightProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
