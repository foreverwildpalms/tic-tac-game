import React, {useState} from 'react';
import Board from "./Board";


const Game = () => {
    // Состояние начала игры
    const [startGame, setStartGame] = useState(false);
    // Корректность введенных данных
    const [checkNum, setCheckNum] = useState(true);

    // Размер игрового поля (по дефолту 3х3)
    const [numBoards, setNumBoard] = useState(3);
    // Массив клеток со значениями
    const [squares, setSquares] = useState([
                [new Array(3).fill(null)],
                [new Array(3).fill(null)],
                [new Array(3).fill(null)]
            ]
    );
    // Текущий игрок
    const [xIsNext, setXO] = useState(true);
    // Массив с выигрышнами полями (для дефолтного игрового поля 3х3)
    const [winSquares, setWinSquares] = useState([[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]);

    // -----------------------------------------------------------------

    // проверка на корректность введенных данных
    function checkNumBoards(num) {
        if ((num>2) && (Number.isInteger(num))) {
            setCheckNum(true);
        } else {
            setCheckNum(false);
        }
    }

    // смена количества клеток игрового поля
    function changeNumBoards(num) {
        checkNumBoards(num);
        setNumBoard(num);
    }

    // соаздание массива с выигрышными позициями
    function calculateWinnerSquares(num) {
        let arrLength = 2 * num + 2;
        let squaresArr = new Array(arrLength).fill([]);
        squaresArr[arrLength-2] = [];
        squaresArr[arrLength-1] = [];

        for (let i = 0; i < num; i++) {
            squaresArr[i] = [i*num, i*num + 1, i*num + 2];
            squaresArr[i+num] = [i, i + num, i + num * 2];

            squaresArr[arrLength-2].push(i*num+i);
            squaresArr[arrLength-1].push((i+1)*num-1-i);

        }
        setWinSquares(squaresArr);
    }

    // задание конфигурации игрового поля и запуск игры
    function setConfig(num) {
        let board = new Array(num).fill(null);

        if (checkNum) {

            calculateWinnerSquares(num);

            board = board.map( (row, order, acc) => {
                return acc[order] = Array(num).fill(null);
            })

            setStartGame(true);
            setSquares(board);
        }
    }

    // первый экран с настройками игры
    function setConfigBlock() {
        return (
            <div className="game__num">
                <p className="game__num-text">Создать поле шириной:</p>
                <input
                    className={(!checkNum) ? 'error game__num-form ' : 'game__num-form '}
                    type="text"
                    value={numBoards}
                    onChange={event => changeNumBoards(Number(event.target.value))}>
                </input>
                <button
                    className="game__create-btn"
                    onClick={() => setConfig(numBoards)}
                >
                    Создать
                </button>
            </div>
        )
    }

    // -----------------------------------------------------------------

    // смена игрока
    function handleClick(i, j, winner) {
        if (!squares[i][j] && !winner) {
            squares[i][j] = xIsNext ? 'X' : 'O';
            setSquares(squares);
            setXO(!xIsNext);
        }
    }

    // проверка на победителя
    function calculateWinner(squares, winSquares) {
        let squaresArray = squares.flat();

        for (let i = 0; i < winSquares.length; i++) {
            let flag = false;

            if (squaresArray[winSquares[i][0]]) {
                for (let j = 0; j < squares.length; j++) {
                    flag = (squaresArray[winSquares[i][0]] === squaresArray[winSquares[i][j]]);
                    if (!flag) {
                        break;
                    }
                }
            }
            if (flag) {
                return squaresArray[winSquares[i][0]];
            }
        }
        return null;
    }

    // игра
    function setGameBlock() {
        let status;
        let winner = calculateWinner(squares, winSquares);

        if (winner) {
            status = 'Выиграл ' + winner;
        } else if (squares.flat().every(elem => elem !== null)) {
            status = 'Ничья';
        } else {
            status = 'Следующий ход ' + (xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game__board">
                <div>
                    <Board
                        squares={squares}
                        num={numBoards}
                        onClick = {(i, j) => handleClick(i, j, winner)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="game">
            <div>
                {!startGame
                    && setConfigBlock()}
            </div>
            <div>
                {startGame
                    && setGameBlock()}
            </div>
        </div>
    );
};

export default Game;