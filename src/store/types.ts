export interface State {
  user?: User
  rooms: Array<Room>,
  messages: Array<Message>,
  activeRoom?: Room,
  reconnect: boolean
}

export interface User {
  id: string,
  name: string
}

export interface Room {
  id: string,
  name: string
}

export interface Message {
  name: string,
  username: string,
  text: string,
  date: string
}
