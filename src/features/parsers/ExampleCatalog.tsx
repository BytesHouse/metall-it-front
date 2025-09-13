import React, { useEffect, useState } from "react";

export default function Catalog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [sort, setSort] = useState("priceAsc");

  const [filters, setFilters] = useState({
    category: [],
    provider: [],
  });

  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allProviders, setAllProviders] = useState<string[]>([]);

  // Загружаем список фильтров один раз при монтировании
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch("http://185.23.34.85:3000/unify/filters");
        const data = await res.json();
        setAllCategories(data.categories || []);
        setAllProviders(data.providers || []);
      } catch (err) {
        console.error("Ошибка загрузки фильтров:", err);
      }
    };
    fetchFilters();
  }, []);

  // Загрузка товаров при изменении страницы, сортировки или выбранных фильтров
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sort,
          category: filters.category.join(","),
          provider: filters.provider.join(","),
        });

        const res = await fetch(`http://185.23.34.85:3000/unify/items?${query.toString()}`);
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error("Ошибка загрузки товаров:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [page, limit, sort, filters]);

  const toggleFilter = (type: "category" | "provider", value: string) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  return (
    <div className="p-6 flex gap-6">
      {/* Сайдбар с фильтрами */}
      <aside className="w-64 border-r pr-4">
        <h2 className="text-lg font-bold mb-2">Фильтры</h2>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Категории</h3>
          {allCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => toggleFilter("category", cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Поставщики</h3>
          {allProviders.map((prov) => (
            <label key={prov} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={filters.provider.includes(prov)}
                onChange={() => toggleFilter("provider", prov)}
              />
              {prov}
            </label>
          ))}
        </div>
      </aside>

      {/* Контент с товарами */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Каталог товаров</h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded p-2"
          >
            <option value="priceAsc">Цена ↑</option>
            <option value="priceDesc">Цена ↓</option>
            <option value="nameAsc">Название A-Z</option>
            <option value="nameDesc">Название Z-A</option>
          </select>
        </div>

        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="border rounded-lg shadow p-4 bg-white">
                <h2 className="text-lg font-semibold mb-2">{item.unificName}</h2>
                <p className="text-gray-600">ГОСТ: {item.gost || "-"}</p>
                <p className="text-gray-600">Марка: {item.mark || "-"}</p>
                <p className="text-gray-600">Размер: {item.size1}{item.size2 ? `x${item.size2}` : ""}</p>
                {item.length && <p className="text-gray-600">Длина: {item.length} мм</p>}

                <div className="mt-3">
                  <h3 className="font-semibold">Варианты:</h3>
                  {item.variants?.map((v, i) => (
                    <div key={i} className="border-t mt-1 pt-1 text-sm">
                      <p><span className="font-semibold">Поставщик:</span> {v.provider}</p>
                      <p><span className="font-semibold">Категория:</span> {v.category}</p>
                      <p><span className="font-semibold">Цена 1:</span> {v.price1} {v.units1}</p>
                      {v.price2 && <p><span className="font-semibold">Цена 2:</span> {v.price2} {v.units2}</p>}
                      {v.price3 && <p><span className="font-semibold">Цена 3:</span> {v.price3} {v.units3}</p>}
                      {v.price4 && <p><span className="font-semibold">Цена 4:</span> {v.price4} {v.units4}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Назад
          </button>
          <span className="self-center">Страница {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Вперёд
          </button>
        </div>
      </main>
    </div>
  );
}
