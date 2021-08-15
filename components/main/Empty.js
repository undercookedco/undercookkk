
import React from "react";
import styled from "styled-components";

export default function Empty() {
  return (
    <ComponentContainer>
            <EmptyImage
        source={require("../../assets/images/grocery-removebg-preview.png")}
      />
      <EmptyText>Add To-Buy.</EmptyText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 650px;
`;

const EmptyImage = styled.Image`
  width: 350px;
  height: 300px;
`;

const EmptyText = styled.Text`
  color: white;
  font-family: poppins-bold;
  margin-top: 10px;
  font-size: 30px;
`;