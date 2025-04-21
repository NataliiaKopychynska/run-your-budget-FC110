import React from "react";
import Transactions from "../../components/Transactions/Transactions";
import Balance from "../../components/Balance/Balance";

function HomePage() {
  return (
    <div>
      HomePage
      <Balance />
      <Transactions />
    </div>
  );
}

export default HomePage;
