import { useState } from "react";

type Piece = {
  type: string;
  color: "white" | "black";
};

const initialBoard = (): (Piece | null)[][] => {
  const emptyRow = Array(8).fill(null);

  return [
    [
      { type: "rook", color: "black" },
      { type: "knight", color: "black" },
      { type: "bishop", color: "black" },
      { type: "queen", color: "black" },
      { type: "king", color: "black" },
      { type: "bishop", color: "black" },
      { type: "knight", color: "black" },
      { type: "rook", color: "black" },
    ],
    Array(8).fill({ type: "pawn", color: "black" }),
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
    Array(8).fill({ type: "pawn", color: "white" }),
    [
      { type: "rook", color: "white" },
      { type: "knight", color: "white" },
      { type: "bishop", color: "white" },
      { type: "queen", color: "white" },
      { type: "king", color: "white" },
      { type: "bishop", color: "white" },
      { type: "knight", color: "white" },
      { type: "rook", color: "white" },
    ],
  ];
};

export default function ChessGame() {
  const [board, setBoard] = useState(initialBoard());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [turn, setTurn] = useState<"white" | "black">("white");

  function handleClick(row: number, col: number) {
    const piece = board[row][col];

    // Seleccionar pieza
    if (!selected) {
      if (piece && piece.color === turn) {
        setSelected([row, col]);
      }
      return;
    }

    const [sr, sc] = selected;

    const newBoard = board.map(r => [...r]);

    // Mover pieza (sin validación avanzada)
    newBoard[row][col] = newBoard[sr][sc];
    newBoard[sr][sc] = null;

    setBoard(newBoard);
    setSelected(null);
    setTurn(turn === "white" ? "black" : "white");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Turno: {turn === "white" ? "⚪ Blancas" : "⚫ Negras"}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 60px)",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              style={{
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: (r + c) % 2 === 0 ? "#f0d9b5" : "#b58863",
                fontSize: "28px",
                cursor: "pointer",
                border:
                  selected?.[0] === r && selected?.[1] === c
                    ? "3px solid red"
                    : "1px solid black",
              }}
            >
              {cell ? pieceIcon(cell.type, cell.color) : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function pieceIcon(type: string, color: string) {
  const icons: any = {
    pawn: { white: "♙", black: "♟" },
    rook: { white: "♖", black: "♜" },
    knight: { white: "♘", black: "♞" },
    bishop: { white: "♗", black: "♝" },
    queen: { white: "♕", black: "♛" },
    king: { white: "♔", black: "♚" },
  };

  return icons[type][color];
}
