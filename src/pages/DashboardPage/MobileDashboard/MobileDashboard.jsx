import React from "react";

import Navigation from "../../../components/Navigation/Navigation";
import HeaderComponent from "../../../components/Header/HeaderComponent";
import { Outlet } from "react-router-dom";

export default function MobileDashboard() {
  return (
    <div>
      <HeaderComponent />
      <Navigation />
      <Outlet />
    </div>
  );
}
