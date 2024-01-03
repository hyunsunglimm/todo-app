import { Component } from "../core/core";
import todoStore, { deleteTodo, updateTodo } from "../store/todo";
import { getFormatDate } from "../utils/date";
import { matchString, replaceString } from "../utils/string";

export default class TodoItem extends Component {
  constructor(props) {
    super({
      tagName: "li",
      props,
    });
  }
  render() {
    const { todo } = this.props;
    this.el.innerHTML = /* html */ `
      <div class="todo-item" id="${todo.id}">
        <span class="material-symbols-outlined icon">${
          todo.done ? "check_circle" : "radio_button_unchecked"
        }</span>
        <span class="${todo.done ? "done" : ""}">${todo.title}</span>
        <span class="material-symbols-outlined handle">drag_indicator</span>
      </div>

      <div class="modal">
        <div class="modal-body">
          <div class="info">
            <p>주문시간 : ${getFormatDate(todo.createdAt)}</p>
            <p>수정시간 : ${getFormatDate(todo.updatedAt)}</p>
            <p>주문번호 : ${todo.order}</p>
            <input class="title" value="${replaceString(todo.title)}" />
            <div class="radio">
              <label><input type="radio" name="status" value="주문접수" />주문접수</label>
              <label><input type="radio" name="status" value="배달중" />배달중</label>
              <label><input type="radio" name="status" value="배달완료" />배달완료</label>
            </div>
          </div>
          <div class="button">
            <div class="update">수정</div>
            <div class="delete">삭제</div>
          </div>
        </div>
      </div>
    `;

    const iconEl = this.el.querySelector(".icon");
    iconEl.addEventListener("click", (event) => {
      event.stopPropagation();
      updateTodo(todo.id, todo.title, todo.order, !todo.done);
      todo.done = !todo.done;
      this.render();
    });

    const inputEl = this.el.querySelector(".title");

    const itemEl = this.el.querySelector(".todo-item");
    itemEl.addEventListener("click", () => {
      const modal = this.el.querySelector(".modal");
      const radioEls = this.el.querySelectorAll(".radio input");
      const select = Array.from(radioEls).find((radioEl) =>
        todo.title.includes(radioEl.value)
      );
      select.checked = true;
      modal.style.display = "block";
      inputEl.focus();
    });

    switch (matchString(todo.title)) {
      case "주문접수":
        itemEl.classList.add("reception");
        break;
      case "배달중":
        itemEl.classList.add("delivery");
        break;
      case "배달완료":
        itemEl.classList.add("complete");
        break;
      default:
        break;
    }

    const modalEl = this.el.querySelector(".modal");
    modalEl.addEventListener("click", (event) => {
      if (event.target === modalEl) {
        modalEl.style.display = "none";
      }
    });

    // 수정 기능
    const updateButton = this.el.querySelector(".update");
    updateButton?.addEventListener("click", () => {
      const select = this.el.querySelector("input[name='status']:checked");
      updateTodo(todo.id, inputEl.value, todo.order, todo.done, select.value);
    });

    inputEl.addEventListener("keydown", (event) => {
      if (event.isComposing) return;
      if (event.key === "Enter" && event.target.value.trim()) {
        const select = this.el.querySelector("input[name='status']:checked");
        updateTodo(
          todo.id,
          event.target.value,
          todo.order,
          todo.done,
          select.value
        );
      }
    });

    // 삭제 기능
    const deleteButton = this.el.querySelector(".delete");
    deleteButton?.addEventListener("click", () => {
      deleteTodo(todo.id);
    });
  }
}
