export class NeuesTodoService {
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
}

