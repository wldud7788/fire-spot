import type { NextRequest } from "next/server";
import { updateSession } from "./_utils/supabase/middleware";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/', request.url));
  return await updateSession(request);
}

export const config = {
  // matcher: ["/mypage", "/sign-in", "/meets/write", "/meets/edit/:**"]
  matcher: [
    "/mypage",
    "/sign-in",
    "/meets/write",
    "/meets/edit/:meetId*",
    "/chat"
  ]
};
