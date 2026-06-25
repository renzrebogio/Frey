import dImg from './uploads/d.png';
import eImg from './uploads/e.png';
import rImg from './uploads/r.png';
import zImg from './uploads/z.png';
import garageImg from './uploads/projects/garagedooriot.jpg';
import sneakerImg from './uploads/projects/sneakerlab.png';
import brewImg from './uploads/projects/brew.png';
import fashionImg from './uploads/projects/fashionweb.jpg';

export const PROJECTS = [
  {
    id: 0,
    num: '01',
    category: 'fullstack',
    tag: 'Full-Stack // Production',
    status: 'live',
    title: 'Institutional Bookstore',
    desc: 'A full-stack e-commerce and inventory administration platform built for San Sebastian College - Recoletos de Cavite. Manages catalog listings, order tracking, and local distribution of academic literature, uniforms, and institutional supplies.',
    tech: ['React', 'Firebase', 'Node.js', 'MySQL'],
    featured: true,
    metrics: [
      { value: 'Live', label: 'Status' },
      { value: '100%', label: 'Inventory Coverage' },
      { value: 'SSC-R', label: 'Client' },
    ],
    expandDesc: 'Custom-engineered for SSC-R de Cavite\'s institutional supply chain. The platform features an admin dashboard for catalog management, real-time inventory tracking, and a student-facing storefront for academic materials, school uniforms, and institutional supplies.',
  },
  {
    id: 1,
    num: '02',
    category: 'iot',
    tag: 'IoT // Production',
    status: 'live',
    title: 'Garage Door IoT',
    desc: 'A full-stack IoT application for remote monitoring, control, and automation of a garage door motor. Bridges an Arduino-programmed microcontroller with a web interface via Firebase for real-time state tracking and secure remote operation.',
    tech: ['Arduino', 'Firebase', 'C++', 'Web'],
    featured: false,
    img: garageImg,
    imgFit: 'contain',
    imgBg: '#f8f8f8', // closely matches studio lighting background
    imgScale: 1.7, // Zooms it in just right without making it huge like 'cover'
    metrics: [
      { value: 'Live', label: 'Status' },
      { value: 'Real-Time', label: 'State Sync' },
      { value: 'ESP32', label: 'MCU' },
    ],
    expandDesc: 'Cloud-connected garage automation using Firebase Realtime Database as the bridge between an Arduino IDE microcontroller and a responsive web dashboard. Enables real-time open/close state tracking and remote triggering from any device.',
  },
  {
    id: 2,
    num: '03',
    category: 'frontend',
    tag: 'Frontend // Active',
    status: 'active',
    title: 'Sneaker Lab',
    desc: 'A premium digital storefront for sneaker culture. Features immersive product showcases, size-selector flows, and a fully functional cart system built for the modern drop-driven consumer.',
    tech: ['React', 'CSS', 'Cart'],
    featured: false,
    img: sneakerImg,
    metrics: [
      { value: 'Premium', label: 'Design Tier' },
      { value: 'Cart', label: 'Commerce' },
      { value: 'V1', label: 'Build' },
    ],
    expandDesc: 'Sneaker Lab merges editorial design with e-commerce function. Product pages feature high-fidelity imagery, dynamic colorway switching, and an animated cart experience built to match the energy of limited-edition sneaker drops.',
  },
  {
    id: 3,
    num: '04',
    category: 'frontend',
    tag: 'Frontend // Active',
    status: 'active',
    title: 'Brew',
    desc: 'A rich, sensory-forward landing page for an artisan coffee brand. Showcases the full menu with flavor profiles, origin stories, and a working cart for seamless in-store pre-ordering.',
    tech: ['React', 'CSS', 'Cart'],
    featured: false,
    img: brewImg,
    metrics: [
      { value: 'Premium', label: 'Design Tier' },
      { value: 'Cart', label: 'Commerce' },
      { value: 'V1', label: 'Build' },
    ],
    expandDesc: 'Brew translates the warmth of specialty coffee into a digital experience. The interface uses warm typographic hierarchy, scroll-driven reveals, and a streamlined cart flow to convert curious visitors into loyal regulars.',
  },
  {
    id: 4,
    num: '05',
    category: 'frontend',
    tag: 'Frontend // Active',
    status: 'active',
    title: 'Fashion Web',
    desc: 'A refined, editorial-grade landing page for a contemporary clothing label. Clean lookbook layouts, curated product grids, and a fluid cart experience designed to translate runway aesthetics into online sales.',
    tech: ['React', 'CSS', 'Cart'],
    featured: false,
    img: fashionImg,
    metrics: [
      { value: 'Premium', label: 'Design Tier' },
      { value: 'Cart', label: 'Commerce' },
      { value: 'V1', label: 'Build' },
    ],
    expandDesc: 'Fashion Web is built for brands that treat their website as a second storefront. Lookbook-style hero sections, minimal product cards, and a friction-free cart create a purchasing experience as polished as the garments themselves.',
  },
];

// Gold accent color — shared globally across all components
export const GOLD = '#e8a120';
export const GOLD_BRIGHT = '#e8b84b';
export const GOLD_GLOW = '#f0c040';

export const IMAGES = [
  {
    src: dImg,
    name: 'RANDEL',
    role: 'Frontend Developer',
    statement: 'I design and implement responsive, high-fidelity user interfaces. My core focus is on smooth interactions, pixel-level layouts, and robust React frontend structures.',
  },
  {
    src: zImg,
    name: 'GRAZIELLE',
    role: 'Researcher & Operations',
    statement: 'I lead market research, manage operational pipelines, and handle all regulatory paper works to ensure structural clarity and seamless execution of our designs.',
  },
  {
    src: rImg,
    name: 'RENZ MARTIN',
    role: 'Frontend Developer',
    statement: 'I build reactive, visually immersive digital ecosystems. My love is merging futuristic aesthetics with clean, modular, and performance-tuned code.',
  },
  {
    src: eImg,
    name: 'ELIJAH BOON',
    role: 'Backend Developer',
    statement: 'I architect secure and scalable backend logic, database integrations, and high-performance server APIs to sustain heavy user traffic behind the scenes.',
  },
];
