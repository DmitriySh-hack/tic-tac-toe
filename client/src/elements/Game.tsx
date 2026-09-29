import { useEffect, useRef, useState } from 'react'
import Boarder from './Boarder'
import type { SquareValue } from './Boarder'
import { useDispatch, useSelector } from 'react-redux'
import type { RootStore } from '../api/store'
import { Button, Modal } from 'react-bootstrap'
import { setUsername } from '../api/slice/usernameSlice'
import { useParams } from 'react-router-dom'
import { connection, send } from '../api/socket/socketIntegration'

export default function Game(){
    const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const nextX = currentMove % 2 === 0
    const currentSquare = history[currentMove]

    const params = useParams()

    const socketRef = useRef<WebSocket | null>(null)
    const usernameRef = useRef<HTMLInputElement>(null)

    const [modal, setModal] = useState(true)

    const username = useSelector((state: RootStore) => {
        return state.userName.username
    })
    const dispatch = useDispatch()

    useEffect(() => {
        const id = params.id;
        if(username){
            const socket = connection('ws://localhost:5002/')
            socketRef.current = socket;
            socket.onopen = () => {
                console.log(`Connection with WebSockets`)
                socket.send(JSON.stringify({
                    id,
                    username: username,
                    method: 'connection'
                }))
            }

            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch(msg.method){
                    case "connection":
                        console.log(`Подключился пользователь ${msg.username}`)
                        break;
                    case "move":
                        moveHandler(msg)
                        break;
                }
                
            }
        }
        
    }, [username, socketRef])



    const handleConnection = () => {
        if(!usernameRef.current) return
        const name = usernameRef.current.value;
        dispatch(setUsername(name))
        setModal(false)
    }

    const handlePlay = (nextSquares: SquareValue[]) => {
        send({
            method: "move",
            id: params.id,
            squares:nextSquares
        })
    }

    const jumpTo = (nextMove: number) => {
        setCurrentMove(nextMove)
    }

    const moveHandler = (msg: any) => {
        setHistory((prev) => [...prev, msg.squares])
        setCurrentMove((move) => move + 1)
    }

    return (
        <>
        <div>
            <div>
                <Boarder queueX={nextX} squares={currentSquare} onPlay={handlePlay}/>
            </div>
        </div>

        <Modal show={modal} onHide={() => {}}>
            <Modal.Header>
                <Modal.Title>Введите имя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type='text' ref={usernameRef}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleConnection}>
                    Войти
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}