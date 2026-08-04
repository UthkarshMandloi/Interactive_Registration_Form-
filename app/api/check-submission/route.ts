import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const HEADERS = [
  'S.no.',
  'Timestamp',
  'Google Email',
  'NSS Reg.  No.',
  'Name Of Volunteer',
  'Year',
  'Category',
  'Branch',
  "Father's Name",
  'DOB',
  'Gender',
  'Contact Number',
  'Email Address',
  'Blood Group',
  'Current Address',
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      return NextResponse.json({ submitted: false, configured: false });
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Select the main submissions sheet (EXCLUDING the 'Drafts' sheet)
    let sheet = doc.sheetsByIndex.find(s => s.title !== 'Drafts');
    if (!sheet) {
      sheet = doc.sheetsByIndex[0];
    }

    // Safety check: Ensure we are NOT reading from the Drafts tab
    if (sheet.title === 'Drafts') {
      return NextResponse.json({ submitted: false, configured: true });
    }

    let rows: any[] = [];
    try {
      await sheet.loadHeaderRow();
      if (!sheet.headerValues || sheet.headerValues.length === 0) {
        await sheet.setHeaderRow(HEADERS);
        rows = [];
      } else {
        rows = await sheet.getRows();
      }
    } catch (e) {
      rows = [];
    }

    const normalizedTarget = email.trim().toLowerCase();

    // Check if any existing row matches the user's email in the MAIN SUBMISSIONS sheet
    const existing = rows.find(row => {
      const gEmail = row.get('Google Email')?.toString().trim().toLowerCase();
      const formEmail = row.get('Email Address')?.toString().trim().toLowerCase();
      return gEmail === normalizedTarget || formEmail === normalizedTarget;
    });

    return NextResponse.json({ 
      submitted: Boolean(existing), 
      configured: true 
    });
  } catch (error: any) {
    console.error('Check submission error:', error);
    return NextResponse.json({ submitted: false, configured: true, error: error.message }, { status: 500 });
  }
}
