import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      {/* heder */}
      <Outlet />
    </div>
  );
}

export default Layout;
