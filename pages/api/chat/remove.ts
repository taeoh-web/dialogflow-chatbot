// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import withSession from '../../../lib/session'


type NextIronRequest = NextApiRequest & { session: Session };

  async function handler(
    req: NextIronRequest,
    res: NextApiResponse,
  ): Promise<void> {
    try{

      

      req.session.unset("chatRoom");

      
        res.status(200).json({
          status: 1
        })
      

      
    }catch(e){
      res.status(500).json({
        status: 500
      })
    }

  
}


export default withSession(handler)
