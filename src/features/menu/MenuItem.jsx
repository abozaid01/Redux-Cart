import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const handleAddItemToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? "grayscale opacity-70" : ""}`}
        src={imageUrl}
        alt={name}
      />

      <div className="pt-2.5 flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 italic capitalize">
          {ingredients.join(", ")}
        </p>

        <div className="mt-auto flex items-center">
          <p
            className={`text-sm grow ${
              soldOut ? "uppercase font-medium text-stone-500" : ""
            }`}
          >
            {soldOut ? "Sold out" : formatCurrency(unitPrice)}
          </p>

          {!soldOut &&
            (currentQuantity > 0 ? (
              <div className="flex items-center gap-4">
                <UpdateItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteItem pizzaId={id} />
              </div>
            ) : (
              <Button onClick={handleAddItemToCart} type="small">
                Add to Cart
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
