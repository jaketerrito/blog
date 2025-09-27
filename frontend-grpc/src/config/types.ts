// Server-side environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly AUTH_SESSION_SECRET: string
            readonly POSTS_API_URL: string
        }
    }
}
  
export {}