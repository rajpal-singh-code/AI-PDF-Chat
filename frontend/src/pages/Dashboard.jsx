import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PdfPreview from "../components/PdfPreview";
import ChatBox from "../components/ChatBox";
import Toast from "../components/Toast";
import API from "../services/api";

function Dashboard() {
  const [pdfFile, setPdfFile] = useState(null);
  const [answer, setAnswer] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const fireToast = (msg) => {
    setToastMsg(msg);
    setShowToast((prev) => !prev);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfFile(file);
    setUploadedFileName(file.name);
    fireToast("📤 Your PDF is uploading...");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      await API.post("/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fireToast("✅ PDF uploaded successfully!");
    } catch (err) {
      console.log(err);
      fireToast("❌ PDF upload failed");
      setUploadedFileName("");
    }
  };

  const handleAskQuestion = async (question) => {
    if (!question) return;
    try {
      const res = await API.post("/ask", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.log(err);
      alert("Failed to get answer");
    }
  };

  return (
    <div className="bg-[#020817] h-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <Sidebar
          handleFileChange={handleFileChange}
          uploadedFileName={uploadedFileName}
        />

        {/* PDF */}
        <div className="flex-1 bg-[#08152d] overflow-auto flex justify-center p-6">
          <PdfPreview pdfFile={pdfFile} />
        </div>

        {/* CHAT */}
        <ChatBox answer={answer} handleAskQuestion={handleAskQuestion} />
      </div>

      <Toast message={toastMsg} show={showToast} />
    </div>
  );
}

export default Dashboard;