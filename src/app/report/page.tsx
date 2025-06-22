"use client";

import { BlogSubtitle, BlogTitle, PageBackground, Space } from "@/components";
import { useReportStore } from "@/stores/reportStore";

export default function Report() {
  const reports = useReportStore((state) => state.report);
  const wordCount = useReportStore((state) => state.wordCount);

  return (
    <div className="relative flex flex-col w-full h-full bg-[#faf5fe]">
      <main className="relative flex items-center flex-col w-full p-[64px]">
        <div className="z-1 w-full flex flex-col">
          {Space({ size: "xl" })}
          {BlogTitle()}
          {Space({ size: "sm" })}
          {BlogSubtitle("Rapporto")}
        </div>
        {PageBackground()}
        {Space({ size: "md" })}
      </main>
      <footer className="bg-white relative flex flex-col items-center w-full p-[96px]">
        <div className="flex flex-col justify-start items-center self-start text-gray-900 text-2xl font-semibold gap-y-4">
          {`Post che contengono la parola 'rerum': ${wordCount}`}
          <table className="min-w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 border-b">
                  ID Utente
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 border-b">
                  Numero di post
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {reports?.map(({ userId, count }) => (
                <tr key={userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{userId}</td>
                  <td className="px-6 py-4 border-b">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>
    </div>
  );
}
