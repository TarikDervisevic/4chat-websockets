import React from "react"
import ScreenSizeProvider from "./components/ScreenSizeProvider/ScreenSizeProvider";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <React.Fragment>
      <ScreenSizeProvider/>
      <Layout/>
    </React.Fragment>
  );
}

export default App;
