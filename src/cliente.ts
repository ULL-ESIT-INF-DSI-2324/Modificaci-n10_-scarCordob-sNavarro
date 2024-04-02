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

//   // Imprimimos la carpeta actual
//     const pwd = spawn("pwd");
//     pwd.stdout.pipe(process.stdout);
//   // Creamos un proceso hijo que ejecuta el comando cat
//   const cat = spawn("cat ../archivo.txt");
//   cat.stdout.pipe(process.stdout);
// });

// Primera toma de contacto con event emitter

