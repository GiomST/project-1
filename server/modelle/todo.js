import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    titel: {
        type: String,
        required: true
    },
    beschreibung: String,
    wichtigkeitsgrad: {
        type: Number,
        required: true
    },
    faelligkeitsdatum: {
        type: Date,
        required: true
    },
    abgeschlossen: {
        type: Boolean,
        default: false
    },
    erstellungsdatum: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
