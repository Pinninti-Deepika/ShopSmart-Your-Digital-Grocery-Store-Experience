import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
  ImageWrapper,
} from "./styledComponents";

const ProductItem = ({ id, name, price, img }) => {
  const navigate = useNavigate();

  return (
    <ProductContainer>
      <ImageWrapper>
        <ProductImage src={img} alt={name} />
      </ImageWrapper>

      <ProductName>{name}</ProductName>
      <ProductPrice>₹{price}</ProductPrice>

      <ButtonContainer>
        <Button
          style={{ background: "#4f46e5", color: "white" }}
          onClick={() => navigate(`/product/${id}`)}
        >
          View Details
        </Button>
      </ButtonContainer>
    </ProductContainer>
  );
};

export default ProductItem;
