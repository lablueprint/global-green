export async function GET() {
  // to check environment variables at runtime
  const envCheck = {
    NEXTAUTH_SECRET_EXISTS: typeof process.env.NEXTAUTH_SECRET === 'string',
    NEXTAUTH_SECRET_LENGTH: process.env.NEXTAUTH_SECRET
      ? process.env.NEXTAUTH_SECRET.length
      : 0,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: envCheck,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
