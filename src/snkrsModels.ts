/**
 * interface for snkrs shoe
 */
export interface Product {
  interestId: string;
  style: number;
  colorCode: number;
  globalPid: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  genders: string[];
  quantityLimit: number;
  merchStatus: string;
  colorDescription: string;
  available: boolean;
  publishType: string;
  price: Price[];
  selectionEngine: string;
  startSellDate: Date;
  skus: Skus[];
}

/**
 * response
 */
export interface Response {
  threads: Thread[];
}

/**
 * price
 */
export interface Price {
  msrp: number;
  fullRetailPrice: number;
  currentRetailPrice: number;
  onSale: boolean;
}

/**
 * skus
 */
export interface Skus {
  id: string;
  localizedSize: number;
  nikeSize: number;
  available: boolean;
}

/**
 * interface for thread
 */
export interface Thread {
  id: string;
  threadId: string;
  interestId: string;
  name: string;
  lastUpdatedDate: Date;
  lastUpdatedTime: Date;
  publishedDate: Date;
  restricted: boolean;
  feed: string;
  title: string;
  subtitle: string;
  seoSlug: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  imageUrl: string;
  relations: Relations[];
  product: Product;
  cards: Cards[];
  expirationDate: Date;
}

/**
 * interface relations
 */
export interface Relations {
  name: string;
  threads: string[];
}

/**
 * color
 */
export interface Color {
  text: string;
  active: string;
  inactive: string;
  pressed: string;
}

/**
 * cta
 */
export interface CTA {
  buyingTools: boolean;
  text: string;
}

/**
 * images
 */
export interface Images {
  type: string;
  imageUrl: string;
  sortOrder: number;
  alt: string;
}

/**
 * interface cards
 */
export interface Cards {
  id: string;
  cardId: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  iOSOnly: boolean;
  colorHint: Color;
  cta: CTA;
  images: Images[];
  product: Product[];
  interestId: string;
  sortOrder: number;
}
