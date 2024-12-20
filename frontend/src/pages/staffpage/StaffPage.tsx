import "./StaffPage.css";
import { useEffect, useState } from "react";
import { Order } from "../../types/OrderType";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import StaffOrderList from "../../components/staffOrderList/StaffOrderList";
import { deleteOrder, getAllOrders, updateOrder } from "../../services/orders/orderService";

const StaffPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Hämta alla ordrar
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response.success) {
          const sortedOrders = Array.isArray(response.data)
            ? response.data.sort(
                (a: Order, b: Order) =>
                  new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
              )
            : [];
          setOrders(sortedOrders);
        } else {
          setErrorMsg("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setErrorMsg("An error occurred while fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  // Funktion för att ändra status på en order
  const handleChangeStatus = async (id: string, newStatus: string) => {
    const previousOrders = [...orders];

    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === id ? { ...order, orderStatus: newStatus } : order))
    );

    try {
      await updateOrder(id, { orderStatus: newStatus });
    } catch (error) {
      console.error("Failed to update order status:", error);
      setOrders(previousOrders);
      setErrorMsg("Could not update order status: " + error);
    }
  };

  const pendingOrdersCount = orders.filter((order) => order.orderStatus === "Pending").length;
  const preparingOrdersCount = orders.filter((order) => order.orderStatus === "Preparing").length;
  const doneOrdersCount = orders.filter((order) => order.orderStatus === "Done").length;

  // Funktion för att rensa alla "Done"-ordrar
  const handleClearDoneOrders: () => Promise<void> = async () => {
    const doneOrders = orders.filter((order) => order.orderStatus === "Done");

    try {
      for (const order of doneOrders) {
        await deleteOrder(order.id);
      }

      setOrders((prevOrders) => prevOrders.filter((order) => order.orderStatus !== "Done"));
    } catch (error) {
      console.error("Failed to clear done orders:", error);
      setErrorMsg("Could not clear done orders: " + error);
    }
  };

  if (errorMsg) {
    return <p className="staffpage__errorMsg">Error: {errorMsg}</p>;
  }

  const handleSaveOrder = async (updatedOrder: Order) => {
    const previousOrders = [...orders];
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );

    // Plocka ut det som vi inte vill skicka till backenden
    const { orderID, customerID, id, createdAt, updatedAt, ...orderToUpdate } = updatedOrder;
    orderToUpdate.totalPrice = updatedOrder.totalPrice;
    try {
      await updateOrder(updatedOrder.id, orderToUpdate);
    } catch (error) {
      console.error("Failed to update order:", error);
      setOrders(previousOrders); // Återställ om något går fel
      setErrorMsg("Failed to save changes: " + error);
    }
  };

  return (
    <>
      <Header />
      <section className="staff__page">
        <section className="orders__section">
          <h2>Orders</h2>
          <p className="orders__total-orders">Total orders: {pendingOrdersCount}</p>
          <section className="orders__section--orders">
            <StaffOrderList
              orders={orders}
              orderStatus="Pending"
              onSave={handleSaveOrder}
              onChangeStatus={handleChangeStatus}
            />
          </section>
        </section>
        <div className="preparation__section">
          <h2>Under preparation</h2>
          <p className="orders__total-orders">Total orders: {preparingOrdersCount}</p>
          <section className="orders__section--preparing">
            <StaffOrderList
              orders={orders}
              orderStatus="Preparing"
              onSave={handleSaveOrder}
              onChangeStatus={handleChangeStatus}
            />
          </section>
        </div>
        <div className="done__section">
          <span className="done__heading-clear--container">
            <h2>Done</h2>
            <button className="done__clear-btn" onClick={handleClearDoneOrders}>
              Clear all orders
            </button>
          </span>
          <p className="orders__total-orders">Total orders: {doneOrdersCount}</p>
          <section className="orders__section--done">
            <StaffOrderList
              orders={orders}
              orderStatus="Done"
              onSave={handleSaveOrder}
              onChangeStatus={handleChangeStatus}
            />
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StaffPage;

// Författare Anton, Sandra
// Modifierare: Anton - rendering och sortering av ordrar handleChangeStatus handleSaveOrder
// Modifierare: Adréan - handleClearDoneOrders, tagit bort routing av admin och lagt det i ProtectedRoute.
