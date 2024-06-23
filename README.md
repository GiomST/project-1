# Todo App

## Inhaltsverzeichnis

1. [Einführung](#einführung)
2. [Installation](#installation)
3. [Verwendung](#verwendung)
4. [API-Endpunkte](#api-endpunkte)
5. [Technologien](#technologien)
6. [Lizenz](#lizenz)
7. [Kontakt](#kontakt)

## Einführung

Diese Todo App ist eine einfache Webanwendung, die es Benutzern ermöglicht, Aufgaben zu erstellen, zu bearbeiten, zu löschen und anzuzeigen. Die Anwendung wurde mit HTML, CSS, JavaScript und Node.js entwickelt und verwendet MongoDB als Datenbank.

## Installation

### Voraussetzungen

- Node.js (Version 14 oder höher)
- npm (Node Package Manager)
- MongoDB

### Schritte

1. **Repository klonen:**

    ```bash
    git clone https://github.com/GiomST/project-1
    cd todo-app
    ```

2. **Abhängigkeiten installieren:**

    ```bash
    npm install
    ```

3. **Datenbank konfigurieren:**

    Stellen Sie sicher, dass MongoDB auf Ihrem lokalen Computer ausgeführt wird. Standardmäßig verbindet sich die Anwendung mit `mongodb://localhost:27017/todos`.

4. **Umgebungsvariablen konfigurieren:**

    Erstellen Sie eine `.env`-Datei im Stammverzeichnis des Projekts und fügen Sie die folgenden Variablen hinzu:

    ```plaintext
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/todos
    ```

5. **Entwicklungsserver starten:**

    ```bash
    npm run dev
    ```

    Die Anwendung wird unter `http://localhost:3000` ausgeführt.

## Verwendung

Nach dem Start der Anwendung können Sie im Browser die Todo App aufrufen und die folgenden Funktionen nutzen:

- **Aufgabe hinzufügen:** Geben Sie den Titel, die Beschreibung, das Fälligkeitsdatum und die Wichtigkeit der Aufgabe ein und klicken Sie auf "Hinzufügen".
- **Aufgabe bearbeiten:** Klicken Sie auf die Schaltfläche "Bearbeiten" neben einer Aufgabe, um deren Details zu ändern.
- **Aufgabe löschen:** Klicken Sie auf die Schaltfläche "Löschen" neben einer Aufgabe, um sie zu entfernen.
- **Aufgabe als erledigt markieren:** Klicken Sie auf die Schaltfläche "Erledigt" neben einer Aufgabe, um sie als erledigt zu markieren.



## API-Endpunkte
GET /api/todos: Holt alle Todos
POST /api/todos: Erstellt ein neues Todo
GET /api/todos/
: Holt ein einzelnes Todo basierend auf der ID
PUT /api/todos/
: Aktualisiert ein Todo basierend auf der ID
DELETE /api/todos/
: Löscht ein Todo basierend auf der ID

## Technologien
Frontend:
HTML
CSS
JavaScript
Backend:
Node.js
Express.js
MongoDB

## Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die LICENSE Datei für Details.

## Kontakt
Falls Sie Fragen oder Vorschläge haben, können Sie sich gerne an uns wenden:

Guillaume Thomassin - guillaume.thomassin@ost.ch
Projekt-Repository: https://github.com/GiomST/project-1
Vielen Dank, dass Sie unsere Todo-App verwenden!