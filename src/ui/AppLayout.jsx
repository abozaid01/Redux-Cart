import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import GlobalSpinner from "./GlobalSpinner";

function AppLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className="bg-stone-200 h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="overflow-scroll no-scrollbar">
        <div className="max-w-2xl mx-auto">
          {isNavigating && <GlobalSpinner />}
          <Outlet />
        </div>
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
