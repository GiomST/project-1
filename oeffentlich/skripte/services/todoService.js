export class TodoService {
  async alleTodosLaden() {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler beim Laden der Todos:', error);
      throw error;
    }
  }

  async todoHinzufuegen(todo) {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error('Fehler beim Hinzufügen des Todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Todos:', error);
      throw error;
    }
  }

  async todoAktualisieren(id, todo) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren des Todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Todos:', error);
      throw error;
    }
  }

  async todoAbrufen(id) {
    try {
      const response = await fetch(`/api/todos/${id}`);
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen des Todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler beim Abrufen des Todos:', error);
      throw error;
    }
  }
}
