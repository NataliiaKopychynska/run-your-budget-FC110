import React from "react";
import { useMediaQuery } from "react-responsive";

import Transactions from "../../components/Transactions/Transactions";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Navigation from "../../components/Navigation/Navigation";
import HeaderComponent from "../../components/Header/HeaderComponent";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";

function HomePage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div>
      {/* <HeaderComponent />
      <Navigation />
      <DeleteModal />
      <Currency /> */}
      {isMobile && <Balance />}
      <Transactions />
      <ModalAddTransaction />
    </div>
  );
}

export default HomePage;
