import { Component } from "../core/core";

export default class Headline extends Component {
  constructor() {
    super({
      tagName: "section",
    });
  }
  render() {
    this.el.classList.add("headline");
    this.el.innerHTML = /* html */ `
      <div class="description">
        <p>우아한형제들은 일하는 문화를 혁신하고 있습니다.</p>
        <p>평범한 사람들이 모여 비범한 성과를 만들어 내는 곳이</p>
        <p>될 수 있도록 건강한 조직문화를 만드는 일에 진심을 다합니다.</p>
      </div>
      <div class="image-wrapper">
        <img src="/images/main-icon.png" />
      </div>
    `;
  }
}
