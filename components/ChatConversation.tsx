import React, { ReactNode, useEffect } from 'react'
import styles from '../styles/Layout.module.css'
import Bubble from '../components/Bubble'
import {useConversation} from '../hooks/useConversation'
import { Conversation } from '../interfaces/conversation'

type Props = {
  children?: ReactNode
}

const ChatConversation = ({ children }: Props) => {

  const {conversationData} = useConversation();
  useEffect(()=>{
    const botConversation = document!.querySelector<HTMLInputElement>(`.${styles['bot-conversation']}`)!;
    botConversation.scrollTop = botConversation.offsetHeight + botConversation.scrollTop;
  },[conversationData]);
  

  const listItems = conversationData && conversationData.map((item: Conversation, idx: number) =>
    <Bubble key={idx} sender={item.sender} msg={item.msg} />
  );

  return (
  <section className={styles['bot-conversation']}>
    {listItems}
  </section>
  );
}

export default ChatConversation