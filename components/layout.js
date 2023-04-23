import React from "react";
import ButtonAppBar from "./navbar";
import { Container } from "@mui/material";

function Layout({ children }) {
  return (
    <>
      <ButtonAppBar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
