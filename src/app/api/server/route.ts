import fs from 'fs';
import path from 'path';
import { NextApiResponse, NextApiRequest } from 'next'
import { NextResponse } from 'next/server';
import { headers } from 'next/headers'
import requestip from 'request-ip';

export async function GET(req: any, res: Response | NextApiResponse) {
    const getIpLocation = await fetch(`https://api.lolhuman.xyz/api/ipaddress/${headers().get("x-forwarded-for")?.split(',').shift()}?apikey=paixxx`).then(res => res.json())
    const logData = `${new Date().toISOString()} - User Agent: ${headers().get('user-agent')}, IP Address: ${headers().get("x-forwarded-for")} / ${requestip.getClientIp(req)}\t${getIpLocation.result.country || null}\t${getIpLocation.result.city || null}\t${getIpLocation.result.regionName}\n`;
    const logFilePath = path.join(process.cwd(), 'logs', 'access.log');

    fs.appendFile(logFilePath, logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Successfully wrote to log file.')
        }
    });

    return NextResponse.json({ succes: true })
}