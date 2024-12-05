import "./StaffOrderItem.css";
import { Order } from "../../types/OrderType";
import { useEffect, useCallback, useState } from "react";

interface StaffOrderItemProps {
  order: Order;
  onSave: (updatedOrder: Order) => void; // Funktion för att spara ändringar
  onChangeStatus: (id: string, newStatus: string) => void; // Funktion för att ändra status
  isEditable: boolean; // Om statusknapparna kan visas
}

const StaffOrderItem: React.FC<StaffOrderItemProps> = ({
  order,
  onChangeStatus,
  onSave,
  isEditable,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false); // Hanterar redigeringsläge
  const [updatedOrder, setUpdatedOrder] = useState<Order>(order); // Lokalt state för uppdaterad order

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = [...updatedOrder.orderItems];
    updatedItems[index].productQuantity = newQuantity;
    setUpdatedOrder((prev) => ({
      ...prev,
      orderItems: updatedItems,
    }));
  };

  //Funktion för att uppdatera totalpriset baserat på produkterna

  const calculateTotalPrice = useCallback(() => {
    const total = updatedOrder.orderItems.reduce(
      (sum, item) => sum + item.productPrice * item.productQuantity,
      0
    );
    setUpdatedOrder((prev) => ({
      ...prev,
      totalPrice: total,
    }));
  }, [updatedOrder.orderItems]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  const saveChanges: () => void = () => {
    onSave(updatedOrder);
    setEditMode(false);
  };

  const cancelChanges: () => void = () => {
    setUpdatedOrder(JSON.parse(JSON.stringify(order)));
    setEditMode(false);
  };

  return (
    <div className="staff__order-card">
      <p className="staff__order-info">
        Status<span className="staff__order-colon">: </span>
        <span
          className="staff__order-status"
          style={{
            color: order.orderStatus === "Done" ? "#008000" : "#f68f05",
          }}
        >
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
      {editMode ? (
        <textarea
          className="staff__kitchenMessage"
          name="kitchenMessage"
          value={updatedOrder.kitchenMessage}
          onChange={handleInputChange}
        />
      ) : (
        <p className="staff__order-info">
          Customer message<span className="staff__order-colon">: </span>{" "}
          {order.kitchenMessage}
        </p>
      )}
      <p className="staff__order-info">
        Total price<span className="staff__order-colon">: </span>
        {updatedOrder.totalPrice} sek
      </p>
      <p className="staff__order-info">
        Items<span className="staff__order-colon">: </span>
      </p>
      <ul className="staff__order-ul">
        {updatedOrder.orderItems.map((item, index) => (
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
              {editMode ? (
                <input
                  type="number"
                  className="staff__input"
                  value={item.productQuantity}
                  onChange={(e) =>
                    handleProductQuantityChange(
                      index,
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                  min="0"
                />
              ) : (
                item.productQuantity
              )}
            </p>
          </li>
        ))}
      </ul>
      {isEditable && (
        <>
          {/* Status-knappar visas alltid sålänge som isEditable är true */}
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
          {/* Edit, Save och Cancel-knappar */}
          {/* Visas bara när status är Pending */}
          {order.orderStatus === "Pending" && (
            <div className="staff__edit-buttons">
              {!editMode ? (
                <button
                  className="staff__button"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button className="staff__button" onClick={saveChanges}>
                    Save
                  </button>
                  <button
                    className="staff__button staff__button--cancel"
                    onClick={cancelChanges}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StaffOrderItem;

// Författare: Anton
