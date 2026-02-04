import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

export async function POST(req: Request) {
  try {
    // 1. Capture all four fields from your updated form
    const { name, college, email, phone } = await req.json();

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      throw new Error("Missing Environment Variables");
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // 2. Generate IST Timestamp for Yuva Mahotsav
    const istTimestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // 3. Append all data columns
    // Ensure your Google Sheet Row 1 has headers: Timestamp, Name, College, Email, Phone
    await sheet.addRow({
      Timestamp: istTimestamp,
      Name: name.toUpperCase(), // Standardizing names for the sheet
      College: college,
      Email: email,
      Phone: phone
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Operation Error:', error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}