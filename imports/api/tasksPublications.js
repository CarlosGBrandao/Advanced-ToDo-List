import { Meteor } from 'meteor/meteor';
import { Tasks } from './TasksCollection';

Meteor.publish('tasks.all', function publishTasks() {
  // Garantia de segurança: se não houver usuário logado, não retorna nada
  if (!this.userId) {
    return this.ready(); 
  }

  // O MongoDB retorna tarefas que atendam a pelo menos UMA das condições do $or
  return Tasks.find({
    $or: [
      { isPersonal: { $ne: true } }, // Condição 1: A tarefa NÃO é pessoal (é pública)
      { ownerId: this.userId }       // Condição 2: A tarefa É pessoal, mas pertence ao usuário logado
    ]
  });
});