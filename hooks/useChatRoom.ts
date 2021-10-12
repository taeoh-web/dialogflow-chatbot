import axios from "axios";
import { useEffect, useState } from "react";

/* 
 * title: useChatRoom 
 * description: 최초 접속시 챗룸 / uid를 갱신합니다 
 */
export default function useChatRoom(){

    const [chatRoom, setChatRoom] = useState({});
    
    useEffect(() => {
        const newSession = async () => {

            
            const chatRoom = await axios.get('/api/chat/create');
            setChatRoom(chatRoom);
        }

        newSession();
    }, []);

}