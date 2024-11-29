import "./StaffOrderItem.css";
import { Order } from "../../types/orderType";

interface StaffOrderItemProps {
  order: Order;
  onChangeStatus: (id: string, newStatus: string) => void; // Funktion för att ändra status
  isEditable: boolean; // Om statusknapparna kan visas
}

const StaffOrderItem: React.FC<StaffOrderItemProps> = ({ order, onChangeStatus, isEditable }) => {
  return (
    <div className="staff__order-card">
      <p className="staff__order-info">
        Status<span className="staff__order-colon">: </span>
        <span
          className="staff__order-status"
          style={{ color: order.orderStatus === "Done" ? "#008000" : "#f68f05" }}
        >
          {" "}
          {order.orderStatus}
        </span>
      </p>
      <p className="staff__order-info">
        OrderNr<span className="staff__order-colon">: </span>
        {order.id}
      </p>
      <p className="staff__order-info">
        Customer<span className="staff__order-colon">: </span>
        {order.customerName}
      </p>
      <p className="staff__order-info">
        Customer message<span className="staff__order-colon">: </span> {order.kitchenMessage}
      </p>
      <p className="staff__order-info">
        Price<span className="staff__order-colon">: </span>
        {order.totalPrice} sek
      </p>

      <p className="staff__order-info">
        Items<span className="staff__order-colon">: </span>
      </p>
      <ul className="staff__order-ul">
        {order.orderItems.map((item, index) => (
          <li key={index}>
            <p className="staff__order-info">
              Product<span className="staff__order-colon">: </span>
              {item.productName}
            </p>
            <p className="staff__order-info">
              Price<span className="staff__order-colon">: </span>
              {item.productPrice} sek
            </p>
            <p className="staff__order-info">
              Quantity<span className="staff__order-colon">: </span>
              {item.productQuantity}
            </p>
          </li>
        ))}
      </ul>
      {isEditable && ( // Om ordern kan redigeras, visa knappar
        <div className="staff__status-buttons">
          <label className="staff__status-buttons-label">
            <input
              className="staff__radio-btn"
              type="radio"
              name={`status-${order.id}`}
              checked={order.orderStatus === "Preparing"}
              onChange={() => onChangeStatus(order.id, "Preparing")}
            />
            Preparing
          </label>
          <label className="staff__status-buttons-label">
            <input
              className="staff__radio-btn"
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
