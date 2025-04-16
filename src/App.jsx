import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const basename = import.meta.env.MODE === "production" ? "/Redux-Cart" : "/";
const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: AppLayout,
      // errorElement: <Error />,
      ErrorBoundary: Error,
      children: [
        { index: true, Component: Home },
        { path: "cart", Component: Cart },
        {
          path: "menu",
          Component: Menu,
          ErrorBoundary: Error, // to ensure the error displayed withinn the layout
          loader: menuLoader,
        },
        {
          path: "order",
          children: [
            { path: "new", Component: CreateOrder, action: createOrderAction },
            {
              path: ":id",
              Component: Order,
              loader: orderLoader,
              action: updateOrderAction,
            },
          ],
        },
      ],
    },
  ],
  { basename }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
