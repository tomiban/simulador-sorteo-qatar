const bombos = [
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
];

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
const templateBombos = document.querySelector('#templateBombos').content;
const templateGrupos = document.querySelector('#templateGrupos').content;

const fetchData = async () => {
	try {
		const res = await fetch('./data/selecciones.json');
		const data = await res.json();
		initApp(data);
	} catch (error) {
		console.log(error);
	}
};

function nroAleatorio(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function sacarBolilla() {
	return nroAleatorio(0, 7);
}

function reiniciarSorteo() {
	grupos.forEach(grupo => {
		grupo.selecciones.length = 0;
	});
	realizarSorteo(bombos)
}

function limiteConfederacion(idGrupoSorteado, seleccion) {
	const contadores = {
		UEFA: 0,
		CONMEBOL: 0,
		CONCACAF: 0,
		AFC: 0,
		CAF: 0,
	};

	grupos[idGrupoSorteado].selecciones.forEach(equipo => {
		contadores[equipo.confederacion]++;
	});

	const { UEFA, CONMEBOL, CONCACAF, AFC, CAF } = contadores;

	switch (seleccion.confederacion) {
		case 'UEFA':
			return UEFA === 2;
		case 'CONMEBOL':
			return CONMEBOL === 1;
		case 'CONCACAF':
			return CONCACAF === 1;
		case 'AFC':
			return AFC === 1;
		case 'CAF':
			return CAF === 1;
	}
}

const realizarSorteo = bombos => {
	//Entra a cada bombo
	bombos.forEach(bombo => {
		const repetidos = [];
		//Entra a los equipos del bombo y sortea el grupo que va integrar cada uno, no pueden ir al mismo
		bombo.selecciones.forEach(seleccion => {
			let ATTEMPS = 0;
			let flag = 0;
			while (flag === 0) {
				ATTEMPS++
				let idGrupoSorteado = sacarBolilla();
				//Omito al anfitrion del sorteo
				if (seleccion.nombre === 'Qatar') {
					grupos[0].selecciones.push(seleccion);
					idGrupoSorteado = 0;
					repetidos.push(0);
					flag = 1;
				} else {
					//Compruebo si ya no salió sorteado ese grupo
					if (!repetidos.includes(idGrupoSorteado)) {
						//Compruebo si respeto el limite de conferencias x grupo
						if (!limiteConfederacion(idGrupoSorteado, seleccion)) {
							grupos[idGrupoSorteado].selecciones.push(seleccion);
							repetidos.push(idGrupoSorteado);
							flag = 1;
						}
					}
				}
				//si el sorteo queda imposibilitado por el max de conferencias se hace de nuevo (ERROR --< pushea los equipos restantes del sorteo fallado)
				if (ATTEMPS === 100) {
					reiniciarSorteo()
					return
				}
			}
		});
	});

	localStorage.setItem('grupos', JSON.stringify(grupos));
};


const pintarBombos = data => {
	const selecciones = data.selecciones;
	selecciones.forEach(seleccion => {
		if (seleccion.id <= 8) {
			bombos[0].selecciones.push(seleccion);
		}
		if (seleccion.id > 8 && seleccion.id <= 16) {
			bombos[1].selecciones.push(seleccion);
		}
		if (seleccion.id > 16 && seleccion.id <= 24) {
			bombos[2].selecciones.push(seleccion);
		}
		if (seleccion.id > 24 && seleccion.id <= 32) {
			bombos[3].selecciones.push(seleccion);
		}
	});

	const fragment = document.createDocumentFragment();

	bombos.forEach(bombo => {
		templateBombos.querySelector('h5').textContent = `BOMBO ${bombo.id}`;
		templateBombos.querySelector('.list-group').innerHTML = '';
		bombo.selecciones.forEach(seleccion => {
			templateBombos.querySelector('.list-group').innerHTML += `
			<li class="list-group-item d-flex align-items-center justify-content-evenly">
			<div class='mx-1'></div>
			<div class="bandera">
					<img class="text-center" src="${seleccion.bandera}" /> </div>	
				<div class="" style="width: 155px">
					<span class="lead mx-1">${seleccion.nombre}</span>
				</div>
			</li>
			`;
		});

		const clone = templateBombos.cloneNode(true);

		fragment.appendChild(clone);
	});

	divGrupos.appendChild(fragment);
};

const pintarGrupos = timeOut => {
	
	const fragment = document.createDocumentFragment();
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
		divGrupos.innerHTML = ''
		divGrupos.appendChild(fragment);

		grupos.forEach(grupo => (grupo.selecciones = []));

		btnSortear.textContent = 'Volver a sortear';
		btnSortear.classList.remove('d-none');
	}, timeOut);
};

const initApp = data => {
	pintarBombos(data);
};

btnSortear.addEventListener('click', () => {
	btnSortear.className += ' d-none';
	if (btnSortear.textContent === 'Sortear') {
		realizarSorteo(bombos);
		pintarGrupos(1000);
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
			realizarSorteo(bombos)
			divGrupos.innerHTML = '';
			pintarGrupos(1000)
		} else {
			btnSortear.classList.remove('d-none');
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('grupos')) {
		grupos = JSON.parse(localStorage.getItem('grupos'));
		pintarGrupos(0);
		spinner.classList.add('d-none');
	} else {
		fetchData();
	}
});
