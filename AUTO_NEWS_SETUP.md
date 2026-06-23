# Automatic Daily AI News Setup

This project now includes Firebase Cloud Functions scaffolding for automatic AI news updates.

## What it does

- Fetches AI news automatically every day at `8:00 AM` in `Asia/Kolkata`
- Saves the latest items into the Firestore `daily_news` collection
- Keeps your existing `home.html` realtime news UI working without any frontend changes
- Includes a manual HTTP trigger for testing
- Uses Google News RSS, so no third-party API key is required

## Files added

- `firebase.json`
- `.firebaserc`
- `functions/package.json`
- `functions/index.js`

## Before deploy

1. Install Firebase CLI if you do not already have it:
   `npm install -g firebase-tools`
2. Login:
   `firebase login`
3. Install function dependencies:
   `cd functions`
   `npm install`
## Deploy

From the project root:

`firebase deploy --only functions`

## Manual test

After deploy, open the HTTP function URL for `syncDailyAiNewsNow`
or call it with Postman/browser to force an immediate sync.

## Important note

This automatic news feature still needs Firebase Blaze plan for scheduled functions.
Without that, news can still be added manually from `admin.html`, but not automatically every day.
