import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            // 요청의 모든 쿠키를 가져오는 함수
            return request.cookies.getAll(); // 쿠키 목록 반환
          },
          setAll(cookiesToSet) {
            // 설정할 쿠키 목록을 받아 설정하는 함수
            cookiesToSet.forEach(
              ({ name, value }) => request.cookies.set(name, value), // 요청의 쿠키에 설정
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(
              ({ name, value, options }) =>
                response.cookies.set(name, value, options), // 응답의 쿠키에도 설정
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser(); // 세션이 만료된 경우 자동 갱신(현재 사용자 정보를 가져옴)

    // protected routes
    // 보호된 경로에 접근 시 사용자 에러 발생 시 리다이렉트
    // if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
    //   return NextResponse.redirect(new URL("/sign-in", request.url));
    // }
    // 보호된 경로 접근 시 리다이렉트 처리
    if (request.nextUrl.pathname.startsWith("/protected/mypage") && !user) {
      return NextResponse.redirect(new URL("/", request.url)); // 홈으로 리다이렉트
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
