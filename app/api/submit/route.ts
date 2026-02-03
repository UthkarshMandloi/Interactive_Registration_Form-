import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

export async function POST(req: Request) {
  try {
    const { name, email, college } = await req.json();

    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID!, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Load existing rows to find the next empty row
    const rows = await sheet.getRows();
    const nextRowIndex = rows.length + 2; // +2 because: +1 for header row, +1 for 1-based index
    
    // Use raw values to append - this is the most reliable method
    await sheet.addRows([
      [
        new Date().toLocaleString(),
        name,
        college
      ]
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}