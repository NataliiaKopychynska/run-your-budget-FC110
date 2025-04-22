import React from "react";
import Transactions from "../../components/Transactions/Transactions";
import { useMediaQuery } from "react-responsive";
import Balance from "../../components/Balance/Balance";

function HomePage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div>

      {isMobile && <Balance />}

      <Transactions />
    </div>
  );
}

export default HomePage;
