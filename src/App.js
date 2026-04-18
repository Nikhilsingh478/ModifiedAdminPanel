import { Route, HashRouter } from "react-router-dom";
import Login from "./views/Login";
import AdminDashboard from "./views/admin/screens/AdminDashboard";
import CustomersList from "./views/admin/screens/CustomersList";
import CategoryScreen from "./views/admin/screens/CategoryScreen";
import ManageProducts from "./views/admin/screens/ManageProducts";
import SubcategoryScreen from "./views/admin/screens/SubcategoryScreen";
import ManageBrands from "./views/admin/screens/ManageBrands";
import ManageSubProduct from "./views/admin/screens/ManageSubProduct";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminManageKeywords from "./views/admin/screens/AdminManageKeywords";
import OrdersScreen from "./views/admin/screens/OrdersScreen";
import OrderDetailScreen from "./views/admin/screens/OrderDetailScreen";
import InvoiceScreen from "./views/admin/screens/InvoiceScreen";
import HsncodeScreen from "./views/admin/screens/HsncodeScreen";

const App = () => {
  const userLogin = useSelector((state) => state.LoginUserReducer);
  const { userInfo } = userLogin;

  return (
    <HashRouter>
      <Route path="/" component={Login} exact />
      <ProtectedRoutes
        path="/admin/dashboard"
        component={AdminDashboard}
        user={userInfo}
      />
      <ProtectedRoutes
        path="/admin/users"
        component={CustomersList}
        user={userInfo}
      />
      <ProtectedRoutes
        path="/admin/category"
        component={CategoryScreen}
        user={userInfo}
        exact
      />
      <ProtectedRoutes
        path="/admin/category/:id"
        component={SubcategoryScreen}
        user={userInfo}
        exact
      />
      <ProtectedRoutes
        path="/admin/manage_products/:id"
        component={ManageProducts}
        user={userInfo}
        exact
      />
      <ProtectedRoutes
        path="/admin/manage_subproducts/:id"
        component={ManageSubProduct}
        user={userInfo}
        exact
      />
      <ProtectedRoutes
        path="/admin/brand"
        component={ManageBrands}
        user={userInfo}
      />
      <ProtectedRoutes
        path="/admin/keywords"
        component={AdminManageKeywords}
        user={userInfo}
      />
      <ProtectedRoutes
        path="/admin/orders"
        component={OrdersScreen}
        user={userInfo}
      />

      <ProtectedRoutes
        path="/admin/order/:id"
        component={OrderDetailScreen}
        user={userInfo}
      />

      <ProtectedRoutes
        path="/admin/invoice/:id"
        component={InvoiceScreen}
        user={userInfo}
      />
      <ProtectedRoutes
        path="/admin/hsn"
        component={HsncodeScreen}
        user={userInfo}
      />

      {/* </Switch> */}
    </HashRouter>
  );
};

export default App;
