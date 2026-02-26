// Importamos hooks de React
// useState → para manejar estados dinámicos
// useEffect → para ejecutar código cuando el componente se monta
import { useState, useEffect } from "react";

// Interface que define la estructura que debe tener cada juego
interface Game {
  id: string;        // Identificador único del juego
  name: string;      // Nombre del juego
  icon: string;      // Emoji o icono visual
  category: string;  // Categoría (arcade, puzzle, etc)
  tag: string;       // Etiqueta visual que se muestra en la tarjeta
  players: string;   // Número de jugadores (visual)
  desc: string;      // Descripción del juego
}

// Componente principal de la aplicación
export default function App() {

  // Estado que contiene la lista de juegos
  // No se modifica, solo se usa para renderizar
  const [games] = useState<Game[]>([
    { id: 'snake', name: 'Snake', icon: '🐍', category: 'arcade', tag: 'Arcade', players: '12K', desc: 'Guia la serpiente y recoge la comida.' },
    { id: 'memory', name: 'Memoria', icon: '🧠', category: 'puzzle', tag: 'Puzzle', players: '8K', desc: 'Encuentra las parejas de cartas iguales.' },
    { id: 'tictactoe', name: 'Tres en Raya', icon: '❌', category: 'estrategia', tag: 'Estrategia', players: '15K', desc: 'Clásico tres en raya contra la máquina.' },
    { id: 'breakout', name: 'Breakout', icon: '🎯', category: 'arcade', tag: 'Arcade', players: '9K', desc: 'Destruye los bloques con la pelota.' },
  ]);

  // Estado que guarda la categoría seleccionada
  const [category, setCategory] = useState("todos");

  // Estado que guarda el juego seleccionado (para mostrar el modal)
  // Si es null → no hay modal abierto
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  // Filtra los juegos dependiendo de la categoría seleccionada
  const filteredGames =
    category === "todos"
      ? games // si es "todos", muestra todo
      : games.filter(g => g.category === category); // si no, filtra

  // useEffect que se ejecuta solo una vez cuando carga el componente
  // Se usa para crear partículas decorativas en el fondo
  useEffect(() => {
    const container = document.getElementById("particles");

    if (container) {
      container.innerHTML = ""; // limpia el contenedor

      // Crea 40 partículas
      for (let i = 0; i < 40; i++) {
        const span = document.createElement("span");

        // Posición horizontal aleatoria
        span.style.left = Math.random() * 100 + "%";

        // Tamaño aleatorio
        span.style.width = span.style.height =
          2 + Math.random() * 3 + "px";

        container.appendChild(span);
      }
    }
  }, []); // [] = solo se ejecuta una vez

  return (
    // Contenedor principal
    <div style={styles.body}>

      {/* Contenedor donde se insertan las partículas */}
      <div id="particles" style={styles.bgParticles}></div>

      {/* ================= NAV ================= */}
      <nav style={styles.nav}>
        {/* Logo */}
        <div style={styles.logo}>
          SUKUNA<span style={{ color: "#f72585" }}>ARTS</span>
        </div>

        {/* Links de navegación */}
        <ul style={styles.navLinks}>
          {["Inicio", "Juegos", "Destacado", "Comunidad"].map((item) => (
            <li key={item}>
              {/* Anchor que hace scroll a la sección correspondiente */}
              <a href={`#${item.toLowerCase()}`} style={styles.navLink}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ================= HERO ================= */}
      <section style={styles.hero} id="inicio">

        {/* Etiqueta decorativa */}
        <div style={styles.heroBadge}>Portal de Juegos Online</div>

        {/* Título principal */}
        <h1 style={styles.heroTitle}>
          SUKUNA<span style={styles.highlight}>ARTS</span>
        </h1>

        {/* Descripción */}
        <p style={styles.heroDesc}>
          Descubre una colección de juegos clásicos y desafiantes.
        </p>

        {/* Botón que hace scroll suave hacia la sección de juegos */}
        <button
          style={styles.btnPrimary}
          onClick={() =>
            document.getElementById("juegos")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Jugar Ahora
        </button>
      </section>

      {/* ================= SECCIÓN JUEGOS ================= */}
      <section id="juegos" style={styles.section}>

        {/* Título sección */}
        <div style={styles.sectionHeader}>
          <h2>Nuestros Juegos</h2>
          <p>Elige tu favorito y empieza a jugar</p>
          <span style={styles.line}></span>
        </div>

        {/* Botones de categorías */}
        <div style={styles.categories}>
          {["todos", "arcade", "puzzle", "estrategia"].map(cat => (
            <button
              key={cat}

              // Cambia estilo si está activa
              style={category === cat
                ? styles.catBtnActive
                : styles.catBtn}

              // Cambia la categoría al hacer clic
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid que muestra los juegos */}
        <div style={styles.gamesGrid}>
          {filteredGames.map(game => (
            <div
              key={game.id}
              style={styles.gameCard}

              // Al hacer clic guarda el juego actual
              onClick={() => setCurrentGame(game)}
            >
              <div style={styles.gameThumb}>
                {game.icon}
              </div>

              <div>
                <h3>{game.name}</h3>
                <span>{game.players} jugadores</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {currentGame && (
        <div
          style={styles.modalOverlay}

          // Cierra el modal al hacer clic afuera
          onClick={() => setCurrentGame(null)}
        >
          <div
            style={styles.modal}

            // Evita que el clic dentro lo cierre
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              style={styles.modalClose}
              onClick={() => setCurrentGame(null)}
            >
              &times;
            </button>

            {/* Información del juego */}
            <div style={styles.modalIcon}>
              {currentGame.icon}
            </div>

            <h3>{currentGame.name}</h3>
            <p>{currentGame.desc}</p>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>
        <p>&copy; 2026 SukunaArts</p>
      </footer>

    </div>
  );
}
