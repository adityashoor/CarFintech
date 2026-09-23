export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
  phone?: { display: string; tel: string };
  email?: string;
}

export const team: TeamMember[] = [
  {
    slug: "chirag-babbar",
    name: "Chirag Babbar",
    role: "Director",
    image: "/images/team/chirag-babbar.webp",
    phone: { display: "0415 600 002", tel: "+61415600002" },
    email: "Chirag@carfintech.com.au",
    bio: [
      "Chirag Babbar, Director at Car FinTech, specialises in structuring smart, results-driven finance solutions that get clients approved faster and on better terms. With hands-on experience across consumer and commercial lending, he knows exactly how lenders think—and how to position applications for success.",
      "At Car FinTech, Chirag goes beyond arranging finance. He builds tailored strategies for vehicle, asset, and equipment finance, helping individuals and businesses secure funding even in complex or non-standard scenarios. His proactive approach, attention to detail, and strong lender relationships help remove roadblocks before they arise.",
      "The outcome is clear, competitive finance with no guesswork—backed by transparent advice and a genuine commitment to client success",
    ],
  },
  {
    slug: "madhur-bhalla",
    name: "Madhur Bhalla",
    role: "Asset Finance Broker",
    image: "/images/team/madhur-bhalla.webp",
    bio: [
      "Madhur Bhalla brings a strong blend of analytical thinking, real-world business experience, and client-first finance expertise to every deal he structures. With a background spanning asset finance, consumer lending, and commercial solutions, he specialises in turning complex scenarios into clear, lender-ready strategies.",
      "At CarFinTech, Madhur goes beyond simply arranging finance. He works closely with clients to understand their goals, cash flow, and long-term plans—then structures finance solutions that support growth, stability, and future opportunities.",
      "Whether you’re a PAYG professional upgrading your vehicle, a business owner expanding operations, or an entrepreneur navigating non-standard income structures, Madhur knows how to position your application for success. He anticipates lender requirements early, addresses potential concerns upfront, and leverages strong lender relationships to secure competitive outcomes efficiently.",
      "What sets Madhur apart is his dual perspective. As both a finance professional and a business operator, he understands the realities clients face beyond the numbers. This allows him to deliver transparent advice, practical structuring, and solutions that don’t just achieve approval—but make financial sense. The result is finance that works today and supports where you’re headed tomorrow.",
    ],
  },
  {
    slug: "simran-preet-kaur-pannu",
    name: "Simran Preet Kaur Pannu",
    role: "Admin Support",
    image: "/images/team/simran-preet-kaur-pannu.webp",
    bio: [
      "Simran Preet Kaur Pannu brings strong administrative expertise and a detail-oriented approach to supporting the smooth operation of CarFinTech. Her role focuses on coordinating administrative processes, managing documentation, and facilitating effective communication across clients, business partners, and internal teams.",
      "At CarFinTech, Simran plays a key role in ensuring day-to-day operations run efficiently, with a strong emphasis on accuracy, organisation, and compliance. Her proactive mindset and commitment to high professional standards help maintain reliable workflows and a consistently high level of service across the organisation.",
    ],
  },
  {
    slug: "aadhya-singh",
    name: "Aadhya Singh",
    role: "Admin Support",
    image: "/images/team/aadhya-singh.webp",
    bio: [
      "Aadhya Singh brings over three years of experience in finance and administration, supporting the smooth operation of fast-paced, compliance-driven environments. Her background spans client documentation, internal coordination, and process management, giving her a strong eye for detail and efficiency.",
      "At Car Fintech, Aadhya plays a key role in supporting operational and administrative functions, helping ensure workflows run seamlessly and clients receive a high standard of service. Her organised, proactive approach contributes to maintaining accuracy, compliance, and reliability across the organisation.",
    ],
  },
];
