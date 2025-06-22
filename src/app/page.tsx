"use client";

import { useState, useEffect } from "react";
import { getAllPosts } from "../libs/service";
import { useRouter } from "next/navigation";
import {
  BlogSubtitle,
  BlogTitle,
  PageBackground,
  PageTitle,
  Space,
  Loading,
} from "@/components";
import { PostModel, ReportModel } from "../models";
import { usePostStore } from "@/stores/postStore";
import { useReportStore } from "@/stores/reportStore";

export default function Home() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [filteredPosts, seFilteredPosts] = useState<PostModel[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const [reportData, setReportData] = useState<ReportModel[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const setPost = usePostStore((state) => state.setPost);
  const setReports = useReportStore((state) => state.setReports);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPosts();
      setPosts(res);
      seFilteredPosts(res);
      const rerumDatas: PostModel[] = res.filter((el: PostModel) =>
        el.body.toLowerCase().includes("rerum".toLowerCase())
      );
      setWordCount(rerumDatas.length);
      setReportData(countsData(res));
      setMounted(true);
    };
    fetchData();
  }, []);

  const countsData = (res: PostModel[]) =>
    Object.values(
      res.reduce((acc, post) => {
        if (!acc[post.userId]) {
          acc[post.userId] = { userId: post.userId, count: 0 };
        }
        acc[post.userId].count += 1;
        return acc;
      }, {} as Record<number, ReportModel>)
    );

  function onChangeKeyword(word: string) {
    setKeyword(word);
    if (word.trim().length > 0) {
      let filteredPost = posts;
      filteredPost =
        posts.filter(
          (el) =>
            el.body.toLowerCase().includes(word.toLowerCase()) ||
            el.title.toLowerCase().includes(word.toLowerCase())
        ) ?? [];
      seFilteredPosts(filteredPost);
    } else {
      seFilteredPosts(posts);
    }
  }

  function highlightWord(text: string, keyword?: string) {
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, i) =>
      keyword && part.toLowerCase() === keyword?.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  if (!mounted) Loading();

  return (
    <div className="relative flex flex-col w-full h-full bg-[#faf5fe]">
      <main className="relative flex items-center flex-col w-full p-[64px]">
        <div className="z-1 w-full flex flex-col">
          {Space({ size: "xl" })}
          {BlogTitle()}
          {Space({ size: "sm" })}
          {BlogSubtitle("La Vita è Amore")}
          {Space({ size: "md" })}
          {PageTitle("Un viaggio tra emozioni, bellezza e consapevolezza.")}
          {Space({ size: "lg" })}
          <div className="w-[228px] self-center px-4 py-3 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-start items-center gap-2 overflow-hidden">
            <div className="flex flex-row justify-center items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                  stroke="#667085"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                className="flex justify-start text-gray-500 text-base font-normal py-2 h-[24px]"
                placeholder="Cerca"
                onChange={(text) => {
                  onChangeKeyword(text.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {PageBackground()}
      </main>
      <footer className="bg-white relative flex flex-col items-center w-full p-[96px] gap-y-8">
        <button
          onClick={() => {
            setReports(reportData, wordCount);
            router?.push("/report");
          }}
          className="cursor-pointer flex flex-row gap-x-4 items-center self-end px-4 py-2 bg-white border border-gray-500 text-gray-500 rounded-sm hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22 21H2V3h2v16h2v-9h4v9h2V6h4v13h2v-5h4z"
            />
          </svg>
          Rapporto
        </button>
        <div className="grid grid-cols-3 gap-x-[32px] gap-y-[48px]">
          {filteredPosts.map((post) => {
            return (
              <div
                key={post.id}
                onClick={() => {
                  setPost(post);
                  router.push(`detail/${post.id}`);
                }}
                className="cursor-pointer z-10 h-[350px] px-6 pt-6 pb-8 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.06),0_-2px_6px_rgba(0,0,0,0.04)] rounded-sm flex flex-col justify-start items-start gap-8"
              >
                <div className="flex-1 flex flex-col justify-between items-start">
                  <div className="flex flex-col justify-start items-start gap-3">
                    <div className="justify-start text-violet-700 text-sm font-semibold">
                      {`Post ${post.id}`}
                    </div>
                    <div className="flex flex-col justify-start items-start gap-3">
                      <div className="flex items-center w-full">
                        <div className="flex-1 justify-start text-gray-900 text-2xl font-semibold">
                          {highlightWord(
                            post.title,
                            keyword.length > 0 ? keyword : undefined
                          )}
                        </div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="#101828"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="justify-start text-gray-500 text-base font-normal">
                        {highlightWord(
                          post.body,
                          keyword.length > 0 ? keyword : "rerum"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <div className="justify-start text-gray-500 text-sm font-normal">
                      {`User ID: ${post.userId}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
