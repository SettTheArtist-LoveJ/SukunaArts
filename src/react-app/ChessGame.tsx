import { useState } from "react";

type Color = "white" | "black";
type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";

type Piece = {
  type: PieceType;
  color: Color;
};

const createPawnRow = (color: Color): Piece[] =>
  Array.from({ length: 8 }, () => ({ type: "pawn", color }));

const createEmptyRow = (): (Piece | null)[] =>
  Array.from({ length: 8 }, () => null);

const initialBoard = (): (Piece | null)[][] => [
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
  createPawnRow("black"),
  createEmptyRow(),
  createEmptyRow(),
  createEmptyRow(),
  createEmptyRow(),
  createPawnRow("white"),
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

export default function ChessGame() {
  const [board, setBoard] = useState<(Piece | null)[][]>(initialBoard());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [turn, setTurn] = useState<Color>("white");

  function handleClick(row: number, col: number) {
    const piece = board[row][col];

    if (!selected) {
      if (piece && piece.color === turn) {
        setSelected([row, col]);
      }
      return;
    }

    const [sr, sc] = selected;
    const selectedPiece = board[sr][sc];

    if (!selectedPiece) {
      setSelected(null);
      return;
    }

    if (sr === row && sc === col) {
      setSelected(null);
      return;
    }

    if (piece && piece.color === selectedPiece.color) {
      setSelected([row, col]);
      return;
    }

    if (!isValidMove(selectedPiece, board, sr, sc, row, col)) {
      setSelected(null);
      return;
    }

    const newBoard = board.map(r => [...r]);

    newBoard[row][col] = selectedPiece;
    newBoard[sr][sc] = null;

    setBoard(newBoard);
    setSelected(null);
    setTurn(prev => (prev === "white" ? "black" : "white"));
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        Turno: {turn === "white" ? "⚪ Blancas" : "⚫ Negras"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 60px)",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isSelected =
              selected?.[0] === r && selected?.[1] === c;

            return (
              <div
                key={`${r}-${c}`}
                onClick={() => handleClick(r, c)}
                style={{
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    (r + c) % 2 === 0 ? "#f0d9b5" : "#b58863",
                  fontSize: "30px",
                  cursor: "pointer",
                  border: isSelected
                    ? "3px solid red"
                    : "1px solid black",
                }}
              >
                {cell ? pieceIcon(cell.type, cell.color) : ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function isValidMove(
  piece: Piece,
  board: (Piece | null)[][],
  fr: number,
  fc: number,
  tr: number,
  tc: number
): boolean {

  const dr = tr - fr;
  const dc = tc - fc;

  switch (piece.type) {

    case "pawn": {
      const dir = piece.color === "white" ? -1 : 1;

      if (dc === 0 && !board[tr][tc]) {
        if (dr === dir) return true;

        if (
          (piece.color === "white" && fr === 6 && dr === -2) ||
          (piece.color === "black" && fr === 1 && dr === 2)
        ) {
          return !board[fr + dir][fc];
        }
      }

      if (Math.abs(dc) === 1 && dr === dir && board[tr][tc]) {
        return true;
      }

      return false;
    }

    case "rook":
      return fr === tr || fc === tc;

    case "bishop":
      return Math.abs(dr) === Math.abs(dc);

    case "queen":
      return (
        fr === tr ||
        fc === tc ||
        Math.abs(dr) === Math.abs(dc)
      );

    case "knight":
      return (
        (Math.abs(dr) === 2 && Math.abs(dc) === 1) ||
        (Math.abs(dr) === 1 && Math.abs(dc) === 2)
      );

    case "king":
      return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;

    default:
      return false;
  }
}

function pieceIcon(type: PieceType, color: Color): string {
  const icons: Record<PieceType, Record<Color, string>> = {
    pawn: { white: "♙", black: "♟" },
    rook: { white: "♖", black: "♜" },
    knight: { white: "♘", black: "♞" },
    bishop: { white: "♗", black: "♝" },
    queen: { white: "♕", black: "♛" },
    king: { white: "♔", black: "♚" },
  };

  return icons[type][color];
}
