declare module 'next-sitemap' {
    export interface IConfig {
      siteUrl: string;
      generateRobotsTxt: boolean;
      robotsTxtOptions?: {
        policies: Array<{
          userAgent: string;
          allow: string;
        }>;
      };
      exclude?: string[];
    }
  }