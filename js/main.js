let grupos = [
	{
		id: 1,
		selecciones: [],
	},
	{
		id: 2,
		selecciones: [],
	},
	{
		id: 3,
		selecciones: [],
	},
	{
		id: 4,
		selecciones: [],
	},
	{
		id: 5,
		selecciones: [],
	},
	{
		id: 6,
		selecciones: [],
	},
	{
		id: 7,
		selecciones: [],
	},
	{
		id: 8,
		selecciones: [],
	},
];

const btnSortear = document.querySelector('.btn-primary');
const divGrupos = document.querySelector('#divGrupos');
const article = document.querySelector('#article');
const templateGrupos = document.querySelector('#templateGrupos').content;
const fragment = document.createDocumentFragment();

const fetchData = async () => {
	try {
		const res = await fetch('./data/selecciones.json');
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

function reiniciarSorteo() {
	grupos.forEach(grupo => {
		grupo.selecciones = [];
	});
}

const realizarSorteo = json => {
	const repetidos = [];

	grupos[0].selecciones.push(json.selecciones[0]);

	grupos.forEach(grupo => {
		const contadores = {
			UEFA: 0,
			CONMEBOL: 0,
			CONCACAF: 0,
			AFC: grupo.id === 1 ? 1 : 0,
			CAF: 0,
			ATTEMPS: 0,
		};

		for (let i = grupo.id === 1 ? 1 : 0; i < 4; i++) {
			let flag = 0;
			while (flag === 0) {
				const idEquipoSorteado = sacarBolilla(i);
				if (!repetidos.includes(idEquipoSorteado)) {
					const equipo = json.selecciones.find(
						equipo => equipo.id === idEquipoSorteado
					);

					const { UEFA, CONMEBOL, CONCACAF, AFC, CAF, ATTEMPS } = contadores;

					if (ATTEMPS === 100) {
						reiniciarSorteo();
						realizarSorteo(json);
						return;
					}

					switch (equipo.confederacion) {
						case 'UEFA':
							if (UEFA < 2) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.selecciones.push(equipo);
								flag = 1;
							}
							break;
						case 'CONMEBOL':
							if (CONMEBOL < 1) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.selecciones.push(equipo);
								flag = 1;
							}
							break;
						case 'CONCACAF':
							if (CONCACAF < 1) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.selecciones.push(equipo);
								flag = 1;
							}
							break;
						case 'AFC':
							if (AFC < 1) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.selecciones.push(equipo);
								flag = 1;
							}
							break;
						case 'CAF':
							if (CAF < 1) {
								repetidos.push(idEquipoSorteado);
								contadores[equipo.confederacion]++;
								grupo.selecciones.push(equipo);
								flag = 1;
							}
							break;
					}
					contadores['ATTEMPS']++;
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
			grupo.selecciones.forEach(seleccion => {
				templateGrupos.querySelector('.list-group').innerHTML += `
				<li
				class="list-group-item d-flex align-items-center justify-content-evenly">
				<div class='mx-1'<></div>
				<div class="mx-0 bandera"><img class="text-center" src="${seleccion.bandera}"></div>
				<div class="text-center" style="width:155px;">
				<span class="lead">${seleccion.nombre}</span>
				</div>
				</li>
				`;
			});

			const clone = templateGrupos.cloneNode(true);

			fragment.appendChild(clone);
		});
		divGrupos.appendChild(fragment);

		grupos.forEach(grupo => (grupo.selecciones = []));

		btnSortear.textContent = 'Volver a sortear';
		btnSortear.classList.remove('d-none');
	}, timeOut);
};

const initApp = () => {
	divGrupos.innerHTML = '';
	fetchData();
	pintarGrupos(1000);
};

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('grupos')) {
		grupos = JSON.parse(localStorage.getItem('grupos'));
		pintarGrupos(0);
		spinner.classList.add('d-none');
	}

	btnSortear.addEventListener('click', () => {
		btnSortear.className += ' d-none';
		if (btnSortear.textContent === 'Sortear') {
			initApp();
			return;
		}

		Swal.fire({
			title: '¿Quieres reiniciar el sorteo?',
			text: '¡Se modificaran los resultados!',
			iconHtml:
				'<img src="./img/world-cup2.png" class="rounded-circle border border-3  border-dark">',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Aceptar',
		}).then(result => {
			if (result.isConfirmed) {
				initApp();
			} else {
				btnSortear.classList.remove('d-none');
			}
		});
	});
});
