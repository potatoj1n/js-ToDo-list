
document.addEventListener('DOMContentLoaded', function () {
    const createBtn = document.getElementById('create-btn');
    const todoList = document.getElementById('list');

    createBtn.addEventListener('click', function () {
        const newTodo = prompt('새로운 할 일을 입력하세요.');
        if (newTodo) {
            addTodo(newTodo);
        }
    });
	function loadFromLocalStorage() {
        const data = localStorage.getItem("my_todos");

        if (data) {
            todos = JSON.parse(data);
        } else {
            // localStorage에 데이터가 없을 경우 초기화
            saveToLocalStorage();
        }
    }

    function addTodo(task) {
        const item = {
            id: new Date().getTime(),
            text: task,
            complete: false
        };

        todos.unshift(item);

        const { itemEl, inputEl, editBtnEl, removeBtnEl, checkbox } = createTodoElement(item);

        list.prepend(itemEl);

        inputEl.removeAttribute('disabled');
        inputEl.focus();

        saveToLocalStorage();

        checkbox.addEventListener('change', function () {
            item.complete = checkbox.checked;

            if (item.complete) {
                inputEl.classList.add('complete');
            } else {
                inputEl.classList.remove('complete');
            }

            saveToLocalStorage();
        });

        inputEl.addEventListener('input', function () {
            item.text = inputEl.value;
        });

        inputEl.addEventListener('blur', function () {
            inputEl.setAttribute('disabled', '');
            saveToLocalStorage();
        });

        editBtnEl.addEventListener('click', function () {
            inputEl.removeAttribute('disabled');
            inputEl.focus();
        });


    }

    function createTodoElement(item) {
        const itemEl = document.createElement('div');
        itemEl.classList.add('item');
		itemEl.dataset.itemId = item.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.complete;

        if (item.complete) {
            itemEl.classList.add('complete');
        }

        const inputEl = document.createElement('input');
        inputEl.type = 'text';
        inputEl.value = item.text;
        inputEl.setAttribute('disabled', '');

        const actionsEl = document.createElement('div');
        actionsEl.classList.add('actions');

        const editBtnEl = document.createElement('button');
        editBtnEl.classList.add('material-icons');
        editBtnEl.innerText = 'edit';

        const removeBtnEl = document.createElement('button');
        removeBtnEl.classList.add('material-icons', 'remove-btn');
        removeBtnEl.innerText = 'remove_circle';

        actionsEl.append(editBtnEl);
        actionsEl.append(removeBtnEl);

        itemEl.append(checkbox);
        itemEl.append(inputEl);
        itemEl.append(actionsEl);

		removeBtnEl.addEventListener("click", function () {
			todos = todos.filter(t => t.id.toString() !== item.id);
			itemEl.remove();
			saveToLocalStorage();

			// localStorage에서도 해당 아이템을 삭제
			const data = JSON.stringify(todos);
			localStorage.setItem("my_todos", data);
		});

        return { itemEl, inputEl, editBtnEl, removeBtnEl, checkbox };
    }

    function saveToLocalStorage() {
        const data = JSON.stringify(todos);
        localStorage.setItem('my_todos', data);
    }

    function loadFromLocalStorage() {
        const data = localStorage.getItem('my_todos');

        if (data) {
            todos = JSON.parse(data);
        }
    }

    function displayTodos() {
        loadFromLocalStorage();

        for (let i = 0; i < todos.length; i++) {
            const item = todos[i];

            const { itemEl } = createTodoElement(item);

            list.append(itemEl);
        }
    }

    displayTodos();
});
