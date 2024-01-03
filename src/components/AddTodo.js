import { Component } from "../core/core";
import todoStore, { addTodo, getOrder } from "../store/todo";

export default class AddTodo extends Component {
  constructor() {
    super({
      tagName: "section",
    });
    todoStore.subscribe("loading", () => {
      this.render();
    });
  }
  render() {
    this.el.classList.add("add-todo");
    this.el.innerHTML = /* html */ `
        <input type="text" value="" placeholder="주문할 음식을 입력하세요 !" />
        ${
          todoStore.state.loading
            ? `<div class="addLoader"></div>`
            : `<img src="https://www.baemin.com/_next/static/media/favicon-48x48.0ab31555.png" />`
        }
        
    `;

    const inputEl = this.el.querySelector("input");

    inputEl.addEventListener("keydown", (event) => {
      if (event.isComposing) return;
      if (event.key === "Enter" && event.target.value.trim()) {
        const maxOrder = getOrder();
        addTodo(event.target.value, maxOrder + 1);
        event.target.value = "";
      }
    });

    const imgEl = this.el.querySelector("img");

    imgEl?.addEventListener("click", () => {
      if (inputEl.value.trim()) {
        const maxOrder = getOrder();
        addTodo(inputEl.value, maxOrder + 1);
        inputEl.value = "";
      }
    });
  }
}
