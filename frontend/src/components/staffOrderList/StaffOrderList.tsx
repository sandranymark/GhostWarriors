
import { Order } from "../../types/orderType";
import StaffOrderItem from "../staffOrderItem/StaffOrderItem";

interface StaffOrderListProps {
    orders: Order[];
    orderStatus: string;
    onChangeStatus: (id: string, newStatus: string) => void;
}

const StaffOrderList: React.FC<StaffOrderListProps> = ({ orders, orderStatus, onChangeStatus }) => {
    const filteredOrders = orders.filter((order) => order.orderStatus === orderStatus);

    return (
        <section className="secton__order-list">
            {filteredOrders.map((order) => (
                <StaffOrderItem
                    key={order.id}
                    order={order}
                    onChangeStatus={onChangeStatus}
                    isEditable={orderStatus !== "Done"} // Kan redigera endast om status INTE är "Done"
                />
                ))}
        </section>
    )
};

export default StaffOrderList

// Författare: Anton