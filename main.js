const selecciones = [
	{
		id: 1,
		nombre: 'Qatar',
		bandera: 'https://flagcdn.com/qa.svg',
	},
	{
		id: 2,
		nombre: 'Belgica',
		bandera: 'https://flagcdn.com/be.svg',
	},
	{
		id: 3,
		nombre: 'Brasil',
		bandera: 'https://flagcdn.com/br.svg',
	},
	{
		id: 4,
		nombre: 'Francia',
		bandera: 'https://flagcdn.com/fr.svg',
	},
	{
		id: 5,
		nombre: 'Argentina',
		bandera: 'https://flagcdn.com/ar.svg',
	},
	{
		id: 6,
		nombre: 'Inglaterra',
		bandera: 'https://flagcdn.com/gb-eng.svg',
	},
	{
		id: 7,
		nombre: 'España',
		bandera: 'https://flagcdn.com/es.svg',
	},
	{
		id: 8,
		nombre: 'Portugal',
		bandera: 'https://flagcdn.com/pt.svg',
	},
	{
		id: 9,
		nombre: 'Dinamarca',
		bandera: 'https://flagcdn.com/dk.svg',
	},
	{
		id: 10,
		nombre: 'Holanda',
		bandera: 'https://flagcdn.com/nl.svg',
	},
	{
		id: 11,
		nombre: 'Alemania',
		bandera: 'https://flagcdn.com/de.svg',
	},
	{
		id: 12,
		nombre: 'Suiza',
		bandera: 'https://flagcdn.com/ch.svg',
	},
	{
		id: 13,
		nombre: 'Croacia',
		bandera: 'https://flagcdn.com/hr.svg',
	},
	{
		id: 14,
		nombre: 'Uruguay',
		bandera: 'https://flagcdn.com/uy.svg',
	},
	{
		id: 15,
		nombre: 'Mexico',
		bandera: 'https://flagcdn.com/mx.svg',
	},
	{
		id: 16,
		nombre: 'Estados Unidos',
		bandera: 'https://flagcdn.com/us.svg',
	},
	{
		id: 17,
		nombre: 'Iran',
		bandera: 'https://flagcdn.com/ir.svg',
	},
	{
		id: 18,
		nombre: 'Japon',
		bandera: 'https://flagcdn.com/jp.svg',
	},
	{
		id: 19,
		nombre: 'Serbia',
		bandera: 'https://flagcdn.com/rs.svg',
	},
	{
		id: 20,
		nombre: 'Corea del Sur',
		bandera: 'https://flagcdn.com/kr.svg',
	},
	{
		id: 21,
		nombre: 'Tunez',
		bandera: 'https://flagcdn.com/tn.svg',
	},
	{
		id: 22,
		nombre: 'Polonia',
		bandera: 'https://flagcdn.com/pl.svg',
	},
	{
		id: 23,
		nombre: 'Marruecos',
		bandera: 'https://flagcdn.com/ma.svg',
	},
	{
		id: 24,
		nombre: 'Senegal',
		bandera: 'https://flagcdn.com/sn.svg',
	},
	{
		id: 25,
		nombre: 'Arabia',
		bandera: 'https://flagcdn.com/sa.svg',
	},
	{
		id: 26,
		nombre: 'Ecuador',
		bandera: 'https://flagcdn.com/ec.svg',
	},
	{
		id: 27,
		nombre: 'Ghana',
		bandera: 'https://flagcdn.com/gh.svg',
	},
	{
		id: 28,
		nombre: 'Canada',
		bandera: 'https://flagcdn.com/ca.svg',
	},
	{
		id: 29,
		nombre: 'Camerun',
		bandera: 'https://flagcdn.com/cm.svg',
	},
	{
		id: 30,
		nombre: 'Gales',
		bandera: 'https://flagcdn.com/gb-wls.svg',
	},
	{
		id: 31,
		nombre: 'Australia',
		bandera: 'https://flagcdn.com/au.svg',
	},
	{
		id: 32,
		nombre: 'Costa Rica',
		bandera: 'https://flagcdn.com/cr.svg',
	},
];

let grupos = [
	{
		id: 1,
		equipos: [],
	},
	{
		id: 2,
		equipos: [],
	},
	{
		id: 3,
		equipos: [],
	},
	{
		id: 4,
		equipos: [],
	},
	{
		id: 5,
		equipos: [],
	},
	{
		id: 6,
		equipos: [],
	},
	{
		id: 7,
		equipos: [],
	},
	{
		id: 8,
		equipos: [],
	},
];

const btnSortear = document.querySelector('.btn-primary');
const divGrupos = document.querySelector('#divGrupos');
const article = document.querySelector('#article');
const templateGrupos = document.querySelector('#templateGrupos').content;
const fragment = document.createDocumentFragment();


function nroAleatorio(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function sacarBolilla(bombo) {
	switch (bombo) {
		case 0:
			return nroAleatorio(1, 8);
		case 1:
			return nroAleatorio(9, 16);

		case 2:
			return nroAleatorio(17, 24);

		case 3:
			return nroAleatorio(25, 32);
	}
}

const realizarSorteo = () => {
	const repetidos = [];
	grupos.forEach(grupo => {
		for (let i = 0; i < 4; i++) {
			let flag = 0;
			while (flag === 0) {
				const idEquipoSorteado = sacarBolilla(i);

				if (!repetidos.includes(idEquipoSorteado)) {
					repetidos.push(idEquipoSorteado);
					//pushear seleccion.id a grupos.equipos
					const equipo = selecciones.find(
						equipo => equipo.id === idEquipoSorteado
					);
					grupo.equipos.push(equipo);
					flag = 1;
				}
			}
		}
	});
};

const pintarGrupos = (timeOut) => {
	const spinner = document.querySelector('#spinner');
	spinner.classList.remove('d-none');
	localStorage.setItem('grupos', JSON.stringify(grupos))

	setTimeout(() => {

		spinner.classList.add('d-none');

		grupos.map(grupo => {
			templateGrupos.querySelector('h5').textContent = `GRUPO ${grupo.id}`;
			templateGrupos.querySelector('.list-group').innerHTML = '';
			grupo.equipos.forEach(equipo => {
				templateGrupos.querySelector('.list-group').innerHTML += `
				<li
				class="list-group-item d-flex align-items-center justify-content-evenly">
				<div class='mx-1'<></div>
				<div class="mx-0 bandera"><img class="text-center" src="${equipo.bandera}"></div>
				<div class="text-center" style="width:155px;">
				<span class="lead">${equipo.nombre}</span>
				</div>
				</li>
				`;
			});

			const clone = templateGrupos.cloneNode(true);

			fragment.appendChild(clone);
		});
		divGrupos.appendChild(fragment);

		grupos.forEach(grupo => (grupo.equipos = []));
	}, timeOut);
};

btnSortear.addEventListener('click', () => {
	divGrupos.innerHTML = '';
	realizarSorteo();
	pintarGrupos(1000);
});

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('grupos')) {
		grupos = JSON.parse(localStorage.getItem('grupos'))
		pintarGrupos(null)
		spinner.classList.add('d-none');
	}
})


