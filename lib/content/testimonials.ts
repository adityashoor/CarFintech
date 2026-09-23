/** Reviews exactly as published under "Our Latest Reviews". */
export interface Testimonial {
  name: string;
  quote: string;
  /** Team member named in the review, when there is one. */
  broker?: string;
}

export const testimonials: Testimonial[] = [
  { name: "Farah Youssef", quote: "Very professional and reliable 👍 …" },
  {
    name: "manik luthra",
    broker: "Chirag",
    quote:
      "We had an excellent experience working with Chirag. He guided us through the entire process of purchasing our B-double trailers with professionalism and clear communication. His knowledge of the finance and asset requirements made everything smooth and stress-free. Chirag was always responsive, supportive, and went the extra mile to ensure the deal was completed on time. Highly recommend Chirag to anyone looking for reliable and efficient finance assistance!",
  },
  {
    name: "Inder Kaur",
    broker: "Madhur",
    quote:
      "I had a great experience at Car Financing for my car loan. Great experience with Car Fintech. They gave me better interest rate as compare to others. Special thanks to madhur, he has provided excellent service! I really appreciate. Highly recommended!!",
  },
  {
    name: "Sheetal Sharma Talwar",
    broker: "Vinita",
    quote:
      "I had the pleasure of working with Vinita from Car Fintech for securing my car loan, and I couldn’t be more impressed with her service! From start to finish, Vinita demonstrated exceptional knowledge and professionalism. She took the time to understand my needs and guided me through every step of the process with clarity and patience. Her attention to detail was outstanding, ensuring I had all the necessary documentation and information to make the entire experience smooth and hassle-free. Vinita's communication was always prompt, and she made sure I felt confident and informed at every stage. It's rare to come across someone so genuinely committed to providing top-notch service, and I am grateful for all her efforts. If you're looking for a knowledgeable, attentive, and friendly agent, I highly recommend Vinita!",
  },
  {
    name: "Parveen Kumar",
    broker: "Chirag",
    quote:
      "Chirag was incredibly helpful in securing an unsecured loan for my business—and he made it happen in just 2 days! His professionalism, clear communication, and deep understanding of the process made everything smooth and stress-free. I truly appreciate his dedication and fast turnaround. If you’re looking for someone reliable and efficient to help with business financing, Chirag is the one to trust! Highly recommended!",
  },
  {
    name: "VEE MEHTA",
    broker: "Vanita Khurana",
    quote:
      "“I had an excellent experience working with Vanita Khurana from Car Fintech for my car financing. She made the entire process smooth and stress-free with her expertise and professionalism. From the very beginning, she provided clear guidance on the best financing options available and ensured that I understood all the terms and conditions. Her efficiency and attention to detail meant that everything was handled with minimal effort on my part. She was always responsive to my queries and kept me updated at every stage of the process. Thanks to her knowledge and dedication, I secured a great financing deal without any hassle. I highly recommend Vanita Khurana and Car Fintech to anyone looking for seamless car financing solutions!",
  },
];
