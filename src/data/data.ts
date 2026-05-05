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
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777980465/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_1_zhg4fn.png',
    alt: 'Entrazone Ed-Tech',
    aspectRatio: 'portrait',
    projectUrl: 'https://www.entrazone.in',
    title: 'Entrazone',
    category: 'dynamic',
    specs: ['Python Django', 'React + Vite', 'Tailwind CSS', 'PostgreSQL', 'Razorpay', 'OTP Auth', 'VPS Hosting'],
    description: 'A high-performance full-stack Ed-Tech platform featuring secure OTP authentication, Razorpay integration, live class scheduling, and mentor booking. Built with a responsive UI and a dedicated admin dashboard for seamless course and content management.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1777980465/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_1_zhg4fn.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777981274/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_2_jvdl4p.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777981275/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_4_p7vfcf.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777981274/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_3_guzzfs.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777981277/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_5_otnfdw.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777981277/Purple_Gradient_Modern_Laptop_Mockup_Instagram_Post_6_fhigak.png']
  },
  {
    id: '2',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777873053/Untitled_design_1_ooygdo.png',
    alt: 'Elora Matrimony',
    aspectRatio: 'portrait',
    projectUrl: 'https://eloramatrimony.com/',
    title: 'Elora Matrimony',
    category: 'dynamic',
    specs: ['Django', 'React + Redux', 'PostgreSQL', 'WebSockets', 'Aadhar & OTP Auth', 'AWS EC2', 'CloudFront'],
    description: 'A robust matrimonial platform featuring secure Aadhar verification, interest-based match filtering, and real-time chat powered by WebSockets. Optimized for high performance with AWS EC2 backend and S3/CloudFront frontend hosting.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1777873053/Untitled_design_1_ooygdo.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777982616/Beige_Minimalist_Website_and_Desktop_Mockup_Instagram_Post_4_zk749v.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777982524/Beige_Minimalist_Website_and_Desktop_Mockup_Instagram_Post_1_fb2bru.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777982526/Beige_Minimalist_Website_and_Desktop_Mockup_Instagram_Post_2_yunqxt.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777982529/Beige_Minimalist_Website_and_Desktop_Mockup_Instagram_Post_b9hv8d.png']
  },  
  {
    id: '3',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777912822/Blue_Modern_Mobile_Mockup_Instagram_Post_ultc2d.png',
    alt: 'Wayyo Backend Architecture',
    aspectRatio: 'portrait',
    title: 'Wayyo',
    category: 'dynamic',
    specs: ['Django REST Framework', 'PostgreSQL/PostGIS', 'Docker & Nginx', 'Stripe Integration'],
    description: 'Architected and developed a robust Geo-spatial backend for the Wayyo mobile app. Implemented high-performance nearby-place search using PostGIS, secure social authentication (Google/Apple/FB), and a complete Stripe payment lifecycle for event bookings.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1777912822/Blue_Modern_Mobile_Mockup_Instagram_Post_ultc2d.png']
  },

  {
    id: '4',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777877349/Untitled_design_3_l89ilr.png',
    alt: 'EmpHub HR Backend',
    aspectRatio: 'portrait',
    projectUrl: 'https://emphubhr.com/',
    title: 'EmpHub HR',
    category: 'dynamic',
    specs: ['Django REST Framework', 'PostgreSQL', 'JWT Auth', 'Docker & Nginx', 'Task Workflows', 'HR Management'],
    description: 'A massive ERP backend architected with 7 Django apps to manage employees, multi-type task tracking (Mechanic/Delivery/Service), attendance with break timers, and vehicle assignments. Features a sophisticated leave approval workflow and document management system.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1777877349/Untitled_design_3_l89ilr.png']
  },
  {
    id: '5',
    url: 'https://res.cloudinary.com/djwvgejge/image/upload/v1777877824/Cream_Minimalist_Laptop_Mockup_Promotion_Instagram_Post_zzeps4.png',
    alt: 'Stellaz Woman',
    aspectRatio: 'square',
    projectUrl: 'https://www.stellazwoman.com/',
    title: 'Stellaz Woman',
    category: 'dynamic',
    specs: ['Shopify Plus', 'Liquid', 'Custom Theme Development', 'E-commerce', 'Payment Gateway', 'Inventory Management'],
    description: 'A premium fashion e-commerce platform built on Shopify, featuring a fully custom theme, high-conversion checkout flow, and integrated logistics for a seamless shopping experience.',
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1777877824/Cream_Minimalist_Laptop_Mockup_Promotion_Instagram_Post_zzeps4.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777983821/Cream_Minimalist_Laptop_Mockup_Promotion_Instagram_Post_2_aju7le.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777983822/Cream_Minimalist_Laptop_Mockup_Promotion_Instagram_Post_l3nt3t.png','https://res.cloudinary.com/djwvgejge/image/upload/v1777983836/Cream_Minimalist_Laptop_Mockup_Promotion_Instagram_Post_1_i4kly0.png']
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
    images: ['https://res.cloudinary.com/djwvgejge/image/upload/v1777880023/1_l0awop.png']
  },
    {
    id: '7',
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
