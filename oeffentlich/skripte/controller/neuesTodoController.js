import { NeuesTodoAnsicht } from '../ansichten/neuesTodoAnsicht.js';
import { NeuesTodoService } from '../services/neuesTodoService.js';
import { Todo } from '../modelle/todo.js';

export class NeuesTodoController {
  constructor() {
    this.ansicht = new NeuesTodoAnsicht();
    this.service = new NeuesTodoService();

    this.ansicht.neuesTodoFormularErstellen(this);

    // Form gönderme olayını dinle
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.formSubmitted = false;
    this.ansicht.formular.addEventListener('submit', this.handleFormSubmit);
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.formSubmitted) return; // Formun daha önce gönderilip gönderilmediğini kontrol edin.
    this.formSubmitted = true; // Form gönderildi olarak işaretleyin.
    console.log("Form submit event triggered in NeuesTodoController");
    await this.neuesTodoSpeichern();
  }

  async neuesTodoSpeichern() {
    console.log("neuesTodoSpeichern called");
    const titel = this.ansicht.titelInput.input.value.trim();
    const beschreibung = this.ansicht.beschreibungTextarea.textarea.value.trim();
    const wichtigkeitsgrad = parseInt(this.ansicht.wichtigkeitsgradSelect.select.value, 10);
    const faelligkeitsdatum = this.ansicht.faelligkeitsdatumInput.input.value;
    const abgeschlossen = this.ansicht.abgeschlossenCheckbox.checked;

    // Form validasyonu
    this.ansicht.entferneFehlermeldung(this.ansicht.titelInput.input, this.ansicht.titelInput.error);
    this.ansicht.entferneFehlermeldung(this.ansicht.beschreibungTextarea.textarea, this.ansicht.beschreibungTextarea.error);
    this.ansicht.entferneFehlermeldung(this.ansicht.wichtigkeitsgradSelect.select, this.ansicht.wichtigkeitsgradSelect.error);
    this.ansicht.entferneFehlermeldung(this.ansicht.faelligkeitsdatumInput.input, this.ansicht.faelligkeitsdatumInput.error);

    let isValid = true;

    if (!titel) {
      this.ansicht.zeigeFehlermeldung(this.ansicht.titelInput.input, this.ansicht.titelInput.error, 'Bitte geben Sie einen Titel ein.');
      isValid = false;
    }
    if (!beschreibung) {
      this.ansicht.zeigeFehlermeldung(this.ansicht.beschreibungTextarea.textarea, this.ansicht.beschreibungTextarea.error, 'Bitte füllen Sie die Beschreibung aus.');
      isValid = false;
    }
    if (wichtigkeitsgrad < 1 || wichtigkeitsgrad > 5) {
      this.ansicht.zeigeFehlermeldung(this.ansicht.wichtigkeitsgradSelect.select, this.ansicht.wichtigkeitsgradSelect.error, 'Bitte wählen Sie einen Wichtigkeitsgrad zwischen 1 und 5.');
      isValid = false;
    }
    if (!faelligkeitsdatum) {
      this.ansicht.zeigeFehlermeldung(this.ansicht.faelligkeitsdatumInput.input, this.ansicht.faelligkeitsdatumInput.error, 'Bitte wählen Sie ein Fälligkeitsdatum.');
      isValid = false;
    }

    if (!isValid) {
      this.formSubmitted = false;
      return;
    }

    const neuesTodo = new Todo(
      titel,
      beschreibung,
      wichtigkeitsgrad,
      faelligkeitsdatum,
      abgeschlossen
    );

    try {
      console.log("Sending new todo:", neuesTodo);
      const todo = await this.service.todoHinzufuegen(neuesTodo);
      console.log("Yeni Todo eklendi:", todo);
      window.dispatchEvent(new CustomEvent('todoHinzugefuegt', { detail: todo }));
      // Yönlendirmeyi geciktirelim
      setTimeout(() => {
        window.location.href = '/'; // Ana sayfaya yönlendir
      }, 500); // 500 milisaniye gecikme ekliyoruz.
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Todos:', error);
      this.ansicht.zeigeFehlermeldung(this.ansicht.speichernButton, null, error.message);
      this.formSubmitted = false;
    }
  }
}
