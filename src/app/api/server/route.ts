import fs from 'fs';
import path from 'path';
import { NextApiResponse, NextApiRequest } from 'next'
import { NextResponse } from 'next/server';
import { headers } from 'next/headers'
import requestip from 'request-ip';

export async function GET(req: any, res: Response | NextApiResponse) {
    const logData = `${new Date().toISOString()} - User Agent: ${headers().get('user-agent')}, IP Address: ${headers().get("x-forwarded-for")} / ${requestip.getClientIp(req)}\n`;
    const logFilePath = path.join(process.cwd(), 'logs', 'access.log');

    fs.appendFile(logFilePath, logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    return NextResponse.json({ succes: true })
}