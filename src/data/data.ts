export interface Photo {
  id: string;
  url: string;
  alt: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  projectUrl?: string;
  title?: string;
  specs?: string[];
  description?: string;
  category?: string;
  images?: string[];
}

export const photos: Photo[] = [
  // --- DYNAMIC PROJECTS ---
  {
    id: '1',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1776505670/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_fujuqs.png',
    alt: 'Entrazone ERP',
    aspectRatio: 'portrait',
    projectUrl: 'https://www.entrazone.in',
    title: 'Entrazone',
    category: 'dynamic',
    specs: ['Python', 'Django', 'React', 'Business Analytics', 'PostgreSQL', 'ERP Features'],
    description: 'An advanced enterprise platform offering data-driven insights and streamlined management for business growth.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1776512349/1_wqqq0r.png']
  },
  {
    id: '2',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777873053/Untitled_design_1_ooygdo.png',
    alt: 'Elora Matrimony',
    aspectRatio: 'portrait',
    projectUrl: 'https://eloramatrimony.com/',
    title: 'Elora Matrimony',
    category: 'dynamic',
    specs: ['Matching Algorithms', 'Django', 'Secure Auth', 'React Native', 'Payment Gateway'],
    description: 'A secure and personalized matrimonial platform designed to help users find compatible life partners through smart filtering.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1776504858/Green_Modern_Phone_Mockup_with_Hand_Your_Story_p2ye2l.png']
  },
  {
    id: '3',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777876821/Untitled_design_2_f87sun.png',
    alt: 'Zipfit',
    aspectRatio: 'landscape',
    projectUrl: 'https://www.stellazwoman.com/',
    title: 'Zipfit',
    category: 'dynamic',
    specs: ['E-commerce', 'Inventory Management', 'Razorpay/Stripe', 'Python', 'Tailwind'],
    description: 'A premium boutique e-commerce store with over 1,900 products, featuring sophisticated filtering and a seamless shopping cart.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1776505670/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_fujuqs.png']
  },
  {
    id: '4',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777877349/Untitled_design_3_l89ilr.png',
    alt: 'Employee Hub',
    aspectRatio: 'portrait',
    projectUrl: 'https://weinberinc.com/',
    title: 'Employee Hub',
    category: 'dynamic',
    specs: ['Product Catalog', 'Global Dealer Locator', 'Automotive Tech', 'SEO Optimized'],
    description: 'Corporate platform for a global leader in automotive surface protection, showcasing nano-ceramic coatings and detailing tools.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1776506852/Black_and_White_Minimalist_New_Website_Launch_Instagram_Post_yxcopp.png']
  },
  {
    id: '5',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777877824/Cream_Minimalist_Laptop_Mockup_Promotion_Instagram_Post_zzeps4.png',
    alt: 'Stellaz Woman',
    aspectRatio: 'square',
    projectUrl: 'https://veluxinc.com/',
    title: 'Stellaz Woman',
    category: 'dynamic',
    specs: ['Scalable Architecture', 'Django', 'React', 'Dynamic Content'],
    description: 'High-end corporate website highlighting architectural daylight solutions and sustainable building environments.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1776507861/Black_Modern_Website_Launch_Promotion_Mockup_Instagram_Post_qy3aph.png']
  },
  {
    id: '6',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777880023/1_l0awop.png',
    alt: 'erp',
    aspectRatio: 'portrait',
    projectUrl: 'https://cipherpeak.vercel.app/',
    title: 'Erp Software',
    category: 'dynamic',
    specs: ['Next.js', 'Vercel', 'Software Training Portal', 'Service Booking'],
    description: 'An IT training and software development platform bridging the gap between academia and industry with real-world projects.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1776508354/Dark_Modern_Business_Report_Presentation_Device_Product_Mockup_Instagram_Post_dfbosl.png']
  },
  {
    id: '7',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777912822/Blue_Modern_Mobile_Mockup_Instagram_Post_ultc2d.png',
    alt: 'wayyo',
    aspectRatio: 'portrait',
    projectUrl: 'https://cipherpeak.vercel.app/',
    title: 'Wayyo',
    category: 'dynamic',
    specs: ['Next.js', 'Vercel', 'Software Training Portal', 'Service Booking'],
    description: 'An IT training and software development platform bridging the gap between academia and industry with real-world projects.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1776508354/Dark_Modern_Business_Report_Presentation_Device_Product_Mockup_Instagram_Post_dfbosl.png']
  },
  {
    id: '8',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777913214/Minimalist_Website_Launch_Computer_Mockup_Instagram_Post_nkkt6t.png',
    alt: 'velux',
    aspectRatio: 'portrait',
    projectUrl: 'https://veluxinc.com/',
    title: 'Velux Inc',
    category: 'dynamic',
    specs: ['Next.js', 'Vercel', 'Software Training Portal', 'Service Booking'],
    description: 'An IT training and software development platform bridging the gap between academia and industry with real-world projects.'
  },
  {
    id: '9',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777913545/Minimalist_Neutral_Multi_Device_Computer_Mockup_Website_Launch_Instagram_Post_zeuhjm.png',
    alt: 'weinber',
    aspectRatio: 'portrait',
    projectUrl: 'https://weinberinc.com/',
    title: 'Weinber',
    category: 'dynamic',
    specs: ['Next.js', 'Vercel', 'Software Training Portal', 'Service Booking'],
    description: 'An IT training and software development platform bridging the gap between academia and industry with real-world projects.'
  },
  // --- STATIC PROJECTS ---
  {
    id: '10',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777913985/Beige_Minimalist_Mockup_Instagram_Post_ds0h7k.png',
    alt: 'Lanka Valley Resort',
    aspectRatio: 'portrait',
    projectUrl: 'https://www.lankavalley.in/',
    title: 'Lanka Valley',
    category: 'static',
    specs: ['Lakeside UI Design', 'Booking Inquiry', 'Responsive Photos'],
    description: 'Tranquil resort website featuring lakeside cottage-style villas and authentic Kerala hospitality at Cheloor Lake.'
  },
  {
    id: '11',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777914561/Sage_Minimalist_Website_Launch_Laptop_Mockup_Instagram_Story_enwoif.png',
    alt: 'Aavishkar Architects',
    aspectRatio: 'landscape',
    projectUrl: 'https://aavishkararchitects.com/',
    title: 'Aavishkar Architects',
    category: 'static',
    specs: ['3D Visualization Portfolio', 'Modern UI', 'Cochin Design'],
    description: 'Minimalist architecture portfolio showcasing innovative structural designs, including India\'s first two-storey container restaurant.'
  },
  {
    id: '12',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777914219/Olive_Green_Website_Launch_Laptop_Promotion_Instagram_Post_wdwvql.png',
    alt: 'Avees Foods Kuttanad',
    aspectRatio: 'portrait',
    projectUrl: 'https://www.aveesfoods.com/',
    title: 'Avees Foods',
    category: 'static',
    specs: ['Product Showcase', 'Global Export Info', 'Kerala Heritage'],
    description: 'Heritage-focused food product site for authentic Kuttanadan rice powders and masalas, reaching over 10 countries.'
  },
  {
    id: '13',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777914988/Instagram_Post_-_New_Blog_Post_dllduz.png',
    alt: 'Aamys Homestay Alleppey',
    aspectRatio: 'portrait',
    projectUrl: 'https://www.aamyshomestay.com/',
    title: 'Aamys Homestay',
    category: 'static',
    specs: ['Kerala Tourism Certified', 'Google Maps Integration', 'Heritage UI'],
    description: 'Golden Category heritage homestay website in Alleppey, offering an immersive cultural experience in an 80-year-old house.'
  },
];
