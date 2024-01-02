import { createRouter } from "../core/core";
import About from "./About";
import Home from "./Home";

export default createRouter([
  { path: "#/", component: Home },
  { path: "#/about", component: About },
]);
