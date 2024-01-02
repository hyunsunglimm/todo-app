import { Component } from "../core/core";

export default class Footer extends Component {
  constructor() {
    super({
      tagName: "footer",
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <p>${new Date().getFullYear()} 임현성</p>
      <a href="#/about">ABOUT ME !!!</a>
    `;
  }
}
