export class Todo {
  constructor(titel, beschreibung, wichtigkeitsgrad, faelligkeitsdatum, abgeschlossen = false) {
    this.id = Date.now().toString();
    this.titel = titel;
    this.beschreibung = beschreibung;
    this.wichtigkeitsgrad = wichtigkeitsgrad;
    this.faelligkeitsdatum = new Date(faelligkeitsdatum).toISOString().slice(0, 10);
    this.abgeschlossen = abgeschlossen;
    this.erstellungsdatum = new Date().toISOString().slice(0, 10);
  }
}
