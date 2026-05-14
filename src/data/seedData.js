export const ACCOUNTS = [
  {
    id: 'romano',
    name: 'Romano Group',
    color: '#3B82F6',
    icon: '🧪',
    brands: [
      { id: 'dr_robaina', name: 'Dr. Robaina', marketplace: 'amazon.com' }
    ]
  },
  {
    id: 'flux',
    name: 'Flux Store',
    color: '#8B5CF6',
    icon: '⚡',
    brands: [
      { id: 'lissoie',    name: 'Lissoie',             marketplace: 'amazon.com' },
      { id: 'jailyne',    name: 'Jailyne Hair Growth',  marketplace: 'amazon.com' },
      { id: 'greensbest', name: "Green's Best",         marketplace: 'amazon.com' },
      { id: 'benavidez',  name: 'Benavidez Sports',     marketplace: 'amazon.com' },
      { id: 'floom',      name: 'Floom Effect',         marketplace: 'amazon.com' },
    ]
  },
  {
    id: 'outland',
    name: 'Outland Living',
    color: '#10B981',
    icon: '🏕️',
    brands: [
      { id: 'outland_us', name: 'Outland Living US', marketplace: 'amazon.com' },
      { id: 'outland_ca', name: 'Outland Living CA', marketplace: 'amazon.ca'  },
    ]
  },
  {
    id: 'canada_tire',
    name: 'Canada Tire',
    color: '#F59E0B',
    icon: '🍁',
    brands: [
      { id: 'canada_tire_ca', name: 'Canada Tire', marketplace: 'amazon.ca' }
    ]
  }
];

export const ROMANO_ASINS = [
  // DMSO
  { asin:'B0CMN243FQ',  name:'DMSO Cream 1x',              price:24.97, line:'DMSO' },
  { asin:'B0CPKCJX5X',  name:'DMSO Cream x2',              price:48.97, line:'DMSO' },
  { asin:'B0CPVY4J6W',  name:'DMSO Cream x3',              price:72.97, line:'DMSO' },
  { asin:'B0CMN5RN2X',  name:'DMSO Roll-On 1x',            price:24.97, line:'DMSO' },
  { asin:'B0CPVXF6YK',  name:'DMSO Roll-On x2',            price:48.97, line:'DMSO' },
  { asin:'B0CPVZXH98',  name:'DMSO Roll-On x3',            price:72.97, line:'DMSO' },
  { asin:'B0CN3WMD83',  name:'DMSO Gel x2',                price:48.97, line:'DMSO' },
  { asin:'B0FPKHJTSG',  name:'DMSO 4oz',                   price:24.97, line:'DMSO',    strikePrice:21.97, strikeEnd:'2026-10-31' },
  { asin:'B0FPMQJD6S',  name:'DMSO+ 4oz',                  price:19.97, line:'DMSO',    strikePrice:16.97, strikeEnd:'2026-10-31' },
  // DMSO Lavender
  { asin:'B0CWYNDNH6',  name:'DMSO Lavender Cream 1x',     price:24.97, line:'DMSO Lavender' },
  { asin:'B0CWYPZW6Z',  name:'DMSO Lavender Cream x2',     price:48.97, line:'DMSO Lavender' },
  { asin:'B0CWYNNN7M',  name:'DMSO Lavender Cream x3',     price:72.97, line:'DMSO Lavender' },
  { asin:'B0CWYQ2536',  name:'DMSO Lavender Roll-On 1x',   price:24.97, line:'DMSO Lavender' },
  { asin:'B0CWYP5QYC',  name:'DMSO Lavender Roll-On x2',   price:48.97, line:'DMSO Lavender' },
  { asin:'B0CWYQ696Z',  name:'DMSO Lavender Roll-On x3',   price:72.97, line:'DMSO Lavender' },
  { asin:'B0CWYPH3F3',  name:'DMSO Lavender Gel x2',       price:48.97, line:'DMSO Lavender' },
  // Charcoal
  { asin:'B0DJ4JYJB5',  name:'Charcoal Caps 1x',           price:19.97, line:'Charcoal' },
  { asin:'B0DJ4N3FGP',  name:'Charcoal Caps x2',           price:38.97, line:'Charcoal' },
  { asin:'B0DJ4CBZWW',  name:'Charcoal Caps x3',           price:52.97, line:'Charcoal' },
  // Magnesium
  { asin:'B0GPLXC5M7',  name:'Magnesium Cream 1x',         price:null,  line:'Magnesium' },
  { asin:'B0GV1PT7QR',  name:'Magnesium Cream x2',         price:null,  line:'Magnesium' },
  { asin:'B0GPM19V6N',  name:'Magnesium Oil 1x',           price:null,  line:'Magnesium' },
  { asin:'B0GV23J2FC',  name:'Magnesium Oil x2',           price:null,  line:'Magnesium' },
  { asin:'B0GPMKRTYM',  name:'Magnesium Roll-On 1x',       price:null,  line:'Magnesium' },
  { asin:'B0GV1QJ52L',  name:'Magnesium Roll-On x2',       price:null,  line:'Magnesium' },
  { asin:'B0GPLZNM59',  name:'Lavender Mag Cream 1x',      price:null,  line:'Magnesium' },
  { asin:'B0GV1SQVVK',  name:'Lavender Mag Cream x2',      price:null,  line:'Magnesium' },
  { asin:'B0GPM61KLH',  name:'Lavender Mag Oil 1x',        price:null,  line:'Magnesium' },
  { asin:'B0GV25V2N8',  name:'Lavender Mag Oil x2',        price:null,  line:'Magnesium' },
  { asin:'B0GPLPB8SC',  name:'Lavender Mag Roll-On 1x',    price:null,  line:'Magnesium' },
  { asin:'B0GV1KT63K',  name:'Lavender Mag Roll-On x2',    price:null,  line:'Magnesium' },
  // NAD+
  { asin:'B0FPJNHX1R',  name:'NAD+',                       price:39.97, line:'Supplements', strikePrice:26.97, strikeEnd:'2026-10-31' },
  // Arnica
  { asin:'B0D6KZ75B2',  name:'Arnica Cream',               price:null,  line:'Arnica' },
  { asin:'B0D6KY1G8P',  name:'Arnica Gel',                 price:null,  line:'Arnica' },
  { asin:'B0DJ3LRS7C',  name:'Arnica Roll-On',             price:null,  line:'Arnica' },
  { asin:'B0DJG82B6Z',  name:'Arnica Salve',               price:null,  line:'Arnica' },
  // Sulfur
  { asin:'B00CXVCBCO',  name:'Sulfur Spray',               price:null,  line:'Sulfur' },
  { asin:'B00D2WI2BM',  name:'Sulfur Toner',               price:null,  line:'Sulfur' },
  { asin:'B00CXW1LQU',  name:'Sulfur Cleanser Bar',        price:null,  line:'Sulfur' },
  { asin:'B00CYPLZQC',  name:'Sulfur Conditioner',         price:null,  line:'Sulfur' },
  { asin:'B00D2X6K24',  name:'Sulfur Lotion',              price:null,  line:'Sulfur' },
  { asin:'B00CYNR4R8',  name:'Sulfur Shampoo',             price:null,  line:'Sulfur' },
  // Oils
  { asin:'B0DMBJ8P7G',  name:'Oregano Oil 1x',            price:null,  line:'Oils' },
  { asin:'B0DNM45JVV',  name:'Oregano Oil x2',             price:null,  line:'Oils' },
  { asin:'B0DNM69TR9',  name:'Oregano Oil x3',             price:null,  line:'Oils' },
  { asin:'B0DM9W5GM5',  name:'Argan Oil 1x',              price:null,  line:'Oils' },
  { asin:'B0DNM2SMZV',  name:'Argan Oil x2',               price:null,  line:'Oils' },
  { asin:'B0DNLZTPPR',  name:'Argan Oil x3',               price:null,  line:'Oils' },
  { asin:'B0DMC5RDLG',  name:'Hemp Oil 1x',               price:null,  line:'Oils' },
  { asin:'B0DNLSP87F',  name:'Hemp Oil x2',                price:null,  line:'Oils' },
  { asin:'B0DNM1PJ9H',  name:'Hemp Oil x3',                price:null,  line:'Oils' },
  { asin:'B0DMBZ3XYL',  name:'Moringa Oil 1x',            price:null,  line:'Oils' },
  { asin:'B0DNM381RP',  name:'Moringa Oil x2',             price:null,  line:'Oils' },
  { asin:'B0DNM517W3',  name:'Moringa Oil x3',             price:null,  line:'Oils' },
  { asin:'B0DMBF4CJ5',  name:'Castor Oil 1x',             price:null,  line:'Oils' },
  { asin:'B0DNM2VW7Y',  name:'Castor Oil x2',              price:null,  line:'Oils' },
  { asin:'B0DNM2V69H',  name:'Castor Oil x3',              price:null,  line:'Oils' },
  // Veggie Wash
  { asin:'B0CWQ2X237',  name:'Veggie Wash 1x',            price:null,  line:'Home' },
  { asin:'B0D68V84QW',  name:'Veggie Wash x2',             price:null,  line:'Home' },
  { asin:'B0D68QHY4R',  name:'Veggie Wash x3',             price:null,  line:'Home' },
  // Acetolia
  { asin:'B01J4QKPLO',  name:'Acetolia First Aid 1x',     price:null,  line:'Acetolia' },
  { asin:'B0CSZ9Z788',  name:'Acetolia First Aid x2',      price:null,  line:'Acetolia' },
  { asin:'B0CSZCCV7T',  name:'Acetolia First Aid x3',      price:null,  line:'Acetolia' },
  { asin:'B0CT1383L2',  name:'Acetolia Nail Brush 1x',    price:null,  line:'Acetolia' },
  { asin:'B0CT1CSH6Z',  name:'Acetolia Nail Brush x2',     price:null,  line:'Acetolia' },
  { asin:'B0CT1F7VCV',  name:'Acetolia Nail Brush x3',     price:null,  line:'Acetolia' },
  { asin:'B00CX7140S',  name:'Acetolia Spray 1x',         price:null,  line:'Acetolia' },
  { asin:'B0CN3T1XKT',  name:'Acetolia Spray x2',          price:null,  line:'Acetolia' },
  { asin:'B0CN3XSFKR',  name:'Acetolia Spray x3',          price:null,  line:'Acetolia' },
  { asin:'B00CXTHBFS',  name:'Acetolia Cleanser Bar 1x',  price:null,  line:'Acetolia' },
  { asin:'B0CN28C6S8',  name:'Acetolia Cleanser Bar x2',   price:null,  line:'Acetolia' },
  { asin:'B0CSQGN3LK',  name:'Acetolia Cleanser Bar x3',   price:null,  line:'Acetolia' },
  // Prokure
  { asin:'B00D22BQG0',  name:'Prokure Foot Cream 1x',     price:null,  line:'Prokure' },
  { asin:'B0CNBDXS5N',  name:'Prokure Foot Cream x2',      price:null,  line:'Prokure' },
  { asin:'B0CSR8Y1GB',  name:'Prokure Foot Cream x3',      price:null,  line:'Prokure' },
  { asin:'B00D265ARC',  name:'Prokure Spray 1x',          price:null,  line:'Prokure' },
  { asin:'B0CNB9RPPC',  name:'Prokure Spray x2',           price:null,  line:'Prokure' },
  { asin:'B0CNBGYY9F',  name:'Prokure Spray x3',           price:null,  line:'Prokure' },
  { asin:'B00D1XLF20',  name:'Prokure Cleanser Bar 1x',   price:null,  line:'Prokure' },
  { asin:'B0CN3SVQXK',  name:'Prokure Cleanser Bar x2',    price:null,  line:'Prokure' },
  { asin:'B0CSRVFG3M',  name:'Prokure Cleanser Bar x3',    price:null,  line:'Prokure' },
  { asin:'B00MNJEFNY',  name:'Prokure Nail Brush 1x',     price:null,  line:'Prokure' },
  { asin:'B0CN7CCDQL',  name:'Prokure Nail Brush x2',      price:null,  line:'Prokure' },
  { asin:'B0CN7F71XZ',  name:'Prokure Nail Brush x3',      price:null,  line:'Prokure' },
  // Hair
  { asin:'B0DJ4LDNJ2',  name:'Hair Growth Gummies 1x',    price:null,  line:'Hair' },
  { asin:'B0DKWKVSC7',  name:'Hair Growth Gummies x2',     price:null,  line:'Hair' },
  { asin:'B0DKVXLRYB',  name:'Hair Growth Gummies x3',     price:null,  line:'Hair' },
  { asin:'B0DJ4L1471',  name:'Hair Growth Capsules 1x',   price:null,  line:'Hair' },
  { asin:'B0DKVFGKW6',  name:'Hair Growth Capsules x2',    price:null,  line:'Hair' },
  { asin:'B0DKWPYBHY',  name:'Hair Growth Capsules x3',    price:null,  line:'Hair' },
  // Gummies
  { asin:'B0DLZHGWYH',  name:'ACV Gummies 1x',            price:null,  line:'Gummies' },
  { asin:'B0DM9QRK2L',  name:'ACV Gummies x2',             price:null,  line:'Gummies' },
  { asin:'B0DM9NMKBP',  name:'ACV Gummies x3',             price:null,  line:'Gummies' },
];

// Pre-loaded promos for Romano Group / Dr. Robaina
export const ROMANO_PROMOS = [
  // ── Lightning Deals confirmed ──
  { id:'ld_lc1_may13',  asin:'B0CWYNDNH6', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-13', dateEnd:'2026-05-13', confirmed:true  },
  { id:'ld_lc2_may13',  asin:'B0CWYPZW6Z', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-13', dateEnd:'2026-05-13', confirmed:true  },
  { id:'ld_dc1_may15',  asin:'B0CMN243FQ', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-15', dateEnd:'2026-05-15', confirmed:true  },
  { id:'ld_dc2_may15',  asin:'B0CPKCJX5X', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-15', dateEnd:'2026-05-15', confirmed:true  },
  { id:'ld_dc3_may15',  asin:'B0CPVY4J6W', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-15', dateEnd:'2026-05-15', confirmed:true  },
  { id:'ld_ch1_may15',  asin:'B0DJ4JYJB5', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-15', dateEnd:'2026-05-15', confirmed:true  },
  { id:'ld_ch2_may15',  asin:'B0DJ4N3FGP', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-15', dateEnd:'2026-05-15', confirmed:true  },
  { id:'ld_ch3_may15',  asin:'B0DJ4CBZWW', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-15', dateEnd:'2026-05-15', confirmed:true  },
  { id:'ld_lr1_may19',  asin:'B0CWYQ2536', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-19', dateEnd:'2026-05-19', confirmed:true  },
  { id:'ld_lr2_may19',  asin:'B0CWYP5QYC', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-19', dateEnd:'2026-05-19', confirmed:true  },
  { id:'ld_lr3_may19',  asin:'B0CWYQ696Z', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-19', dateEnd:'2026-05-19', confirmed:true  },
  { id:'ld_lc1_may20',  asin:'B0CWYNDNH6', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-20', dateEnd:'2026-05-20', confirmed:true  },
  { id:'ld_lc2_may20',  asin:'B0CWYPZW6Z', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-20', dateEnd:'2026-05-20', confirmed:true  },
  { id:'ld_ch1_may22',  asin:'B0DJ4JYJB5', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-22', dateEnd:'2026-05-22', confirmed:true  },
  { id:'ld_ch2_may22',  asin:'B0DJ4N3FGP', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-22', dateEnd:'2026-05-22', confirmed:true  },
  { id:'ld_ch3_may22',  asin:'B0DJ4CBZWW', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-22', dateEnd:'2026-05-22', confirmed:true  },
  { id:'ld_ro1_may22',  asin:'B0CMN5RN2X', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-22', dateEnd:'2026-05-22', confirmed:true  },
  { id:'ld_ro2_may22',  asin:'B0CPVXF6YK', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-22', dateEnd:'2026-05-22', confirmed:true  },
  { id:'ld_ro3_may22',  asin:'B0CPVZXH98', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-22', dateEnd:'2026-05-22', confirmed:true  },
  { id:'ld_dc1_may23',  asin:'B0CMN243FQ', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-23', dateEnd:'2026-05-23', confirmed:true  },
  { id:'ld_dc2_may23',  asin:'B0CPKCJX5X', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-23', dateEnd:'2026-05-23', confirmed:true  },
  { id:'ld_dc3_may23',  asin:'B0CPVY4J6W', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-23', dateEnd:'2026-05-23', confirmed:true  },
  // ── Lightning Windows May 25-31 ──
  { id:'ldw_dc1_m25',   asin:'B0CMN243FQ', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_dc2_m25',   asin:'B0CPKCJX5X', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_dc3_m25',   asin:'B0CPVY4J6W', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_lr1_m25',   asin:'B0CWYQ2536', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_lr2_m25',   asin:'B0CWYP5QYC', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_lr3_m25',   asin:'B0CWYQ696Z', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_ro1_m25',   asin:'B0CMN5RN2X', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_ro2_m25',   asin:'B0CPVXF6YK', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_ro3_m25',   asin:'B0CPVZXH98', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_ch1_m25',   asin:'B0DJ4JYJB5', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_ch2_m25',   asin:'B0DJ4N3FGP', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_ch3_m25',   asin:'B0DJ4CBZWW', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_lc1_m25',   asin:'B0CWYNDNH6', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  { id:'ldw_lc2_m25',   asin:'B0CWYPZW6Z', type:'DEAL', subtype:'Lightning Deal', discount:'15%', dateStart:'2026-05-25', dateEnd:'2026-05-31', confirmed:false },
  // ── Lightning Windows Jun 1-7 (all 15 ASINs) ──
  ...['B0CMN243FQ','B0CPKCJX5X','B0CPVY4J6W','B0CMN5RN2X','B0CPVXF6YK','B0CPVZXH98',
      'B0CWYNDNH6','B0CWYPZW6Z','B0CWYNNN7M','B0CWYQ2536','B0CWYP5QYC','B0CWYQ696Z',
      'B0DJ4JYJB5','B0DJ4N3FGP','B0DJ4CBZWW'].map((asin,i) => ({
    id:`ldw_jun1_${i}`, asin, type:'DEAL', subtype:'Lightning Deal', discount:'15%',
    dateStart:'2026-06-01', dateEnd:'2026-06-07', confirmed:false
  })),
  // ── Prime Day (all 15 ASINs) ──
  ...['B0CMN243FQ','B0CPKCJX5X','B0CPVY4J6W','B0CMN5RN2X','B0CPVXF6YK','B0CPVZXH98',
      'B0CWYNDNH6','B0CWYPZW6Z','B0CWYNNN7M','B0CWYQ2536','B0CWYP5QYC','B0CWYQ696Z',
      'B0DJ4JYJB5','B0DJ4N3FGP','B0DJ4CBZWW'].map((asin,i) => ({
    id:`pd_${i}`, asin, type:'DEAL', subtype:'Prime Day Deal', discount:'15%',
    dateStart:'2026-07-08', dateEnd:'2026-07-09', confirmed:false, note:'Prime Day TBD'
  })),
  // ── Coupons May 8-14 ──
  ...['B0DMBJ8P7G','B0DNM45JVV','B0DNM69TR9','B01J4QKPLO','B0CSZ9Z788','B0CSZCCV7T',
      'B0CT1383L2','B0CT1CSH6Z','B0CT1F7VCV','B00CX7140S','B0CN3T1XKT','B0CN3XSFKR',
      'B00CXTHBFS','B0CN28C6S8','B0CSQGN3LK','B0DJ4N3FGP','B0DJ4CBZWW',
      'B00D22BQG0','B0CNBDXS5N','B0CSR8Y1GB','B00D265ARC','B0CNB9RPPC','B0CNBGYY9F',
      'B00D1XLF20','B0CN3SVQXK','B0CSRVFG3M','B00MNJEFNY','B0CN7CCDQL','B0CN7F71XZ',
      'B0DM9W5GM5','B0DNM2SMZV','B0DNLZTPPR','B0CWQ2X237','B0D68V84QW','B0D68QHY4R',
      'B0DMC5RDLG','B0DNLSP87F','B0DNM1PJ9H','B0DMBZ3XYL','B0DNM381RP','B0DNM517W3',
      'B0DJ4LDNJ2','B0DKWKVSC7','B0DKVXLRYB','B0DJ4L1471','B0DKVFGKW6','B0DKWPYBHY'
     ].map((asin,i) => ({
    id:`coup10_${i}`, asin, type:'COUPON', subtype:'Coupon', discount:'10%',
    dateStart:'2026-05-08', dateEnd:'2026-05-14', confirmed:true
  })),
  ...['B0D6KZ75B2','B0D6KY1G8P','B0DJ3LRS7C','B0DJG82B6Z',
      'B00CXVCBCO','B00D2WI2BM','B00CXW1LQU','B00CYPLZQC','B00D2X6K24','B00CYNR4R8'
     ].map((asin,i) => ({
    id:`coup2_${i}`, asin, type:'COUPON', subtype:'Coupon', discount:'$2 off',
    dateStart:'2026-05-08', dateEnd:'2026-05-14', confirmed:true
  })),
  ...['B0CPKCJX5X','B0CN3WMD83','B0CPVXF6YK','B0CWYPZW6Z','B0CWYPH3F3','B0CWYP5QYC'
     ].map((asin,i) => ({
    id:`coup3_${i}`, asin, type:'COUPON', subtype:'Coupon', discount:'$3 off',
    dateStart:'2026-05-08', dateEnd:'2026-05-14', confirmed:true
  })),
  ...['B0DMBF4CJ5','B0DNM2VW7Y','B0DNM2V69H','B0DLZHGWYH','B0DM9QRK2L','B0DM9NMKBP'
     ].map((asin,i) => ({
    id:`coup15_${i}`, asin, type:'COUPON', subtype:'Coupon', discount:'15%',
    dateStart:'2026-05-08', dateEnd:'2026-05-14', confirmed:true
  })),
  // ── Coupons 25% Magnesium May 12 - Jun 1 ──
  ...['B0GPLXC5M7','B0GV1PT7QR','B0GPM19V6N','B0GV23J2FC','B0GPMKRTYM','B0GV1QJ52L',
      'B0GPLZNM59','B0GV1SQVVK','B0GPM61KLH','B0GV25V2N8','B0GPLPB8SC','B0GV1KT63K'
     ].map((asin,i) => ({
    id:`coup25_${i}`, asin, type:'COUPON', subtype:'Coupon', discount:'25%',
    dateStart:'2026-05-12', dateEnd:'2026-06-01', confirmed:true
  })),
  // ── Strike Prices May 1 - Oct 31 ──
  { id:'sp_nad',    asin:'B0FPJNHX1R', type:'STRIKE', subtype:'Strike Price', discount:'$26.97', dateStart:'2026-05-01', dateEnd:'2026-10-31', confirmed:true },
  { id:'sp_dmso4',  asin:'B0FPKHJTSG', type:'STRIKE', subtype:'Strike Price', discount:'$21.97', dateStart:'2026-05-01', dateEnd:'2026-10-31', confirmed:true },
  { id:'sp_dmso4p', asin:'B0FPMQJD6S', type:'STRIKE', subtype:'Strike Price', discount:'$16.97', dateStart:'2026-05-01', dateEnd:'2026-10-31', confirmed:true },
];
