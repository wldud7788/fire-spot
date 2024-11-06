"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";

type sosDetailType = {
  id: number;
  created_at: string;
  sos_category: string;
  title: string;
  contents: string;
  sos_tag: any; // `sos_tag` can now be a string or an array
  user_uid: string;
  sos_state: boolean;
  location: string | null;
  profile: Profile;
};

type Props = {
  params: { sosId: string };
};

interface Profile {
  nickname: string;
  avatar_url: string | null;
}

const SosDetail = ({ params }: Props) => {
  const supabase = createClient();
  const [sosDetail, setSosDetail] = useState<sosDetailType | null>(null);
  const [nickname, setNickname] = useState("");

  const sosId = params.sosId;

  console.log("sosId", sosId);

  useEffect(() => {
    const getSosDetail = async () => {
      const { data, error } = await supabase
        .from("sos")
        .select("*, profile(nickname, avatar_url)")
        .eq("id", sosId)
        .single();

      if (error) {
        console.error("Error loading SosDetail: ", error.message);
      } else if (data) {
        console.log("SosDetail", data);
        setSosDetail(data); // Save to state
      }
    };

    getSosDetail();
  }, [sosId]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.user_metadata?.full_name) {
        setNickname(data.user.user_metadata.full_name);
      }
    };

    getUser();
  }, []);

  if (!sosDetail) {
    return <div>Loading...</div>;
  }

  // Process sos_tag if it's a JSON string, array, or object
  const renderSosTag = (sos_tag: any) => {
    // Check if sos_tag is a JSON string that needs to be parsed
    if (typeof sos_tag === "string") {
      try {
        // Parse the JSON string to get the actual array
        const parsedTag = JSON.parse(sos_tag);
        if (Array.isArray(parsedTag)) {
          return parsedTag.map((tag: any) => tag.category).join(", ");
        }
      } catch (error) {
        console.error("Error parsing sos_tag JSON:", error);
        return sos_tag; // Return the original string if parsing fails
      }
    } else if (Array.isArray(sos_tag)) {
      // sos_tag is already an array
      return sos_tag.map((tag: any) => tag.category).join(", ");
    } else if (typeof sos_tag === "object" && sos_tag?.category) {
      // Single object with category
      return sos_tag.category;
    } else {
      // Just return the string if it's not an array or object
      return sos_tag;
    }
  };

  return (
    <div>
      <p className="text-[28px]">{sosDetail.title}</p>
      <div>{sosDetail.profile.nickname}</div>
      <p>{sosDetail.created_at}</p>
      <p>{sosDetail.sos_category}</p>
      <p>{sosDetail.contents}</p>
      {/* Render only the category value */}
      <p>{renderSosTag(sosDetail.sos_tag)}</p>
      <p>{sosDetail.location}</p>
    </div>
  );
};

export default SosDetail;
