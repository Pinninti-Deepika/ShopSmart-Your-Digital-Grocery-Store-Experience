import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavabar from '../AdminNavbar';

/* ===================== STYLES ===================== */

const Page = styled.div`
  margin-top: 10vh;
  padding: 60px 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 38px;
  font-weight: 800;
  margin-bottom: 60px;
  color: #1e293b;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 35px;
`;

const StatCard = styled.div`
  background: ${(props) => props.bg || "white"};
  border-radius: 25px;
  padding: 35px;
  color: white;
  box-shadow: 0 25px 60px rgba(0,0,0,0.08);
  transition: 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 35px 80px rgba(0,0,0,0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  opacity: 0.9;
`;

const CardValue = styled.h2`
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 25px;
`;

const StyledButton = styled(Link)`
  text-decoration: none;
  padding: 10px 25px;
  border-radius: 30px;
  background: white;
  color: #111;
  font-weight: 600;
  transition: 0.3s ease;
  display: inline-block;

  &:hover {
    transform: scale(1.08);
    background: #f1f5f9;
  }
`;

/* ===================== COMPONENT ===================== */

const Dashboard = () => {
  const [data, setData] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, productsResponse, ordersResponse] =
          await Promise.all([
            axios.get('http://localhost:5100/users'),
            axios.get('http://localhost:5100/products'),
            axios.get('http://localhost:5100/orders'),
          ]);

        setData({
          users: usersResponse.data.length,
          products: productsResponse.data.length,
          orders: ordersResponse.data.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminNavabar />
      <Page>
        <Title>📊 Admin Dashboard</Title>

        <CardsGrid>

          <StatCard bg="linear-gradient(135deg, #6366f1, #8b5cf6)">
            <CardTitle>Total Products</CardTitle>
            <CardValue>{data.products}</CardValue>
            <StyledButton to="/admin/all-products">
              View Products
            </StyledButton>
          </StatCard>

          <StatCard bg="linear-gradient(135deg, #0ea5e9, #06b6d4)">
            <CardTitle>Total Users</CardTitle>
            <CardValue>{data.users}</CardValue>
            <StyledButton to="/admin/users">
              View Users
            </StyledButton>
          </StatCard>

          <StatCard bg="linear-gradient(135deg, #10b981, #22c55e)">
            <CardTitle>Total Orders</CardTitle>
            <CardValue>{data.orders}</CardValue>
            <StyledButton to="/admin/orders">
              View Orders
            </StyledButton>
          </StatCard>

          <StatCard bg="linear-gradient(135deg, #f59e0b, #f97316)">
            <CardTitle>Add New Product</CardTitle>
            <CardValue>+</CardValue>
            <StyledButton to="/admin/add-product">
              Add Product
            </StyledButton>
          </StatCard>

        </CardsGrid>
      </Page>
    </>
  );
};

export default Dashboard;
