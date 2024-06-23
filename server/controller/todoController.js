import Todo from '../modelle/todo.js';

export const alleTodosHolen = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error('Fehler beim Abrufen von Todos:', error);
        res.status(500).json({ message: error.message });
    }
};

export const todoHinzufuegen = async (req, res) => {
    const todo = new Todo({
        titel: req.body.titel,
        beschreibung: req.body.beschreibung,
        wichtigkeitsgrad: req.body.wichtigkeitsgrad,
        faelligkeitsdatum: req.body.faelligkeitsdatum,
        abgeschlossen: req.body.abgeschlossen,
        erstellungsdatum: req.body.erstellungsdatum
    });

    try {
        const neuesTodo = await todo.save();
        res.status(201).json(neuesTodo);
    } catch (error) {
        console.error('Fehler beim Hinzufügen einer neuen Todo:', error);
        res.status(400).json({ message: error.message });
    }
};

export const todoAktualisieren = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo nicht gefunden' });

        todo.titel = req.body.titel;
        todo.beschreibung = req.body.beschreibung;
        todo.wichtigkeitsgrad = req.body.wichtigkeitsgrad;
        todo.faelligkeitsdatum = req.body.faelligkeitsdatum;
        todo.abgeschlossen = req.body.abgeschlossen;

        const aktualisiertesTodo = await todo.save();
        res.json(aktualisiertesTodo);
    } catch (error) {
        console.error('Fehler beim Aktualisieren von Todo:', error);
        res.status(400).json({ message: error.message });
    }
};

export const todoAbrufen = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo nicht gefunden' });

        res.json(todo);
    } catch (error) {
        console.error('Fehler beim ToDo abrufen:', error);
        res.status(500).json({ message: error.message });
    }
};
