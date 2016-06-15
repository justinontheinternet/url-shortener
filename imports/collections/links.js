import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

// When adding a Meteor method, we generally want to define it in the same file that contains the collection it will update
Meteor.methods({
  // We will be able to reference links.insert as a function
    // Named 'links.insert' to make the relationship to collection explicit
  'links.insert': function(url) {
    // check has some simple built-in validations
      // Match.Where allows us to run a custom validation (below). If it returns a truthy value, then 'check' will pass
      // isUri is from valid-url package. If valid, returns url. If invalid, returns 'undefined'.
    check(url, Match.Where(url => validUrl.isUri(url)));
  }
});

export const Links = new Mongo.Collection('links');