const mongoose = require('mongoose');

class BaseDatos {

  conector = {};

  constructor (db,usuario,clave,servicio){
    this.db = db;
    this.usuario = usuario;
    this.clave = clave;
    this.servicio = servicio;
  }

  conectar(){

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      auth : {
        authSource: "admin"
      },
      user: this.usuario,
      pass:  this.clave,
    }


    this.conector = mongoose.connect(`mongodb://${this.servicio}:27017/${this.db}`, options);
    return this.conector;
  }
}


module.exports = BaseDatos;
