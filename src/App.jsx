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
          <Route element={<NoFooterLayout />}>
            <Route path="/select-ticket" element={<TicketSelectionPage />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
          <Route element={<StoreLayout />}>
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
