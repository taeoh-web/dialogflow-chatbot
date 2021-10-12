import React, { createContext, ReactNode, useContext, useState } from 'react'
import {Conversation} from '../interfaces/conversation'

type State = {
    ConversationDispatcher?: any
    conversationData?: any
  };



const ConversationContext = createContext<Partial<State>>({});

export const useConversation = () => useContext(ConversationContext);


export default function ConversationProvider({children, initialData}: {children: ReactNode, initialData: any}){
    const [conversationData, setConversationData] = useState(initialData);
    

    // 상태관리 
    const ConversationDispatcher = () => {
        
        return {
            findIndex: (cb: () => void) => {
                return conversationData.findIndex(cb);
            },
            add: (requstData: Conversation | Conversation[]  ) => {
                
                let rtnConversationData = conversationData;

                if(Array.isArray(requstData)){
                    rtnConversationData = [...conversationData, ...requstData]
                }else{
                    rtnConversationData.push(requstData);
                }


                setConversationData(rtnConversationData);
            },
            update: (cb: () => void) => {
                setConversationData(conversationData.map(cb));
            },
            delete: () => {}
        }
    }

    return (
        <ConversationContext.Provider value={{ 
            conversationData,
            ConversationDispatcher
        }}>
            {children}
        </ConversationContext.Provider>
    )
}


