import { useToast } from '@apideck/components'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { sendMessage } from './sendMessage'

interface ContextProps {
  messages: any[]
  addMessage: (content: string) => Promise<void>
  isLoadingAnswer: boolean
}

const ChatsContext = createContext<Partial<ContextProps>>({})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [messages, setMessages] = useState<any[]>([])
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage: any = {
        role: 'system',
        content: 'You are KyanTech AI, a large language model trained by Kyan.'
      }
      const welcomeMessage: any = {
        role: 'assistant',
        content: 'Hi, How can I help you today?'
      }
      setMessages([systemMessage, welcomeMessage])
    }

    // When no messages are present, we initialize the chat the system message and the welcome message
    // We hide the system message from the user in the UI
    if (!messages?.length) {
      initializeChat()
    }
  }, [messages?.length, setMessages])

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true)
    try {
      const newMessage: any = {
        role: 'user',
        content
      }
      const newMessages = [...messages, newMessage]
  
      // Add the user message to the state so we can see it immediately
      setMessages(newMessages)
  
      const { data } = await sendMessage(newMessages)
      
      // Extract the assistant's response from Ollama's response format
      const reply: any = {
        role: 'assistant',
        content: data.response 
      }
  
      // Add the assistant's message to the state
      setMessages([...newMessages, reply])
    } catch (error) {
      addToast({ title: 'An error occurred', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }
  

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps
}
