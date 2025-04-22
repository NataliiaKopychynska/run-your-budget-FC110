import React from "react";
import Transactions from "../../components/Transactions/Transactions";

import Currency from "../../components/Currency/Currency";
import Balance from "../../components/Balance/Balance";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Navigation from "../../components/Navigation/Navigation";
import HeaderComponent from "../../components/Header/HeaderComponent";

function HomePage() {
  return (
    <div>
      <HeaderComponent />
      <Navigation />
      <DeleteModal />
      <Balance />
      <Currency />
      <Transactions />
    </div>
  );
}

export default HomePage;
