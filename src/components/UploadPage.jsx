import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase.js";

export default function UploadPage() {
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("uploads")
        .upload(`pending/${file.name}`, file);

      if (error) console.error("Upload error:", error);
      else {
        console.log("File uploaded:", data);
        setMessage("Files uploaded successfully");
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
  };

  return (
    <div className="min-h-screen max-w-3xl flex flex-col justify-center  items-center p-6 mx-auto">
      <h1 className="text-5xl font-bold mb-4 ">📄 PDF File Printer</h1>
      <div className="mb-4 justify-center items-center mx-auto ">

      <input
        multiple
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 "
        />
      <button
        onClick={uploadFile}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
        Upload
      </button>
      </div>
      {message && <p className="mt-4 text-green-700 text-sm">{message}</p>}
      <Link to="/downloads" className="absolute top-10 right-50 opacity-60 text-blue-600 none">
        Go to Downloads
      </Link>
    </div>
  );
}
