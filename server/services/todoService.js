import mongodb from 'mongodb';

class TodoService {
    constructor(db) {
        this.collection = db.collection('todos');
    }

    async alleTodosLaden() {
        return await this.collection.find({}).toArray();
    }

    async todoHinzufuegen(todo) {
        const result = await this.collection.insertOne(todo);
        return result.ops[0];
    }

    async todoAbrufen(id) {
        return await this.collection.findOne({ _id: new mongodb.ObjectId(id) });
    }

    async todoAktualisieren(id, todo) {
        const result = await this.collection.updateOne(
            { _id: new mongodb.ObjectId(id) },
            { $set: todo }
        );
        return result.modifiedCount > 0 ? this.todoAbrufen(id) : null;
    }
}

export default TodoService;
