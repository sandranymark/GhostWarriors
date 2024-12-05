import { Order } from "../../types/OrderType";
import StaffOrderItem from "../staffOrderItem/StaffOrderItem";

interface StaffOrderListProps {
  orders: Order[];
  orderStatus: string;
  onSave: (updatedOrder: Order) => void;
  onChangeStatus: (id: string, newStatus: string) => void;
}

const StaffOrderList: React.FC<StaffOrderListProps> = ({ orders, orderStatus, onChangeStatus, onSave }) => {
  const filteredOrders = orders.filter((order) => order.orderStatus === orderStatus);

  return (
    <>
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <StaffOrderItem
            key={order.id}
            order={order}
            onSave={onSave}
            onChangeStatus={onChangeStatus}
            isEditable={orderStatus !== "Done"} // Kan redigera endast om status INTE är "Done"
          />
        ))
      ) : (
        <p>No orders with status "{orderStatus}".</p>
      )}
    </>
  );
};

export default StaffOrderList;

// Författare: Anton
// Modifierare: Adréan kollar längden på filteredOrders, lägger till ett meddelande om längden är 0
