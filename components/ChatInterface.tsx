import React, { ReactNode, useEffect, useState } from 'react'
import { Conversation } from '../interfaces/conversation';
import {useConversation} from '../hooks/useConversation'
import axios from 'axios'

const ChatInterface = ({ children }: {children?: ReactNode}) => {
    
    // 상태관리 
    const [chatText, setChatText] = useState("");
    const [onSending, setOnSending] = useState(false);
    const {conversationData, ConversationDispatcher} = useConversation();
    
    
    // 대화상태 Dispatcher  
    const conversationDispatcher = ConversationDispatcher(conversationData);
    

    
    useEffect(() => {
        
        // 서버와 통신할 메시지가 있는지 확인 
        const pendingMsgExist = () => {
            return conversationDispatcher.findIndex( (element: any) => element.status === 'pending');
        }

        // 대화 서버에 전송 
        const pendingMsgSend = async (pendingIndex: number) => {

            const msg = chatText;
            chatTextDisable();

            const response = await axios.post('/api/chat/send', {
                msg: msg
            })

            conversationDispatcher.update( (element: any, index: Number) => {
                if(response.status === 200 && index === pendingIndex){
                    element.msg = response.data.msg;
                    delete element.status;
                }

                return element;
            }); 
        }

        const pendingIndex: number = pendingMsgExist()
        if(pendingIndex !== -1){
            
            pendingMsgSend(pendingIndex);
            chatTextEnable();
        }

    }, [conversationData])



    // 커서이동 
    const onCursor = () => {
        document!.getElementById('chat-text')!.focus();
    }
    
    // 채팅활성화 
    const chatTextEnable = () => {
        setOnSending(false); 
        onCursor();
    }

    // 채팅비활성화 
    const chatTextDisable = () => {
        setChatText(""); 
        setOnSending(true);
    }

    // 대화추가 
    const addPendingData = () => {
        const chatData: Conversation[] = [];
        chatData.push({sender: "user", msg: chatText});
        chatData.push({sender: "bot", msg: '...', status: 'pending'});
        conversationDispatcher.add(chatData);
    }

    // 대화 이벤트 핸들러 
    const chatTextSubmit = async (e: any) => {
        if(e.keyCode === 13){        
            addPendingData();            
        }
    }
    
    
    const disabled: boolean = onSending?true : false;
    const placeholder: string = onSending?"메시지를 전송하고 있습니다" : "궁금한 점이 있으면 물어보세요";


    return (
  <>
  <footer className="bot-interface">
        <input 
            id="chat-text"
            disabled={disabled}
            value={chatText}
            onChange={(e: any) => setChatText(e.target.value)} 
            onKeyDown={chatTextSubmit} 
            className="bot-text" 
            placeholder={placeholder}
        />
  </footer>
  <style jsx>{`
      .bot-text{
        box-sizing: border-box;
        background-color: #f9f9f9;
        border:0;
        border-top: 1px solid #c3c3c3;
        padding:20px;
        width:100%;
        font-size:16px;
    }
  `}</style>
  </>
    )
}

export default ChatInterface
