import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import { useStore } from '@/store'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR
const TOKEN_PROVIDER = process.env.VUE_APP_TOKEN_PROVIDER

let currentUser = null
let activeRoom = null

async function connectUser (userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_PROVIDER }),
    userId
  })

  currentUser = await chatManager.connect()
  return currentUser
}

async function subscribeToRoom (roomId) {
  const store = useStore()

  activeRoom = await currentUser.subscribeToRoomMultipart({
    roomId,
    hooks: {
      onMessage: message => {
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.parts[0].payload.content,
          date: new Date(message.createdAt).toLocaleString('ja-JP')
        })
      }
    }
  })
}

async function sendMessage (text) {
  const messageId = await currentUser.sendSimpleMessage({
    text,
    roomId: activeRoom.id
  })

  return messageId
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage
}
