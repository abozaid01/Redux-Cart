import { Form, redirect, useActionData, useNavigation } from "react-router";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import store from "../../stores";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const {
    username,
    loading: addressLoading,
    address,
    position,
    error: addressError,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);
  const totalPrice = withPriority
    ? totalCartPrice + totalCartPrice * 0.2
    : totalCartPrice;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-44">First Name</label>
          <input
            className="w-full input"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-44">Phone number</label>
          <div className="flex-col w-full">
            <input className="w-full input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-sm text-red-700 bg-red-100 rounded-md p-2 mt-2">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-44">Address</label>
          <div className="relative flex-col w-full">
            <input
              defaultValue={address}
              className="w-full input"
              type="text"
              name="address"
              required
            />
            {!address && (
              <span className="absolute right-0.5 top-0.5">
                <Button
                  type="small"
                  disabled={addressLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Location
                </Button>
              </span>
            )}
            {addressError && (
              <p className="text-sm text-red-700 bg-red-100 rounded-md p-2 mt-2">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-4 font-medium">
          <input
            className="accent-yellow-400 h-6 w-6 focus:ring-2 focus:outline-none focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* <input
            type="hidden"
            name="position"
            value={position ? `${position.latitude},${position.longitude}` : ""}
          /> */}
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "placing order"
              : `ORDER NOW FROM ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: Boolean(data.priority),
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please enter a valid phone number";
  if (Object.keys(errors).length > 0) return errors;

  console.log(order);
  const newOrder = await createOrder(order);

  // DO NOT OVERUSE - Bad For Performance
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
