import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

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

    const accessToken = await getAccessToken();

    // Fetch values from main sheet (A to Z)
    const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:Z`;
    const readRes = await fetch(readUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!readRes.ok) {
      return NextResponse.json({ submitted: false, configured: true });
    }

    const readData = await readRes.json();
    const values: any[][] = readData.values || [];

    if (values.length <= 1) {
      // Only header or empty
      return NextResponse.json({ submitted: false, configured: true });
    }

    const headers = values[0] || [];
    function normalizeHeader(header: string): string {
      return header.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    let googleEmailColIdx = headers.findIndex((h: any) => normalizeHeader(String(h)) === 'googleemail');
    let emailAddressColIdx = headers.findIndex((h: any) => {
      const norm = normalizeHeader(String(h));
      return norm === 'emailaddress' || norm === 'email';
    });

    if (googleEmailColIdx === -1) googleEmailColIdx = 2; // Column C fallback
    if (emailAddressColIdx === -1) emailAddressColIdx = 13; // Column M fallback

    const normalizedTarget = email.trim().toLowerCase();
    const submissions = values.slice(1);

    const existing = submissions.find((row) => {
      const gEmail = row[googleEmailColIdx]?.toString().trim().toLowerCase();
      const fEmail = row[emailAddressColIdx]?.toString().trim().toLowerCase();
      return gEmail === normalizedTarget || fEmail === normalizedTarget;
    });

    let submission = null;
    if (existing) {
      const getCol = (keyNorms: string[]) => {
        const idx = headers.findIndex((h: any) => keyNorms.includes(normalizeHeader(String(h))));
        return idx !== -1 ? existing[idx] || '' : '';
      };

      submission = {
        institute: getCol(['institutesname', 'institutename', 'institute']) || "Institute of Engineering & Technology, DAVV",
        nssRegNo: getCol(['nssregno', 'nssregistrationnumber']),
        name: getCol(['nameofvolunteer', 'volunteername', 'name']),
        course: getCol(['course']),
        year: getCol(['year']),
        category: getCol(['category']),
        branch: getCol(['branch']),
        fatherName: getCol(['fathersname', 'fathername']),
        motherName: getCol(['mothersname', 'mothername']),
        dob: getCol(['dob', 'dateofbirth']),
        gender: getCol(['gender']),
        contactNo: getCol(['contactnumber', 'contactno', 'contact', 'phone', 'mobile']),
        email: getCol(['emailaddress', 'email', 'googleemail']) || email,
        bloodGroup: getCol(['bloodgroup']),
        height: getCol(['height', 'heightincm']),
        interests: getCol(['interests', 'interest']),
        interestedVertical: getCol(['interestedvertical', 'vertical']),
        nssCertificate: getCol(['previousnsscertificate', 'nsscertificate']),
        address: getCol(['currentaddress', 'address']),
      };
    }

    return NextResponse.json({ 
      submitted: Boolean(existing), 
      submission,
      configured: true 
    });
  } catch (error: any) {
    console.error('Check submission error:', error);
    return NextResponse.json({ submitted: false, configured: true, error: error.message }, { status: 500 });
  }
}
