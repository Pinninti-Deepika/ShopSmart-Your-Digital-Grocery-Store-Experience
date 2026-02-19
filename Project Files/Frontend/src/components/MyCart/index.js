import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Header";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f3f4f6;
  padding-top: 100px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 14px;
  margin-bottom: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  background: #f9fafb;
  border-radius: 10px;
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const Price = styled.p`
  font-weight: 600;
  color: #4f46e5;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #4f46e5;
  color: white;
`;

const RemoveBtn = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const TotalSection = styled.div`
  margin-top: 30px;
  text-align: right;
  font-size: 20px;
  font-weight: 700;
`;

const MyCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <Title>My Cart</Title>

          {cart.length === 0 ? (
            <p>Your cart is empty 🛒</p>
          ) : (
            <>
              {cart.map((item) => (
                <CartItem key={item._id}>
                  <ItemLeft>
                    <Image src={item.image} alt={item.name} />
                    <div>
                      <Name>{item.name}</Name>
                      <Price>₹{item.price}</Price>
                    </div>
                  </ItemLeft>

                  <QuantityControls>
                    <Button onClick={() => decreaseQty(item._id)}>-</Button>
                    {item.quantity}
                    <Button onClick={() => increaseQty(item._id)}>+</Button>
                  </QuantityControls>

                  <RemoveBtn onClick={() => removeItem(item._id)}>
                    Remove
                  </RemoveBtn>
                </CartItem>
              ))}

              <TotalSection>
                Total: ₹{totalAmount}
              </TotalSection>
            </>
          )}
        </Container>
      </PageWrapper>
    </>
  );
};

export default MyCart;
