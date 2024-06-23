
export class NeuesTodoAnsicht {
  constructor() {
    this.app = document.getElementById('app');
    this.formular = null;
    this.titelInput = null;
    this.beschreibungTextarea = null;
    this.wichtigkeitsgradSelect = null;
    this.faelligkeitsdatumInput = null;
    this.abgeschlossenCheckbox = null;
    this.speichernButton = null;
    this.controller = null;
  }

  neuesTodoFormularErstellen(controller) {
    this.controller = controller;

    this.app.innerHTML = '';

    this.formular = this.createElement('form', 'todo-formular');

    this.titelInput = this.createInputWithError('text', 'Titel');
    this.formular.appendChild(this.titelInput.container);

    this.beschreibungTextarea = this.createTextareaWithError('Beschreibung');
    this.formular.appendChild(this.beschreibungTextarea.container);

    this.wichtigkeitsgradSelect = this.createSelectWithError('todo-wichtigkeit', 'Wichtigkeitsgrad');
    for (let i = 1; i <= 5; i++) {
      const option = this.createElement('option');
      option.value = i;
      option.text = '★'.repeat(i);
      this.wichtigkeitsgradSelect.select.appendChild(option);
    }
    this.formular.appendChild(this.wichtigkeitsgradSelect.container);

    this.faelligkeitsdatumInput = this.createInputWithError('date', 'Fälligkeitsdatum');
    this.formular.appendChild(this.faelligkeitsdatumInput.container);

    const checkboxContainer = this.createElement('div', 'checkbox-container');
    this.abgeschlossenCheckbox = this.createElement('input', 'todo-abgeschlossen');
    this.abgeschlossenCheckbox.type = 'checkbox';
    this.abgeschlossenCheckbox.id = 'abgeschlossen';
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
      console.log("Form submit event triggered in NeuesTodoAnsicht");
      this.controller.handleFormSubmit(event);
    });
  }

  createElement(tagName, className) {
    const element = document.createElement(tagName);
    if (className) element.classList.add(className);
    return element;
  }

  createInputWithError(type, placeholder) {
    const container = this.createElement('div', 'input-container');
    const input = this.createElement('input', 'todo-input');
    input.type = type;
    input.placeholder = placeholder;
    const error = this.createElement('div', 'error-message');
    container.appendChild(input);
    container.appendChild(error);
    return { input, error, container };
  }

  createTextareaWithError(placeholder) {
    const container = this.createElement('div', 'input-container');
    const textarea = this.createElement('textarea', 'todo-beschreibung');
    textarea.placeholder = placeholder;
    const error = this.createElement('div', 'error-message');
    container.appendChild(textarea);
    container.appendChild(error);
    return { textarea, error, container };
  }

  createSelectWithError(className, placeholder) {
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
