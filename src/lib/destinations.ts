import malta from "@/assets/malta.jpg";
import romania from "@/assets/romania.jpg";
import bulgaria from "@/assets/bulgaria.jpg";
import slovenia from "@/assets/slovenia.jpg";
import serbia from "@/assets/serbia.jpg";
import slovakia from "@/assets/slovakia.jpg";
import latvia from "@/assets/latvia.jpg";
import lithuania from "@/assets/lithuania.jpg";

// Editable destination content. Fields marked null should be filled with verified information later.
export type Institution = {
  name: string;
  fullName?: string;
  locations: string;
  levels: string;
  areas: string;
  description?: string;
};

export type Destination = {
  slug: string;
  name: string;
  flag: string;
  capital: string;
  image: string;
  imageAlt: string;
  tagline: string;
  intro: string;
  why: string[];
  levels: string[];
  interests: string[];
  universities: string[] | null;
  institutions?: Institution[];
  tuition: string | null;
  deadlines: string | null;
  visaNotes: string | null;
};

const base = {
  levels: ["Bachelor's", "Master's"],
  universities: null,
  tuition: null,
  deadlines: null,
  visaNotes: null,
};

export const destinations: Destination[] = [
  {
    ...base,
    slug: "malta",
    name: "Malta",
    flag: "🇲🇹",
    capital: "Valletta",
    image: malta,
    imageAlt: "Valletta harbour in Malta with limestone buildings and blue sea",
    tagline: "A Mediterranean island where English is an official language.",
    intro:
      "Malta is a compact island nation in the heart of the Mediterranean, with a long history, a warm climate and English as one of its official languages.",
    why: [
      "English is widely used in daily life",
      "Compact, walkable island setting",
      "Mediterranean lifestyle and climate",
      "Rich history and culture",
    ],
    interests: [
      "Business & Management",
      "Hospitality & Tourism",
      "Computer Science & IT",
      "Health & Life Sciences",
    ],
    universities: [
      "MCAST",
      "Institute of Tourism Studies (ITS)",
      "University of Malta (UM)",
    ],
    tuition: "€5,000 to €14,000+ per year",
    deadlines: "October Intake — Deadline: May–July\nFebruary Intake — Deadline: September–October",
    institutions: [
      {
        name: "MCAST",
        fullName: "Malta College of Arts, Science & Technology",
        locations: "Paola • Mosta • Qormi • Gozo",
        levels: "Bachelor's | Master's",
        areas: "Business • IT & Computing • Health • Applied Sciences • Engineering",
        description:
          "MCAST offers undergraduate and postgraduate programmes (including Business, Computing & IT, Engineering, Applied Sciences, Health & Social Care, Art & Design) and accepts international applicants.",
      },
      {
        name: "Institute of Tourism Studies (ITS)",
        locations: "Malta",
        levels: "Bachelor's | Master's",
        areas: "Hospitality • Tourism • Hotel Management • Culinary Arts • Heritage",
        description:
          "ITS offers programmes from foundation through master's level, including a Bachelor in International Hospitality Management and MBA in International Hospitality Management.",
      },
      {
        name: "University of Malta",
        fullName: "University of Malta (UM)",
        locations: "Msida • Gozo",
        levels: "Bachelor's | Master's",
        areas: "Business • IT • Health & Life Sciences • Tourism • Science & Technology",
        description:
          "Comprehensive programmes across Business & Management, IT & Computing, Health & Life Sciences, Science, Tourism & Hospitality and many other disciplines. Current programmes include Business & IT at bachelor's level, with bachelor's and master's programmes at the Gozo campus.",
      },
    ],
  },
  {
    ...base,
    slug: "romania",
    name: "Romania",
    flag: "🇷🇴",
    capital: "Bucharest",
    image: romania,
    imageAlt: "Romanian Athenaeum concert hall in Bucharest at sunset",
    tagline: "Historic cities, varied landscapes and established universities.",
    intro:
      "Romania combines lively university cities with castles, mountains and the Black Sea coast, offering students a varied European experience.",
    why: [
      "Several long-established university cities",
      "Diverse landscapes from mountains to coast",
      "Programmes across many disciplines",
      "Rich cultural heritage",
    ],
    interests: ["Health & Life Sciences", "Engineering & Technology", "Business & Management"],
    universities: [
      "Alexandru Ioan Cuza University of Iași (UAIC)",
      "West University of Timișoara (UVT)",
      "University of Bucharest",
      "Gheorghe Asachi Technical University of Iași",
      "Politehnica University Timișoara",
    ],
    tuition: "€1,980 – €4,000+ per year",
    deadlines:
      "September/October Intake — Deadline: May–July\nFebruary Intake — Selected programmes",
    institutions: [
      {
        name: "Alexandru Ioan Cuza University of Iași (UAIC)",
        locations: "Iași",
        levels: "Bachelor's | Master's",
        areas: "Business • Computer Science • Law • Psychology • Sciences",
        description:
          "The oldest university in Romania, offering renowned degree programmes with established options for international students.",
      },
      {
        name: "West University of Timișoara (UVT)",
        locations: "Timișoara",
        levels: "Bachelor's | Master's",
        areas: "Business • Management • Computer Science",
        description:
          "A major public university in western Romania known for dynamic international student mobility and recognized programmes.",
      },
      {
        name: "University of Bucharest",
        locations: "Bucharest",
        levels: "Bachelor's | Master's",
        areas: "Business • Administration • Political Science • International Relations",
        description:
          "One of Romania's top-ranked universities, situated in the capital city with extensive programmes taught in English.",
      },
      {
        name: "Gheorghe Asachi Technical University of Iași",
        locations: "Iași",
        levels: "Bachelor's | Master's",
        areas: "IT • Engineering • Technology",
        description:
          "A premier technical university in northeastern Romania with a long tradition in engineering and technological innovation.",
      },
      {
        name: "Politehnica University Timișoara",
        locations: "Timișoara",
        levels: "Bachelor's | Master's",
        areas: "IT • Engineering • Technology",
        description:
          "One of the largest and most prestigious technical universities in Central and Eastern Europe.",
      },
    ],
  },
  {
    ...base,
    slug: "bulgaria",
    name: "Bulgaria",
    flag: "🇧🇬",
    capital: "Sofia",
    image: bulgaria,
    imageAlt: "Alexander Nevsky Cathedral with golden domes in Sofia, Bulgaria",
    tagline: "Ancient heritage meets a growing student scene.",
    intro:
      "Bulgaria sits at the crossroads of the Balkans, with historic cities, mountain ranges and a Black Sea coastline.",
    why: [
      "Historic cities with a student presence",
      "Mountains and coastline to explore",
      "Programmes in a range of fields",
      "Distinct Balkan culture",
    ],
    interests: ["Health & Life Sciences", "Business & Management", "Computer Science & IT"],
    universities: [
      "University of National and World Economy (UNWE)",
      "Sofia University “St. Kliment Ohridski”",
      "Technical University of Sofia",
      "Varna Free University “Chernorizets Hrabar”",
    ],
    tuition: "€2,500 – €4,000+ per year",
    deadlines:
      "September/October Intake — Deadline: May–August\nFebruary Intake — Selected programmes",
    institutions: [
      {
        name: "University of National and World Economy (UNWE)",
        locations: "Sofia",
        levels: "Bachelor's | Master's",
        areas: "Economics • Business & Management • Finance • International Relations",
        description:
          "The largest and oldest business university in Bulgaria and South-Eastern Europe, offering comprehensive economics and business degrees in English.",
      },
      {
        name: "Sofia University “St. Kliment Ohridski”",
        locations: "Sofia",
        levels: "Bachelor's | Master's",
        areas: "Computer Science • IT • Natural Sciences • Humanities • Law",
        description:
          "The leading and most prestigious university in Bulgaria, ranked consistently at the top nationally with strong international programmes.",
      },
      {
        name: "Technical University of Sofia",
        locations: "Sofia • Plovdiv • Sliven",
        levels: "Bachelor's | Master's",
        areas: "Engineering • IT & Computer Systems • Telecommunications • Automation",
        description:
          "The largest technical university in Bulgaria, renowned for rigorous engineering education and degrees taught in English.",
      },
      {
        name: "Varna Free University “Chernorizets Hrabar”",
        locations: "Varna",
        levels: "Bachelor's | Master's",
        areas: "Computer Science • Architecture • Business Administration • Law",
        description:
          "A major modern university situated on the Black Sea coast in Varna, offering modern facilities and dynamic international degree programmes.",
      },
    ],
  },
  {
    ...base,
    slug: "slovenia",
    name: "Slovenia",
    flag: "🇸🇮",
    capital: "Ljubljana",
    image: slovenia,
    imageAlt: "Ljubljana old town with Triple Bridge and castle on the hill in Slovenia",
    tagline: "Green, compact and centrally located in Europe.",
    intro:
      "Slovenia is known for its green landscapes, Alpine scenery and the charming capital Ljubljana, all within a compact country.",
    why: [
      "Compact country with Alpine and coastal scenery",
      "Central European location",
      "Calm, green city life",
      "International student community",
    ],
    interests: ["Engineering & Technology", "Business & Management", "Arts & Humanities"],
    universities: [
      "University of Ljubljana",
      "University of Maribor",
      "University of Primorska",
      "University of Nova Gorica",
    ],
    tuition:
      "€2,000 – €5,500+ per year for many programmes; exact fees depend on the programme and institution.",
    deadlines:
      "September/October Intake — Deadline: February–July\nFebruary Intake — Selected programmes",
    institutions: [
      {
        name: "University of Ljubljana",
        locations: "Ljubljana",
        levels: "Bachelor's | Master's",
        areas: "Economics & Business • Computer & Information Science • Engineering • Social Sciences",
        description:
          "The oldest and largest university in Slovenia, ranking among the top European public research universities.",
      },
      {
        name: "University of Maribor",
        locations: "Maribor",
        levels: "Bachelor's | Master's",
        areas: "Economics & Business • Electrical Engineering & Computer Science • Logistics • Health",
        description:
          "The second-largest university in Slovenia, offering modern research facilities and industry-connected degree programmes.",
      },
      {
        name: "University of Primorska",
        locations: "Koper • Portorož • Izola",
        levels: "Bachelor's | Master's",
        areas: "Management • Tourism Studies • Mathematics & Computer Science • Health Sciences",
        description:
          "Located on the Mediterranean coast of Slovenia, known for international degree courses in tourism, business, and mathematics.",
      },
      {
        name: "University of Nova Gorica",
        locations: "Nova Gorica • Vipava",
        levels: "Bachelor's | Master's",
        areas: "Engineering & Management • Environmental Sciences • Viticulture • Arts",
        description:
          "An innovative research-oriented university situated in Western Slovenia near the Italian border.",
      },
    ],
  },
  {
    ...base,
    slug: "serbia",
    name: "Serbia",
    flag: "🇷🇸",
    capital: "Belgrade",
    image: serbia,
    imageAlt: "Belgrade Kalemegdan fortress overlooking the river at sunset in Serbia",
    tagline: "Energetic cities on the Danube.",
    intro:
      "Serbia offers vibrant cities like Belgrade and Novi Sad, set along the Danube with a lively cultural and social scene.",
    why: [
      "Vibrant, sociable cities",
      "Located along the Danube",
      "Programmes across several disciplines",
      "Rich history and culture",
    ],
    interests: ["Engineering & Technology", "Computer Science & IT", "Arts & Humanities"],
    universities: [
      "University of Belgrade",
      "University of Novi Sad",
      "University of Niš",
      "University of Kragujevac",
      "Belgrade Metropolitan University",
    ],
    tuition:
      "€750 – €4,000+ per year for many programmes; English-taught programmes can be higher.",
    deadlines:
      "September/October Intake — Deadline: May–June\nMaster's: September/October (Deadlines vary by institution)",
    institutions: [
      {
        name: "University of Belgrade",
        locations: "Belgrade",
        levels: "Bachelor's | Master's",
        areas: "IT & Computer Science • Medicine & Dentistry • Business & Economics • Engineering",
        description:
          "The premier and largest public university in Serbia, ranked among the top universities in the region with an extensive range of English-taught courses.",
      },
      {
        name: "University of Novi Sad",
        locations: "Novi Sad • Subotica • Sombor • Zrenjanin",
        levels: "Bachelor's | Master's",
        areas: "Technical Sciences & IT • Medicine • Economics & Business • Agriculture",
        description:
          "A major research-intensive university situated in Serbia's vibrant IT and tech hub, Novi Sad, known for strong international academic links.",
      },
      {
        name: "University of Niš",
        locations: "Niš",
        levels: "Bachelor's | Master's",
        areas: "Electronic Engineering • Medicine • Science • Economics",
        description:
          "A key academic centre in Southern Serbia with specialized faculties in electronic engineering, sciences, and medical studies.",
      },
      {
        name: "University of Kragujevac",
        locations: "Kragujevac",
        levels: "Bachelor's | Master's",
        areas: "Engineering • Medical Sciences • Economics • Natural Sciences",
        description:
          "Modern public university located in Central Serbia offering accessible study pathways and high-level applied research.",
      },
      {
        name: "Belgrade Metropolitan University",
        locations: "Belgrade • Niš",
        levels: "Bachelor's | Master's",
        areas: "Information Technologies • Digital Arts • Management • Game Development",
        description:
          "A modern university known for pioneering IT, software engineering, and digital business programmes in English.",
      },
    ],
  },
  {
    ...base,
    slug: "slovakia",
    name: "Slovakia",
    flag: "🇸🇰",
    capital: "Bratislava",
    image: slovakia,
    imageAlt: "Bratislava castle above the Danube river in Slovakia",
    tagline: "Central European charm between Vienna and Budapest.",
    intro:
      "Slovakia lies in the heart of Central Europe, with castles, mountains and a capital close to several major European cities.",
    why: [
      "Central location in Europe",
      "Castles, mountains and old towns",
      "Established universities",
      "Well connected to neighbouring countries",
    ],
    interests: ["Health & Life Sciences", "Engineering & Technology", "Business & Management"],
    universities: [
      "Comenius University Bratislava",
      "Slovak University of Technology (STU)",
      "Bratislava University of Economics and Business (EUBA)",
      "University of Prešov",
      "Pavol Jozef Šafárik University (UPJŠ)",
    ],
    tuition: "€1,500 – €4,000+ per year for many English-taught programmes.",
    deadlines:
      "September Intake — Deadline: February–June\nFebruary Intake — Selected programmes",
    institutions: [
      {
        name: "Comenius University Bratislava",
        locations: "Bratislava",
        levels: "Bachelor's | Master's",
        areas: "Management • Medicine & Pharmacy • Natural Sciences • Law • Social Sciences",
        description:
          "The oldest and most prestigious university in Slovakia, recognized globally with multiple faculties offering programmes in English.",
      },
      {
        name: "Slovak University of Technology (STU)",
        locations: "Bratislava • Trnava",
        levels: "Bachelor's | Master's",
        areas: "Informatics & Information Tech • Electrical Engineering • Civil Engineering • Architecture",
        description:
          "The premier technical university in Slovakia, offering cutting-edge programmes in IT, robotics, and engineering.",
      },
      {
        name: "Bratislava University of Economics and Business (EUBA)",
        locations: "Bratislava • Košice",
        levels: "Bachelor's | Master's",
        areas: "International Business • Economics & Finance • Business Administration • Marketing",
        description:
          "The leading university in Slovakia for economics, business administration, and management degrees.",
      },
      {
        name: "University of Prešov",
        locations: "Prešov",
        levels: "Bachelor's | Master's",
        areas: "Management • Health Care • Humanities • Education",
        description:
          "A major university in Eastern Slovakia offering affordable, diverse study pathways in a historic student city.",
      },
      {
        name: "Pavol Jozef Šafárik University (UPJŠ)",
        locations: "Košice",
        levels: "Bachelor's | Master's",
        areas: "Medicine & Health Sciences • Science • Public Administration • Law",
        description:
          "A prominent research university located in Košice, renowned for its English-taught general medicine, science, and administration programmes.",
      },
    ],
  },
  {
    ...base,
    slug: "latvia",
    name: "Latvia",
    flag: "🇱🇻",
    capital: "Riga",
    image: latvia,
    imageAlt: "Colourful art nouveau buildings and church spire in Riga, Latvia",
    tagline: "Baltic culture and Art Nouveau architecture.",
    intro:
      "Latvia, on the Baltic Sea, is home to Riga — a capital known for its Art Nouveau architecture and medieval old town.",
    why: [
      "Distinctive Baltic culture",
      "Historic, walkable capital",
      "Forests and coastline",
      "International student presence",
    ],
    interests: [
      "Business & Management",
      "Computer Science & IT",
      "Engineering & Technology",
      "Health & Life Sciences",
    ],
    universities: [
      "Riga Technical University (RTU)",
      "University of Latvia",
      "RISEBA University of Applied Sciences",
      "Turība University",
      "Daugavpils University",
      "Vidzeme University of Applied Sciences",
    ],
    tuition:
      "€1,800 – €4,000+ per year for many Business, IT and other programmes.",
    deadlines:
      "September Intake — Deadline: March–July/August\nFebruary Intake — Deadline: November–December (earlier for non-EU/visa applicants)",
    institutions: [
      {
        name: "Riga Technical University (RTU)",
        locations: "Riga",
        levels: "Bachelor's | Master's",
        areas: "Computer Systems & IT • Engineering • Aviation • Business & Management",
        description:
          "The oldest technical university in the Baltic states, internationally renowned for engineering, computer science, and modern laboratory facilities.",
      },
      {
        name: "University of Latvia",
        locations: "Riga",
        levels: "Bachelor's | Master's",
        areas: "Business Administration • Medicine • Computer Science • Natural Sciences",
        description:
          "The national flagship university of Latvia, offering high-ranking degrees and a comprehensive international curriculum in English.",
      },
      {
        name: "RISEBA University of Applied Sciences",
        locations: "Riga",
        levels: "Bachelor's | Master's",
        areas: "Business & Management • Audiovisual Media Arts • Architecture • IT",
        description:
          "A leading business and creative arts university with international EPAS accreditation and double-degree options.",
      },
      {
        name: "Turība University",
        locations: "Riga",
        levels: "Bachelor's | Master's",
        areas: "Tourism & Hospitality • Business Administration • Law • Information Technologies",
        description:
          "The largest private university in the Baltics, celebrated for practical business training and UNWTO TedQual certified tourism degrees.",
      },
      {
        name: "Daugavpils University",
        locations: "Daugavpils",
        levels: "Bachelor's | Master's",
        areas: "Natural Sciences • Information Technologies • Humanities • Social Sciences",
        description:
          "The largest regional university in Latvia, providing affordable tuition, recognized European degrees, and personalized student support.",
      },
      {
        name: "Vidzeme University of Applied Sciences",
        locations: "Valmiera",
        levels: "Bachelor's | Master's",
        areas: "Information Technologies • Media & Communication • Tourism • Cybersecurity",
        description:
          "A forward-thinking university situated in a picturesque Latvian town, offering modern, hands-on study programmes.",
      },
    ],
  },
  {
    ...base,
    slug: "lithuania",
    name: "Lithuania",
    flag: "🇱🇹",
    capital: "Vilnius",
    image: lithuania,
    imageAlt: "Baroque church towers and red rooftops of Vilnius old town, Lithuania",
    tagline: "A Baltic capital with a baroque old town.",
    intro:
      "Lithuania combines a historic baroque capital in Vilnius with a modern outlook and a growing international community.",
    why: [
      "Historic baroque old town",
      "Modern, digitally minded cities",
      "Baltic culture and nature",
      "Programmes in a variety of fields",
    ],
    interests: ["Computer Science & IT", "Business & Management", "Health & Life Sciences"],
    universities: [
      "VIKO – Vilniaus kolegija",
      "SMK – College of Applied Sciences",
      "Vilnius University (VU)",
    ],
    tuition: "€2,900 – €5,500+ per year",
    deadlines:
      "September Intake — Deadline: March–July\nFebruary Intake — Selected institutions/programmes",
    institutions: [
      {
        name: "VIKO – Vilniaus kolegija",
        fullName: "Vilniaus Kolegija / Higher Education Institution",
        locations: "Vilnius",
        levels: "Bachelor's / Professional Bachelor's",
        areas: "Business • IT & Computing • Health Care • Engineering",
        description:
          "One of the largest universities of applied sciences in Lithuania, offering high-quality practice-oriented programmes with welcoming options for international students.",
      },
      {
        name: "SMK – College of Applied Sciences",
        fullName: "SMK University of Applied Social Sciences",
        locations: "Vilnius • Kaunas • Klaipėda",
        levels: "Bachelor's / Professional Bachelor's",
        areas: "Business & Management • Computer Science • Marketing • Design",
        description:
          "A leading modern higher education institution in Lithuania focused on experiential learning, creativity, and career-oriented international degree programmes.",
      },
      {
        name: "Vilnius University (VU)",
        fullName: "Vilniaus Universitetas",
        locations: "Vilnius • Kaunas • Šiauliai",
        levels: "Bachelor's | Master's",
        areas: "IT & Computing • Business & Economics • Medicine & Health • Science",
        description:
          "The oldest and highest-ranked university in Lithuania, offering world-recognized degrees, historic campuses, and a vibrant international student community.",
      },
    ],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
