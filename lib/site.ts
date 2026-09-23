/**
 * Company facts only. Everything here is taken from carfintech.com.au as
 * published; nothing invented. Marketing copy lives in lib/content/*.
 */
const url = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000").replace(/\/$/, "");

export const site = {
  name: "Car Fintech",
  legalName: "AUSSIE FINANCIALS PTY LTD",
  tagline: "Your Trusted Vehicle Finance Partner",
  url,
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "1",
  phone: { display: "1300 600 002", tel: "+611300600002", raw: "1300600002" },
  director: {
    name: "Chirag Babbar",
    role: "Director",
    phone: { display: "0415 600 002", tel: "+61415600002" },
    email: "Chirag@carfintech.com.au",
  },
  privacyEmail: "chirag@carfintech.com.au",
  address: {
    line1: "Suite 534, 1 Queens Road",
    city: "Melbourne",
    region: "VIC",
    postalCode: "3004",
    country: "AU",
    full: "Suite 534, 1 Queens Road Melbourne, VIC 3004",
  },
  compliance: {
    abn: "42 652 603 195",
    creditRepresentative: "543902",
    creditLicence: "547719",
    statement:
      "AUSSIE FINANCIALS PTY LTD ABN: 42 652 603 195. Credit Representative #543902 is authorised under Australian Credit Licence #547719",
  },
  disclaimer:
    "Disclaimer: This page provides general information only and has been prepared without taking into account your objectives, financial situation or needs. We recommend that you consider whether it is appropriate for your circumstances and your full financial situation will need to be reviewed prior to acceptance of any offer or product. It does not constitute legal, tax or financial advice and you should always seek professional advice in relation to your individual circumstances.",
  reviews: { rating: "5.0", count: 26, source: "Google" },
  calendly: "https://calendly.com/carfintech-admin/30min",
  social: {
    facebook: "https://www.facebook.com/Carfintech1",
    instagram: "https://www.instagram.com/carfintech/",
    linkedin: "https://www.linkedin.com/company/carfintech/?originalSubdomain=au",
    tiktok: "https://www.tiktok.com/@carfintech",
  },
  original: "https://carfintech.com.au",
} as const;
