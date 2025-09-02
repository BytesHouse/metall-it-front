import { useState } from "react";
import ParserData from "../features/parsers/ParserData";
import ParserTable from "../features/parsers/ParserTable";

export default function AdminPanel() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:3000/parser-evraz/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex ">
    <div className={`max-w-5xl mx-auto p-4 mt-16 bg-blue-gray-200 rounded-lg shadow-md flex flex-col items-center gap-5`}>
        <h1 className="text-2xl font-bold mb-4">Панель настройки парсеров</h1>
            <ParserData link='http://localhost:3000/parser-brokinvest' name='Brokinvest' />
            <ParserData link='http://localhost:3000/parser-demidov' name='Demidov' />
            <ParserData link='http://localhost:3000/parser-dipos' name='Dipos' />
            <ParserData link='http://localhost:3000/parser-ktzholding' name='Ktzholding' />
            <ParserData link='http://localhost:3000/parser-mc' name='mc' />
            <ParserData link='http://localhost:3000/parser-metallotorg' name='Metallotorg' />
            <ParserData link='http://localhost:3000/parser-ntpz' name='Ntpz' />
            <div style={{display: 'flex', flexDirection: 'column', gap: '25px', padding: '20px', border: '2px solid #ccc', borderColor: 'blue', borderRadius: '8px', marginBottom: '20px' }}>
                <h2>Парсер Evraz</h2>
                <input
  type="file"
  accept=".xlsx"
  onChange={(e) => setFile(e.target.files?.[0] || null)}
/>
      <button onClick={handleUpload}>Загрузить</button></div>
      
    </div>
<ParserTable />
    </div>

  );
}