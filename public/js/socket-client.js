
//referencias del html

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');
const txtRecibido = document.querySelector('#txtMensajeRec');


const socket = io();

socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = ' '
});

socket.on('disconnect', () => {
    lblOffline.style.display = ' ';
    lblOnline.style.display = 'none'
});


socket.on('enviar-mensaje', (payload) => {
    const { mensaje } = payload
    console.log(payload);
    txtRecibido.value = mensaje;

});


btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('desde el server ', id);
    });
});

