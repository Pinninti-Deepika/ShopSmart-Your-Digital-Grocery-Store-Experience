import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

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

const Card = styled.div`
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

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 40px;
  border: none;
  font-weight: 700;
  background: white;
  color: #00b894;
  transition: 0.3s ease;

  &:hover {
    background: black;
    color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  }
`;

const BottomText = styled.p`
  text-align: center;
  margin-top: 20px;

  a {
    color: white;
    font-weight: 600;
    text-decoration: underline;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    const adminToken = localStorage.getItem('adminJwtToken');

    if (token) navigate('/');
    else if (adminToken) navigate('/admin/dashboard');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5100/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("Email or Password didn't match");
        return;
      }

      const data = await response.json();

      if (data.token) {
        Cookies.set('jwtToken', data.token, { expires: 30 });
        Cookies.set('userId', data.user._id);
        navigate('/');
      } else if (data.jwtToken) {
        localStorage.setItem('adminJwtToken', data.jwtToken);
        navigate('/admin/dashboard');
      }

    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <>
      <Header />
      <Page>

        <LeftSide>
          <div>
            <h1>Welcome Back 👋</h1>
            <p>
              Fresh groceries. Fast delivery.  
              Login and continue your shopping journey.
            </p>
          </div>
        </LeftSide>

        <RightSide>
          <Card>
            <Title>User Login</Title>

            <Form onSubmit={handleSubmit}>
              <StyledInput
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <StyledInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                <small
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </small>
              </div>

              <Button type="submit">Login</Button>
            </Form>

            <BottomText>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </BottomText>
          </Card>
        </RightSide>

      </Page>
    </>
  );
};

export default Login;
