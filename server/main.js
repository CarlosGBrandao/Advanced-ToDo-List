import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';
import '/imports/api/tasksPublications';

// Adicionamos o "async" antes da função do startup
Meteor.startup(async () => {
  
  // Usamos await e countAsync()
  if (await Tasks.find().countAsync() === 0) {
    console.log('Banco de dados vazio. Criando tarefas de teste...');

    
    await Tasks.insertAsync({
      nome: 'Aprender rotas no React',
      criador: 'sistema',
      ownerId: 'id_falso_123', 
      isPersonal: false,
      situacao: 'Cadastrada',
      createdAt: new Date(),
    });

    
    await Tasks.insertAsync({
      nome: 'Comprar presente de aniversário',
      criador: 'joao',
      ownerId: 'id_falso_456', 
      isPersonal: true, 
      situacao: 'Em Andamento',
      createdAt: new Date(),
    });

    console.log('Tarefas de teste criadas com sucesso!');
  }
});