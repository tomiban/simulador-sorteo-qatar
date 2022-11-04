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

const fetchData = async () => {
	try {
		const res = await fetch('../data/selecciones.json');
		const data = await res.json();
		realizarSorteo(data);
	} catch (error) {
		console.log(error);
	}
};

function nroAleatorio(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function sacarBolilla(bombo) {
	switch (bombo) {
		case 0:
			return nroAleatorio(2, 8);
		case 1:
			return nroAleatorio(9, 16);

		case 2:
			return nroAleatorio(17, 24);

		case 3:
			return nroAleatorio(25, 32);
	}
}

const realizarSorteo = json => {
	const repetidos = [];

	grupos[0].equipos.push(json.selecciones[0]);

	grupos.forEach(grupo => {
		const contadores = {
			UEFA: 0,
			CONMEBOL: 0,
			CONCACAF: 0,
			AFC: grupo.id === 1 ? 1 : 0,
			CAF: 0,
		};

		for (let i = grupo.id === 1 ? 1 : 0; i < 4; i++) {
			let flag = 0;
			while (flag === 0) {
				const idEquipoSorteado = sacarBolilla(i);
				if (!repetidos.includes(idEquipoSorteado)) {
					const equipo = json.selecciones.find(
						equipo => equipo.id === idEquipoSorteado
					);

					const { UEFA, CONMEBOL, CONCACAF, AFC, CAF } = contadores;

					switch (equipo.confederacion) {
						case 'UEFA':
							if (UEFA < 2) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.equipos.push(equipo);
								flag = 1;
							}
							break;
						case 'CONMEBOL':
							if (CONMEBOL < 1) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.equipos.push(equipo);
								flag = 1;
							}
							break;
						case 'CONCACAF':
							if (CONCACAF < 1) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.equipos.push(equipo);
								flag = 1;
							}
							break;
						case 'AFC':
							if (AFC < 1) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.equipos.push(equipo);
								flag = 1;
							}
							break;
						case 'CAF':
							if (CAF < 1) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.equipos.push(equipo);
								flag = 1;
							}
							break;
					}
				}
			}
		}
	});
	localStorage.setItem('grupos', JSON.stringify(grupos));
};

const pintarGrupos = timeOut => {
	const spinner = document.querySelector('#spinner');
	spinner.classList.remove('d-none');

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

	btnSortear.textContent = 'Volver a sortear';
};

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('grupos')) {
		grupos = JSON.parse(localStorage.getItem('grupos'));
		pintarGrupos(0);
		spinner.classList.add('d-none');
	}

	btnSortear.addEventListener('click', () => {
		fetchData();
		divGrupos.innerHTML = '';
		pintarGrupos(1000);
	});
});
