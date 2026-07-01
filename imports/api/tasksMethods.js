import { Meteor } from 'meteor/meteor';
import { Tasks } from './TasksCollection';

Meteor.methods({

  async 'tasks.insert'(taskData) {
    if (!this.userId) {
      throw new Meteor.Error('Não autorizado.', 'Você precisa estar logado para cadastrar tarefas.');
    }

    const user = await Meteor.users.findOneAsync(this.userId);
    const nomeCriador = user.username || user.profile?.nome || 'Usuário';

    return await Tasks.insertAsync({
      nome: taskData.nome,
      descricao: taskData.descricao,
      isPersonal: taskData.isPersonal || false,
      dataLimit: taskData.dataLimit || '',
      hora: taskData.hora,
      situacao: 'Cadastrada', 
      createdAt: new Date(),
      ownerId: this.userId,  
      criador: nomeCriador,  
    });
  },

  async 'tasks.remove'(taskId) {
    if (!this.userId) {
      throw new Meteor.Error('Não autorizado.', 'Você precisa estar logado para excluir tarefas.');
    }

    const task = await Tasks.findOneAsync(taskId);

    if (!task) {
      throw new Meteor.Error('Não encontrada.', 'A tarefa que você tentou excluir não existe.');
    }

    if (task.ownerId !== this.userId) {
      throw new Meteor.Error('Acesso negado.', 'Você só pode excluir as tarefas que você mesmo criou.');
    }

    await Tasks.removeAsync(taskId);
  },

  async 'tasks.update'(taskId, taskData) {
    if (!this.userId) {
      throw new Meteor.Error('Não autorizado.');
    }

    const task = await Tasks.findOneAsync(taskId);
    if (!task || task.ownerId !== this.userId) {
      throw new Meteor.Error('Apenas o criador pode alterar esta tarefa.');
    }

    await Tasks.updateAsync(taskId, {
      $set: {
        nome: taskData.nome,
        descricao: taskData.descricao,
        situacao: taskData.situacao,
        dataLimit: taskData.dataLimit,
        hora: taskData.hora,
      }
    });
  },

  async 'tasks.updateStatus'(taskId, novaSituacao) {
    if (!this.userId) {
      throw new Meteor.Error('Não autorizado.');
    }

    const task = await Tasks.findOneAsync(taskId);
    if (!task || task.ownerId !== this.userId) {
      throw new Meteor.Error('Apenas o criador pode alterar a situação.');
    }

    await Tasks.updateAsync(taskId, {
      $set: { situacao: novaSituacao }
    });
  },

  
  async 'tasks.getCounts'() {
    if (!this.userId) {
      throw new Meteor.Error('Não autorizado.', 'Você precisa estar logado para ver as métricas.');
    }

    
    const filtroVisibilidade = {
      $or: [
        { isPersonal: { $ne: true } },
        { ownerId: this.userId }
      ]
    };

    
    const totalCadastradas = await Tasks.find({ 
      situacao: 'Cadastrada',
      ...filtroVisibilidade
    }).countAsync();

    const totalEmAndamento = await Tasks.find({ 
      situacao: 'Em Andamento',
      ...filtroVisibilidade
    }).countAsync();

    const totalConcluidas = await Tasks.find({ 
      situacao: { $in: ['Concluída', 'Concluídas'] },
      ...filtroVisibilidade
    }).countAsync();

    return {
      cadastradas: totalCadastradas,
      emAndamento: totalEmAndamento,
      concluidas: totalConcluidas
    };
  }

});