import React from "react";
import Books from "../Books/Books";

const Home = ({ showAlert }) => (
  <div>
    <Books showAlert={showAlert} />
  </div>
);

export default Home;
