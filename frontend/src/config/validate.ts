const requiredServerEnv = ["POSTS_API_URL"] as const;

// Validate on server startup
for (const key of requiredServerEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
//TODO this doesnt do anything
