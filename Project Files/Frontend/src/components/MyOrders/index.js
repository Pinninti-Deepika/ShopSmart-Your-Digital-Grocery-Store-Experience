import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

/* ===================== STYLES ===================== */

const Page = styled.div`
  margin-top: 10vh;
  min-height: 100vh;
  padding: 60px 40px;
  background: #f4f7fb;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 60px;
  color: #222;
`;

const OrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 35px 80px rgba(0, 0, 0, 0.12);
  }

  border-left: 6px solid #7c3aed;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
`;

const OrderId = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const StatusBadge = styled.div`
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: ${(props) =>
    props.status === 'Delivered'
      ? 'linear-gradient(135deg, #00b894, #00cec9)'
      : props.status === 'Shipped'
      ? 'linear-gradient(135deg, #0984e3, #6c5ce7)'
      : 'linear-gradient(135deg, #fdcb6e, #e17055)'};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
`;

const InfoBox = styled.div`
  background: #f9fafc;
  padding: 18px 22px;
  border-radius: 16px;
  transition: 0.2s ease;

  &:hover {
    background: #eef2ff;
  }
`;

const HighlightBox = styled.div`
  padding: 18px 22px;
  border-radius: 16px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #888;
  margin-bottom: 6px;
`;

const Value = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #222;
`;

const HighlightValue = styled.div`
  font-size: 22px;
  font-weight: 900;
`;

/* ===================== COMPONENT ===================== */

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const token = Cookies.get('jwtToken');

    if (!userId || !token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5100/my-orders/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(response.data || []);
      } catch (error) {
        if (error.response?.status === 401) {
          Cookies.remove('jwtToken');
          Cookies.remove('userId');
          navigate('/login');
        }
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <>
      <Header />
      <Page>
        <Title>📦 My Orders</Title>

        <OrdersWrapper>
          {orders.length === 0 ? (
            <h3 style={{ textAlign: "center", color: "#777" }}>
              No orders yet 🛒
            </h3>
          ) : (
            orders.map((order) => (
              <OrderCard key={order._id}>
                <OrderHeader>
                  <OrderId>Order #{order._id.slice(-6)}</OrderId>
                  <StatusBadge status={order.status}>
                    {order.status}
                  </StatusBadge>
                </OrderHeader>

                <InfoGrid>
                  <InfoBox>
                    <Label>Customer</Label>
                    <Value>{order.firstname} {order.lastname}</Value>
                  </InfoBox>

                  <InfoBox>
                    <Label>Phone</Label>
                    <Value>{order.phone}</Value>
                  </InfoBox>

                  <InfoBox>
                    <Label>Date</Label>
                    <Value>
                      {new Date(order.createdAt).toLocaleString()}
                    </Value>
                  </InfoBox>

                  <InfoBox>
                    <Label>Payment</Label>
                    <Value>{order.paymentMethod}</Value>
                  </InfoBox>

                  {/* TOTAL AMOUNT INSIDE GRID */}
                  <HighlightBox>
                    <Label style={{ color: "#ddd" }}>Total Amount</Label>
                    <HighlightValue>₹{order.price}</HighlightValue>
                  </HighlightBox>
                </InfoGrid>
              </OrderCard>
            ))
          )}
        </OrdersWrapper>
      </Page>
    </>
  );
};

export default MyOrders;
