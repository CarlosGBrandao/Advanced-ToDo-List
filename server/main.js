import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';
import '/imports/api/tasksPublications';
import '/imports/api/userMethods';
import '/imports/api/tasksMethods';


Meteor.startup(async () => {
  

  if (await Tasks.find().countAsync() === 0) {

    
    await Tasks.insertAsync({
      nome: 'Aprender rotas no React',
      criador: 'sistema',
      ownerId: '123123123', 
      isPersonal: false,
      situacao: 'Cadastrada',
      createdAt: new Date(),
    });

    
    await Tasks.insertAsync({
      nome: 'Comprar presente',
      criador: 'joao',
      ownerId: '0345803845', 
      isPersonal: true, 
      situacao: 'Em Andamento',
      createdAt: new Date(),
    });

    console.log('Tarefas criadas');
  }
});