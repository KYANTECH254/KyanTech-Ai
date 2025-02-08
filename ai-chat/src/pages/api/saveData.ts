import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const dataFilePath = path.join(process.cwd(), 'data', 'chats.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { data } = req.body;

        // Write the data to the JSON file
        fs.writeFile(dataFilePath, JSON.stringify(data), (err) => {
            if (err) {
                res.status(500).json({ message: 'Error writing data to file' });
            } else {
                res.status(200).json({ message: 'Data written successfully' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}