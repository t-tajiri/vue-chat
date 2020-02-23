export interface State {
  username: string,
  name: string,
  rooms: Array<Room>
}

export interface Room {
  id: string,
  name: string
}
