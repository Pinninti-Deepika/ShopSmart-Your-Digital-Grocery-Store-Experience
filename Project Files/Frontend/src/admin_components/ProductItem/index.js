import React from "react";
import { Link } from "react-router-dom";
import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
  ImageWrapper,
} from "./styledComponents";

const AdminProductItem = ({
  id,
  name,
  price,
  img,
  handleDeleteProduct,
}) => {
  return (
    <ProductContainer>
      <ImageWrapper>
        <ProductImage src={img} alt={name} />
      </ImageWrapper>

      <ProductName>{name}</ProductName>
      <ProductPrice>₹{price}</ProductPrice>

      <ButtonContainer>
        <Link
          to={`/admin/product-update/${id}`}
          style={{
            background: "#4f46e5",
            color: "white",
            padding: "8px 14px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          Update
        </Link>

        <Button
          onClick={() => handleDeleteProduct(id)}
          style={{ background: "#ef4444", color: "white" }}
        >
          Delete
        </Button>
      </ButtonContainer>
    </ProductContainer>
  );
};

export default AdminProductItem;
