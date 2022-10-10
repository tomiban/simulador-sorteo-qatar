const selecciones = [
	{
		id: 1,
		nombre: 'Qatar',
	},
	{
		id: 2,
		nombre: 'Belgica',
	},
	{
		id: 3,
		nombre: 'Brasil',
	},
	{
		id: 4,
		nombre: 'Francia',
	},
	{
		id: 5,
		nombre: 'Argentina',
	},
	{
		id: 7,
		nombre: 'Inglaterra',
	},
	{
		id: 8,
		nombre: 'España',
	},
	{
		id: 9,
		nombre: 'Portugal',
	},
	{
		id: 10,
		nombre: 'Dinamarca',
	},
	{
		id: 11,
		nombre: 'Holanda',
	},
	{
		id: 12,
		nombre: 'Alemania',
	},
	{
		id: 13,
		nombre: 'Suiza',
	},
	{
		id: 14,
		nombre: 'Croacia',
	},
	{
		id: 15,
		nombre: 'Uruguay',
	},
	{
		id: 16,
		nombre: 'Mexico',
	},
	{
		id: 17,
		nombre: 'Estados Unidos',
	},
	{
		id: 18,
		nombre: 'Japon',
	},
	{
		id: 19,
		nombre: 'Serbia',
	},
	{
		id: 20,
		nombre: 'Corea',
	},
	{
		id: 21,
		nombre: 'Tunez',
	},
	{
		id: 22,
		nombre: 'Polonia',
	},
	{
		id: 23,
		nombre: 'Marruecos',
	},
	{
		id: 24,
		nombre: 'Senegal',
	},
	{
		id: 25,
		nombre: 'Arabia',
	},
	{
		id: 26,
		nombre: 'Ecuador',
	},
	{
		id: 27,
		nombre: 'Ghana',
	},
	{
		id: 28,
		nombre: 'Canada',
	},
	{
		id: 29,
		nombre: 'Camerun',
	},
	{
		id: 30,
		nombre: 'Gales',
	},
	{
		id: 31,
		nombre: 'Australia',
	},
	{
		id: 32,
		nombre: 'Costa Rica',
	},
];

const grupos = [
	{
		id: 1,
		equipos: []
	},
	{
		id: 2,
		equipos: []
	},
	{
		id: 3,
		equipos: []
	},
	{
		id: 4,
		equipos: []
	},
	{
		id: 5,
		equipos: []
	},
	{
		id: 6,
		equipos: []
	},
	{
		id: 7,
		equipos: []
	},
	{
		id: 8,
		equipos: []
	},
]

function nroAleatorio(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

//Funcion que retorna un numero aleatorio de acuerdo al bombo a sortear
function sacarBolilla(bombo) {
	switch (bombo) {
		case 0:
			return nroAleatorio(1, 8);

		case 1:
			return nroAleatorio(9, 18);

		case 2:
			return nroAleatorio(19, 25);

		case 3:
			return nroAleatorio(26, 32);
	}
}

//NO FUNCIONA VALDIACION (PROBAR CON FILTER)
const realizarSorteo = grupos.forEach(grupo => {
	const repetidos = [];
		for (let i = 0; i < 4; i++) {
			let flag = 0; 
			while (flag != 1) {
				const idEquipoSorteado = sacarBolilla(i); // 3 - 13 - 22- 30
				if (!repetidos.includes(idEquipoSorteado)) {
					repetidos.push(idEquipoSorteado);
					//pushear seleccion.id a grupos.equipos
					selecciones.map(equipo => {
						if (equipo.id === idEquipoSorteado) {
							grupo.equipos.push(equipo)
							
						}
					})
					flag = 1;
				}
			}
		}
		return
	});
	console.log(grupos)
	