import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

/* ===================== STYLES ===================== */

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 1px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 35px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #d1d5db;
  font-weight: 500;
  position: relative;
  transition: 0.3s ease;

  &:hover {
    color: #ffffff;
  }

  &.active {
    color: #ffffff;
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #6366f1;
  }
`;

const LogoutButton = styled.button`
  padding: 8px 18px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

/* ===================== COMPONENT ===================== */

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminJwtToken");
    navigate("/login");
  };

  return (
    <Nav>
      <Logo>🛒 Admin Panel</Logo>

      <NavLinks>
        <StyledLink to="/admin/dashboard">Dashboard</StyledLink>
        <StyledLink to="/admin/users">Users</StyledLink>
        <StyledLink to="/admin/all-products">Products</StyledLink>
        <StyledLink to="/admin/add-product">Add Product</StyledLink>
        <StyledLink to="/admin/orders">Orders</StyledLink>
      </NavLinks>

      <LogoutButton onClick={handleLogout}>
        Logout
      </LogoutButton>
    </Nav>
  );
};

export default AdminNavbar;
