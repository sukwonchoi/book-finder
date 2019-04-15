export interface GetBooksResponse {
  kind: string;
  totalItems: number;
  items?: BookDetails[];
}

export interface BookDetails {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: string[];
  publishedDate?: string;
  description?: string;
  industryIdentifiers: IndustryIdentifiersItem[];
  readingModes: ReadingModes;
  pageCount?: number;
  printType: string;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary?: PanelizationSummary;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  publisher?: string;
  categories?: string[];
  imageLinks?: ImageLinks;
  averageRating?: number;
  ratingsCount?: number;
}

export interface IndustryIdentifiersItem {
  type: string;
  identifier: string;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

export interface Epub {
  isAvailable: boolean;
  acsTokenLink?: string;
}

export interface Pdf {
  isAvailable: boolean;
  acsTokenLink?: string;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
