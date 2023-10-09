import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

const SidebarMenu = () => {
  const menus = [
    { name: "Dashboard", path: "/", icon:"home" },
    { name: "Accounts", path: "/accounts", icon:"credit card" },
    { name: "Transactions", path: "/transactions" ,icon:"exchange"}
  ];

  return (
    <nav className="open">
      <Menu fluid color="blue" vertical icon="labeled">
        {menus.map((route, index) => (
          <Menu.Item as={Link} to={route.path} key={index}>
            <Icon name={route.icon} />
            {route.name}
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
};

export default SidebarMenu;
