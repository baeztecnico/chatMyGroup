const express = require('express')
const cors = require('cors');
const { Socket } = require('socket.io');
const { socketController } = require('../sockets/controller');
class Server {

    constructor() {
        this.app = express();

        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {}




        //Middlewares
        this.middlewares();


        //this.routes();

        //configuracion sockets//
        this.sockets();

    }


    middlewares() {
        this.app.use(cors());

        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routers/auth'));
        this.app.use(this.paths.buscar, require('../routers/buscar'));
        this.app.use(this.paths.usuarios, require('../routers/users'));
        this.app.use(this.paths.uploads, require('../routers/uploads'));
        this.app.use(this.paths.categorias, require('../routers/categorias'));
        this.app.use(this.paths.productos, require('../routers/productos'));
    }
    sockets() {
        this.io.on('connection',socketController );
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;