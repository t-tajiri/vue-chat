export interface State {
  username: string,
  name: string,
  rooms: Array<Room | null>,
  messages: Array<Message | null>
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
