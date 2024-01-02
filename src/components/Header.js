import { Component } from "../core/core";

export default class Header extends Component {
  constructor() {
    super({
      tagName: "header",
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <a href="#/">우아한 투두앱</a>
    `;
  }
}
