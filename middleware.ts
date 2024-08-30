import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: [
        '/',


        '/packets',
        '/packets/create',
        '/products',
        '/gears',
        '/vendors',
        '/profile',

        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing'
    ],
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing'
    ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 