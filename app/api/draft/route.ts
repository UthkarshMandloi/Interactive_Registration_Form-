import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const DRAFT_HEADERS = ['Google Email', 'Last Updated', 'Draft Data'];

// Helper to get or create the "Drafts" worksheet tab safely
async function getOrCreateDraftSheet(doc: GoogleSpreadsheet) {
  let draftSheet = doc.sheetsByTitle['Drafts'];
  if (!draftSheet) {
    try {
      draftSheet = await doc.addSheet({ title: 'Drafts', headerValues: DRAFT_HEADERS });
    } catch (e) {
      draftSheet = doc.sheetsByTitle['Drafts'];
    }
  }
  
  if (draftSheet) {
    try {
      await draftSheet.loadHeaderRow();
      if (!draftSheet.headerValues || draftSheet.headerValues.length === 0) {
        await draftSheet.setHeaderRow(DRAFT_HEADERS);
      }
    } catch (e) {
      try {
        await draftSheet.setHeaderRow(DRAFT_HEADERS);
      } catch (err) {}
    }
  }
  return draftSheet;
}

// GET: Retrieve saved draft for a user's Google Email
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      return NextResponse.json({ draft: null, configured: false });
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = await getOrCreateDraftSheet(doc);

    if (!sheet) {
      return NextResponse.json({ draft: null, configured: true });
    }

    let rows: any[] = [];
    try {
      rows = await sheet.getRows();
    } catch (e) {
      rows = [];
    }

    const targetEmail = email.trim().toLowerCase();
    const match = rows.find(row => row.get('Google Email')?.toString().trim().toLowerCase() === targetEmail);

    if (match && match.get('Draft Data')) {
      try {
        const draftData = JSON.parse(match.get('Draft Data'));
        return NextResponse.json({ draft: draftData, configured: true });
      } catch (err) {
        return NextResponse.json({ draft: null, configured: true });
      }
    }

    return NextResponse.json({ draft: null, configured: true });
  } catch (error: any) {
    console.error('Draft GET error:', error);
    return NextResponse.json({ draft: null, error: error.message }, { status: 500 });
  }
}

// POST: Save or update draft for a user's Google Email
export async function POST(req: Request) {
  try {
    const { email, draftData } = await req.json();

    if (!email || !draftData) {
      return NextResponse.json({ error: 'Email and draftData required' }, { status: 400 });
    }

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      return NextResponse.json({ success: true, devMode: true });
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = await getOrCreateDraftSheet(doc);

    if (!sheet) {
      return NextResponse.json({ success: false, error: 'Draft sheet unavailable' }, { status: 500 });
    }

    let rows: any[] = [];
    try {
      rows = await sheet.getRows();
    } catch (e) {
      rows = [];
    }

    const targetEmail = email.trim().toLowerCase();
    const existingRow = rows.find(row => row.get('Google Email')?.toString().trim().toLowerCase() === targetEmail);

    const istTimestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const jsonString = JSON.stringify(draftData);

    if (existingRow) {
      existingRow.set('Last Updated', istTimestamp);
      existingRow.set('Draft Data', jsonString);
      await existingRow.save();
    } else {
      await sheet.addRow({
        'Google Email': email.trim(),
        'Last Updated': istTimestamp,
        'Draft Data': jsonString,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Draft POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Remove draft after successful submission
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      return NextResponse.json({ success: true });
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Drafts'];

    if (sheet) {
      const rows = await sheet.getRows();
      const targetEmail = email.trim().toLowerCase();
      const existingRow = rows.find(row => row.get('Google Email')?.toString().trim().toLowerCase() === targetEmail);
      if (existingRow) {
        await existingRow.delete();
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Draft DELETE error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
