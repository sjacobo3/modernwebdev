import * as Env from "./environments";
import React from "react";
import Parse from "parse";

import Components from "./Components/Components";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
      <Components />
  );
}

export default App;
