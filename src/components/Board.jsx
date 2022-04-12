import React from 'react';
import Square from "./Square";

const Board = (props) => {
    const board = props.squares.map((row, order) => {
            return (
                <div key={order} className="board-row">
                    {row.map((square, orderS) => {
                        return renderSquare(order, orderS);
                    })}
                </div>
            )
        })

    function renderSquare(i, j) {
        return (
            <Square
                value={props.squares[i][j]}
                onClick={() => props.onClick(i, j)}
            />
        )
    }

    return (
        <div>
            {board}
        </div>
    );
};

export default Board;