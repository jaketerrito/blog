// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly POSTS_API_URL: string;
    }
  }
}

export {};
