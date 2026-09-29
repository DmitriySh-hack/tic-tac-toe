let socket: WebSocket | null = null

export function connection(url: string){
    socket = new WebSocket(url)
    return socket
}

export function send(data: object){
    if(socket?.readyState !== WebSocket.OPEN) return
    socket.send(JSON.stringify(data))
}