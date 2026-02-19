import styled from "styled-components";

/* CARD CONTAINER */
export const ProductContainer = styled.div`
  background: white;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.15);
  }
`;

/* IMAGE WRAPPER (IMPORTANT FIX) */
export const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border-radius: 12px;
  overflow: hidden;
`;

/* IMAGE */
export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;   /* 🔥 NO CROPPING */
`;

/* NAME */
export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
  color: #1f2937;
`;

/* PRICE */
export const ProductPrice = styled.p`
  font-weight: 700;
  color: #4f46e5;
  font-size: 18px;
  margin: 10px 0 15px;
`;

/* BUTTON CONTAINER */
export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
`;

/* BUTTON */
export const Button = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: 0.2s ease;
`;
