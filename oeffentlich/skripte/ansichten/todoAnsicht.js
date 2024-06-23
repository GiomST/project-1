export class TodoAnsicht {
  constructor(controller) {
    this.controller = controller;
    this.app = document.getElementById('app');
    this.titel = this.createElement('h1', 'todo-titel');
    this.titel.textContent = 'ToDo App';
    this.form = this.createElement('form', 'todo-form');
    this.button = this.createElement('button', 'todo-button');
    this.button.textContent = 'Hinzufügen';

    this.darkModeButton = this.createElement('button', 'dark-mode-button');
    this.darkModeButton.textContent = 'Dark Mode';

    this.buttonContainer = this.createElement('div', 'button-container');
    this.buttonContainer.append(this.button, this.darkModeButton);

    this.todoList = this.createElement('ul', 'todo-list');
    this.app.append(this.titel, this.form, this.todoList);
    this.form.append(this.buttonContainer);

    this.sortierUndFilterBereich = this.createElement(
      'div',
      'sortier-filter-bereich'
    );
    this.sortierUndFilterBereich.innerHTML = `
            <button class="sortieren-nach-name">Nach Name sortieren</button>
            <button class="sortieren-nach-datum">Nach Datum sortieren</button>
            <button class="sortieren-nach-erstellungsdatum">Nach Erstellungsdatum sortieren</button>
            <button class="sortieren-nach-wichtigkeit">Nach Wichtigkeit sortieren</button>
            <button class="filter-erledigt">Erledigte filtern</button>
        `;
    this.app.insertBefore(this.sortierUndFilterBereich, this.todoList);

    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  createElement(tagName, className) {
    const element = document.createElement(tagName);
    if (className) element.classList.add(className);
    return element;
  }

  todoListAktualisieren(todos) {
    this.todoList.innerHTML = '';

    if (todos.length === 0) {
      const leeresElement = this.createElement('li', 'todo-item');
      leeresElement.textContent = 'Keine Todos gefunden';
      this.todoList.append(leeresElement);
      return;
    }

    todos.forEach((todo) => {
      const todoItem = this.createElement('li', 'todo-item');
      todoItem.dataset.id = todo._id;

      const dueDate = new Date(todo.faelligkeitsdatum);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const remainingDays =
        diffDays === 0
          ? 'Heute'
          : dueDate > today
            ? `in ${diffDays} Tagen`
            : `vor ${-diffDays} Tagen`;

      todoItem.innerHTML = `
                <span class="todo-faelligkeit">${remainingDays}</span>
                <span class="todo-status" data-abgeschlossen="${todo.abgeschlossen}">${todo.abgeschlossen ? '✔' : ''}</span>
                <span class="todo-text">${todo.titel}</span>
                <span class="todo-beschreibung"> ${todo.beschreibung ? todo.beschreibung.substring(0, 20) + (todo.beschreibung.length > 20 ? '...' : '') : ''} </span>
                <span class="todo-wichtigkeit">${'★'.repeat(todo.wichtigkeitsgrad)}</span>
                <button class="todo-bearbeiten">Bearbeiten</button>
            `;

      this.todoList.append(todoItem);

      const bearbeitenButton = todoItem.querySelector('.todo-bearbeiten');
      bearbeitenButton.addEventListener('click', () => {
        const todoId = todoItem.dataset.id;
        this.controller.todoBearbeiten(todoId); // Doğru ID ile fonksiyon çağrılıyor
      });
    });
  }
}
