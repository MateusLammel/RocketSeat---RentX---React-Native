import React, { useState } from "react";

import { Container, IconContainer, InputText } from "./styles";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { TextInputProps, TouchableOpacity } from "react-native";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const theme = useTheme();
  const [passwordVisbility, setPasswordVisbility] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handleVisibility() {
    setPasswordVisbility((prevState) => !prevState);
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather name={iconName} size={24} color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          } />
      </IconContainer>
      <InputText
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
        secureTextEntry={passwordVisbility}
      />
      <IconContainer>
        <TouchableOpacity onPress={handleVisibility}>
          <Feather
            name={passwordVisbility ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </TouchableOpacity>
      </IconContainer>
    </Container>
  );
}
