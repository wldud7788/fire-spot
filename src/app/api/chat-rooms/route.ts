import { createClient } from "@/_utils/supabase/server";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient();
  try {
    const userData = await supabase.auth.getUser();
    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { data, error } = await supabase.rpc(
      supabaseRpc.chat.getChatRoomList,
      {
        user_id: userId
      }
    );

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return [];
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("Error fetching chatList", e);
    return new NextResponse("Failed to fetch data", { status: 500 });
  }
}
