var clients = require('../collections/clients.js');


module.exports = function (app) { 


  app.get('/api/clients', function (req, res) {  
    clients.find((e, docs) => {
      if(e) { return res.send(e); }else{
        res.send(docs);  
      } 
    })
  }); 
  
     
}

