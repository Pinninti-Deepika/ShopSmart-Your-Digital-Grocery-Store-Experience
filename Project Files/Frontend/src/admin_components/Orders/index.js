import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import LoaderSpinner from "../../components/LoaderSpinner";
import AdminNavbar from "../AdminNavbar";

/* ================= PAGE ================= */

const PageWrapper = styled.div`
  background: #f3f4f6;
  min-height: 100vh;
  padding-top: 110px;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #111827;
`;

/* ================= ORDER CARD ================= */

const OrderCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const OrderId = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

const StatusBadge = styled.span`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) =>
    props.status === "Delivered"
      ? "#dcfce7"
      : props.status === "Shipped"
      ? "#dbeafe"
      : props.status === "Canceled"
      ? "#fee2e2"
      : "#fef3c7"};

  color: ${(props) =>
    props.status === "Delivered"
      ? "#16a34a"
      : props.status === "Shipped"
      ? "#2563eb"
      : props.status === "Canceled"
      ? "#dc2626"
      : "#b45309"};
`;

const Info = styled.p`
  margin: 6px 0;
  font-size: 14px;
  color: #374151;
`;

const HighlightPrice = styled.div`
  margin-top: 15px;
  padding: 12px 15px;
  border-radius: 10px;
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  color: white;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: ${(props) =>
    props.variant === "danger"
      ? "#ef4444"
      : props.variant === "success"
      ? "#16a34a"
      : "#4f46e5"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

/* ================= UPDATE FORM ================= */

const UpdateCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  margin: auto;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

/* ================= COMPONENT ================= */

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [statusForm, setStatusForm] = useState({
    status: "Confirmed",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:5100/orders")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  };

  const onSubmit = (formData) => {
    axios
      .put(`http://localhost:5100/orders/${selectedOrderId}`, formData)
      .then(() => {
        setIsUpdate(false);
        getData();
      })
      .catch((e) => console.log(e));
  };

  const onChangeStatus = (orderId) => {
    setSelectedOrderId(orderId);
    setIsUpdate(true);
  };

  return (
    <>
      <AdminNavbar />
      {isLoading ? (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LoaderSpinner />
        </div>
      ) : (
        <PageWrapper>
          <Container>
            <PageTitle>Orders Management</PageTitle>

            {/* UPDATE FORM VIEW */}
            {isUpdate ? (
              <UpdateCard>
                <h3>Update Order Status</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(statusForm);
                  }}
                >
                  <Select
                    value={statusForm.status}
                    onChange={(e) =>
                      setStatusForm({ ...statusForm, status: e.target.value })
                    }
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </Select>

                  <Button type="submit" variant="success">
                    Save Changes
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => setIsUpdate(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </UpdateCard>
            ) : (
              /* ORDERS LIST VIEW */
              data.map((item) => (
                <OrderCard key={item._id}>
                  <OrderHeader>
                    <OrderId>Order #{item._id.slice(-6)}</OrderId>
                    <StatusBadge status={item.status}>
                      {item.status}
                    </StatusBadge>
                  </OrderHeader>

                  <Info><strong>Customer:</strong> {item.firstname} {item.lastname}</Info>
                  <Info><strong>Phone:</strong> {item.phone}</Info>
                  <Info><strong>Product ID:</strong> {item.productId}</Info>
                  <Info><strong>Quantity:</strong> {item.quantity}</Info>
                  <Info><strong>Payment:</strong> {item.paymentMethod}</Info>
                  <Info><strong>Address:</strong> {item.address}</Info>
                  <Info><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</Info>

                  <HighlightPrice>
                    <span>Total Amount</span>
                    <span>₹{item.price}</span>
                  </HighlightPrice>

                  {item.status !== "Delivered" &&
                    item.status !== "Canceled" && (
                      <Button onClick={() => onChangeStatus(item._id)}>
                        Update Status
                      </Button>
                    )}

                  {item.status === "Delivered" && (
                    <Button disabled>Delivered</Button>
                  )}

                  {item.status === "Canceled" && (
                    <Button disabled>Customer Canceled</Button>
                  )}
                </OrderCard>
              ))
            )}
          </Container>
        </PageWrapper>
      )}
    </>
  );
};

export default Orders;
