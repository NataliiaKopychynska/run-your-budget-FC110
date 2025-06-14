import React from "react";
import { useMediaQuery } from "react-responsive";

import Transactions from "../../components/Transactions/Transactions";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Navigation from "../../components/Navigation/Navigation";
import HeaderComponent from "../../components/Header/HeaderComponent";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction";

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
      <ModalEditTransaction/>
      <ModalAddTransaction />
      <ButtonAddTransactions />
    </div>
  );
}

export default HomePage;
