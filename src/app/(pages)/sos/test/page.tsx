"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/_utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/_utils/auth";
import ModalChatList from "@/_components/chat/ModalChatList";

type Props = {
  params: {
    id: string;
  };
};

const SosList = ({ params }: Props) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      console.log("currentUser", currentUser);
    };
    fetchUser();
  }, []);
  console.log("user", user);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ModalChatList params={user.id} />
    </>
  );
};

export default SosList;
