import { GetStaticProps } from 'next'
import { Conversation } from '../interfaces/conversation'
import { initialConversationData } from '../data/initial-conversation-data'
import ChatHeader from '../components/ChatHeader'
import Layout from '../components/Layout'
import ChatConversation from '../components/ChatConversation'
import ChatInterface from '../components/ChatInterface'
import ConversationProvider from '../hooks/useConversation'
import useChatRoom from '../hooks/useChatRoom'

const Home = ({ items }: {items: Conversation[]}) => {
 
  useChatRoom();

  const title = "GentlePie Test ChatBot";
  return (
    <ConversationProvider initialData={items} >
      <Layout title={title}>
        <ChatHeader />
        <ChatConversation />
        <ChatInterface />
      </Layout>
      </ConversationProvider>
  )
}




export const getStaticProps:GetStaticProps = () => {
  

  const items: Conversation[] = initialConversationData;

  return {
    props: { 
      items: items
    },
  };

};




export default Home