import { TodoAnsicht } from '../ansichten/todoAnsicht.js';
import { TodoService } from '../services/todoService.js';
import { NeuesTodoController } from './neuesTodoController.js';
import { BearbeitenTodoController } from './bearbeitenTodoController.js';

export class TodoController {
    constructor() {
        this.todos = [];
        this.ansicht = new TodoAnsicht(this);
        this.service = new TodoService();
        this.erledigtFilterAktif = false;
        this.sortierung = 'erstellungsdatum';
        this.sortierungRichtung = 'aufsteigend';

        this.eventListenerHinzufuegen();

        this.alleTodosLaden();

        window.addEventListener('todoHinzugefuegt', this.handleTodoHinzugefuegt.bind(this));
    }

    handleTodoHinzugefuegt(event) {
        this.todoHinzufuegen(event.detail);
    }

    todoHinzufuegen(todo) {
        const todoExistiert = this.todos.some(t => t._id === todo._id);
        if (!todoExistiert) {
            this.todos.push(todo);
            this.todosSortieren();
        }
    }

    alleTodosLaden() {
        this.service.alleTodosLaden()
            .then(todos => {
                this.todos = todos;
                this.todosSortieren();
                console.log('Alle Todos geladen:', this.todos);
            })
            .catch(error => {
                console.error('Fehler beim Laden der Todos:', error);
            });
    }

    eventListenerHinzufuegen() {
        this.ansicht.todoList.addEventListener('click', (event) => {
            if (event.target.classList.contains('todo-bearbeiten')) {
                const todoId = event.target.parentElement.dataset.id;
                console.log("Todo ID (EventListener):", todoId);
                this.todoBearbeiten(todoId);
            }
        });

        this.ansicht.sortierUndFilterBereich.addEventListener('click', (event) => {
            if (event.target.classList.contains('sortieren-nach-name')) {
                this.toggleSortierung('name');
            } else if (event.target.classList.contains('sortieren-nach-datum')) {
                this.toggleSortierung('datum');
            } else if (event.target.classList.contains('sortieren-nach-erstellungsdatum')) {
                this.toggleSortierung('erstellungsdatum');
            } else if (event.target.classList.contains('sortieren-nach-wichtigkeit')) {
                this.toggleSortierung('wichtigkeit');
            } else if (event.target.classList.contains('filter-erledigt')) {
                this.erledigtFilterAktif = !this.erledigtFilterAktif;
                this.erledigteTodosFiltern(this.erledigtFilterAktif);
            }
        });

        this.ansicht.button.addEventListener('click', (event) => {
            event.preventDefault();
            new NeuesTodoController();
        });

        // Dark Mode butonuna tıklama olayını dinle
        this.ansicht.darkModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const darkModeAktiv = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', darkModeAktiv);
        });
    }

    toggleSortierung(sortierung) {
        if (this.sortierung === sortierung) {
            this.sortierungRichtung = this.sortierungRichtung === 'aufsteigend' ? 'absteigend' : 'aufsteigend';
        } else {
            this.sortierung = sortierung;
            this.sortierungRichtung = 'aufsteigend';
            if (sortierung === 'wichtigkeit') {
                this.sortierungRichtung = 'absteigend';
            }
        }
        console.log(`Sortiertyp: ${this.sortierung}, Richtung: ${this.sortierungRichtung}`);
        this.todosSortieren();
    }

    todosSortieren() {
        console.log('Sortierung läuft:', this.sortierung, this.sortierungRichtung);
        if (this.sortierung === 'name') {
            this.todosNachNameSortieren();
        } else if (this.sortierung === 'datum') {
            this.todosNachDatumSortieren();
        } else if (this.sortierung === 'erstellungsdatum') {
            this.todosNachErstellungsdatumSortieren();
        } else if (this.sortierung === 'wichtigkeit') {
            this.todosNachWichtigkeitSortieren();
        }
    }

    todosNachNameSortieren() {
        this.todos.sort((a, b) => {
            const nameA = a.titel?.toLowerCase() || '';
            const nameB = b.titel?.toLowerCase() || '';
            if (nameA < nameB) return this.sortierungRichtung === 'aufsteigend' ? -1 : 1;
            if (nameA > nameB) return this.sortierungRichtung === 'aufsteigend' ? 1 : -1;
            return 0;
        });
        console.log('Sortierte Todos (Name):', this.todos);
        this.ansicht.todoListAktualisieren(this.todos);
    }

    todosNachDatumSortieren() {
        this.todos.sort((a, b) => {
            const datumA = new Date(a.faelligkeitsdatum);
            const datumB = new Date(b.faelligkeitsdatum);
            return this.sortierungRichtung === 'aufsteigend' ? datumA - datumB : datumB - datumA;
        });
        console.log('Sortierte Todos (Datum):', this.todos);
        this.ansicht.todoListAktualisieren(this.todos);
    }

    todosNachErstellungsdatumSortieren() {
        this.todos.sort((a, b) => {
            const datumA = new Date(a.erstellungsdatum);
            const datumB = new Date(b.erstellungsdatum);
            return this.sortierungRichtung === 'aufsteigend' ? datumA - datumB : datumB - datumA;
        });
        console.log('Sortierte Todos (Erstellungsdatum):', this.todos);
        this.ansicht.todoListAktualisieren(this.todos);
    }

    todosNachWichtigkeitSortieren() {
        this.todos.sort((a, b) => {
            return this.sortierungRichtung === 'aufsteigend' ? a.wichtigkeitsgrad - b.wichtigkeitsgrad : b.wichtigkeitsgrad - a.wichtigkeitsgrad;
        });
        console.log('Sortierte Todos (Wichtigkeit):', this.todos);
        this.ansicht.todoListAktualisieren(this.todos);
    }

    erledigteTodosFiltern(anzeigen = true) {
        const gefilterteTodos = anzeigen
            ? this.todos.filter(todo => !todo.abgeschlossen)
            : this.todos;
        this.ansicht.todoListAktualisieren(gefilterteTodos);
    }

    todoBearbeiten(todoId) {
        if (todoId) {
            new BearbeitenTodoController(todoId);
        } else {
            console.error('Ungültige Todo-ID:', todoId);
        }
    }
}
