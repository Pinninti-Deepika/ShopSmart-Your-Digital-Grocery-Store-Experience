import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import Header from '../components/Header';
import styled, { keyframes } from 'styled-components';

/* ---------- FORM FIELDS ---------- */
const commonFields = [
  { controlId: 'email', label: 'Email', type: 'email' },
  { controlId: 'password', label: 'Password', type: 'password' },
];

/* ---------- ANIMATION ---------- */
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

/* ---------- STYLES ---------- */
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #00c9a7, #00b894);
  color: white;
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  h1 {
    font-size: 48px;
    font-weight: 800;
    animation: ${float} 4s ease-in-out infinite;
  }

  p {
    font-size: 18px;
    margin-top: 20px;
    opacity: 0.9;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardBox = styled.div`
  width: 400px;
  padding: 50px 40px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  margin-bottom: 30px;
`;

const StyledInput = styled(Form.Control)`
  border-radius: 40px !important;
  padding: 14px 20px !important;
  margin-bottom: 20px;
  border: none !important;
`;

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 40px !important;
  padding: 14px !important;
  font-weight: 700;
  background: white !important;
  color: #00b894 !important;
  border: none !important;
  transition: 0.3s ease;

  &:hover {
    background: black !important;
    color: white !important;
  }
`;

/* ---------- COMPONENT ---------- */
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const token = Cookies.getItem('jwtToken');
  const adminToken = localStorage.getItem('adminJwtToken');

  useEffect(() => {
    if (token) {
      navigate('/');
    } else if (adminToken) {
      navigate('/admin/all-products');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlelogin = () => {
    alert('Login Successfull');
    navigate('/admin/dashboard');
  };

  return (
    <>
      <Header />

      <Page>
        {/* LEFT SIDE */}
        <LeftSide>
          <div>
            <h1>Admin Access 🔐</h1>
            <p>
              Control products, manage orders,
              and monitor your grocery system securely.
            </p>
          </div>
        </LeftSide>

        {/* RIGHT SIDE */}
        <RightSide>
          <CardBox>
            <Title>Admin Login</Title>

            <Form>
              {commonFields.map((field) => (
                <Form.Group key={field.controlId}>
                  <StyledInput
                    type={field.type}
                    placeholder={`Enter ${field.label}`}
                    name={field.controlId}
                    value={formData[field.controlId]}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              ))}

              <StyledButton onClick={handlelogin}>
                Login
              </StyledButton>
            </Form>

            <p style={{ marginTop: '20px', textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link
                to="/asignup"
                style={{ color: 'white', fontWeight: '600' }}
              >
                Sign Up
              </Link>
            </p>
          </CardBox>
        </RightSide>
      </Page>
    </>
  );
};

export default AdminLogin;
