import { NextRequest, NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"


// This function can be marked 'async' if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl
    const isSignIn = url.pathname.startsWith('/sign-in')
    const isSignUp = url.pathname.startsWith('/sign-up')
    const isVerify = url.pathname.startsWith('/verify')
    const isRoot = url.pathname.startsWith('/')

    const shouldRedirect = token && (isSignIn || isSignUp || isVerify || isRoot)

    if (shouldRedirect) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/sign-in',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
}