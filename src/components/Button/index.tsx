import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, Title } from "./styles";
import { useTheme } from "styled-components";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  color,
  title,
  enabled = true,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme();
  return (
    <Container
      activeOpacity={0.8}
      {...rest}
      color={color}
      enabled={enabled}
      style={{ opacity: enabled === false || loading == true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
