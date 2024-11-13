"use server";

import { createClient } from "@/_utils/supabase/server";

export const fetchReviewData = async () => {
  const supabase = createClient();
  try {
    const userData = await supabase.auth.getUser();
    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { data: feedData, error: feedError } = await supabase
      .from("feed")
      .select(`*, camp(*)`)
      .eq("user_id", userId);

    if (feedError || !feedData) {
      return [];
    }

    return feedData;
  } catch (e) {
    console.error("getFeedData Error, ", e);
    return [];
  }
};
