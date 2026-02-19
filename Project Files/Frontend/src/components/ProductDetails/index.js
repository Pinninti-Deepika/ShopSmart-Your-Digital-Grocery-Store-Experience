import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../Header";

/* ================= STYLES ================= */

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f3f4f6;
  padding-top: 100px;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 30px;
`;

const ProductLayout = styled.div`
  display: flex;
  gap: 60px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 420px;
  object-fit: contain;
`;

const DetailsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #111827;
`;

const Price = styled.h2`
  color: #4f46e5;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Category = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 15px;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 12px 26px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const BuyButton = styled(Button)`
  background: #4f46e5;
  color: white;
`;

const CartButton = styled(Button)`
  background: #059669;
  color: white;
`;

/* ================= COMPONENT ================= */

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5100/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <p style={{ paddingTop: "120px", textAlign: "center" }}>
        Loading...
      </p>
    );
  }

  /* ================= ADD TO CART ================= */

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      _id: product._id,
      name: product.productname,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      quantity: 1,
    };

    const itemIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (itemIndex !== -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("Product added to cart ✅");
  };

  /* ================= BUY NOW ================= */

  const handleBuyNow = () => {
    // Directly navigate to checkout page
    navigate(`/order-details/${product._id}`);
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <ProductLayout>
            {/* LEFT SIDE IMAGE */}
            <ImageSection>
              <ProductImage
                src={product.image}
                alt={product.productname}
              />
            </ImageSection>

            {/* RIGHT SIDE DETAILS */}
            <DetailsSection>
              <ProductName>{product.productname}</ProductName>

              <Price>₹{product.price}</Price>

              <Category>
                <strong>Category:</strong> {product.category}
              </Category>

              <Description>
                {product.description}
              </Description>

              <ButtonContainer>
                <BuyButton onClick={handleBuyNow}>
                  Buy Now
                </BuyButton>

                <CartButton onClick={handleAddToCart}>
                  Add to Cart
                </CartButton>
              </ButtonContainer>
            </DetailsSection>
          </ProductLayout>
        </Container>
      </PageWrapper>
    </>
  );
};

export default ProductDetails;
