import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  background: linear-gradient(to right, #f8fffe, #e6fff9);
  padding: 80px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`;

const Heading = styled.h2`
  font-size: 30px;
  font-weight: 700;
  color: #00b894;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.7;
  margin-bottom: 15px;
`;

const Highlight = styled.span`
  color: #00b894;
  font-weight: 600;
`;

const AboutContact = () => {
  return (
    <Section>
      <Container>

        {/* ABOUT SECTION */}
        <Card>
          <Heading>About Us</Heading>
          <Paragraph>
            At <Highlight>G-Mart</Highlight>, we bring freshness,
            quality, and convenience together. Our mission is to make
            grocery shopping simple and enjoyable for everyone.
          </Paragraph>
          <Paragraph>
            From farm-fresh vegetables to tasty snacks and daily essentials,
            we carefully select every product to ensure the highest standards.
          </Paragraph>
          <Paragraph>
            Shop smarter. Live fresher. Experience grocery shopping
            reimagined.
          </Paragraph>
        </Card>

        {/* CONTACT SECTION */}
        <Card>
          <Heading>Contact Us</Heading>
          <Paragraph>
            Have questions or need assistance? We’re here to help!
          </Paragraph>

          <Paragraph>📧 <strong>Email:</strong> info@gmart.com</Paragraph>
          <Paragraph>📞 <strong>Phone:</strong> +91 98765 43210</Paragraph>
          <Paragraph>📍 <strong>Address:</strong> 123 Fresh Market Street, Your City</Paragraph>

          <Paragraph>
            Our support team is available 7 days a week to ensure
            your experience is smooth and satisfying.
          </Paragraph>
        </Card>

      </Container>
    </Section>
  );
};

export default AboutContact;
