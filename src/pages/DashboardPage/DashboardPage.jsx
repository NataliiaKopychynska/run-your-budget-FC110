import { useMediaQuery } from "react-responsive";
import MobileDashboard from "./MobileDashboard/MobileDashboard";
import TabletDashboard from "./TabletDashboard/TabletDashboard";
import DesktopDashboard from "./DesktopDashboard/DesktopDashboard";

export default function DashboardPage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  return (
    <div>
      {isMobile && <MobileDashboard />}
      {isTablet && <TabletDashboard />}
      {isDesktop && <DesktopDashboard />}
    </div>
  );
}
