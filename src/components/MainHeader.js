import React from "react";
import { Icon, Header } from "semantic-ui-react";
import Logo from "./Logo";

const MainHeader = ({ label = "Dashboard" }) => {
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <header>
      <Header>
        <Logo />
        <Header.Content as="h2">{label}</Header.Content>
        <Icon name="refresh" onClick={handleRefreshClick}></Icon>
      </Header>
    </header>
  );
};

export default MainHeader;
