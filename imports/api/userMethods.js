import { Meteor } from 'meteor/meteor';

Meteor.methods({
  async 'users.updateProfile'(profileData) {
   
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

  
    await Meteor.users.updateAsync(this.userId, {
      $set: { profile: profileData }
    });
  }
});