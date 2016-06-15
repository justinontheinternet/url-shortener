import { Mongo } from 'meteor/mongo';
// When adding a Meteor method, we generally want to define it in the same file that contains the collection it will update

// We will be able to reference links.insert as a function
    // Named 'links.insert' to make the relationship to collection explicit
Meteor.methods({
  'links.insert': function(url) {
    console.log("saving url", url);
  }
});

export const Links = new Mongo.Collection('links');