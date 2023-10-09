import React from "react";
import { Icon, Header } from "semantic-ui-react";
import Logo from "./Logo";

const MainHeader = ({ label = "Dashboard" }) => {
  return (
    <header>
      <Header>
        <Logo/>
        <Header.Content as="h2">{label}</Header.Content>
        <Icon name="refresh" ></Icon>
      </Header>
    </header>
  );
};

export default MainHeader;
