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

async function getAccessToken() {
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing Google Service Account credentials");
  }
  const client = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const res = await client.getAccessToken();
  return res.token;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      googleEmail,
      nssRegNo,
      name,
      year,
      category,
      branch,
      fatherName,
      dob,
      gender,
      contactNo,
      email,
      bloodGroup,
      address,
    } = body;

    // Validate mandatory fields
    if (!name || !year || !category || !branch || !fatherName || !dob || !gender || !contactNo || !email || !address) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory fields' },
        { status: 400 }
      );
    }

    // Server-side Gmail validation
    if (!email.toLowerCase().trim().endsWith('@gmail.com')) {
      return NextResponse.json(
        { success: false, error: 'Email must be a valid @gmail.com address' },
        { status: 400 }
      );
    }

    // Server-side Phone number validation (10 digits only)
    const cleanPhone = contactNo.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Contact number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    // Check environment configuration
    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      console.warn("Google Sheet Environment Variables missing. Returning mock success for dev mode.");
      return NextResponse.json({ success: true, devMode: true });
    }

    const accessToken = await getAccessToken();

    // 1. Fetch current sheet values (Columns A to O)
    const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:O`;
    const readRes = await fetch(readUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const readData = await readRes.json();

    let values: any[][] = readData.values || [];

    // 2. If sheet is completely empty, initialize Row 1 with headers
    if (values.length === 0) {
      const initUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:O1?valueInputOption=USER_ENTERED`;
      await fetch(initUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          range: 'A1:O1',
          majorDimension: 'ROWS',
          values: [HEADERS],
        }),
      });
      values = [HEADERS];
    }

    // 3. Check for duplicate email in existing submissions (Rows index 1 onwards)
    const targetGoogleEmail = (googleEmail || email).toLowerCase().trim();
    const existingSubmissions = values.slice(1); // Exclude header row

    const isDuplicate = existingSubmissions.some((row) => {
      const gEmail = row[2]?.toString().trim().toLowerCase(); // Column C: Google Email
      const fEmail = row[12]?.toString().trim().toLowerCase(); // Column M: Email Address
      return gEmail === targetGoogleEmail || fEmail === targetGoogleEmail;
    });

    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: 'ALREADY_SUBMITTED' },
        { status: 409 }
      );
    }

    // Serial number = Total existing rows (Header is row 1, so length = serial number for next row)
    const serialNo = values.length;

    // Generate IST Timestamp
    const istTimestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const newRow = [
      serialNo,
      istTimestamp,
      googleEmail || email,
      nssRegNo || 'N/A',
      name.trim(),
      year,
      category,
      branch,
      fatherName.trim(),
      dob,
      gender,
      cleanPhone,
      email.trim(),
      bloodGroup || 'N/A',
      address.trim(),
    ];

    // 4. Native Google Sheets API v4 Append Call (Guarantees appending to the next empty row below existing data)
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:O1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const appendRes = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        majorDimension: 'ROWS',
        values: [newRow],
      }),
    });

    if (!appendRes.ok) {
      const errText = await appendRes.text();
      throw new Error(`Google Sheets Append failed: ${errText}`);
    }

    return NextResponse.json({ success: true, sno: serialNo });
  } catch (error: any) {
    console.error('Submit API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}