import React from "react";
import Header from "./Header/Header";

function Headers({ elementosMenu = [] }) {
  return (
    <ul className="main-nav">
      {elementosMenu.map((item, idx) => (
        <Header/>
      ))}
    </ul>
  );
}

export default Headers;