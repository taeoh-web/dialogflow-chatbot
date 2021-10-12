// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import withSession from '../../../lib/session'
const fs = require('fs');
type NextIronRequest = NextApiRequest & { session: Session };

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {
  
  
  
    res.status(200).json(req.session.get("chatRoom"));


  

  
}


export default withSession(handler)
