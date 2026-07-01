import { Meteor } from 'meteor/meteor';
import { Tasks } from './TasksCollection';


const PAGE_LIMIT = 4;

Meteor.publish('tasks.all', function publishTasks(showCompleted, searchQuery, page = 1) {
  if (!this.userId) {
    return this.ready(); 
  }

  const query = {
    $or: [
      { isPersonal: { $ne: true } },
      { ownerId: this.userId }
    ]
  };

  if (!showCompleted) {
    query.situacao = { $ne: 'Concluída' };
  }

  if (searchQuery && searchQuery.trim() !== '') {
    query.nome = { $regex: searchQuery.trim(), $options: 'i' };
  }


  const skip = (page - 1) * PAGE_LIMIT;

 
  return Tasks.find(query, {
    sort: { createdAt: -1 },
    skip: skip,
    limit: PAGE_LIMIT
  });
});