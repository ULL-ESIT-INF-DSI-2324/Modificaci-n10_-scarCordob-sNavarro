/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Curso: 3º
 * Autor: Óscar Cordobés Navarro
 * Correo: alu0101478081@ull.edu.es
 * Fecha: 02/04/2024
 */

// --------------------------------------------- EJEMPLO DE SOCKETS ---------------------------------------------


/**
 * Lo que estamos haciendo aquí es crear un servidor
 * Y cuando se produzca una conexión, se envía un mensaje al cliente
 * con la funcion connection.write()
 * 
 * Y Cuando se produce una desconexión, se muestra un mensaje por consola en el servidor
 */
// import net from 'net';

// net.createServer((connection) => {
//   console.log('A client has connected.');

//   connection.write(`Connection established.`);

//   connection.on('close', () => {
//     console.log('A client has disconnected.');
//   });
// }).listen(60300, () => {
//   console.log('Waiting for clients to connect.');
// });

// OTRO EJEMPLO MAS COMPLEJO
// import net from 'net';
// import {watchFile} from 'fs';

/**
 * Lo que estamos haciendo en este código es que vamos a crear el servidor
 * "apuntando" a un archivo que será visualizado constantemente con el watchfile
 * todos los cambios se los pasaremos al cliente
 */
// if (process.argv.length !== 3) {
//   console.log('Please, provide a filename.');
// } else {
//   const fileName = process.argv[2];

//   net.createServer((connection) => {
//     console.log('A client has connected.');

//     connection.write(`Connection established: watching file ${fileName}.\n`);

//     watchFile(fileName, (curr, prev) => {
//       connection.write(`Size of file ${fileName} was ${prev.size}.\n`);
//       connection.write(`Size of file ${fileName} now is ${curr.size}.\n`);
//     });

//     connection.on('close', () => {
//       console.log('A client has disconnected.');
//     });
//   }).listen(60300, () => {
//     console.log('Waiting for clients to connect.');
//   });
// }

// AHORA CON JSON's
// import net from 'net';
// import {watchFile} from 'fs';
/**
 * Lo que estamos haciendo es crear un servidor otra vez apuntado al archvio que le
 * pasamos por parámetros al ejecutar el servidor. Lo que hacemos es pasarle un JSON al cliente
 * 
 * Y nos ponemos a observar al archivo, cada vez que cambie lo que hacemos es enviar un JSON en vez de 
 * una cadena de texto
 */

// if (process.argv.length !== 3) {
//   console.log('Please, provide a filename.');
// } else {
//   const fileName = process.argv[2];

//   net.createServer((connection) => {
//     console.log('A client has connected.');

//     connection.write(JSON.stringify({'type': 'watch', 'file': fileName}) +
//       '\n');

//     watchFile(fileName, (curr, prev) => {
//       connection.write(JSON.stringify({
//         'type': 'change', 'prevSize': prev.size, 'currSize': curr.size}) +
//          '\n');
//     });

//     connection.on('close', () => {
//       console.log('A client has disconnected.');
//     });
//   }).listen(60300, () => {
//     console.log('Waiting for clients to connect.');
//   });
// }


// VERSION PARA ENVIAR DOS DATOS SEPARADOS
/**
 * Lo que estamos es enviando los paquetes y cuando se envía el segundo paquete
 * se envia un mensaje de desconexión y se cierra la conexión
 */

import net from 'net';

const server = net.createServer((connection) => {
  console.log('A client has connected.');

  const firstData = '{"type": "change", "prevSize": 13';
  const secondData = ', "currSize": 27}\n';

  connection.write(firstData);

  const timer = setTimeout(() => {
    connection.write(secondData);
    connection.end();
  }, 500);

  connection.on('end', () => {
    clearTimeout(timer);
  });

  connection.on('close', () => {
    console.log('A client has disconnected');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});