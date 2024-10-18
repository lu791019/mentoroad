import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';

const calendar = google.calendar({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).json({ error: 'You must be logged in.' });
  }

  if (req.method === 'POST') {
    try {
      const { summary, description, startDateTime, endDateTime } = req.body;

      const event = {
        summary,
        description,
        start: {
          dateTime: startDateTime,
          timeZone: 'UTC',
        },
        end: {
          dateTime: endDateTime,
          timeZone: 'UTC',
        },
      };

      const result = await calendar.events.insert({
        auth: process.env.GOOGLE_API_KEY,
        calendarId: 'primary',
        requestBody: event,
      });

      res.status(200).json({ eventId: result.data.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}