import React, { useState } from "react";
import "./StaffPage.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

interface Order {
  id: string;
  status: "New order" | "Preparing" | "Done";
  items: string[];
  note: string;
}

const StaffPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "abc123",
      status: "New order",
      items: ["Baguette x 1", "Kaffe x 3", "Toast x 2", "Chai Te x 1", "Äggmacka x 1"],
      note: "Jag hatar tomater!",
    },
    {
      id: "abc124",
      status: "Preparing",
      items: ["Baguette x 2", "Kaffe x 1"],
      note: "Extra ost, tack!",
    },
    {
      id: "abc125",
      status: "Done",
      items: ["Toast x 1", "Kaffe x 2"],
      note: "Ingen mjölk i kaffet!",
    },
  ]);

  const handleChangeStatus = (id: string, newStatus: "Preparing" | "Done") => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const renderOrders = (status: "New order" | "Preparing" | "Done") => {
    return orders
      .filter((order) => order.status === status)
      .map((order) => (
        <div key={order.id} className="order-card">
          <p><strong>Status:</strong><span className="staff__order-status"> {order.status}</span></p>
          <p><strong>OrderNr:</strong> {order.id}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><strong>Noteringar:</strong> {order.note}</p>
          {status !== "Done" && (
            <div className="status-buttons">
              <label>
                <input
                  type="radio"
                  name={`status-${order.id}`}
                  checked={order.status === "Preparing"}
                  onChange={() => handleChangeStatus(order.id, "Preparing")}
                />
                Preparing
              </label>
              <label>
                <input
                  type="radio"
                  name={`status-${order.id}`}
                  checked={order.status === "Done"}
                  onChange={() => handleChangeStatus(order.id, "Done")}
                />
                Done
              </label>
            </div>
          )}
        </div>
      ));
  };

  return (
    <div>
        <Header />
    <div className="Staff-page">
      <div className="orders-section">
        <h2>Orders</h2>
        {renderOrders("New order")}
      </div>
      <div className="preparation-section">
        <h2>Under preparation</h2>
        {renderOrders("Preparing")}
      </div>
      <div className="done-section">
        <h2>Done</h2>
        {renderOrders("Done")}
      </div>
    </div>
    <Footer />
    </div>  
  );
};

export default StaffPage;