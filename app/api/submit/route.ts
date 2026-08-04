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

    // Safely load or initialize header row & existing rows
    let existingRows: any[] = [];
    try {
      await sheet.loadHeaderRow();
      if (!sheet.headerValues || sheet.headerValues.length === 0) {
        await sheet.setHeaderRow(HEADERS);
        existingRows = [];
      } else {
        existingRows = await sheet.getRows();
      }
    } catch (e: any) {
      await sheet.setHeaderRow(HEADERS);
      existingRows = [];
    }

    // Check duplicate by Google Email or form Email in the MAIN submissions sheet
    const targetGoogleEmail = (googleEmail || email).toLowerCase().trim();
    const isDuplicate = existingRows.some(row => {
      const gEmail = row.get('Google Email')?.toString().trim().toLowerCase();
      const fEmail = row.get('Email Address')?.toString().trim().toLowerCase();
      return gEmail === targetGoogleEmail || fEmail === targetGoogleEmail;
    });

    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: 'ALREADY_SUBMITTED' },
        { status: 409 }
      );
    }

    const serialNo = existingRows.length + 1;

    // Generate IST Timestamp
    const istTimestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    // Append new row with all fields to the main submission sheet
    await sheet.addRow({
      'S.no.': serialNo,
      'Timestamp': istTimestamp,
      'Google Email': googleEmail || email,
      'NSS Reg.  No.': nssRegNo || 'N/A',
      'Name Of Volunteer': name.trim(),
      'Year': year,
      'Category': category,
      'Branch': branch,
      "Father's Name": fatherName.trim(),
      'DOB': dob,
      'Gender': gender,
      'Contact Number': cleanPhone,
      'Email Address': email.trim(),
      'Blood Group': bloodGroup || 'N/A',
      'Current Address': address.trim(),
    });

    return NextResponse.json({ success: true, sno: serialNo });
  } catch (error: any) {
    console.error('Submit API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}