import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";

const Root = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
