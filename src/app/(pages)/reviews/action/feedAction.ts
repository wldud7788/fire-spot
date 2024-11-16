"use server";

import { createClient } from "@/_utils/supabase/server";

export const fetchReviewData = async () => {
  const supabase = createClient();
  try {
    const userData = await supabase.auth.getUser();
    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { count: reviewCount } = await supabase
      .from("review")
      .select("*", { count: "exact" })
      .eq("userId", userId);

    if (!reviewCount) {
      return 0;
    }

    return reviewCount;
  } catch (e) {
    console.error("getFeedData Error, ", e);
    return [];
  }
};
