"use client";

import React, { useState, useEffect } from "react";
import "@/css/sos_write.css";
import { createClient } from "@/_utils/supabase/client";

import { User } from "@supabase/supabase-js";
import { getUser } from "@/_utils/auth";
import { useRouter } from "next/navigation";

let nextId = 0;

type inputCategory = {
  id: number;
  category: string;
};

const SosWrite = () => {
  const supabase = createClient();

  const [inputCount, setInputCount] = useState(0);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [finalCategory, setFinalCategoey] = useState("");
  const [selectCategoey, setSelectCategoey] = useState("");
  const [category, setCategory] = useState("");
  const [inputCategory, setInputCategory] = useState<inputCategory[]>([]);

  //사용자 가져오기
  const [user, setUser] = useState<User | null>(null);

  //작성 후 페이지 이동
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      console.log("currentUser", currentUser);
    };
    fetchUser();
  }, []);

  const onInputCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCount(e.target.value.length);
    setTitle(e.target.value);
  };

  const addSosWrite = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }

    const sosData = {
      sos_category: finalCategory,
      title: title,
      contents: contents,
      user_uid: user.id,
      sos_tag: inputCategory
    };

    if (finalCategory.length === 0) {
      alert("카테고리를 선택해주세요");
    } else {
      const { data, error } = await supabase.from("sos").insert([sosData]);

      console.log("contents", contents);
      if (error) {
        console.error("Error update comment : ", error.message);
      }
    }
    return router.push("/sos");
  };

  console.log("setFinalCategoey", finalCategory);
  return (
    <>
      <form className="sos_form" onSubmit={addSosWrite}>
        <div className="rounded-[20px] border-2 border-solid border-[#B5B5B5] p-[50px]">
          <h1>SOS 유형</h1>
          <ul>
            <li className="category_li">
              <label
                className={
                  selectCategoey === "select"
                    ? "category_label category_select"
                    : "category_label"
                }
              >
                <input
                  className="category_input"
                  type="radio"
                  value="긴급"
                  name="category"
                  onClick={() => {
                    setSelectCategoey("select");
                    setFinalCategoey("긴급");
                  }}
                />
                <span className="category_span">긴급</span>
              </label>
            </li>
            <li className="category_li">
              <label
                className={
                  selectCategoey === "select1"
                    ? "category_label category_select"
                    : "category_label"
                }
              >
                <input
                  className="category_input"
                  type="radio"
                  value="캠핑질문"
                  name="category"
                  onClick={() => {
                    setSelectCategoey("select1");
                    setFinalCategoey("캠핑질문");
                  }}
                />
                <span className="category_span">캠핑질문</span>
              </label>
            </li>
            <li className="category_li">
              <label
                className={
                  selectCategoey === "select2"
                    ? "category_label category_select"
                    : "category_label"
                }
              >
                <input
                  className="category_input"
                  type="radio"
                  value="분실/실종"
                  name="category"
                  onClick={() => {
                    setSelectCategoey("select2");
                    setFinalCategoey("분실/실종");
                  }}
                />
                <span className="category_span">분실/실종</span>
              </label>
            </li>
            <li className="category_li">
              <label
                className={
                  selectCategoey === "select3"
                    ? "category_label category_select"
                    : "category_label"
                }
              >
                <input
                  className="category_input"
                  type="radio"
                  value="공공소식"
                  name="category"
                  onClick={() => {
                    setSelectCategoey("select3");
                    setFinalCategoey("공공소식");
                  }}
                />
                <span className="category_span">공공소식</span>
              </label>
            </li>
            <li className="category_li">
              <label
                className={
                  selectCategoey === "select4"
                    ? "category_label category_select"
                    : "category_label"
                }
              >
                <input
                  className="category_input"
                  type="radio"
                  value="도움요청"
                  name="category"
                  onClick={() => {
                    setSelectCategoey("select4");
                    setFinalCategoey("도움요청");
                  }}
                />
                {/* input이 너무 길어서 짧게 줄일 수 있는 방법을 찾아보기 */}
                <span className="category_span">도움요청</span>
              </label>
            </li>
          </ul>

          <div className="category_help">
            <ul className="list-disc">
              <h1>어떤 카테고리를 선택해야 하나요?</h1>
              <li>긴급 :</li>
              <li>캠핑질문 :</li>
              <li>분실/실종 :</li>
              <li>공공소식 :</li>
              <li>도움요청 :</li>
            </ul>
          </div>
        </div>
        <div className="rounded-[20px] border-2 border-solid border-[#B5B5B5] p-[50px]">
          <div className="flex w-full border-b-[3px] border-[#000000]">
            <input
              type="text"
              placeholder="SOS 내용이 잘 담기도록 적어주세요"
              value={title}
              onChange={onInputCountHandler}
              maxLength={15}
              minLength={1}
              className="w-[96%]"
            />
            <p>
              <span className="category_span">{inputCount}</span>
              <span className="category_span">/15</span>
            </p>
          </div>
          <div>
            <h1>SOS 내용</h1>
            <textarea
              placeholder="내용이 잘 담기도록 적어주세요. (최소 20자 이상)"
              minLength={20}
              value={contents}
              onChange={(e) => {
                setContents(e.target.value);
              }}
            />
            <div className="category_help">
              <h1>
                타인에 대한 비판적인 내용이나 노골적인 내용은 경고없이 삭제 조치
                됩니다. 함께하는 즐거운 캠핑에 동참해주세요!
              </h1>
            </div>
          </div>
          <div>
            <h1>태그</h1>
            <input
              value={category}
              placeholder="준비물을 입력해주세요"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setCategory("");
                setInputCategory([
                  ...inputCategory,
                  {
                    id: nextId++,
                    category: category
                  }
                ]);
              }}
            >
              추가
            </button>
            <ul>
              {inputCategory.map((tag) => (
                <li key={tag.id}>{tag.category}</li>
                // 위의 radio버튼처럼 만들어서 삭제 기능도 구현하기
              ))}
            </ul>
          </div>
          <div></div>
        </div>
        <button>제출</button>
      </form>
    </>
  );
};

export default SosWrite;
