import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
// The WebApp object is essentially the server. It handles incoming requests and figures out what to do with them.
  // We can use it to add more middleware
import { WebApp } from 'meteor/webapp';
// connectroute is used to parse urls and do different things based on the form of the url
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

// Executed whenever a user visits with a route like 'localhost:3000/abcd'
  // req is the request object. It contains data about the incoming request
  // res is the response object, with data we want to send back to the user
  // next is a reference to the next middleware we need to run. There can be many middleware in an app,
    // and if we don't want our middleware to stop the request, we can initiate the next middleware
function onRoute(req, res, next) {
  // Take the token out of the url and try to find a matching link in the Links collection
    // find the one record where the token is equal to the token in the url (accessible through req.params)
  const link = Links.findOne({ token: req.params.token });
  // If we find a link object, redirect the user to the long url
  if (link) {
    // Set the status code of the response to 307 (redirect request) and provide the url to redirect to
    res.writeHead(307, { 'Location': link.url });
    // Ready to send the response back
    res.end();
  } else {
    // If we don't find a link object, send the user to our normal React app
    next();
  };
};
// ConnectRoute creates a middleware that will take an incoming http request
  // if the incoming request matches '/:token', it will execute the function in the second argument
  // (this is less meteor, more nodeJS)
const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});
// .use adds a middleware to our app
WebApp.connectHandlers.use(middleware);