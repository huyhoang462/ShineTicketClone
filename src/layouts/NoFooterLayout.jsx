import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NoFooterLayout() {
  return (
    <>
      <Header />
      <main className=" pt-12 md:pt-14 lg:pt-16 m-0 p-0 box-border min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default NoFooterLayout;
