import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR
const TOKEN_PROVIDER = process.env.VUE_APP_TOKEN_PROVIDER

let currentUser = null

async function connectUser (userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_PROVIDER }),
    userId
  })

  currentUser = await chatManager.connect()
  return currentUser
}

export default {
  connectUser
}
