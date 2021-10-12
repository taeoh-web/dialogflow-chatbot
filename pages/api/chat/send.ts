// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import withSession from '../../../lib/session'
import axios from "axios";

const dialogflow = require('@google-cloud/dialogflow');

type NextIronRequest = NextApiRequest & { session: Session };

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {
   
  
        try{
            const projectId = 'dialogflowtest-283506';
            const sessionId = '1234';
            const queries = [req.body.msg];
            const languageCode = 'ko';

        
            const result = await executeQueries(projectId, sessionId, queries, languageCode, req, res);
            if(!result || !result.length) throw new Error('인식실패');

            const nluMsg = result[0].fulfillmentText;
            

            // 객체추출 
            let entity = '', entityValue = '';
            if(result[0].parameters){
                for(const val in result[0].parameters){
                    
                    if(result[0].parameters[val].stringValue){
                        entity = val;
                        entityValue = result[0].parameters[val].stringValue;
                        break;
                    }
                }
            }

            console.log(result[0].queryText);
            
           

            res.status(200).json({
                status: 1,
                msg: nluMsg
            })
        
        }catch(error:any){
            res.status(500).json({
                status: 1,
                msg: error.message
            })
        }
    
  
}





function timestamp(){ 
    var today = new Date(); 
    today.setHours(today.getHours() + 9); 
    return today.toISOString().replace('T', ' ').substring(0, 19); 
}


async function detectIntent(
    projectId: any,
    sessionId: any,
    query: any,
    contexts: any,
    languageCode: any
) {

    const sessionClient = new dialogflow.SessionsClient();

    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
        queryParams: {}
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    //console.log(responses);
    return responses[0];
}

async function executeQueries(projectId: any, sessionId: any, queries: any, languageCode: any, req:any, res:any) {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let context;
    let intentResponse;
    const rtnValue = [];

    for (const query of queries) {
        try {
            console.log(`Sending Query: ${query}`);
            intentResponse = await detectIntent(
                projectId,
                sessionId,
                query,
                context,
                languageCode
            );
            
            //console.log(intentResponse);
            

            context = intentResponse.queryResult.outputContexts;

            rtnValue.push({
                queryText: intentResponse.queryResult.queryText,
                intentDisplayName: intentResponse.queryResult.intent.displayName,
                intentDetectionConfidence: intentResponse.queryResult.intentDetectionConfidence,
                fulfillmentText: intentResponse.queryResult.fulfillmentText,
                isFallback: intentResponse.queryResult.intent.isFallback,
                parameters: intentResponse.queryResult.parameters.fields
            });

        } catch (error: any) {
            console.log(error);
        }
    }


    return rtnValue;
    

}

export default withSession(handler)