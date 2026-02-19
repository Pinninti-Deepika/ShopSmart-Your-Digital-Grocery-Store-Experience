import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AdminNavabar from "../AdminNavbar";

/* ===========================
   PAGE LAYOUT
=========================== */

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 110px;
`;

const Layout = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ===========================
   LEFT INFO PANEL (SHORTENED)
=========================== */

const SidePanel = styled.div`
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 20px;
  padding: 30px;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  align-self: start; /* 🔥 prevents full height stretching */
`;

const PanelTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const PanelText = styled.p`
  color: #cbd5e1;
  line-height: 1.5;
  font-size: 14px;
  margin-bottom: 10px;
`;

/* ===========================
   FORM CARD
=========================== */

const FormCard = styled.form`
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
`;

const FormTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #1e293b;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  margin-bottom: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 13px;
  color: #475569;
`;

const Input = styled.input`
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

const Textarea = styled.textarea`
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  resize: none;
  min-height: 110px;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  color: white;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(67, 56, 202, 0.3);
  }
`;

/* ===========================
   COMPONENT
=========================== */

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    price: "",
    image: "",
    category: "",
    countInStock: "",
    rating: "",
  });

  const { productname, description, price, image, category, countInStock, rating } =
    formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productname ||
      !description ||
      !price ||
      !image ||
      !category ||
      !countInStock ||
      !rating
    ) {
      return alert("Please fill in all required fields");
    }

    try {
      await axios.post("http://localhost:5100/add-products", formData);
      alert("Product added successfully 🚀");

      setFormData({
        productname: "",
        description: "",
        price: "",
        image: "",
        category: "",
        countInStock: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <AdminNavabar />

      <PageWrapper>
        <Layout>
          {/* LEFT INFO PANEL */}
          <SidePanel>
            <PanelTitle>Add Product</PanelTitle>

            <PanelText>
              Add new products to your store inventory. Ensure details like pricing,
              category and stock are accurate.
            </PanelText>

            <PanelText>
              ✔ Maintain correct category  
              ✔ Use high-quality images  
              ✔ Keep stock updated  
            </PanelText>
          </SidePanel>

          {/* RIGHT FORM */}
          <FormCard onSubmit={handleSubmit}>
            <FormTitle>Product Information</FormTitle>

            <Grid>
              <FormGroup>
                <Label>Product Name</Label>
                <Input
                  name="productname"
                  value={productname}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Rating</Label>
                <Input
                  type="number"
                  name="rating"
                  value={rating}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Image URL</Label>
                <Input
                  name="image"
                  value={image}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Category</Label>
                <Select
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="dairy">Dairy</option>
                  <option value="snacks">Snacks</option>
                  <option value="dryfruits">Dry Fruits</option>
                  <option value="beverages">Beverages</option>
                  <option value="meat">Meat & Seafood</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  name="countInStock"
                  value={countInStock}
                  onChange={handleChange}
                />
              </FormGroup>
            </Grid>

            <FormGroup>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={description}
                onChange={handleChange}
              />
            </FormGroup>

            <SubmitButton type="submit">Add Product</SubmitButton>
          </FormCard>
        </Layout>
      </PageWrapper>
    </>
  );
};

export default AddProduct;
