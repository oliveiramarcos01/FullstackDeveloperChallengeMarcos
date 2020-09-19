var collection = "Clients";

function find(callback){  
    global.conn.collection(collection).find({}).toArray(callback);
}


module.exports = { 
    find
}

