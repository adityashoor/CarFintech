import { detailedProcess, simpleProcess, type ProcessStep } from "./process";

export type ServiceCategory = "business" | "consumer";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] };

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  /** Short line used on the homepage cards. */
  short: string;
  /** Hero: h1 + supporting line, verbatim. */
  title: string;
  subtitle: string;
  heroImage: string;
  cardImage: string;
  /** Main content block: heading + copy, verbatim. */
  introHeading: string;
  body: ContentBlock[];
  process: { heading: string; steps: ProcessStep[] };
  aboutHeading: string;
  aboutImage: string;
  reviewsHeading: string;
  seo: { title: string; description: string };
  /** Calculator defaults: indicative rate and typical range, editable by the visitor. */
  calc: { rate: number; min: number; max: number; default: number; balloon?: boolean };
  /** Lucide icon name (rendered in components/ui/ServiceIcon). */
  icon: "car" | "truck" | "cog" | "briefcase" | "bike" | "wallet" | "caravan" | "layers" | "shield" | "hardhat";
}

const p = (text: string): ContentBlock => ({ type: "p", text });
const h = (text: string): ContentBlock => ({ type: "h", text });
const list = (items: string[]): ContentBlock => ({ type: "list", items });

const SQUARE = "/images/services/about-square.webp";

export const services: Service[] = [
  {
    slug: "asset-finance",
    name: "Asset Finance",
    category: "business",
    icon: "hardhat",
    short: "Helping clients Australia-wide purchase a new vehicle, plant or machinery with Asset Finance",
    title: "Asset Finance",
    subtitle: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide purchase a new vehicle, plant or machinery with Asset Finance",
    heroImage: "/images/services/asset-finance-hero.webp",
    cardImage: "/images/services/asset-finance.webp",
    introHeading: "Fund your new vehicle, plant or machinery with Asset Finance",
    body: [
      p("Welcome to Car Fintech, your trusted partner in Asset finance broking across Australia. We understand that businesses nationwide require tailored financial solutions to thrive. From purchasing vehicles for business use to acquiring essential equipment, we offer a comprehensive suite of services designed to meet your unique business needs. Our expertise lies in providing access to Asset Finance options from banks and lenders across Australia, ensuring you receive the most competitive interest rates and loan amounts. Whether you need a business car loan, are exploring low doc car loan options, or seeking equipment finance solutions, we are here to guide you through the process with ease."),
      p("Our primary focus at Car Fintech is to simplify the complex world of business vehicle and equipment finance. We specialise in car loans for business use, including flexible low doc car loan options for self-employed business owners and those with non-traditional income documentation. Applying for Asset Finance should not be a hassle, which is why we offer a streamlined application process. This means you can focus on what matters most: growing your business. Whether you are investing in company vehicles, work trucks, or essential equipment, we ensure you have the best finance options tailored to your specific requirements."),
      p("We offer versatile financing solutions including chattel mortgages and Hire Purchase options for business vehicles and equipment. Our team assists in securing loans for company cars, commercial vehicles, and specialised machinery such as trucks, trailers, excavators, tractors, graders, cranes, and dozers. For business owners who require alternative documentation pathways, our low doc car loan and equipment loan options provide accessible solutions without the traditional paperwork requirements. By understanding the life of the lease and offering fixed monthly repayments, we help you manage cashflow efficiently."),
      p("One of our key services is providing flexible loan options that align with your business goals. We recognise that each business is unique, and so are its financial needs. Our experts work closely with you to determine the best loan amount and interest rate for purchasing business vehicles or upgrading factory machinery. By leveraging collateral wisely, we enhance your capacity to invest in vital resources. Our commercial equipment finance and business car loan solutions empower you to make informed decisions, whether you are buying new equipment or enhancing existing assets."),
      p("Understanding the importance of managing cashflow is crucial for business success. Our finance solutions include options like Hire Purchase and chattel mortgage, which provide stability through fixed monthly repayments. This predictability allows you to plan your finances effectively over the life of the lease. Furthermore, our access to Asset Finance options from various banks and lenders across Australia ensures you benefit from competitive interest rates and terms that suit your operations. Investing in essential business vehicles and equipment becomes more straightforward with our supportive approach, including specialist low doc solutions for those who need them."),
      p("At Car Fintech, we are committed to providing reliable and supportive services for all your business car loan and commercial equipment finance needs. By offering a streamlined application process, low doc loan options, and a range of flexible financing solutions, we ensure that you can confidently invest in the vehicles and resources necessary for your business growth. For a personalised consultation or more information on how we can assist you with applying for Asset Finance, business car loans, or low doc equipment loans, reach out to our team today. Let us help you unlock your business potential with the right financial solutions."),
    ],
    process: { heading: "Asset Finance Process", steps: simpleProcess("qualify for Asset Finance", "finance") },
    aboutHeading: "About Car Fintech",
    aboutImage: SQUARE,
    reviewsHeading: "Our Latest Reviews",
    seo: {
      title: "Asset Finance",
      description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide purchase a new vehicle, plant or machinery with Asset Finance",
    },
    calc: { rate: 7.5, min: 10000, max: 1000000, default: 85000, balloon: true },
  },
  {
    slug: "business-loans",
    name: "Business Loans",
    category: "business",
    icon: "briefcase",
    short: "Fund your purchase of a new property, plant or buy another business with a Business Loan",
    title: "Business Loans",
    subtitle: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide grow their business and purchase equipment with a Business Loan",
    heroImage: "/images/services/business-loans.webp",
    cardImage: "/images/services/business-loans.webp",
    introHeading: "Fund your property, equipment or business purchase with a Business Loan",
    body: [
      p("Running a business in Australia often requires strategic financial support to maintain healthy cash flow and fuel growth. At Car Fintech, we specialise in connecting businesses across the nation with tailored financing solutions from leading banks and lenders. Whether you need working capital for day-to-day operations, want to refinance existing debt, or require funding for expansion, our expertise ensures you find the right solution for your business."),
      p("Every business needs consistent cash flow to operate smoothly. Our working capital loan solutions help you manage inventory, cover payroll, handle operational expenses, and bridge those inevitable cash flow gaps. These loans are designed with flexibility in mind, offering competitive rates and repayment terms that adapt to your business cycle, giving you the financial breathing room to focus on what matters most: growing your business."),
      p("Already servicing business debt but feeling the pinch from unfavourable terms? Refinancing could be the answer. We help businesses restructure existing loans to secure lower interest rates, better repayment schedules, or consolidate multiple debts into one manageable payment. The result? Reduced monthly repayments and freed-up cash flow that you can redirect toward revenue-generating activities. From machinery and vehicles to technology and office equipment, our specialised equipment finance options let you acquire what you need without a hefty upfront investment. By spreading the cost over time, you preserve your working capital while the equipment itself helps generate revenue for your business. It's a practical approach that keeps your cash available for other opportunities."),
      p("When you're ready to scale, whether that means opening a new location, hiring additional staff, or investing in marketing, our business expansion loans provide the capital you need. We work with you to structure financing that supports sustainable growth without overextending your resources. The interest rate you secure plays a significant role in your overall loan cost. We help you navigate both variable and fixed interest rate options. Variable rates move with market conditions and may offer savings when rates drop, while fixed rates provide the certainty of consistent repayments, making it easier to budget and plan ahead."),
      p("Choosing between secured and unsecured Business Loans depends on your specific situation. Secured loans, backed by business assets or property, typically come with lower interest rates and larger loan amounts. Unsecured loans offer faster approval without requiring collateral, though they may carry slightly higher rates. We'll assess your needs and guide you toward the option that makes the most sense. Flexibility matters too. Features like redraw facilities let you access extra repayments when unexpected opportunities or challenges arise. For businesses with changing capital needs, progressive drawdown options and revolving credit facilities provide ongoing access to funds as required, rather than receiving everything upfront."),
      p("We've designed our application process to be straightforward and stress-free. From your first conversation with us, we take time to understand your business, assess your working capital requirements, and identify the loan structure that best aligns with your goals. Whether you're looking to improve cash flow, refinance existing debt, or fund a major initiative, we handle the complexity so you can stay focused on running your business."),
      p("Our relationship with you doesn't end once your loan is approved. We're committed to being a long-term partner, offering ongoing support and strategic advice as your business evolves. Your financial needs will change over time, and we're here to ensure your solutions continue working for you."),
      p("The right financing can be transformative for your business. At Car Fintech, we pride ourselves on connecting clients with solutions that genuinely fit their needs, not just what's available. We work with trusted banks and lenders across Australia to secure competitive terms that enhance your financial position and support your ambitions."),
      p("Whether you need working capital support, want to refinance and save money, or are ready to expand, we're here to help. Contact Car Fintech today to discuss your business goals and discover how the right financing can help you achieve them."),
    ],
    process: { heading: "Getting a Business Loan", steps: simpleProcess("qualify for a Business Loan", "Business Loan") },
    aboutHeading: "About Car Fintech",
    aboutImage: SQUARE,
    reviewsHeading: "Our Latest Reviews",
    seo: {
      title: "Business Loans",
      description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide grow their business and purchase equipment with a Business Loan",
    },
    calc: { rate: 9.5, min: 10000, max: 2000000, default: 150000 },
  },
  {
    slug: "equipment-finance",
    name: "Equipment Finance",
    category: "business",
    icon: "cog",
    short: "Need to buy a vehicle or equipment? We can help with Equipment Finance",
    title: "Equipment Finance",
    subtitle: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide purchase a new vehicle, plant or machinery with Equipment Finance",
    heroImage: "/images/services/equipment-finance.webp",
    cardImage: "/images/services/equipment-finance.webp",
    introHeading: "Finance a new vehicle, plant or machinery with Equipment Finance",
    body: [
      p("At Car Fintech, we understand that every business is unique and requires the right equipment to thrive. Whether you're looking to purchase new machinery, upgrade existing assets, or expand your operations, accessing Equipment Finance shouldn't be complicated by extensive paperwork. Our Low Doc Equipment Finance solutions are specifically designed for business owners who need fast, flexible funding without the burden of traditional documentation requirements."),
      p("Traditional equipment finance often requires extensive financial documentation, tax returns, and detailed business records. We recognise that many business owners, particularly sole traders, contractors, and self-employed professionals, may not have all this paperwork readily available. Our Low Doc Equipment Finance options provide a streamlined alternative, requiring minimal documentation while still offering competitive rates and flexible terms."),
      p("Our Low Doc Equipment Finance covers a comprehensive range of business assets. From office equipment and IT systems to specialised machinery like excavators, cranes, tractors, graders, and dozers, we help you secure the tools you need to operate and grow. Whether you're in construction, agriculture, manufacturing, transport, or any other industry, our solutions are tailored to your specific requirements."),
      p("When applying for Low Doc Equipment Finance, understanding your options is key. We offer several finance structures to suit different business needs:"),
      h("Chattel Mortgage"),
      p("Ideal for businesses wanting to own the equipment outright while claiming tax benefits. You'll enjoy fixed monthly repayments that make cash flow management predictable, with the equipment serving as security for the loan. This option provides the flexibility to claim GST credits and depreciation, maximising your tax position."),
      h("Hire Purchase"),
      p("Perfect if you prefer a straightforward path to ownership. With fixed repayments throughout the agreement, you'll know exactly what you're paying each month. At the end of the term, the equipment is yours, with no balloon payment or residual to worry about."),
      h("Finance Lease"),
      p("For businesses seeking tax-effective solutions, a finance lease allows you to use the equipment without it appearing on your balance sheet. This can be particularly beneficial for managing your business's financial position while still accessing essential machinery."),
      p("The beauty of Low Doc financing lies in its accessibility and speed. Rather than waiting weeks for approval while gathering extensive documentation, our streamlined application process gets you answers quickly. We focus on your business's current trading position and capacity to service the loan, not just historical paperwork. This approach is particularly valuable for:"),
      list([
        "Self-employed business owners with complex tax structures",
        "Contractors and sole traders who minimise taxable income",
        "Growing businesses that haven't built extensive financial histories",
        "Business owners who need equipment urgently",
        "Those who simply prefer a faster, less paperwork-intensive process",
      ]),
      p("Working with a network of banks and lenders across Australia, we secure competitive interest rates even for Low Doc applications. The loan amount and terms are structured around your business's capacity and the equipment's value, ensuring repayments remain manageable within your cash flow. By leveraging the equipment itself as collateral, you can often access more favourable terms than unsecured financing options."),
      p("Whether you're investing in factory machinery to increase production capacity, acquiring construction equipment to take on larger projects, or upgrading office equipment to improve efficiency, having the right financial support matters. Our Low Doc Equipment Finance solutions are designed to remove barriers and give you quick access to the funds you need. We understand that significant equipment investments require careful financial planning. That's why we take time to explain how different finance structures impact your cash flow, tax position, and long-term financial health. Our goal is to help you make informed decisions that support both your immediate needs and future growth ambitions."),
      p("Working with Car Fintech means partnering with specialists who understand the intricacies of equipment finance and the unique challenges faced by business owners with limited documentation. We're committed to providing reliable, approachable service that makes the finance process straightforward and supportive, regardless of your paperwork situation. As your business evolves and your equipment needs change, we're here to ensure you have ongoing access to the financing solutions that keep you competitive and operational. From your first piece of machinery to fleet expansion, we support your journey with flexible, practical Low Doc Equipment Finance options."),
      p("Ready to explore Low Doc Equipment Finance that works for your business? Contact our team to discuss your equipment needs and discover how we can help you secure the machinery and tools essential for your success. With minimal paperwork and maximum support, we'll have you equipped and operating in no time."),
    ],
    process: { heading: "Getting Equipment Finance", steps: simpleProcess("qualify for Equipment Finance", "Equipment Finance") },
    aboutHeading: "About Car Fintech",
    aboutImage: "/images/services/equipment-finance-square.webp",
    reviewsHeading: "Our Latest Reviews",
    seo: {
      title: "Equipment Finance",
      description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide purchase a new vehicle, plant or machinery with Equipment Finance",
    },
    calc: { rate: 7.9, min: 5000, max: 1500000, default: 60000, balloon: true },
  },
  {
    slug: "heavy-vehicle-finance",
    name: "Heavy Vehicle Finance",
    category: "business",
    icon: "truck",
    short: "Discover Heavy Vehicle Finance Solutions Tailored to Your Business Needs",
    title: "Heavy Vehicle Finance",
    subtitle: "Discover Heavy Vehicle Finance Solutions Tailored to Your Business Needs",
    heroImage: "/images/services/heavy-vehicle-finance.webp",
    cardImage: "/images/services/heavy-vehicle-finance.webp",
    introHeading: "Comprehensive Heavy Vehicle Finance Solutions for Your Business",
    body: [
      p("Car Fintech is dedicated to providing tailored finance solutions for businesses in Australia. Specialising in heavy vehicle finance, we understand the unique needs of companies seeking to acquire commercial trucks and other essential vehicles. Our expertise extends across a variety of vehicle types, ensuring that each client finds the perfect fit for their operations. Whether you're interested in commercial van finance or looking to invest in the latest electric heavy vehicle models, our services are designed to support your business goals. By offering competitive interest rates and flexible terms, we aim to maximise your borrowing capacity while considering potential vehicle tax deductions."),
      p("Securing the right heavy vehicle finance is crucial for businesses that rely on a fleet of commercial vehicles. At Car Fintech, we offer a comprehensive range of options, including commercial vehicle loans and specialised finance for refrigerated vans, panel vans, and cargo vans. Our solutions are also tailored to accommodate the needs of companies looking to expand their fleet with pickup trucks, utes, and delivery vehicles. For those in logistics, construction, or other sectors requiring more robust vehicles, we provide finance for semi-trucks, rigid trucks and tipper trucks."),
      p("Understanding the complexities of vehicle finance interest rates is essential when planning your investment. At Car Fintech, we provide clear guidance on how interest rates can affect your overall loan cost and repayment schedule. This transparency helps you make informed decisions about your heavy vehicle finance options. Our team also assists with ABN vehicle finance, ensuring that businesses with an Australian Business Number can access the best possible terms for their needs."),
      p("Dealer finance can be an attractive option for many businesses, offering convenience and potentially favourable terms. However, it's important to compare these offers with other available options to ensure you're getting the most value. At Car Fintech, we help you evaluate dealer finance alongside other solutions like fleet vehicle finance and new heavy vehicle finance. This approach ensures that your company can make strategic decisions that align with its financial objectives."),
      p("The shift towards sustainability is evident in the growing demand for EV commercial vehicle finance and hybrid commercial vehicle options. Car Fintech supports businesses transitioning to greener fleets by providing tailored financing solutions for electric heavy vehicles. This includes not only standard logistics vehicles but also specialised options like refrigerated truck finance and tanker truck finance. By investing in eco-friendly vehicles, companies can not only reduce their environmental impact but also potentially benefit from lower operational costs over time."),
      p("For businesses involved in construction or heavy industry, our construction vehicle loans offer the flexibility needed to acquire essential machinery and equipment. From dump trucks to trailers and everything in between, Car Fintech provides comprehensive heavy machinery finance solutions. This ensures that your operations can continue smoothly with the right tools at your disposal."),
      p("Maximising your borrowing capacity is a key focus at Car Fintech. We work closely with you to understand your business's financial standing and future goals. This personalised approach allows us to tailor our commercial vehicle finance solutions to suit your specific needs. Whether you're expanding your fleet or upgrading existing vehicles, our team is committed to providing support every step of the way."),
      p("As you consider your options for heavy vehicle finance, remember that Car Fintech is here to assist with every aspect of the process. Our expertise in commercial van finance and related services ensures that you receive guidance tailored to your business's unique requirements. We invite you to explore our offerings further and discover how our solutions can enhance your operations."),
      p("Contact Car Fintech today to learn more about how we can support your business with reliable and efficient heavy vehicle finance solutions. Our team is ready to assist you in achieving your goals with confidence and clarity."),
    ],
    process: { heading: "Understanding the Heavy Vehicle Finance Lending Process", steps: detailedProcess },
    aboutHeading: "About Our Expertise in Heavy Vehicle Finance",
    aboutImage: SQUARE,
    reviewsHeading: "Client Feedback on Heavy Vehicle Finance Services",
    seo: {
      title: "Heavy Vehicle Finance",
      description: "Explore comprehensive heavy vehicle finance options to empower your business with the right vehicles.",
    },
    calc: { rate: 8.2, min: 20000, max: 2000000, default: 180000, balloon: true },
  },
  {
    slug: "car-loans",
    name: "Car Loans",
    category: "consumer",
    icon: "car",
    short: "Ready to step into that dream car? Get on the road sooner with a Car Loan",
    title: "Car Loans",
    subtitle: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide buy their first car, a new car or their dream car with a Car Loan",
    heroImage: "/images/services/car-loans.webp",
    cardImage: "/images/services/car-loans.webp",
    introHeading: "Buy your first car, family car or dream car sooner with a Car Loan",
    body: [
      p("At Car Fintech, we understand that choosing the right car is only part of the journey. The process of applying for a car loan can seem complex, but we are here to make it straightforward. Whether you are considering your first car, a practical family car, or a luxury super car, our expertise in Car Loans ensures that you can access Car Loan options from banks and lenders across Australia with ease. Our priority is to provide you with a seamless experience, so you can focus on the excitement of your purchase rather than the paperwork."),
      p("When it comes to accessing Car Loan options from banks and lenders across Australia, Car Fintech offers a wealth of choice. We compare car finance rates to help you find the most competitive interest rate for your situation. Whether you're eyeing a new car or a reliable used Car Loan, we'll work to maximise your borrowing capacity. Our streamlined application process takes the hassle out of buying, allowing you to focus on selecting the perfect vehicle from the dealership. From an eco-friendly electric car or hybrid car to a spacious SUV or versatile ute, we ensure your needs are met."),
      p("Understanding your loan amount and repayments is crucial. At Car Fintech, we assist in calculating car finance that aligns with your budget. Whether you are considering a secured Car Loan or exploring a green Car Loan option for your new electric vehicle, we have solutions that fit all lifestyles. Our team will guide you through the details, such as how your interest rate and loan amount affect your Car Loan repayments. By presenting all this information transparently, we help you make informed decisions."),
      p("We understand that applying for a car loan can be daunting, but our minimal paperwork approach makes the Car Loan application process as smooth as possible. You won't need to spend hours gathering documents; we simplify the requirements, so you can focus on what's important. Whether it's providing bank statements or liaising with your chosen car dealer, we ensure every step is taken care of. From start to finish, our process is designed to be supportive and stress-free."),
      p("Car Fintech is committed to helping you find the right Car Loan for any vehicle you have in mind. From a convertible for weekend drives to a reliable van or people mover for your growing family, we are here to support your journey. Our services cater to all preferences, whether you need a sedan for city commuting or a wagon for those long road trips. With our assistance, you'll have confidence in the choices you make."),
      p("At Car Fintech, our goal is to take the hassle out of buying your next vehicle by providing expert advice and a tailored approach to Car Loans. By accessing Car Loan options from banks and lenders across Australia, we ensure you receive the best possible terms and conditions. We invite you to contact us today and experience the ease of our streamlined application process. Let us help you drive away in your ideal car with peace of mind and financial clarity."),
    ],
    process: { heading: "Getting a Car Loan", steps: simpleProcess("qualify for a Car Loan", "Car Loan") },
    aboutHeading: "About Car Fintech",
    aboutImage: SQUARE,
    reviewsHeading: "Our Latest Reviews",
    seo: {
      title: "Car Loans",
      description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide buy their first car, a new car or their dream car with a Car Loan",
    },
    calc: { rate: 7.99, min: 5000, max: 250000, default: 35000, balloon: true },
  },
  {
    slug: "personal-loans",
    name: "Personal Loans",
    category: "consumer",
    icon: "wallet",
    short: "Helping clients Australia-wide get a Personal Loan to pay for unexpected emergencies",
    title: "Personal Loans",
    subtitle: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide get a Personal Loan to pay for unexpected emergencies",
    heroImage: "/images/services/personal-loans.webp",
    cardImage: "/images/services/personal-loans.webp",
    introHeading: "Finance a wedding, holiday or an unexpected emergency with a Personal Loan",
    body: [
      p("When life presents opportunities or challenges that require financial support, personal loans can be a reliable solution. At Car Fintech, we specialise in helping clients access personal loan options from banks and lenders across Australia. Whether you are planning a dream wedding, an exciting holiday, or facing an unexpected emergency, our team is here to guide you through the personal loan application process with ease and confidence."),
      p("A personal loan can be a versatile financial tool, and understanding the basics is crucial. One of the first steps is to assess your financial situation. This includes evaluating your income, expenses, and any existing debts. By doing so, you can determine a suitable loan amount that aligns with your needs and repayment capacity. At Car Fintech, we provide assistance in calculating personal loan repayments, ensuring you have a clear picture of what to expect each month. Our goal is to help you find a loan with an interest rate that fits comfortably within your budget."),
      p("Your credit history plays a significant role when applying for a personal loan. Lenders use it to gauge your creditworthiness and decide on the terms they can offer you. If you have a strong credit history, you are more likely to secure favourable interest rates and conditions. However, if your credit report is less than perfect, do not worry. Our experienced team can help you explore various options and develop strategies to improve your standing over time."),
      p("The application process for a personal loan can seem complex, but Car Fintech is committed to making it straightforward and stress-free. With our streamlined application process, we handle much of the heavy lifting, allowing you to focus on what matters most. We assist you in gathering necessary documents and ensure your personal loan application is complete and accurate, increasing your chances of approval. This includes guidance on showing genuine savings, which some lenders may require as proof of financial responsibility."),
      p("Accessing personal loan options from banks and lenders across Australia provides a wealth of choices tailored to different needs. Whether you require funds for a wedding, holiday, or an unexpected emergency, we ensure you have access to competitive offers. Our expertise lies in matching clients with products that suit their specific circumstances. We work diligently to understand your unique situation and provide personalised recommendations that align with your goals."),
      p("As you consider applying for a personal loan, remember that Car Fintech is here to support you at every step. Our professional and approachable team is ready to answer your questions and provide the guidance you need. We believe in empowering our clients to make informed financial decisions, ensuring you have all the information necessary to proceed with confidence."),
      p("Choosing the right personal loan can have a positive impact on your financial journey. At Car Fintech, we are dedicated to providing nationwide support to clients seeking to access personal loan options from banks and lenders across Australia. Whether it is for a specific event or an unplanned situation, we are here to help simplify the process and secure the most suitable loan for your needs. Contact us today to discuss how we can assist you in finding the right solution for your financial goals."),
    ],
    process: { heading: "Getting a Personal Loan", steps: simpleProcess("will qualify for a Personal Loan", "Personal Loan", "Brokers") },
    aboutHeading: "About Car Fintech",
    aboutImage: SQUARE,
    reviewsHeading: "Our Latest Reviews",
    seo: {
      title: "Personal Loans",
      description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide get a Personal Loan to pay for unexpected emergencies",
    },
    calc: { rate: 10.5, min: 2000, max: 100000, default: 20000 },
  },
  {
    slug: "caravan-finance",
    name: "Caravan Finance",
    category: "consumer",
    icon: "caravan",
    short: "Discover Comprehensive Caravan Finance Solutions Tailored to Your Needs",
    title: "Caravan Finance",
    subtitle: "Discover Comprehensive Caravan Finance Solutions Tailored to Your Needs",
    heroImage: "/images/services/caravan-finance.webp",
    cardImage: "/images/services/caravan-finance.webp",
    introHeading: "Understanding Caravan Finance Options for Every Lifestyle",
    body: [
      p("Exploring the great outdoors in a caravan offers unparalleled freedom and adventure. Whether you're considering a family caravan for weekend getaways or a luxury caravan for extended travels, finding the right finance option is crucial. Car Fintech is here to help you with flexible caravan finance solutions tailored to your needs. Our expertise in caravan finance ensures you can focus on the excitement of your travels without the stress of financial complexities."),
      p("Understanding the variety of caravan loan options available is vital for making an informed decision. From new caravan loans to used caravan loans, each option offers unique benefits. Secured caravan loans typically provide lower interest rates, making them an attractive choice for many. If you're looking to reduce initial costs, no deposit caravan loan options are available, allowing you to get on the road sooner. For those interested in eco-friendly travel, we also offer financing for electric and hybrid caravans."),
      p("Comparing caravan loans can be overwhelming, but it's essential to find the best fit for your financial situation. Caravan loan comparison helps you understand the differences in interest rates and terms offered by various banks and lenders across Australia. By assessing these factors, you can maximise your borrowing capacity and secure a loan that aligns with your budget and lifestyle. Whether you're exploring zero percent caravan financing offers or seeking competitive caravan loan rates, Car Fintech provides access to a wide range of options."),
      p("The caravan loan application process is straightforward with Car Fintech. We streamline the steps to ensure you receive instant caravan loan approval whenever possible. Pre-approved caravan loans give you the confidence to shop for your perfect caravan without delay. Once approved, you can enjoy affordable caravan repayments tailored to your financial situation. Monthly caravan repayment plans are designed to fit comfortably within your budget, with options for balloon payment caravan loans if preferred."),
      p("For those purchasing from a caravan dealership, dealer caravan financing provides a convenient solution. This option often includes special deals and incentives directly from the dealer, making it easier to drive away today with caravan finance. Whether it's a certified pre-owned caravan or a brand-new model, dealer financing can streamline the purchasing process."),
      p("Business owners interested in expanding their fleet can explore business caravan loan options. These loans cater specifically to commercial needs, offering tailored solutions for companies looking to invest in reliable caravan transport. Additionally, RV financing is available for those who wish to explore recreational vehicle options beyond traditional caravans."),
      p("Car Fintech is committed to taking the hassle out of buying a caravan by providing reliable support and guidance throughout the process. With access to direct lender caravan finance and a network of trusted partners, we ensure you receive competitive rates and terms that suit your individual circumstances. Whether it's your first caravan or an upgrade to a luxury model, our goal is to make your dream purchase as seamless as possible."),
      p("The allure of caravanning is undeniable, offering the chance to explore at your own pace and enjoy nature's beauty. With Car Fintech's comprehensive caravan finance solutions, you can embark on this journey with confidence. Our wide array of options ensures that whether you're interested in a family caravan or an eco-friendly model, there's a financing plan that's right for you."),
      p("Reach out to Car Fintech today to learn more about how we can assist with your caravan finance needs. Our knowledgeable team is ready to guide you through the process, ensuring you find the perfect loan for your next adventure. Let us help you turn your caravanning dreams into reality with tailored financial solutions designed just for you."),
    ],
    process: { heading: "Simplifying the Caravan Finance Lending Process", steps: detailedProcess },
    aboutHeading: "Learn More About Our Caravan Finance Services",
    aboutImage: SQUARE,
    reviewsHeading: "Customer Experiences with Our Caravan Finance Solutions",
    seo: {
      title: "Caravan Finance",
      description: "Explore a range of caravan finance options designed to suit your lifestyle and budget requirements.",
    },
    calc: { rate: 8.5, min: 5000, max: 300000, default: 55000, balloon: true },
  },
  {
    slug: "motorbike-loans",
    name: "Motorbike Loans",
    category: "consumer",
    icon: "bike",
    short: "Discover Flexible Motorbike Loans for Every Rider's Needs",
    title: "Motorbike Loans",
    subtitle: "Discover Flexible Motorbike Loans for Every Rider's Needs",
    heroImage: "/images/services/motorbike-loans.webp",
    cardImage: "/images/services/motorbike-loans.webp",
    introHeading: "Comprehensive Motorbike Loans for Every Enthusiast",
    body: [
      p("Motorbike loans offer an exciting pathway to owning a bike, whether you're eyeing a sleek new model or a trusty used motorcycle. At Car Fintech, we specialise in helping Australians secure the right motorcycle finance to suit their needs. Understanding the nuances of motorcycle loan interest rates and the choices between variable and fixed interest rates can significantly impact your bike purchase decision. Our team is dedicated to providing you with the information and tools necessary to access motorcycle finance options from banks and lenders across Australia, ensuring you can ride now and enjoy affordable ownership."),
      p("When considering a motorbike loan, one of the first aspects to evaluate is the interest rate. This rate determines how much you will pay over the life of the loan. A fixed interest rate provides stability, as your repayments remain consistent, making budgeting straightforward. Conversely, a variable interest rate might fluctuate, potentially offering lower initial costs but with the risk of future increases. Choosing between these options depends on your financial situation and how much flexibility you desire in your motorcycle loan repayments."),
      p("Motorcycle refinance is another valuable option for those already holding an existing loan. Refinancing can offer a lower interest rate or better terms, reducing monthly repayments or shortening the loan term. This process involves assessing your current loan amount and comparing it against new offers from different lenders. By refinancing, you could save money over time and make your motorbike loan more manageable. Car Fintech assists clients in exploring these opportunities, ensuring they have access to competitive motorcycle funding solutions."),
      p("Securing a motorcycle loan is not just about finding the lowest interest rate; it’s about aligning the loan with your lifestyle and financial goals. We understand that purchasing a motorbike is often about lifestyle freedom and the joy of riding. Whether you're considering new bike finance or looking into a used motorcycle loan, it's crucial to evaluate all aspects of the loan agreement. This includes understanding any fees, the total loan amount, and how these factors influence your overall repayments. Our experts are here to guide you through this process, helping you make informed decisions that support affordable ownership."),
      p("Motorcycle dealers often provide finance options directly through their networks, which can be convenient but may not always offer the most favourable terms. At Car Fintech, we compare these dealer offers with a wide range of alternatives from banks and lenders across Australia. This comprehensive approach ensures you have access to competitive rates and terms tailored to your circumstances. Whether you're purchasing a motorbike for commuting or leisure, having a well-structured finance plan enhances your buying experience."),
      p("For those eager to ride now, understanding the intricacies of motorbike loans is crucial. Each loan type has its benefits and potential drawbacks. A new motorcycle loan typically comes with more favourable terms due to the lower risk associated with new vehicles. On the other hand, a used motorcycle loan might have slightly higher rates but can be an excellent choice for budget-conscious buyers seeking affordable ownership without compromising quality."),
      p("As you explore your options, remember that motorcycle finance is not just about numbers; it's about creating opportunities for lifestyle freedom and enjoyment. Car Fintech is committed to helping you achieve this by providing clear, professional advice and support throughout your bike purchase journey. By considering all available options and understanding how different interest rates impact your repayments, you can make confident decisions that align with your personal and financial aspirations."),
      p("Embarking on the path to securing a motorbike loan involves careful consideration of various factors. From choosing between fixed and variable interest rates to exploring refinancing opportunities, each decision plays a vital role in shaping your financial future. At Car Fintech, we are here to assist you every step of the way, ensuring you have access to comprehensive motorcycle finance options that suit your needs."),
      p("Our goal is to empower you with the knowledge and resources necessary to make informed choices about your motorcycle funding. Whether you're aiming for a new or used bike, our team is dedicated to helping you find a solution that supports your lifestyle and budget. Reach out today to learn more about how we can assist with your motorbike loan needs and set you on the road to affordable ownership and lifestyle freedom."),
    ],
    process: { heading: "Understanding the Lending Process for Motorbike Loans", steps: detailedProcess },
    aboutHeading: "About Our Commitment to Motorbike Loans",
    aboutImage: SQUARE,
    reviewsHeading: "Customer Experiences with Our Motorbike Loans",
    seo: {
      title: "Motorbike Loans",
      description: "Explore Motorbike Loans tailored to suit your lifestyle and budget with competitive interest rates.",
    },
    calc: { rate: 8.9, min: 3000, max: 100000, default: 18000, balloon: true },
  },
  {
    slug: "debt-consolidation",
    name: "Debt Consolidation",
    category: "consumer",
    icon: "layers",
    short: "Explore Debt Consolidation Options to Simplify Your Finances and Achieve Financial Freedom",
    title: "Debt Consolidation",
    subtitle: "Explore Debt Consolidation Options to Simplify Your Finances and Achieve Financial Freedom",
    heroImage: "/images/services/debt-consolidation.webp",
    cardImage: "/images/services/debt-consolidation.webp",
    introHeading: "Understanding Debt Consolidation for a More Manageable Financial Future",
    body: [
      p("For many Australians, managing multiple debts can become overwhelming. Car Fintech is here to help you take control of your financial commitments through debt consolidation. This strategy allows you to combine various loans—such as car loans, personal loans, credit card debt, or loans for caravans and boats—into a single, more manageable repayment. Consolidating your debts can simplify your finances, reduce monthly repayments, and potentially save you money on interest. By creating a clear repayment plan, debt consolidation can reduce financial stress and help you work towards greater financial stability."),
      p("Debt consolidation involves replacing multiple high-interest loans with a single loan that has more favourable terms. For instance, by refinancing your car loan and combining it with personal loans, caravan loans, or other high-interest debts, you can reduce your monthly repayments while potentially lowering your interest costs. This approach allows borrowers to focus on paying down their overall debt more efficiently. Asset loan consolidation is designed to simplify repayments and provide a clear path toward financial freedom."),
      h("Benefits of Consolidating Multiple Loans:"),
      list([
        "Simplified repayments: Manage all your debts through one monthly payment instead of juggling several.",
        "Lower interest rates: Save on high-interest debt like credit cards and unsecured personal loans.",
        "Improved budgeting: Easier to track finances and plan for future expenses.",
        "Faster debt reduction: Consolidation can help you pay off high-interest loans more quickly.",
        "Peace of mind: Reduced financial stress gives you greater confidence in managing your money.",
      ]),
      p("Car Fintech understands that every borrower’s situation is unique. Whether you’re looking to consolidate car loans, personal loans, or loans for caravans, boats, or other assets, our team provides advice tailored to your individual circumstances. Loan-to-Value Ratio (LVR) is an important consideration in asset refinancing. By understanding your equity and current debts, we can recommend solutions that improve your chances of securing lower interest rates and better loan terms."),
      h("Flexible Options for Your Financial Goals"),
      p("Debt consolidation isn’t just about combining loans—it’s about regaining control of your finances. By consolidating multiple obligations into one manageable repayment, you can focus on reducing your overall debt faster. Car Fintech works with you to identify the most suitable refinancing options, whether that involves a personal loan, a car loan refinance, or a combination of asset finance loans. Our goal is to help you reduce repayments, save on interest, and create a structured plan for long-term financial health."),
      h("Why Choose Car Fintech"),
      p("At Car Fintech, we are committed to supporting Australians in achieving their financial goals. Our team provides expert guidance on how to consolidate personal loans, car loans, caravan loans, and other asset finance commitments. By focusing on responsible lending practices and personalised solutions, we help borrowers make informed decisions that reduce financial stress and improve their financial well-being."),
      h("Take the Next Step Towards Financial Freedom"),
      p("Debt consolidation can transform the way you manage your finances. By rolling multiple high-interest loans into a single repayment, you simplify your obligations, potentially save on interest, and work towards achieving greater financial stability. Whether you’re consolidating car loans, personal loans, or other asset finance commitments, Car Fintech is here to guide you every step of the way. Reach out to our team today to explore your options and take control of your financial future. Together, we can create a manageable, stress-free path to debt relief and improved financial health."),
    ],
    process: { heading: "The Lending Process and Debt Consolidation Explained", steps: detailedProcess },
    aboutHeading: "Learn About Debt Consolidation and Its Benefits",
    aboutImage: SQUARE,
    reviewsHeading: "Customer Experiences with Debt Consolidation",
    seo: {
      title: "Debt Consolidation",
      description: "Discover how debt consolidation can streamline your finances and help reduce financial stress effectively.",
    },
    calc: { rate: 9.9, min: 5000, max: 250000, default: 40000 },
  },
  {
    slug: "secured--unsecured-personal-loans",
    name: "Secured & Unsecured Personal Loans",
    category: "consumer",
    icon: "shield",
    short: "Explore Secured & Unsecured Personal Loans for Your Financial Needs",
    title: "Secured & Unsecured Personal Loans",
    subtitle: "Explore Secured & Unsecured Personal Loans for Your Financial Needs",
    heroImage: "/images/services/secured-unsecured-personal-loans.webp",
    cardImage: "/images/services/secured-unsecured-personal-loans.webp",
    introHeading: "Understanding Secured & Unsecured Personal Loans",
    body: [
      p("Car Fintech offers a tailored approach to personal finance, focusing on secured and unsecured personal loans. Understanding the diverse needs of individuals in Australia, we provide options that cater to those seeking flexibility and convenience. Whether you're looking to consolidate debt, fund a home renovation, or cover unexpected expenses, our loan services are designed to meet your requirements with ease. With a range of personal loan options available, we ensure you can access the funds you need while maintaining control over your financial commitments."),
      p("Secured and unsecured personal loans are crucial for those needing financial assistance. Secured loans require collateral, such as a car or property, offering potentially lower interest rates. In contrast, unsecured personal loans do not require collateral, making them an attractive option for many. At Car Fintech, we provide both secured and unsecured personal loans, allowing you to choose the solution that best fits your situation."),
      p("When considering a personal loan, it's important to evaluate the personal loan interest rate and how it affects your repayments. We offer both fixed rate and variable rate personal loans, giving you the flexibility to choose based on your financial strategy. A fixed rate personal loan provides stability with predictable monthly payments, while a variable rate personal loan can offer benefits if interest rates decrease. Our team is here to help you compare personal loans and determine which option aligns with your budget and financial goals."),
      p("The personal loan application process at Car Fintech is straightforward, ensuring quick approval so you can access funds when needed. Our online application system allows you to apply from the comfort of your home. We understand the importance of time, which is why we strive for same day approval whenever possible. The personal loan pre-approval process helps you understand your borrowing capacity before committing, ensuring you make informed decisions."),
      p("Eligibility criteria are an essential part of securing a personal loan. Our team will guide you through the personal loan requirements, helping you understand what is needed for your application. Factors such as your credit score, income, and existing financial commitments play a role in determining personal loan eligibility. We work closely with various banks and lenders across Australia to provide access to a wide range of options."),
      p("Personal loan fees are another important consideration. At Car Fintech, we aim to be transparent about potential costs involved with taking out a loan. This includes establishment fees, monthly fees, and early exit fees. Understanding these fees upfront can help reduce monthly payments by allowing you to plan accordingly. Our team will assist in calculating personal loan repayments based on the loan amount and duration, ensuring clarity throughout the process."),
      p("Repayment frequency is also flexible at Car Fintech. Choose from weekly repayments, fortnightly repayments, or monthly repayments to suit your financial situation. This flexibility ensures that managing your repayments fits seamlessly into your lifestyle. By offering tailored repayment options, we help you maintain control over your financial obligations."),
      p("Accessing personal loan options through Car Fintech means benefiting from our extensive network of banks and lenders across Australia. This wide access allows us to provide competitive interest rates and terms that suit your needs. Our commitment to personalised service ensures that every client receives the attention and support they deserve throughout the loan process."),
      p("Our goal is to make the process of obtaining a secured or unsecured personal loan as smooth as possible. By offering comprehensive support and guidance, we aim to empower our clients with the knowledge needed to make confident financial decisions. Whether you're new to personal loans or seeking better terms, Car Fintech is here to assist every step of the way."),
      p("We invite you to explore your options with Car Fintech today. Our team is ready to assist in finding the right secured or unsecured personal loan tailored to your needs. Contact us now to begin your journey towards financial flexibility and security."),
    ],
    process: { heading: "Secured & Unsecured Personal Loans Application Process", steps: detailedProcess },
    aboutHeading: "Learn About Secured & Unsecured Personal Loans",
    aboutImage: SQUARE,
    reviewsHeading: "Customer Feedback on Secured & Unsecured Personal Loans",
    seo: {
      title: "Secured & Unsecured Personal Loans",
      description: "Discover options for Secured & Unsecured Personal Loans tailored to your requirements and financial goals",
    },
    calc: { rate: 10.9, min: 2000, max: 150000, default: 25000 },
  },
];

export const businessServices = services.filter((s) => s.category === "business");
export const consumerServices = services.filter((s) => s.category === "consumer");

/** The six services featured under "Our Services" on the homepage, in the original order. */
export const featuredServiceSlugs = ["asset-finance", "car-loans", "equipment-finance", "business-loans", "motorbike-loans", "personal-loans"] as const;
export const featuredServices = featuredServiceSlugs.map((slug) => services.find((s) => s.slug === slug)!);

/** The three "At Car Fintech we help clients Australia-wide" highlights. */
export const highlightServices = ["asset-finance", "car-loans", "equipment-finance"].map((slug) => services.find((s) => s.slug === slug)!);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
