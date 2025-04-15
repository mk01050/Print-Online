// AutoDownloadPage.jsx
import React, { useEffect } from "react";
import { supabase } from "../../supabase.js";

function AutoDownloadPage() {
  useEffect(() => {
    const fetchAndDownload = async () => {
      // Fetch all the files in the bucket in order of its upload-time (first uploaded is first)
      const { data, error } = await supabase.storage
        .from("uploads")
        .list("", { sortBy: { column: "created_at", order: "asc" } });

      // If any error or no files exist
      if (error || data.length === 0) {
        alert("No files available.");
        return;
      }

      // File exist, then fetch the first (oldest uploaded) file's name
      const filePath = data[0].name;

      // Get the file's public URL for download
      const { data: publicData, error: urlError } = supabase.storage
        .from("uploads")
        .getPublicUrl(filePath);

      //If any error, return out of the function
      if (urlError || !publicData?.publicUrl) {
        alert("Failed to get download URL.");
        return;
      }

      // Start the download automatically
      window.location.href = `${publicData.publicUrl}?download`;

      setTimeout(async () => {
        // Deletes file that is downloaded
        await supabase.storage.from("uploads").remove([filePath]);
      }, 10000); // wait 10 sec
    };

    fetchAndDownload();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-lg">
      Downloading your file...
    </div>
  );
}

export default AutoDownloadPage;
