import MessageForm from 'components/MessageForm'
import MessagesList from 'components/MessageList'
import { NextPage } from 'next'
import { MessagesProvider } from 'utils/useMessages'
import Layout from '../components/Layout'
import ModelSelector from 'components/ModelSelector'

const IndexPage: NextPage = () => {
  const handleModelChange = (model: string) => {
    console.log('Selected Model:', model)
  }
  return (
    <MessagesProvider>
      <Layout>
      <ModelSelector onModelChange={handleModelChange} />
        <MessagesList />
        <div className="fixed bottom-0 right-0 left-0">
          <MessageForm />
        </div>
      </Layout>
    </MessagesProvider>
  )
}

export default IndexPage
