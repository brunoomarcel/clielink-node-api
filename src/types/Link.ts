export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

export interface CreateLinkRequest {
  url: string;
}

export interface CreateLinkResponse {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

export interface LinkStatsResponse {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

export interface ListLinksResponse {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}