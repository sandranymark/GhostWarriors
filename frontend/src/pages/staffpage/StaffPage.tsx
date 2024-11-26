import { useEffect, useState } from "react";
import "./StaffPage.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { getAllOrders, updateOrder } from "../../services/orders/orderService";
import { Order } from "../../types/orderType";

const StaffPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hämta alla ordrar med getAllOrders()
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response.success) {
          setOrders(response.data);
          console.log(response.data);
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (error) {
        setError("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleChangeStatus = async (id: string, newStatus: string) => {
    try {
      // Anropa updateOrder api för att uppdatera orderStatus
      const updatedOrder: Order = await updateOrder(id, {
        orderStatus: newStatus,
      });
      // Uppdatera order efter ändring
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? { ...order, orderStatus: updatedOrder.orderStatus }
            : order
        )
      );
    } catch (error) {
      console.log("Failed to update order status", error);
      setError("Could not update order status");
    }
  };

  const renderOrders = (status: string) => {
    return orders
      .filter((order) => order.orderStatus === status)
      .map((order) => (
        <div key={order.id} className="order-card">
          <p>
            <strong>Status:</strong>
            <span className="staff__order-status"> {order.orderStatus}</span>
          </p>
          <p>
            <strong>OrderNr:</strong> {order.id}
          </p>
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Price:</strong> {order.totalPrice} kr
          </p>
          <p>
            <strong>Items:</strong>
          </p>
          <ul>
            {order.orderItems.map((item, index) => (
              <li key={index}>
                <p>
                  <strong>Product:</strong> {item.productName}
                </p>
                <p>
                  <strong>Price:</strong> ${item.productPrice}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.productQuantity}
                </p>
              </li>
            ))}
          </ul>
          {status !== "Done" && (
            <div className="status-buttons">
              <label>
                <input
                  className="radio-btn"
                  type="radio"
                  name={`status-${order.id}`}
                  checked={order.orderStatus === "Preparing"}
                  onChange={() => handleChangeStatus(order.id, "Preparing")}
                />
                Preparing
              </label>
              <label>
                <input
                  className="radio-btn"
                  type="radio"
                  name={`status-${order.id}`}
                  checked={order.orderStatus === "Done"}
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
    <>
      <Header />
      <section className="staff-page">
        <section className="orders-section">
          <h2>Orders</h2>
          <div className="orders__section--orders">
            {renderOrders("pending")}
          </div>
        </section>
        <div className="preparation-section">
          <section className="orders__section--preparing">
          <h2>Under preparation</h2>
          {renderOrders("Preparing")}
          </section>
        </div>
        <div className="done-section">
          <section className="orders__section--done">
          <h2>Done</h2>
          {renderOrders("Done")}
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StaffPage;

// Författare: Sandra
// Modifierare: Anton - rendering och sortering av ordrar