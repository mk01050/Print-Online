import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase.js";

export default function DownloadsPage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const listFiles = async () => {
      // Fetch all the files in the bucket in order of its upload-time (last uploaded is first)
      const { data, error } = await supabase.storage
        .from("uploads")
        .list("", { sortBy: { column: "created_at", order: "desc" } });

      // If any error console it
      if (error) console.error("List error:", error);

      //else set files to the data fetched
      else {
        console.log("Files:", data);
        setFiles(data);
      }
    };
    listFiles();
  }, []);



  const downloadFile = async (filePath) => {
    const { data, error } = await supabase.storage
      .from("uploads")
      .download(filePath);
    if (data) {
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filePath.split("/").pop();
      a.click();
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Download Files</h1>
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        Back to Upload
      </Link>
      <ul className="space-y-4">
        {files.map((file) => (
          <li
            key={file.name}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">
                Uploaded at: {new Date(file.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => {
                downloadFile(file.name);
              }}
            >
              <p className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Download
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
