import Footer from "./components/Footer";
import Header from "./components/Header";
import { Component } from "./core/core";

export default class App extends Component {
  render() {
    const header = new Header().el;
    const footer = new Footer().el;
    const routerView = document.createElement("router-view");

    this.el.append(header, routerView, footer);
  }
}
