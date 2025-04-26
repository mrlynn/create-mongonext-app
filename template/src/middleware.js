import { withAuth } from 'next-auth/middleware';

// This function can be marked `async` if using `await` inside
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Return true if the user is logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/api/protected/:path*',
  ],
}; 