import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price1: number;
  units1: string;
  // Добавь остальные поля по структуре GetProductsResponseDto
}

interface DiposParserProps {
  link: string;
  name: string;
}

const ParserData: React.FC<DiposParserProps> = ({link, name} ) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [message, setMessage] = useState('');

  const API_BASE = link;

  const startParser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/start`);
      const data = res.data as { message: string };
      setMessage(data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Ошибка при запуске парсера');
    } finally {
      setLoading(false);
    }
  };

  const stopParser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/stop`);
      const data = res.data as { message: string };
      setMessage(data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Ошибка при остановке парсера');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/data`, { params: { page: pageNumber, limit: perPage } });
      const data = res.data as any;
      setProducts(data.filterProducts);
      setTotal(data.total);
      setPerPage(data.perPage);
      setMessage(data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Ошибка при получении данных');
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/download`, { responseType: 'blob' });
      const blobData = res.data as BlobPart;
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'brokinvest.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage('Файл скачан');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Ошибка при скачивании файла');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '25px', padding: '20px', border: '2px solid #ccc', borderColor: 'blue', borderRadius: '8px', marginBottom: '20px' }}>
      <h2 className='text-2xl'>Парсер {name}</h2>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={startParser} disabled={loading}>Запустить парсер</button>
        <button onClick={stopParser} disabled={loading} style={{ marginLeft: '10px' }}>Остановить парсер</button>
        <button onClick={downloadExcel} disabled={loading} style={{ marginLeft: '10px' }}>Скачать Excel</button>
      </div>
      {message && <p>{message}</p>}
      {/* <h3>Товары</h3>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена 1</th>
            <th>Ед изм</th>
          </tr>
        </thead>
        <tbody>
          {(products || []).map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price1}</td>
                <td>{p.units1}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>Назад</button>
        <span style={{ margin: '0 10px' }}>Страница {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={page * perPage >= total}>Вперед</button>
      </div> */}
    </div>
  );
};

export default ParserData;
