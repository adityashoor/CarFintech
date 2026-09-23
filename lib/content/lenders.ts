/** Lender logos exactly as published on carfintech.com.au (public/images/lenders). */
export interface Lender {
  name: string;
  file: string;
}

const names = [
  "Alex Bank", "AMMF", "Angle Finance", "ANZ", "Automative Financial Services", "Azora", "Banjo",
  "Bank of Queensland", "BOQ Specialist", "Branded Financial Services", "Capital Finance", "Dynamoney",
  "Early Pay", "Finance One", "Firstmac", "flexicommercial", "Latitude", "Liberty Financial",
  "Lumi Finance", "Metro", "Money3", "MoneyMe Autopay", "Moneyplace", "MoneyTech", "NAB", "Now Finance",
  "OnDeck", "Pepper Money", "Plenti", "Prospa", "RACQ Bank", "Resimac", "ScotPac", "SelfCo", "Shift",
  "St George Bank", "Westpac", "Wisr",
];

export const lenders: Lender[] = names.map((name) => ({
  name,
  file: `/images/lenders/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.webp`,
}));

export const lenderCount = lenders.length;
