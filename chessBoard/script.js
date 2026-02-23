const board = document.getElementById("board");
const turnText = document.getElementById("turn");

let currentTurn = "white";
let selected = null;

let game = [
    ["r","n","b","q","k","b","n","r"],
    ["p","p","p","p","p","p","p","p"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["P","P","P","P","P","P","P","P"],
    ["R","N","B","Q","K","B","N","R"]
];

function createBoard(highlights = []) {
    board.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {

            const square = document.createElement("div");
            square.classList.add("square");

            if ((row + col) % 2 === 0) {
                square.classList.add("white");
            } else {
                square.classList.add("black");
            }

            const pieceCode = game[row][col];
            const pieceSymbol = getSymbol(pieceCode);

            if (pieceSymbol) {
                const isWhite = pieceCode === pieceCode.toUpperCase();
                const pieceClass = isWhite ? "white-piece" : "black-piece";
                square.innerHTML = `<span class="${pieceClass}">${pieceSymbol}</span>`;
            }

            if (selected && selected.row === row && selected.col === col) {
                square.classList.add("selected");
            }

            highlights.forEach(h => {
                if (h.row === row && h.col === col) {
                    square.classList.add(h.type);
                }
            });

            square.addEventListener("click", () => handleClick(row, col));

            board.appendChild(square);
        }
    }
}

function getSymbol(piece) {
    const symbols = {
        "r":"♜","n":"♞","b":"♝","q":"♛","k":"♚","p":"♟",
        "R":"♖","N":"♘","B":"♗","Q":"♕","K":"♔","P":"♙"
    };
    return symbols[piece] || "";
}

function handleClick(row, col) {
    const piece = game[row][col];

    if (selected) {
        if (isValidMove(game[selected.row][selected.col], selected.row, selected.col, row, col)) {
            game[row][col] = game[selected.row][selected.col];
            game[selected.row][selected.col] = "";
            currentTurn = currentTurn === "white" ? "black" : "white";
            turnText.textContent = "Turn: " + capitalize(currentTurn);
        }
        selected = null;
        createBoard();
        return;
    }

    if (piece !== "" && isCorrectTurn(piece)) {
        selected = {row, col};
        const moves = getValidMoves(row, col);
        createBoard(moves);
    }
}

function getValidMoves(sr, sc) {
    let moves = [];
    const piece = game[sr][sc];

    for (let dr = 0; dr < 8; dr++) {
        for (let dc = 0; dc < 8; dc++) {
            if (isValidMove(piece, sr, sc, dr, dc)) {
                const target = game[dr][dc];
                moves.push({
                    row: dr,
                    col: dc,
                    type: target === "" ? "move" : "capture"
                });
            }
        }
    }
    return moves;
}

function isCorrectTurn(piece) {
    return currentTurn === "white"
        ? piece === piece.toUpperCase()
        : piece === piece.toLowerCase();
}

function isValidMove(piece, sr, sc, dr, dc) {

    if (sr === dr && sc === dc) return false;

    const target = game[dr][dc];
    if (target !== "" && isSameColor(piece, target)) return false;

    const rowDiff = dr - sr;
    const colDiff = dc - sc;

    piece = piece.toLowerCase();

    if (piece === "p") {
        if (currentTurn === "white") {
            return (rowDiff === -1 && colDiff === 0 && target === "") ||
                   (rowDiff === -1 && Math.abs(colDiff) === 1 && target !== "");
        } else {
            return (rowDiff === 1 && colDiff === 0 && target === "") ||
                   (rowDiff === 1 && Math.abs(colDiff) === 1 && target !== "");
        }
    }

    if (piece === "r") return rowDiff === 0 || colDiff === 0;
    if (piece === "b") return Math.abs(rowDiff) === Math.abs(colDiff);
    if (piece === "q") return rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff);

    if (piece === "n") {
        return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
               (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
    }

    if (piece === "k") {
        return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
    }

    return false;
}

function isSameColor(p1, p2) {
    return (p1 === p1.toUpperCase() && p2 === p2.toUpperCase()) ||
           (p1 === p1.toLowerCase() && p2 === p2.toLowerCase());
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

createBoard();