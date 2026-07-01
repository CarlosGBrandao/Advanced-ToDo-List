import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';
import '/imports/api/tasksPublications';
import '/imports/api/userMethods';
import '/imports/api/tasksMethods';


Meteor.startup(async () => {
  

  if (await Tasks.find().countAsync() === 0) {

    
    await Tasks.insertAsync({
      nome: 'TAREFAS TESTE',
        descricao: 'tarefa automatica',
        isPersonal: false,
        dataLimit: '2026-12-31',
        hora: '12:00',
        situacao: 'Cadastrada',
        createdAt: new Date(),
        ownerId: '012301230123', 
        criador: 'Sistema'
    });

    
    await Tasks.insertAsync({
       nome: 'TAREFAS AUTOMATICA',
        descricao: 'tarefa automatica para testes',
        isPersonal: false,
        dataLimit: '2026-12-31',
        hora: '14:00',
        situacao: 'Cadastrada',
        createdAt: new Date(),
        ownerId: '0123012301232323', 
        criador: 'Sistema'
    });

    console.log('Tarefas criadas');
  }
});