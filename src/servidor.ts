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

import * as net from 'net';
import { spawn } from 'child_process';

const server = net.createServer((socket) => {
  console.log('Cliente conectado');

  socket.on('data', (data) => {
    // Obtenemos la ruta y la opción
    const [filePath, option] = data.toString().trim().split(' ');

    // Tenemos que verificar que la opcion es válida
    if (option !== '-l' && option !== '-w' && option !== '-c') {
      socket.write(`La opción ${option} no es válida`);
      socket.end(); // Aquí movimos socket.end() para cerrar la conexión
      return;
    }

    const cat = spawn('cat', [filePath]);

    let catOutput = '';

    cat.stdout.on('data', (chunk) => catOutput += chunk);

    // Comprobamos el error
    cat.stderr.on('data', (error) => {
      socket.write(`Error: ${error}`);
      socket.end();
      return; // Importante return
    });

    cat.on('close', () => {
      const wc = spawn('wc', ['-l', '-w', '-c']);

      wc.stdin.write(catOutput);
      wc.stdin.end();

      let wcOutput = '';

      wc.stdout.on('data', (chunk) => wcOutput += chunk);

      wc.on('close', () => {
        const wcOutputAsArray = wcOutput.trim().split(/\s+/);
        const lines = wcOutputAsArray[0];
        const words = wcOutputAsArray[1];
        const characters = wcOutputAsArray[2];

        const result = {
          filePath: filePath,
          lines: lines,
          words: words,
          characters: characters
        };

        const resultJSON = JSON.stringify(result);

        // Enviar los resultados al cliente como JSON
        socket.write(resultJSON);
        socket.end();
      });
    });
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  });
});

server.on('error', (err) => {
  console.error('Error en el servidor:', err.message);
});

server.listen(30600, () => {
  console.log('Servidor escuchando en el puerto 30600');
});