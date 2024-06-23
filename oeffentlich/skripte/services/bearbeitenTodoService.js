export class BearbeitenTodoService {
  async todoAbrufen(id) {
      try {
          const response = await fetch(`/api/todos/${id}`);
          if (!response.ok) {
              throw new Error('Fehler beim Abrufen des Todos');
          }
          const todo = await response.json();
          return todo;
      } catch (error) {
          console.error('Fehler beim Abrufen des Todos:', error);
          throw error;
      }
  }

  async todoSpeichern(todo) {
      try {
          const response = await fetch(`/api/todos/${todo._id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(todo)
          });
          if (!response.ok) {
              throw new Error('Fehler beim Speichern des Todos');
          }
      } catch (error) {
          console.error('Fehler beim Speichern des Todos:', error);
          throw error;
      }
  }
}
