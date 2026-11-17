export type LookCategory = 'all' | 'swimwear' | 'resort' | 'accessories';

export interface LookItem {
  id: string;
  lookNumber: string;
  title: string;
  subtitle: string;
  category: Exclude<LookCategory, 'all'>;
  categoryLabel: string;
  season: string;
  location: string;
  fabric: string;
  palette: string[];
  description: string;
  exif: string;
  imageUrl: string;
  featured?: boolean;
}

export const HERO_IMAGE_URL = '/src/assets/images/hero_coastal_editorial_1794938339044.jpg';

export const CATEGORY_OPTIONS: { id: LookCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'swimwear', label: 'Swimwear' },
  { id: 'resort', label: 'Resort Wear' },
  { id: 'accessories', label: 'Beach Style' },
];

export const LOOKBOOK_ITEMS: LookItem[] = [
  {
    id: 'tropical-look',
    lookNumber: '01',
    title: 'Tropical Look',
    subtitle: 'Architectural Square-Neck One-Piece',
    category: 'swimwear',
    categoryLabel: 'Swimwear',
    season: 'Summer 2026',
    location: 'Mallorca Limestone Pool',
    fabric: '78% Recycled Econyl Nylon · 22% Elastane',
    palette: ['#4D573B', '#D9CEB8', '#005F8F'],
    description:
      'Sculpted in matte olive Italian jersey with clean seaming and wide supportive straps, framed against sunlit travertine and Mediterranean palm shadows.',
    exif: 'Leica M6 · 50mm f/2.0 · ISO 100',
    imageUrl: '/src/assets/images/look_tropical_swimwear_1794938339594.jpg',
    featured: true,
  },
  {
    id: 'sunset-resort',
    lookNumber: '02',
    title: 'Sunset Resort',
    subtitle: 'Belted Organic Linen Kimono & Trouser',
    category: 'resort',
    categoryLabel: 'Resort Wear',
    season: 'Summer 2026',
    location: 'Menorca Cliffside Terrace',
    fabric: '100% Unbleached Belgian Flax Linen',
    palette: ['#EAE3D2', '#C2A886', '#2B303A'],
    description:
      'Fluid unbleached linen tailored with a relaxed kimono sleeve and wide-leg drape, transitioning effortlessly from coastal afternoon light to evening terraces.',
    exif: 'Leica M6 · 35mm f/1.4 · ISO 200',
    imageUrl: '/src/assets/images/look_sunset_resort_1794938338511.jpg',
  },
  {
    id: 'ocean-blue',
    lookNumber: '03',
    title: 'Ocean Blue',
    subtitle: 'Deep Aegean Plunge Maillot',
    category: 'swimwear',
    categoryLabel: 'Swimwear',
    season: 'Summer 2026',
    location: 'Santorini Caldera Steps',
    fabric: 'Double-Lined Matte Swim Crepe',
    palette: ['#004E7C', '#F4F3EF', '#8C7A65'],
    description:
      'Tailored in deep cobalt swim crepe with structured shoulder seams and a clean low neckline, paired with handwoven palm basketry.',
    exif: 'Leica M6 · 50mm f/2.8 · ISO 100',
    imageUrl: '/src/assets/images/look_ocean_blue_swim_1794938340204.jpg',
  },
  {
    id: 'coastal-vibes',
    lookNumber: '04',
    title: 'Coastal Vibes',
    subtitle: 'Raffia Sun Hat, Tortoise Frames & Silk',
    category: 'accessories',
    categoryLabel: 'Beach Style',
    season: 'Summer 2026',
    location: 'Costa Brava Cove',
    fabric: 'Madagascan Raffia · Printed Mulberry Silk',
    palette: ['#D5BE97', '#3E2B1E', '#1F3A52'],
    description:
      'Essential shoreline textures assembled on washed linen: hand-braided raw-edge raffia, Italian acetate frames, and a striped coastal silk foulard.',
    exif: 'Leica M6 · 50mm f/2.0 · ISO 100',
    imageUrl: '/src/assets/images/look_coastal_vibes_style_1794938340235.jpg',
  },
  {
    id: 'dune-linen',
    lookNumber: '05',
    title: 'Dune Linen',
    subtitle: 'Open-Weave Shirt & Pleated Trouser',
    category: 'resort',
    categoryLabel: 'Resort Wear',
    season: 'Summer 2026',
    location: 'Cap de Creus Boardwalk',
    fabric: 'Breathable Sand-Washed Linen Twill',
    palette: ['#C8B9A2', '#FAF9F6', '#005F8F'],
    description:
      'Crisp tonal layering in warm sand-washed linen, styled open over an ivory knit camisole with high-waisted coastal trousers.',
    exif: 'Leica M6 · 35mm f/2.0 · ISO 100',
    imageUrl: '/src/assets/images/look_dune_linen_resort_1794938341594.jpg',
  },
  {
    id: 'solstice-pareo',
    lookNumber: '06',
    title: 'Solstice Pareo',
    subtitle: 'Sheer Cotton Wrap & Woven Tote',
    category: 'accessories',
    categoryLabel: 'Beach Style',
    season: 'Summer 2026',
    location: 'Comporta Shoreline',
    fabric: 'Organic Cotton Voile · Hand-Plaited Straw',
    palette: ['#F2ECE1', '#BFA888', '#5E747F'],
    description:
      'Airy organic cotton voile knotted at the waist over minimal ivory swimwear, anchored by a structured leather-trimmed straw carryall.',
    exif: 'Leica M6 · 50mm f/2.0 · ISO 400',
    imageUrl: '/src/assets/images/look_solstice_beach_style_1794938340767.jpg',
  },
];

export const CRAFT_CHAPTERS = [
  {
    number: '01',
    title: 'Sculpted Swim Jersey',
    detail: 'UPF 50+ regenerated nylon milled in northern Italy with matte recovery.',
  },
  {
    number: '02',
    title: 'Sun-Washed Flax Linen',
    detail: 'Long-staple Belgian flax woven for airflow in high coastal humidity.',
  },
  {
    number: '03',
    title: 'Artisanal Shore Objects',
    detail: 'Hand-plaited Madagascan raffia, vegetable-tanned leather, and rolled silk.',
  },
];
