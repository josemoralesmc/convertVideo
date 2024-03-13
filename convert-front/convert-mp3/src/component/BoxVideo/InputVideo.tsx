import React, { useRef, useState, ChangeEvent } from "react";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import PropTypes from "prop-types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import Cookies from "js-cookie";
import "./InputVideo.css";
import LoadingButton from '@mui/lab/LoadingButton';
interface DropFileInputProps {
  onFileChange: (file: File | null) => void;
}

function bytesToMB(bytes: number): number {
  return bytes / (1024 * 1024);
}

const InputVideo: React.FC<DropFileInputProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  
  const uploadVideo = async () => {
    const token = Cookies.get("Token");
    
    if (selectedFile && token) {
        setLoading(true);
      const formData = new FormData();
      formData.append("video", selectedFile);

      try {
        const response = await fetch("https://convertvideo-j12c.onrender.com/video/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        
        await response.json();
        
      } catch (error) {
        console.error("Error during upload:", error);
      } finally{
        setLoading(false)
      }
    }
  };

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");

  const onDrop = () => wrapperRef.current?.classList.remove("dragover");

  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];

    if (newFile && isVideoFile(newFile)) {
      setSelectedFile(newFile);
      props.onFileChange(newFile);
    }
  };

  const isVideoFile = (file: File) => {
    return file.type.startsWith("video/");
  };

  const fileRemove = () => {
    setSelectedFile(null);
    props.onFileChange(null);
  };

  return (
    <>
      <div className="containerConvert">
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label">
            <CloudUploadIcon />
            <p>Drag & Drop your video here</p>
          </div>
          <input className="input" type="file" value="" onChange={onFileDrop} />
        </div>
        {selectedFile && (
          <div className="drop-file-preview">
            <div className="drop-file-preview__item">
              <VideoFileIcon sx={{ mt: 2 }} />
              <div className="drop-file-preview__item__info">
                <p>{selectedFile.name}</p>
                <p style={{ paddingLeft: "5px" }}>
                  {bytesToMB(selectedFile.size).toFixed(2)}MB
                </p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={fileRemove}
              >
                <ClearIcon />
              </span>
            </div>
            <LoadingButton
          onClick={uploadVideo}
          loading={loading}
          variant="contained"
        >
          <span>Convert</span>
        </LoadingButton>
            
          </div>
        )}
      </div>
    </>
  );
};

InputVideo.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};

export default InputVideo;
