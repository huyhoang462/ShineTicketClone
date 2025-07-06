import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import TicketDetails from "./pages/TicketDetails";
import { ToastContainer } from "react-toastify";
import TicketSelectionPage from "./pages/TicketSelectionPage";
import NoFooterLayout from "./layouts/NoFooterLayout";
import Payment from "./pages/Payment";
import Search from "./pages/Search";
import AccessLayout from "./layouts/AccessLayout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import StoreLayout from "./layouts/StoreLayout";
import MyAccount from "./pages/MyAccount";
import MyTickets from "./pages/MyTickets";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import EventLayout from "./layouts/EventLayout";
import EventSummary from "./pages/EventSummary";
import EventOrders from "./pages/EventOrder";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/AdminHome";
import AdminEvents from "./pages/AdminEvents";
import AdminInvoices from "./pages/AdminInvoice";
import AdminPay from "./pages/AdminPay";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AccessLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ticket-details/:id" element={<TicketDetails />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route
            element={
              <PrivateRoute allowedRoles={[0, 1]}>
                <NoFooterLayout />
              </PrivateRoute>
            }
          >
            <Route path="/select-ticket" element={<TicketSelectionPage />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
          <Route
            element={
              <PrivateRoute allowedRoles={[0, 1]}>
                <StoreLayout />
              </PrivateRoute>
            }
          >
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Route>
          <Route
            element={
              <PrivateRoute allowedRoles={[0, 1]}>
                <EventLayout />
              </PrivateRoute>
            }
          >
            <Route path="/summary/:id" m element={<EventSummary />} />
            <Route path="/orders/:id" m element={<EventOrders />} />
          </Route>
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={[1]}>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="invoices" element={<AdminInvoices />} />
            <Route path="pay" element={<AdminPay />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
