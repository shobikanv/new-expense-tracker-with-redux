import React from "react";
import MainHeader from "../../components/MainHeader";
import SidebarMenu from "../../components/SidebarMenu";

const Layout = ({ children }) => {
  const renderChildren = () => {
    return children;
  };
  return (
    <>
      <MainHeader />
      <SidebarMenu/>
      <main>
        <section>{renderChildren()}</section>
      </main>
    </>
  );
};

export default Layout;
