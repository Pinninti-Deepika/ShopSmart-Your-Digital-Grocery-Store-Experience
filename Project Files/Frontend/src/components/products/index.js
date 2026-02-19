import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';
import Header from '../Header';

const Page = styled.div`
  margin-top: 10vh;
  padding: 60px 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdf4, #e0f7fa);
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 50px;
  flex-wrap: wrap;
  padding: 25px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
`;

const FilterBox = styled.div`
  flex: 1;
  min-width: 250px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  input, select {
    width: 100%;
    padding: 14px 20px;
    border-radius: 40px;
    border: none;
    outline: none;
    font-size: 15px;
    box-shadow: inset 0 0 0 1px #ddd;
    transition: 0.3s;
  }

  input:focus, select:focus {
    box-shadow: 0 0 0 2px #00b894;
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 40px;
  background: linear-gradient(90deg, #00b894, #0984e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 35px;
`;

const Products = () => {
  const api = 'http://localhost:5100/products';
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.trim() === '';

    if (selectedCategory === 'all') return matchSearch;

    return (
      matchSearch &&
      product.category.toLowerCase() === selectedCategory
    );
  });

  const categories = [
    ...new Set(products.map((product) => product.category.toLowerCase())),
  ];
  categories.unshift('all');

  return (
    <>
      <Header />

      <Page>

        <FiltersWrapper>
          <FilterBox>
            <h3>🔍 Search Products</h3>
            <input
              type="text"
              placeholder="Search fresh groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FilterBox>

          <FilterBox>
            <h3>🗂 Category</h3>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </FilterBox>
        </FiltersWrapper>

        <SectionTitle>✨ Fresh Picks Just For You</SectionTitle>

        <ProductsGrid>
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              img={product.image}
              name={product.productname}
              description={product.description}
              price={product.price}
            />
          ))}
        </ProductsGrid>

      </Page>
    </>
  );
};

export default Products;
