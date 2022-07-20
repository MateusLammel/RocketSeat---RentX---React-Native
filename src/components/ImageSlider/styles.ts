import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ImageIndexProps {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;
export const ImageIndex = styled.View<ImageIndexProps>`
  width: 7px;
  height: 7px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
  margin-left: 8px;
  border-radius: 3.5px;
`;

export const ImageWrapper = styled.View``;

export const CarImage = styled.Image`
  width: 290px;
  height: 180px;
`;
export const CarImageWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: 180px;
  align-items: center;
  justify-content: center;
`;
