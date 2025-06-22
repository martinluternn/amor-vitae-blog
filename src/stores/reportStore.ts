import { ReportModel } from "@/models";
import { create } from "zustand";

type ReportStore = {
  report: ReportModel[] | null;
  wordCount: number;
  setReports: (report: ReportModel[], wordCount: number) => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  report: null,
  wordCount: 0,
  setReports: (report, wordCount) => set({ report, wordCount }),
}));
