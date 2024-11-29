import { useEffect, useState } from "react";
import "./StaffPage.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { getAllOrders, updateOrder } from "../../services/orders/orderService";
import { Order } from "../../types/orderType";
import StaffOrderList from "../../components/staffOrderList/StaffOrderList";

const StaffPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Hämta alla ordrar med getAllOrders()
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response.success) {
          setOrders(response.data);
          console.log(response.data);
        } else {
          setErrorMsg("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("An error occurred while fetching orders:", error);
        setErrorMsg("An error occurred while fetching orders.");
      } finally {
        setLoading(false); // Stoppar laddingsindikatorn
      }
    };

    fetchOrders();
  }, []);

  // Visar en text för användaren om ordrarna laddas eller om något gick fel
  if (loading) return <p>Loading orders...</p>; // Om vi väntar på data
  if (errorMsg) return <p>Error: {errorMsg}</p>; // Om det uppstår ett fel

  
  const handleChangeStatus = async (id: string, newStatus: string) => {
    const previousOrders = [...orders]; // Sparar nuvarande order om vi behöver återställa
    
    // En lokal uppdatering för att göra statusändring synlig direkt för användaren.
    // Detta sker INNAN servern svarar
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, orderStatus: newStatus } : order
      )
    );

    try {
      await updateOrder(id, { orderStatus: newStatus }); // Skicka uppdatering till servern med updateOrder
      // console.log(`Order with ${id} new orderStatus`, newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
      setOrders(previousOrders); // Om fel, återställ order
      setErrorMsg("Could not update order status: " + error);
    }
  };

  const pendingOrdersCount = orders.filter(order => order.orderStatus === "pending").length;
  const preparingOrdersCount = orders.filter(order => order.orderStatus === "Preparing").length;
  const doneOrdersCount = orders.filter(order => order.orderStatus === "Done").length;


  return (
    <>
      <Header />
      <section className="staff__page">
        <section className="orders__section">
          <h2>Orders</h2>
          <p>Total orders: {pendingOrdersCount}</p>
          <section className="orders__section--orders">
          <StaffOrderList orders={orders} orderStatus="pending" onChangeStatus={handleChangeStatus} />
          </section>
        </section>
        <div className="preparation__section">
          <h2>Under preparation</h2>
          <p>Total orders: {preparingOrdersCount}</p>
          <section className="orders__section--preparing">
            <StaffOrderList orders={orders} orderStatus="Preparing" onChangeStatus={handleChangeStatus} />
          </section>
        </div>
        <div className="done__section">
          <h2>Done</h2>
          <p>Total orders: {doneOrdersCount}</p>
          <section className="orders__section--done">
            <StaffOrderList orders={orders} orderStatus="Done" onChangeStatus={handleChangeStatus} />
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