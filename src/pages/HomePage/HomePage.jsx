import React from "react";
import Transactions from "../../components/Transactions/Transactions";

import Currency from "../../components/Currency/Currency";
import Balance from "../../components/Balance/Balance";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Navigation from "../../components/Navigation/Navigation";
import HeaderComponent from "../../components/Header/HeaderComponent";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";

function HomePage() {
  return (
    <div>
      <HeaderComponent />
      <Navigation />
      <DeleteModal />
      <Balance />
      <Currency />
      <Transactions />
      <ButtonAddTransactions />
      <ModalAddTransaction />
    </div>
  );
}

export default HomePage;
