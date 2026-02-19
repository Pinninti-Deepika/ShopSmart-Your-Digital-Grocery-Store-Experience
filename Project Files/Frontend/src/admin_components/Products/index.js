import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminProductItem from "../ProductItem";
import axios from "axios";
import AdminNavabar from "../AdminNavbar";

/* ================= PAGE STYLE ================= */

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f3f4f6;
  padding-top: 110px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #111827;
`;

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
`;

/* ================= COMPONENT ================= */

const AdminProducts = () => {
  const api = "http://localhost:5100/products";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(api);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5100/products/${id}`);
      getData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <AdminNavabar />
      <PageWrapper>
        <Container>
          <PageTitle>All Products</PageTitle>

          <Grid>
            {products.map((product) => (
              <AdminProductItem
                key={product._id}
                id={product._id}
                img={product.image}
                name={product.productname}
                description={product.description}
                price={product.price}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </Grid>
        </Container>
      </PageWrapper>
    </>
  );
};

export default AdminProducts;
