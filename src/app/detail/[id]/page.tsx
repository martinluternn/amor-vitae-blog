"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getCommentByPost } from "../../../libs/service";
import { getShortInitials } from "../../../libs/util";
import {
  BlogSubtitle,
  BlogTitle,
  Divider,
  PageBackground,
  PageTitle,
  Space,
  Loading,
} from "@/components";
import { CommentModel } from "../../../models";
import { usePostStore } from "@/stores/postStore";

export default function Detail() {
  const [mounted, setMounted] = useState(false);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const params = useParams();
  const detailPost = usePostStore((state) => state.post);
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCommentByPost(id?.toString() ?? "");
      setComments(res);
      setMounted(true);
    };
    fetchData();
  }, []);

  if (!mounted) Loading();

  return (
    <div className="relative flex flex-col w-full h-full bg-[#faf5fe]">
      <main className="relative flex items-center flex-col w-full p-[64px]">
        <div className="z-1 w-full flex flex-col text-center">
          {Space({ size: "xl" })}
          {BlogTitle()}
          {Space({ size: "sm" })}
          {BlogSubtitle("Dettaglio del post")}
          {Space({ size: "md" })}
          {PageTitle(detailPost?.title ?? '-')}
        </div>
        {PageBackground()}
        {Space({ size: "md" })}
      </main>
      <footer className="bg-white relative flex flex-col items-center w-full p-[96px]">
        <div className="flex flex-col justify-start items-center self-start text-gray-900 text-2xl font-semibold w-full">
          <div className="justify-start text-black text-base font-normal">
            {detailPost?.body ?? '-'}
          </div>
          {Space({ size: "lg" })}
          {Divider()}
          {Space({ size: "lg" })}
          <div className="justify-start text-black text-base font-normal">
            {"COMMENTO"}
          </div>
          {Space({ size: "sm" })}
          <div className="flex flex-col gap-y-8">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-row gap-x-4">
                <div className="w-11 h-11 rounded-[94px] bg-gray-200 text-center items-center text-base font-bold justify-center content-center">
                  {getShortInitials(comment.name)}
                </div>
                <div className="px-5 py-2.5 bg-[#f3ebff] rounded-lg inline-flex flex-col justify-start items-start">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <div className="flex flex-row justify-between items-center gap-5 w-full">
                      <div className="text-gray-500 text-base font-bold">
                        {comment.name}
                      </div>
                      <div className="items-center gap-2.5 text-gray-500 text-sm font-normal">
                        {comment.email}
                      </div>
                    </div>
                    <div className="text-gray-500 text-base font-normal items-center">
                      {comment.body}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
