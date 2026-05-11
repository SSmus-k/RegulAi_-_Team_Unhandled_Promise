"use client";
import { useState } from "react";

interface ParsedReport {
  id: number;
  label: string;
  columns: string[];
  row_count: number;
}

interface Props {
  onReportLoaded: (reportId: number, columns: string[]) => void;
}

export default function ReportUploader({ onReportLoaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("label", file.name);

    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch("/api/v1/apps/reports/upload/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onReportLoaded(data.id, data.columns);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
      <h3 className="text-cyan-200 font-semibold mb-3">📂 Upload Report (Excel / CSV)</h3>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleUpload}
        className="block text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-cyan-700 file:text-white file:cursor-pointer"
      />
      {uploading && <p className="text-cyan-300 mt-2">Uploading and parsing...</p>}
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}