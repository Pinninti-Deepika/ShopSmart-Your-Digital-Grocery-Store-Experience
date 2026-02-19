import styled from "styled-components";

/* ================= CARD CONTAINER ================= */

export const ProductContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
  }
`;

/* ================= IMAGE WRAPPER ================= */

export const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border-radius: 14px;
  overflow: hidden;
`;

/* ================= PRODUCT IMAGE ================= */

export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 🔥 prevents cropping */
  transition: transform 0.3s ease;

  ${ProductContainer}:hover & {
    transform: scale(1.05);
  }
`;

/* ================= PRODUCT NAME ================= */

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  text-align: center;
  color: #1f2937;
`;

/* ================= PRODUCT PRICE ================= */

export const ProductPrice = styled.p`
  font-weight: 700;
  color: #4f46e5;
  font-size: 18px;
  margin: 10px 0 15px;
`;

/* ================= PRODUCT DESCRIPTION ================= */

export const ProductDescription = styled.p`
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 15px;
`;

/* ================= BUTTON CONTAINER ================= */

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`;

/* ================= BUTTON ================= */

export const Button = styled.button`
  padding: 9px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;
