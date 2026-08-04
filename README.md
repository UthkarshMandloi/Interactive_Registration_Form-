# NSS IET DAVV - Volunteer Registration Web Application

Official Registration Form Website for **National Service Scheme (NSS), Institute of Engineering & Technology, DAVV Indore**.

---

## 🌟 Features

- **Google Authentication Intercept**:
  - The form is visible upon landing.
  - Clicking or attempting to fill any field automatically prompts the user to log in with their Google account.
- **Single Submission Enforcement**:
  - Prevents duplicate registrations from the same Google / Email account.
  - Automatically queries the Google Sheet on sign-in and displays a status card if already submitted.
- **Google Sheets Database Integration**:
  - Automatically appends registration records with serial number (`S.no.`), IST timestamp, Google Email, and all volunteer details into Google Sheet.
- **Bilingual Support (English & Hindi)**:
  - Top-Right toggle button (`En / हिंदी`) to seamlessly switch languages across all UI elements, options, and status screens.
- **Show/Hide NSS Reg. No.**:
  - Configurable via `NEXT_PUBLIC_SHOW_NSS_REG_NO` environment variable.
- **Field Validations**:
  - Contact number format validation (10 digits only, without entering `+91`).
  - Gmail address validation (`@gmail.com`).
  - Date picker for Date of Birth (`DOB`).
- **NSS IET DAVV Branding**:
  - Favicon replacement with `public/NSS_logo_Fav.png`.
  - Website logo updated with `public/R.png`.

---

## 🛠️ Environment Variables Configuration Guide

Create a `.env.local` file in the project root folder (you can copy `.env.example`).

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
NEXT_PUBLIC_SHOW_NSS_REG_NO="true"
GOOGLE_SHEET_ID="your_google_spreadsheet_id"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

---

## 📋 Step-by-Step Setup Guide

### Step 1: Set Up Google Cloud Console & Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing project.
3. In the left navigation, go to **APIs & Services** > **OAuth consent screen**.
   - Choose **External**, click **Create**.
   - Fill in App Name (e.g., *NSS IET DAVV Registration*), User support email, and Developer contact email.
   - Click **Save and Continue**.
4. Go to **APIs & Services** > **Credentials**.
5. Click **+ Create Credentials** > **OAuth client ID**.
6. Select **Web application** as the Application type.
7. Under **Authorized JavaScript origins**, add:
   - `http://localhost:3000` (for local development)
   - Your production domain (e.g., `https://your-domain.vercel.app`)
8. Click **Create** and copy the **Client ID**.
9. Paste it as `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in `.env.local`.

---

### Step 2: Enable Google Sheets API & Create Service Account

1. In Google Cloud Console, go to **APIs & Services** > **Library**.
2. Search for **Google Sheets API** and click **Enable**.
3. Go to **APIs & Services** > **Credentials**.
4. Click **+ Create Credentials** > **Service Account**.
5. Enter a Service Account name (e.g., `nss-sheets-service`) and click **Create and Continue**.
6. Grant role: **Project** > **Editor** (or basic editor rights), then click **Done**.
7. Click on the newly created Service Account email in the list.
8. Go to the **Keys** tab > **Add Key** > **Create new key**.
9. Select **JSON** and click **Create**. A `.json` file will download to your computer.
10. Open the downloaded `.json` file in a text editor:
    - Copy `client_email` and set it as `GOOGLE_SERVICE_ACCOUNT_EMAIL` in `.env.local`.
    - Copy `private_key` and set it as `GOOGLE_PRIVATE_KEY` in `.env.local` (ensure newlines `\n` are preserved inside quotes).

---

### Step 3: Set Up Your Google Sheet & Share Access

1. Create a new [Google Sheet](https://sheets.google.com).
2. Copy the **Spreadsheet ID** from the browser URL bar:
   `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`**`/edit`
3. Set `GOOGLE_SHEET_ID` in `.env.local` to this ID.
4. Click the **Share** button in top-right of your Google Sheet.
5. Add your `GOOGLE_SERVICE_ACCOUNT_EMAIL` (copied in Step 2) with **Editor** permissions.
6. Click **Send** / **Save**.

---

### Step 4: Run Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment (Vercel)

1. Push your repository to GitHub / GitLab.
2. Import the repository into [Vercel](https://vercel.com).
3. Add all environment variables in Vercel Project Settings > Environment Variables:
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_SHOW_NSS_REG_NO` (`true` or `false`)
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Deploy!
