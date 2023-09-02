import React from "react";
import Hello from "./components/Hello";
import World from "./components/World";
import "./App.less";

type Props = {
  [key: string]: unknown;
};

const App = (props: Props) => {
  console.log(props);
  return (
    <>
      <div>App</div>
      <img src="./assets/logo.png" width="100px" height="100px" alt="logo" />
      <Hello />
      <World />
    </>
  );
};

export default App;
