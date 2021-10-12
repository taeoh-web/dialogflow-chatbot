// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { v1 } from 'uuid';
import withSession from '../../../lib/session'
const fs = require('fs');
type NextIronRequest = NextApiRequest & { session: Session };

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {
  
  
  const chatRoom = {
    session: v1(), 
    uid: req.session.get("chatRoom")?.uid ? req.session.get("chatRoom").uid : v1()
  }


  req.session.set("chatRoom", chatRoom);
  await req.session.save();
  res.status(200).json(req.session.get("chatRoom"));


  

  
}


export default withSession(handler)
