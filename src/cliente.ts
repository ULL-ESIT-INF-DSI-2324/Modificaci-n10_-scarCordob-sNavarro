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

// EJEMPLO DE READFILE Y WRITEFILE

// import { readFile } from "fs";
// import { writeFile } from "fs";

// writeFile("archivo.txt", "Hola mundo", (error) => {
//   if (error) {
//     console.log("Error al escribir el archivo");
//     return;
//   }
//   console.log("Archivo escrito correctamente");
// });

// readFile("archivo.txt", "utf-8", (error, data) => {
//   if (error) {
//     console.log("Error al leer el archivo");
//     return;
//   }
//   console.log(data);
// });

// EJEMPLO WATCHFILE
// import {watchFile} from 'fs';

// watchFile('archivo.txt', (curr, prev) => {
//   console.log(`File size was ${prev.size} bytes before it was modified`);
//   console.log(`Now file size is ${curr.size} bytes`);
// });

// EJEMPLO DE SPAWN -> No funciona el windows
// import { watchFile } from "fs";
// import { spawn } from "child_process";

// // Mientras observamos el archivo, mostramos el contenido del archivo
// watchFile("archivo.txt", (curr, prev) => {
//   console.log(`File was ${prev.size} bytes before it was modified.`);
//   console.log(`Now file is ${curr.size} bytes.`);

//   // Creamos un proceso hijo que ejecuta el comando cat
//   const cat = spawn("cat", ["archivo.txt"]);
//   cat.stdout.pipe(process.stdout);
// });

// Primera toma de contacto con event emitter
/**
 * Lo que estamos haciendo aquí es generar un proceso que ejecuta un comando, lo dejamos en segundo plano
 * y va emitiendo ciertos eventos, en este caso emite eventos de tipo data, que son los datos que se van
 * leyendo del proceso hijo. Y cuando el proceso hijo termina, emite un evento de tipo close, donde
 * ya podemos confirmar que el proceso ya ha terminado y se ha caturado toda la salida.
 */

// import {watchFile} from 'fs';
// import {spawn} from 'child_process';

// watchFile('archivo.txt', (curr, prev) => {
//   console.log(`File was ${prev.size} bytes before it was modified.`);
//   console.log(`Now file is ${curr.size} bytes.`);

//   const wc = spawn('wc', ['archivo.txt']);

//   let wcOutput = '';
//   wc.stdout.on('data', (piece) => wcOutput += piece);

//   wc.on('close', () => {
//     const wcOutputAsArray = wcOutput.split(/\s+/);
//     console.log(`File archivo.txt has ${wcOutputAsArray[1]} lines`);
//     console.log(`File archivo.txt has ${wcOutputAsArray[2]} words`);
//     console.log(`File archivo.txt has ${wcOutputAsArray[3]} characters`);
//     console.log(wcOutputAsArray[4]);
//   });
// });

// EJEMPLO DE LECTURA Y ESCRITURA ASINCRONA DE FICHEROS -> CREACION DE STREAMS DE LECTURA Y ESCRITURA
/**
 * Aquí lo que estoy haciendo es crear un ReadStream, que es un stream de lectura.
 *
 * Este stream de lectura se encarga de leer el archivo archivo.txt y emitir eventos de tipo data
 * y lo que lo hace especial es que va poco a poco leyendo el archivo, en trozos.
 */
// import {createReadStream} from 'fs';

// const inputStream = createReadStream('archivo.txt');

// inputStream.on('data', (piece) => {
//   process.stdout.write(piece);
// });

// inputStream.on('error', (err) => {
//   process.stderr.write(err.message);
// });

// --------------------------------------------- EJEMPLO DE SOCKETS ---------------------------------------------

/**
 * Y ahora lo que  estamos haciendo es parsear esa informacion en un JSON real
 */

// import net from "net";

// const client = net.connect({ port: 60300 });

// client.on("data", (dataJSON) => {
//   const message = JSON.parse(dataJSON.toString());

//   if (message.type === "watch") {
//     console.log(`Connection established: watching file ${message.file}`);
//   } else if (message.type === "change") {
//     console.log("File has been modified.");
//     console.log(`Previous size: ${message.prevSize}`);
//     console.log(`Current size: ${message.currSize}`);
//   } else {
//     console.log(`Message type ${message.type} is not valid`);
//   }
// });

/**
 * Código mejorado para gestionar que los mensajes lleguen incompletos
 * 
 * Como por ejemplo si creamos un stream, puede ser que el mensaje llegue incompleto
 * 
 * Y lo que hacemos es ir guardanto la informacion en los eventos de tipo data
 * Y cuando se obtenga un evento de tipo end, es cuando se procesa toda la informacion
 */
import net from 'net';

const client = net.connect({port: 60300});

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

client.on('end', () => {
  const message = JSON.parse(wholeData);

  if (message.type === 'watch') {
    console.log(`Connection established: watching file ${message.file}`);
  } else if (message.type === 'change') {
    console.log('File has been modified.');
    console.log(`Previous size: ${message.prevSize}`);
    console.log(`Current size: ${message.currSize}`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});