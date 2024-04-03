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

// ----------------------- MODIFICACION -----------------------------

import * as net from 'net';

const client = new net.Socket();

const filePath = process.argv[2];
const option = process.argv[3];

if (process.argv.length !== 4) {
  console.log('Por favor, proporcione una ruta de archivo y una opción.');
  process.exit();
}

client.connect(30600, 'localhost', () => {
  console.log('Conectado al servidor');
  
  // Enviar la ruta del archivo al servidor
  client.write(filePath + ' ' +  option);
});


client.on('data', (data) => {

  // Asumiendo que los datos recibidos llegan en un solo bloque
  const resultJSON = data.toString();

  // Lo mejor hubiera sido  ir leyendo los datos recibidos y acumulándolos en una variable
  // para poder parsearlos como JSON al final. Teniendo en cuenta los retornos de carro.
  // Construimos el json con los datos recibidos

  try {
    // Intentar parsear los datos como JSON
    const result = JSON.parse(resultJSON);

    if (result.error) {
      console.error(result.error);
    } else {
      switch (option) {
        case '-l':
          console.log(` - Líneas: ${result.lines}`);
          break;
        case '-w':
          console.log(` - Palabras: ${result.words}`);
          break;
        case '-c':
          console.log(` - Caracteres: ${result.characters}`);
          break;
        default:
          console.log('Opción no válida RECEPCIÓN EN EL CLIENTE');
          break;
      }
    }
  } catch (error) {
    // Si hay un error al parsear, mostrar mensaje como texto
    console.error(resultJSON);
  }

  client.end();
});

client.on('close', () => {
  console.log('Conexión cerrada');
});