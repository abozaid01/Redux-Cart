import { useSelector } from "react-redux";
import { Link } from "react-router";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalQuantity) return null;

  return (
    <div className="flex items-center justify-between text-sm md:text-base p-4  sm:p-6 bg-stone-900 text-stone-200">
      <p className="space-x-4 sm:space-x-6 text-stone-300 uppercase">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
