export class BearbeitenTodoAnsicht {
    constructor() {
        this.app = document.getElementById('app');
        this.formular = null;
        this.titelInput = null;
        this.beschreibungTextarea = null;
        this.wichtigkeitsgradSelect = null;
        this.faelligkeitsdatumInput = null;
        this.abgeschlossenCheckbox = null;
        this.speichernButton = null;
        this.todoId = null;
    }

    formularAnzeigen(todo, controller) {
        this.app.innerHTML = ''; 

        this.todoId = todo._id;

        this.formular = this.createElement('form', 'todo-formular');

        this.titelInput = this.createInputWithError('text', 'Titel', todo.titel);
        this.formular.appendChild(this.titelInput.container);

        this.beschreibungTextarea = this.createTextareaWithError('Beschreibung', todo.beschreibung);
        this.formular.appendChild(this.beschreibungTextarea.container);

        this.wichtigkeitsgradSelect = this.createSelectWithError('todo-wichtigkeit', 'Wichtigkeitsgrad', todo.wichtigkeitsgrad);
        for (let i = 1; i <= 5; i++) {
            const option = this.createElement('option');
            option.value = i;
            option.text = '★'.repeat(i);
            if (i === todo.wichtigkeitsgrad) {
                option.selected = true;
            }
            this.wichtigkeitsgradSelect.select.appendChild(option);
        }
        this.formular.appendChild(this.wichtigkeitsgradSelect.container);

        this.faelligkeitsdatumInput = this.createInputWithError('date', 'Fälligkeitsdatum', todo.faelligkeitsdatum.split('T')[0]);
        this.formular.appendChild(this.faelligkeitsdatumInput.container);

        const checkboxContainer = this.createElement('div', 'checkbox-container');
        this.abgeschlossenCheckbox = this.createElement('input', 'todo-abgeschlossen');
        this.abgeschlossenCheckbox.type = 'checkbox';
        this.abgeschlossenCheckbox.id = 'abgeschlossen';
        this.abgeschlossenCheckbox.checked = todo.abgeschlossen;
        checkboxContainer.appendChild(this.abgeschlossenCheckbox);
      
        const label = this.createElement('label', 'checkbox-label');
        label.htmlFor = 'abgeschlossen';
        label.textContent = 'Abgeschlossen';
        checkboxContainer.appendChild(label);

        this.formular.appendChild(checkboxContainer);

        this.speichernButton = this.createElement('button', 'todo-speichern');
        this.speichernButton.textContent = 'Speichern';
        this.speichernButton.type = 'submit';
        this.formular.appendChild(this.speichernButton);

        this.app.appendChild(this.formular);

        this.formular.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log("Form submit event triggered in BearbeitenTodoAnsicht");
            controller.handleFormSubmit(event);
        });
    }

    formulardatenAuslesen() {
        return {
            _id: this.todoId,
            titel: this.titelInput.input.value.trim(),
            beschreibung: this.beschreibungTextarea.textarea.value.trim(),
            wichtigkeitsgrad: parseInt(this.wichtigkeitsgradSelect.select.value, 10),
            faelligkeitsdatum: this.faelligkeitsdatumInput.input.value, // Ensure this is not empty
            abgeschlossen: this.abgeschlossenCheckbox.checked
        };
    }

    createElement(tagName, className) {
        const element = document.createElement(tagName);
        if (className) element.classList.add(className);
        return element;
    }

    createInputWithError(type, placeholder, value = '') {
        const container = this.createElement('div', 'input-container');
        const input = this.createElement('input', 'todo-input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value;
        const error = this.createElement('div', 'error-message');
        container.appendChild(input);
        container.appendChild(error);
        return { input, error, container };
    }

    createTextareaWithError(placeholder, value = '') {
        const container = this.createElement('div', 'input-container');
        const textarea = this.createElement('textarea', 'todo-beschreibung');
        textarea.placeholder = placeholder;
        textarea.value = value;
        const error = this.createElement('div', 'error-message');
        container.appendChild(textarea);
        container.appendChild(error);
        return { textarea, error, container };
    }

    createSelectWithError(className, placeholder, selectedValue = '') {
        const container = this.createElement('div', 'input-container');
        const select = this.createElement('select', className);
        const error = this.createElement('div', 'error-message');
        container.appendChild(select);
        container.appendChild(error);
        return { select, error, container };
    }

    zeigeFehlermeldung(inputElement, errorElement, nachricht) {
        errorElement.textContent = nachricht;
        errorElement.style.display = 'block';
        inputElement.classList.add('input-error');
    }

    entferneFehlermeldung(inputElement, errorElement) {
        errorElement.style.display = 'none';
        inputElement.classList.remove('input-error');
    }
}
