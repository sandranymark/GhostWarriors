
import './StaffOrderItem.css'
import { Order } from "../../types/orderType";

interface StaffOrderItemProps {
  order: Order;
  onChangeStatus: (id: string, newStatus: string) => void; // Funktion för att ändra status
  isEditable: boolean; // Om statusknapparna kan visas
}

const StaffOrderItem: React.FC<StaffOrderItemProps> = ({ order, onChangeStatus, isEditable }) => {
  
  return (
    <div className="order-card">
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
        <strong>Price:</strong> {order.totalPrice} sek
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
              <strong>Price:</strong> {item.productPrice} sek
            </p>
            <p>
              <strong>Quantity:</strong> {item.productQuantity}
            </p>
          </li>
        ))}
      </ul>
      {isEditable && ( // Om ordern kan redigeras, visa knappar
        <div className="status-buttons">
          <label>
            <input
              className="radio-btn"
              type="radio"
              name={`status-${order.id}`}
              checked={order.orderStatus === "Preparing"}
              onChange={() => onChangeStatus(order.id, "Preparing")}
            />
            Preparing
          </label>
          <label>
            <input
              className="radio-btn"
              type="radio"
              name={`status-${order.id}`}
              checked={order.orderStatus === "Done"}
              onChange={() => onChangeStatus(order.id, "Done")}
            />
            Done
          </label>
        </div>
      )}
    </div>
  );
};

export default StaffOrderItem;

// Författare: Anton
