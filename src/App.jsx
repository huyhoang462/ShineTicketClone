import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import TicketDetails from "./pages/TicketDetails";
import { ToastContainer } from "react-toastify";
import TicketSelectionPage from "./pages/TicketSelectionPage";
import NoFooterLayout from "./layouts/NoFooterLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ticket-details/:id" element={<TicketDetails />} />
          </Route>
          <Route element={<NoFooterLayout />}>
            <Route path="/select-ticket" element={<TicketSelectionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
