const selecciones = [
	'Qatar',
	'Belgica',
	'Brasil',
	'Francia',
	'Argentina',
	'Inglaterra',
	'España',
	'Portugal',
	'Dinamarca',
	'Holanda',
	'Alemania',
	'Suiza',
	'Croacia',
	'Uruguay',
	'Mexico',
	'Estados Unidos',
	'Iran',
	'Japon',
	'Serbia',
	'Corea',
	'Tunez',
	'Polonia',
	'Marruecos',
	'Senegal',
	'Arabia',
	'Ecuador',
	'Ghana',
	'Canada',
	'Camerun',
	'Gales',
	'Australia',
	'Costa Rica',
];

function nroAleatorio(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

//Funcion que retorna un numero aleatorio de acuerdo al bombo a sortear
function sacarBolilla(bombo) {
	switch (bombo) {
		case 0:
			return nroAleatorio(0, 8);

		case 1:
			return nroAleatorio(8, 16);

		case 2:
			return nroAleatorio(16, 24);

		case 3:
			return nroAleatorio(24, 32);
	}
}

function realizarSorteo() {
	const repetidos = [];

	for (let i = 0; i < 8; i++) {
		console.log('GRUPO ' + (i + 1));
		for (let j = 0; j < 4; j++) {
			let flag = 0; //VALIDACION REPETIDOS ---> Mientras bandera no entre en el if, va a seguir buscando nros al azar en el case que le toque
			while (flag != 1) {
				const idEquipoSorteado = sacarBolilla(j); // paso por paramaetro el iterador j que coincide con el nro de bombos y equipos x grupo

				if (!repetidos.includes(idEquipoSorteado)) {
					// si el nro no se encuentra en el arreglo repetidos, pintamos el equipo
					repetidos.push(idEquipoSorteado);
					console.log(selecciones[idEquipoSorteado]);
					flag = 1;
				}
			}
		}
		console.log('------------------------------------');
	}
	alert('Sorteo realizado!');
	mostrarMenu();
}

function mostrarEquipos() {
	console.log('\nSELECCIONES CLASIFICADAS:');
	for (let i = 0; i < 32; i++) {
		const equipo = selecciones[i];
		console.log(i + 1 + ') ' + equipo);
		// document.write(`<p>${i + 1}- ${equipo}</p>`);
	}
	console.log('\n');
	mostrarMenu();
}

//Menu de opciones al que se llama siempre que terminamos alguna tarea.
function mostrarMenu() {
	console.log('===========MENU PRINCIPAL=========== ');
	console.log('| 1. Mostrar equipos participantes |');
	console.log('| 2. Realizar sorteo               | ');
	console.log('| 3. Salir                         |');
	console.log('====================================');

	let opcionMenu = Number(
		prompt('MENU PRINCIPAL: ¿Que operacion deseas realizar?')
	);

	switch (opcionMenu) {
		case 1:
			//Imprime todos los equipos participantes del mundial
			mostrarEquipos();
			break;
		case 2:
			//Sortea aleatoriamente todos los equipos en 8 grupos sin repetir los equipos
			realizarSorteo();
			break;
		case 3:
			alert('¡Gracias por participar!');
			break;
		default:
			alert('Opcion inválida. Intente nuevamente');
			mostrarMenu();
	}
}

function bienvenida() {
	alert('¡Bienvenidos al sorteo del mundial Qatar 2022!');
	mostrarMenu();
}


 setTimeout(() => {
	bienvenida()	
}, 3000);