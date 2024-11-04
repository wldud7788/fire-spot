"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/_utils/supabase/client";
import "@/css/sos_list.css";
import Link from "next/link";

type SosListType = {
  id: number;
  created_at: string;
  sos_category: string;
  title: string;
  contents: string;
  user_uid: string;
  sos_tag: (number | string)[];
  sos_state: boolean;
};

const SosList = () => {
  const supabase = createClient();
  const [sosList, setSosList] = useState<SosListType[]>([]);

  useEffect(() => {
    const getSosList = async () => {
      const { data, error } = await supabase.from("sos").select("*");

      if (error) {
        console.error("Error loading commentData : ", error.message);
      } else if (data) {
        console.log("SosData", data);
        setSosList(data);
      }
    };

    getSosList();
  }, []);

  return (
    <>
      <div>
        <Link href={"/sos/write"}>도움 요청하기</Link>
        <div>
          {sosList.map((sos) => {
            return (
              <div key={sos.id} className="sos_box">
                <Link href={`sos/${sos.id}`}>
                  {sos.sos_state === true ? (
                    <div className="mt-5 inline rounded-[10px] bg-[#06603b] px-5 py-2 text-[15px] text-white">
                      종료됨
                    </div>
                  ) : (
                    <div className="mt-5 inline rounded-[10px] bg-[#FFB180] px-5 py-2 text-[15px] text-[#B24600]">
                      진행중
                    </div>
                  )}{" "}
                  <p className="font-bold">{sos.sos_state}</p>
                  <p className="font-bold">{sos.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SosList;
