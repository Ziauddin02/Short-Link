import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/user';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

  // code to run on server at startup
Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if(link) {
    res.statusCode = 302;
    res.setHeader('Location', link.url);
    res.end();
    Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }

    
  });

  WebApp.connectHandlers.use((req, res, next) => {
    console.log('THis is from my custom');
    console.log(req.url, req.method, req.headers, req.query);
    // Set HTTP
    // res.statusCode = 404;
    // Set HTTP Headers
    // res.setHeader('my-custom-header', 'Zia was here!');
    // Set HTTP Body
    // res.write('<h1>This my middleware</h1>');
    // End HTTP Resquest
    // res.end();
    
    next();
    
  });
});
