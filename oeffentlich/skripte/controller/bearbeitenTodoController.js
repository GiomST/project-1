import { BearbeitenTodoService } from '../services/bearbeitenTodoService.js';
import { BearbeitenTodoAnsicht } from '../ansichten/bearbeitenTodoAnsicht.js';

export class BearbeitenTodoController {
    constructor(todoId) {
        this.todoId = todoId;
        this.service = new BearbeitenTodoService();
        this.ansicht = new BearbeitenTodoAnsicht();
        this.todoAbrufen(this.todoId);
    }

    async todoAbrufen(id) {
        try {
            const todo = await this.service.todoAbrufen(id);
            this.ansicht.formularAnzeigen(todo, this);
        } catch (error) {
            console.error('Fehler beim Abrufen des Todos:', error);
        }
    }

    async todoSpeichern(todo) {
        try {
            await this.service.todoSpeichern(todo);
            window.location.href = '/';
        } catch (error) {
            console.error('Fehler beim Speichern des Todos:', error);
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const todo = this.ansicht.formulardatenAuslesen();
        let isValid = true;

        this.ansicht.entferneFehlermeldung(this.ansicht.titelInput.input, this.ansicht.titelInput.error);
        this.ansicht.entferneFehlermeldung(this.ansicht.beschreibungTextarea.textarea, this.ansicht.beschreibungTextarea.error);
        this.ansicht.entferneFehlermeldung(this.ansicht.wichtigkeitsgradSelect.select, this.ansicht.wichtigkeitsgradSelect.error);
        this.ansicht.entferneFehlermeldung(this.ansicht.faelligkeitsdatumInput.input, this.ansicht.faelligkeitsdatumInput.error);

        if (!todo.titel) {
            this.ansicht.zeigeFehlermeldung(this.ansicht.titelInput.input, this.ansicht.titelInput.error, 'Bitte geben Sie einen Titel ein.');
            isValid = false;
        }
        if (!todo.beschreibung) {
            this.ansicht.zeigeFehlermeldung(this.ansicht.beschreibungTextarea.textarea, this.ansicht.beschreibungTextarea.error, 'Bitte füllen Sie die Beschreibung aus.');
            isValid = false;
        }
        if (todo.wichtigkeitsgrad < 1 || todo.wichtigkeitsgrad > 5) {
            this.ansicht.zeigeFehlermeldung(this.ansicht.wichtigkeitsgradSelect.select, this.ansicht.wichtigkeitsgradSelect.error, 'Bitte wählen Sie einen Wichtigkeitsgrad zwischen 1 und 5.');
            isValid = false;
        }
        if (!todo.faelligkeitsdatum) {
            this.ansicht.zeigeFehlermeldung(this.ansicht.faelligkeitsdatumInput.input, this.ansicht.faelligkeitsdatumInput.error, 'Bitte wählen Sie ein Fälligkeitsdatum.');
            isValid = false;
        }

        if (isValid) {
            this.todoSpeichern(todo);
        }
    }
}
