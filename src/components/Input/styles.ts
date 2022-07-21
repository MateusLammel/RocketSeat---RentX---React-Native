import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { css } from "styled-components";
import styled from "styled-components/native";

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  margin-bottom: 8px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-color: ${theme.colors.main};
      border-bottom-width: 2px;
    `}
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;
`;

export const InputText = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
`;
