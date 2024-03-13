// uploadService.js
import Cookies from "js-cookie";

export async function UploadVideo(file: any) {
  const token = Cookies.get("Token");

  if (file && token) {
    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://localhost:8000/video/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error during upload:", error);
    }
  }
}