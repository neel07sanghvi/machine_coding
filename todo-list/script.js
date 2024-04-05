document.addEventListener("DOMContentLoaded", () => {
	const todoForm = document.querySelector(".todo-form");
	const todoInput = document.querySelector(".todo-input");
	const todoSubmitBtn = document.querySelector(".todo-submit");
	const todoList = document.querySelector(".todo-list");

	let editMode = false;
	let editItem = null;

	todoForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const todoText = todoInput.value.trim();

		if (todoText !== "") {
			if (editMode) {
				editItem.firstChild.textContent = todoText;
				todoSubmitBtn.innerText = "Add Todo";
				editMode = false;
				editItem = null;
			} else {
				addTodoItem(todoText);
			}
			todoInput.value = "";
		} else {
			alert("Enter a valid task!");
		}
	});

	todoList.addEventListener("click", (event) => {
		const target = event.target;

		if (target.tagName === "BUTTON") {
			const todoItem = target.parentNode;
			if (target.innerText === "Delete") {
				todoItem.remove();
			} else if (target.innerText === "Edit") {
				editMode = true;
				editItem = todoItem;

				todoSubmitBtn.innerText = "Edit Todo";
				todoInput.value = todoItem.firstChild.textContent;
				todoInput.focus();
			}
		}
	});

	const addTodoItem = (todoText) => {
		const todoItem = document.createElement("li");
		const todoEditBtn = document.createElement("button");
		const todoDeleteBtn = document.createElement("button");

		todoItem.innerHTML = `<span> ${todoText} </span>`;
		todoEditBtn.innerText = "Edit";
		todoDeleteBtn.innerText = "Delete";

		todoItem.appendChild(todoEditBtn);
		todoItem.appendChild(todoDeleteBtn);

		todoList.appendChild(todoItem);
	};
});
