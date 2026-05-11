"use client";
import { useState, useEffect } from "react";
import { UploadCloud, FileText, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

interface HistoryDoc {
  id: number;
  filename: string;
  description: string;
  uploaded_at: string;
  file_url: string;
}

export default function CompanyHistoryUploader() {
  const [docs, setDocs] = useState<HistoryDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    fetchDocs();
  }, []);

  async function fetchDocs() {
    try {
      const res = await fetch(`${API_URL}/apps/company-history/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDocs(data.results ?? data);
      }
    } catch {
      // silently fail — list just stays empty
    }
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("description", description);
    formData.append("filename", selectedFile.name);

    try {
      const res = await fetch(`${API_URL}/apps/company-history/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setDocs((prev) => [data, ...prev]);
      setSelectedFile(null);
      setDescription("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Remove this document?")) return;
    try {
      await fetch(`${API_URL}/apps/company-history/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch {
      alert("Delete failed.");
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg space-y-6">
      <h3 className="text-cyan-200 font-semibold text-lg flex items-center gap-2">
        <UploadCloud className="w-5 h-5" /> Company History & Progress Documents
      </h3>

      {/* Upload area */}
      <div className="space-y-3">
        <div
          className="border-2 border-dashed border-cyan-600/50 rounded-xl p-6 text-center cursor-pointer hover:border-cyan-400 transition"
          onClick={() => document.getElementById("history-file-input")?.click()}
        >
          <UploadCloud className="w-8 h-8 mx-auto text-cyan-400 mb-2" />
          <p className="text-cyan-200 text-sm">
            {selectedFile ? selectedFile.name : "Click to select a file"}
          </p>
          <p className="text-gray-500 text-xs mt-1">PDF, DOCX, XLSX, PNG, JPG supported</p>
          <input
            id="history-file-input"
            type="file"
            accept=".pdf,.docx,.doc,.xlsx,.xls,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <input
          type="text"
          placeholder="Description (e.g. 'Annual Report 2024', 'Series A Milestone')"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </div>

      {/* Document list */}
      {docs.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-cyan-300 text-sm font-semibold">Uploaded Documents</h4>
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm font-medium hover:underline"
                  >
                    {doc.filename}
                  </a>
                  {doc.description && (
                    <p className="text-gray-400 text-xs">{doc.description}</p>
                  )}
                  <p className="text-gray-500 text-xs">
                    {new Date(doc.uploaded_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}