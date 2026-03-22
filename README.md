# Certificate Distribution Website

Production-ready Next.js platform for collecting student details, generating personalized certificate previews, and distributing downloadable certificates at high scale (50,000+ participants).

- Link: https://certificat-website.vercel.app/

## Overview

This project is built for event operations where a large number of students need to receive certificates quickly and reliably.

Core flow:
1. Student submits details (name, college, email, phone).
2. Data is validated and sent to an API route.
3. API appends a timestamped record to Google Sheets.
4. Student previews the certificate and downloads the final PNG.

## Key Features

- Fast and simple registration form UX.
- Certificate image rendering on canvas with dynamic participant name.
- Google Sheets integration for centralized response tracking.
- Event-themed UI and modal-based preview confirmation.
- Server-side environment variable protection for credentials.

## Tech Stack

- Next.js (App Router): https://nextjs.org/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Google Auth Library: https://github.com/googleapis/google-auth-library-nodejs
- Google Spreadsheet package: https://theoephraim.github.io/node-google-spreadsheet/

## Project Structure

- `app/page.tsx`: Main participant form and submission trigger.
- `app/api/submit/route.ts`: API route that writes participant data to Google Sheets.
- `components/PreviewModal.tsx`: Certificate preview and download interaction.
- `public/`: Static assets (certificate template, logo, background).

## Prerequisites

- Node.js 20+ (recommended LTS)
- npm 10+
- Google Cloud service account with access to Google Sheets API
- A Google Sheet shared with the service account email

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

If `.env.example` does not exist yet, create `.env.local` manually with the variables listed below.

3. Start development server:

```bash
npm run dev
```

4. Open:

- http://localhost:3000

## Environment Variables

Create `.env.local` in the project root:

```env
GOOGLE_SHEET_ID=<your_google_sheet_id>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<your_service_account_email>
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
```

Notes:
- Keep quotes around `GOOGLE_PRIVATE_KEY`.
- Preserve `\n` line breaks exactly as shown.
- Never commit real credentials to git.

## Google Sheets Setup

1. Create or open the target Google Sheet.
2. Add header row in row 1:
   - `Timestamp`
   - `Name`
   - `College`
   - `Email`
   - `Phone`
3. Create a Google Cloud service account.
4. Enable the Google Sheets API for that project.
5. Share the Google Sheet with the service account email (Editor role).
6. Copy the sheet ID from the URL into `GOOGLE_SHEET_ID`.

## Build and Production

Build:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

Recommended deployment:
- Vercel: https://vercel.com/docs/frameworks/nextjs

## Manual Updates Required Before Event Launch

Update the following items manually for your event. These are mandatory for a production rollout.

1. Event branding assets in `public/`
- Replace certificate template image (`template.png`) with your final approved design.
- Replace event logo (`logo-yova-utsav.png`) with official high-resolution logo.
- Replace background (`mandala_background.jpg`) if event theme or sponsor branding changes.
- Why it matters: These files directly affect participant-facing certificate quality and event identity.

2. Event title, dates, and copy in `app/page.tsx`
- Update visible event date text, heading, and any tagline.
- Verify capitalization and language style as per official communication.
- Why it matters: Prevents mismatch between digital certificate portal and event announcements.

3. Certificate file naming format in `components/PreviewModal.tsx`
- Review and update download filename pattern:
  - Current pattern: `<Name>_YuvaMahotsav_Certificate.png`
- Why it matters: Consistent filenames improve support, audit, and participant record matching.

4. Certificate text styling and position in `components/PreviewModal.tsx`
- Adjust font family, size, color, and Y-position for participant name if template changes.
- Re-test with short and long names.
- Why it matters: Avoids text overflow/cropping in generated certificates.

5. Google Sheet configuration in environment variables
- Set correct `GOOGLE_SHEET_ID` for the live event sheet.
- Rotate service-account key if this project was tested with shared credentials.
- Why it matters: Incorrect sheet or keys can cause silent data loss or write failures.

6. Form policy text and data consent notice (if required by your institution)
- Add privacy/consent line near submission button.
- Mention exactly how data is used and retained.
- Why it matters: Supports compliance with institutional and regional data protection requirements.

7. Domain and deployment metadata
- Set production URL in deployment platform.
- Confirm SSL/HTTPS and custom domain DNS before launch day.
- Why it matters: Participants must access a trusted domain for high-volume event traffic.

## Operational Recommendations for 50k+ Students

- Perform a full load rehearsal before event day (traffic burst testing).
- Keep backup data capture path ready (secondary form/sheet).
- Monitor API error logs during peak hours.
- Validate random downloaded certificates every hour during live operations.
- Export Google Sheet snapshots periodically for redundancy.

## Security Notes

- Do not expose service-account credentials to the client.
- Restrict service-account permissions to only required sheet access.
- Rotate keys after the event closes.
- Avoid collecting unnecessary personally identifiable information.

## License

This repository currently has no dedicated `LICENSE` file committed.

Recommended options:
- Internal event use only: add a proprietary license notice.
- Open-source reuse allowed: add an MIT license.

Until a `LICENSE` file is added, all rights are reserved by default.

## Useful Links

- Next.js docs: https://nextjs.org/docs
- React docs: https://react.dev/learn
- TypeScript docs: https://www.typescriptlang.org/docs/
- Google Sheets API: https://developers.google.com/sheets/api
- Node Google Spreadsheet package: https://www.npmjs.com/package/google-spreadsheet
