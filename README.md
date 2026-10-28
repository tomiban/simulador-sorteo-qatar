# Simulador del sorteo — Mundial Qatar 2022

Simulador del sorteo de grupos del Mundial de Qatar 2022 en JavaScript vanilla. Reproduce el
procedimiento de la FIFA: bombos por confederación, restricciones de enfrentamiento y sorteo de
posiciones dentro de cada grupo.

**[Ver demo](https://tomiban.github.io/simulador-sorteo-qatar/)**

## Cómo funciona

- `data/selecciones.json` define los clasificados y su confederación.
- `js/main.js` reparte los bombos, aplica las restricciones del sorteo y arma los grupos.
- La interfaz se actualiza en el DOM; SweetAlert2 se usa para los avisos del sorteo.

## Stack

- JavaScript vanilla, sin framework ni build step
- Bootstrap 5 para el layout
- SweetAlert2 para los diálogos
- GitHub Pages como hosting

## Estructura

| Ruta | Contenido |
| --- | --- |
| `index.html` | Estructura de la página |
| `css/styles.css` | Estilos propios |
| `js/main.js` | Lógica del sorteo e interacción |
| `data/selecciones.json` | Selecciones participantes |
| `img/`, `fonts/` | Recursos gráficos y tipografías |

## Uso local

Es un sitio estático: alcanza con servir la carpeta raíz.

```bash
python3 -m http.server 8000
```

Y abrir `http://localhost:8000`. Abrir `index.html` con `file://` no funciona porque el
simulador lee `data/selecciones.json` por `fetch`.

## Licencia

MIT. Ver [LICENSE](LICENSE).
