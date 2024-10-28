import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers
      }
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
              ({ name, value }) => request.cookies.set(name, value) // 요청의 쿠키에 설정
            );
            response = NextResponse.next({
              request
            });
            cookiesToSet.forEach(
              ({ name, value, options }) =>
                response.cookies.set(name, value, options) // 응답의 쿠키에도 설정
            );
          }
        }
      }
    );
    const user = await supabase.auth.getUser(); // 세션이 만료된 경우 자동 갱신(현재 사용자 정보를 가져옴)
    const protectedRoutes = ["/mypage"];
    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
    console.log("user.data", user.data.user);
    // 로그인 상태일 때
    if (user.data.user) {
      // 만약 접근하고자 하는 경로가 '/sign-in'이라면 마이페이지로 리다이렉션
      if (request.nextUrl.pathname === "/sign-in") {
        return NextResponse.redirect(new URL("/mypage", request.url));
      }
    }

    // 로그인이 필요한 페이지 접근 시
    if (isProtectedRoute && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return response;
  } catch (e) {
    console.log(e, "error");
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    });
  }
};
