import { increment } from "../api/slice/slice";
import type { RootStore } from "../api/store";
import { useDispatch, useSelector } from "react-redux";

type Play = 'X' | 'O' 
export type SquareValue = Play | null

function calculateWinner(squares: SquareValue[] | undefined): Play | null {
    if (!squares || squares.length !== 9) {
        return null;
    }

    const lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];
    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i]
        const aVal = squares[a]
        if(aVal && aVal === squares[b] && aVal === squares[c]){
            return aVal;
        }
    }
    return null
}

interface SquareType {
    value: SquareValue, 
    handler: () => void;
}

export function Square({value, handler}: SquareType){
    return (
        <button 
            style={{background: 'none', border: 'solid 1px black', width: "20px", height: "20px"}}
            onClick={handler}
        >
            {value}
        </button>
    )
}

interface BorderProps{
    queueX: boolean;
    squares: SquareValue[];
    onPlay: (nextSquare: SquareValue[]) => void;
}

export default function Boarder({queueX, squares, onPlay}: BorderProps){
    // const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null))
    // const [queueX, setQueueX] = useState(true)

    const count = useSelector((state: RootStore) => {
        state.counter.value
    })
    
    const dispatch = useDispatch()

    const handleClick = (i: number) => {
        if(squares[i] || calculateWinner(squares)) return 
        const nextSquare = squares.slice()
        if(queueX){
            nextSquare[i] = 'X'
        }else{
            nextSquare[i] = 'O'
        }
        onPlay(nextSquare)
        dispatch(increment())
        console.log(count)
    }

    const winner = calculateWinner(squares)
    let status;

    if(winner){
        status = "Winner " + winner
    }

    return (
        <>
            <div>
                <Square 
                    value={squares[0]}
                    handler={() => handleClick(0)}
                />
                <Square  
                    value={squares[1]}
                    handler={() => handleClick(1)}
                />
                <Square 
                    value={squares[2]}
                    handler={() => handleClick(2)}
                />
            </div>
            <div>
                <Square 
                    value={squares[3]}
                    handler={() => handleClick(3)}
                />
                <Square  
                    value={squares[4]}
                    handler={() => handleClick(4)}
                />
                <Square  
                    value={squares[5]}
                    handler={() => handleClick(5)}
                />
            </div>
            <div>
                <Square 
                    value={squares[6]}
                    handler={() => handleClick(6)}
                />
                <Square  
                    value={squares[7]}
                    handler={() => handleClick(7)}
                />
                <Square  
                    value={squares[8]}
                    handler={() => handleClick(8)}
                />
            </div>
            <div>{status}</div>
        </>
    )
}