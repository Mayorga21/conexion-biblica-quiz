# Conexión Bíblica Quiz

Quiz interactivo de estudio bíblico para el evento **Conexión Bíblica** de la Iglesia Adventista.  
Cubre el libro de **Daniel completo** y **Profetas y Reyes capítulos 39–44** (Elena G. White).

App 100% estática — sin base de datos, sin variables de entorno. Lista para Vercel o Netlify.

## Stack

- **Vite + React 18** — build tooling y UI
- **Tailwind CSS v3** — estilos utilitarios, tema oscuro

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y ejecución local

```bash
git clone <repo-url>
cd conexion-biblica-quiz
npm install
npm run dev
```

## Deploy en Vercel

```bash
# Con la CLI de Vercel
npm i -g vercel
vercel
```

O conecta el repositorio en [vercel.com](https://vercel.com) → New Project → Import Git Repository.  
No hay variables de entorno que configurar.

## Deploy en Netlify

```bash
npm run build
# Sube la carpeta dist/ en netlify.com → Sites → Drag and Drop
```

O conecta el repositorio en [netlify.com](https://netlify.com):
- Build command: `npm run build`
- Publish directory: `dist`

## Estructura del proyecto

```
src/
├── components/
│   ├── HomeScreen.jsx       # Pantalla de inicio con filtros
│   ├── QuizScreen.jsx       # Pantalla del quiz activo
│   ├── ResultsScreen.jsx    # Pantalla de resultados y revisión de errores
│   ├── QuestionCard.jsx     # Tarjeta de pregunta con opciones
│   ├── OptionButton.jsx     # Botón de opción (idle / correct / wrong / missed)
│   ├── ProgressBar.jsx      # Barra de progreso animada
│   └── ExplanationPanel.jsx # Explicación con referencia bíblica post-respuesta
├── data/
│   └── questions.js         # 53 preguntas con opciones y explicaciones
├── hooks/
│   └── useQuiz.js           # Toda la lógica: fases, filtros, score, historial
├── utils/
│   └── shuffle.js           # Fisher-Yates + recálculo del índice correcto post-shuffle
├── App.jsx                  # Router de fases (home → quiz → results)
└── main.jsx                 # Punto de entrada React
```

## Categorías de preguntas

| Categoría | Preguntas |
|---|---|
| Daniel 1–6 | 3–4 por capítulo |
| Daniel 7–9 | 4–6 por capítulo |
| Daniel 10–12 | 4 |
| P&R Cap. 39–44 | 2 por capítulo |
| Integración | 3 |
| **Total** | **53** |

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build optimizado para producción (carpeta dist/)
npm run preview  # Previsualizar el build de producción
npm run lint     # ESLint
```
