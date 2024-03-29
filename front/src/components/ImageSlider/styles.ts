import { Dimensions } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const ImageWrapper = styled.View``;

export const CarImage = styled(FastImage)`
  width: 290px;
  height: 180px;
`;
export const CarImageWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;
  height: 180px;
  align-items: center;
  justify-content: center;
`;
