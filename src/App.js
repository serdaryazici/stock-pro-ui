import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import StockMovements from "./pages/stock/StockMovements/StockMovements";
import AddProductPage from "./pages/stock/StockMovements/AddProduct/AddProduct";
import Warehouse from "./pages/stock/Warehouse/Warehouse";
import AddWarehouse from "./pages/stock/Warehouse/AddWarehouse/AddWarehouse";
import StockEntry from "./pages/stock/StockEntry/StockEntry";
import StockExit from "./pages/stock/StockExit/StockExit";
import CriticalStock from "./pages/stock/CriticalStock/CriticalStock";
import CustomerList from "./pages/customer/CustomerList/CustomerList";
import CustomerAdd from "./pages/customer/CustomerAdd/CustomerAdd";
import CustomerDetails from "./pages/customer/CustomerDetails/CustomerDetails";
import AccountsList from "./pages/accounts/AccountsList/AccountsList";
import AccountsMovements from "./pages/accounts/AccountsMovements/AccountMovements";
import AccountsBalance from "./pages/accounts/AccountsBalance/AccountsBalance";
import InvoiceSales from "./pages/invoice/InvoiceSales/InvoiceSales";
import InvoicePurchase from "./pages/invoice/InvoicePurchase/InvoicePurchase";
import InvoicePayments from "./pages/invoice/InvoicePayments/InvoicePayments";
import InvoiceList from "./pages/invoice/InvoiceList/InvoiceList";
import StockReport from "./pages/reports/StockReport/StockReport";
import SalesReport from "./pages/reports/SalesReport/SalesReport";
import PurchaseReport from "./pages/reports/PurchaseReport/PurchaseReport";
import BalanceReport from "./pages/reports/BalanceReport/BalanceReport";
import Login from "./pages/auth/Login/Login";
import UserManagement from "./pages/settings/UserManagement/UserManagement";
import ProductCategories from "./pages/settings/ProductCategories/ProductCategories";
import UnitDefinitions from "./pages/settings/UnitDefinitions/UnitDefinitions";
import DemoDialog from "./pages/demo/DemoDialog";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/stock/movements" replace />} />
          <Route path="/stock/movements" element={<StockMovements />} />
          <Route path="/stock/movements/add-product" element={<AddProductPage />} />
          <Route path="/stock/warehouse" element={<Warehouse />} />
          <Route path="/stock/warehouse/add" element={<AddWarehouse />} />
          <Route path="/stock/entry" element={<StockEntry />} />
          <Route path="/stock/exit" element={<StockExit />} />
          <Route path="/stock/critical" element={<CriticalStock />} />
          <Route path="/customer/list" element={<CustomerList />} />
          <Route path="/customer/add" element={<CustomerAdd />} />
          <Route path="/customer/details/:id" element={<CustomerDetails />} />
          <Route path="/accounts/list" element={<AccountsList />} />
          <Route path="/accounts/movements" element={<AccountsMovements />} />
          <Route path="/accounts/balance" element={<AccountsBalance />} />
          <Route path="/invoice/list" element={<InvoiceList />} />
          <Route path="/invoice/sales" element={<InvoiceSales />} />
          <Route path="/invoice/purchase" element={<InvoicePurchase />} />
          <Route path="/invoice/payments" element={<InvoicePayments />} />
          <Route path="/reports/stock" element={<StockReport />} />
          <Route path="/reports/sales" element={<SalesReport />} />
          <Route path="/reports/purchase" element={<PurchaseReport />} />
          <Route path="/reports/balance" element={<BalanceReport />} />
          <Route path="/settings/users" element={<UserManagement />} />
          <Route path="/settings/categories" element={<ProductCategories />} />
          <Route path="/settings/units" element={<UnitDefinitions />} />
          <Route path="/demo" element={<DemoDialog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
