import React, { useState, useMemo, useEffect } from "react";
import ProductList from "./copmonents/ProductList";
import type { MetalProduct } from "../auth/types/index";
import Header from "../auth/components/Header";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "../../constants/themeColors";
import { Typography, Checkbox } from "@material-tailwind/react";
import ProductSort from "./copmonents/ProductSort";
import axios from "axios";

const res = await axios.get('http://localhost:3000/unify/items')
console.log(res.data);

const productsData: MetalProduct[] = [
  {
    id: 1,
    name: "Арматура ф10 А500С",
    price: 57000,
    inStock: true,
    diameter: "12 мм",
    length: "11.7 м",
    grade: "ГОСТ 5781-82",
    category: "Арматура",
    colorType: "черный",
    imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg",
    suppliers: [
      { name: "Поставщик 1", price: 57000 },
      { name: "Поставщик 2", price: 57500 },
      { name: "Поставщик 3", price: 58000 },
      { name: "Поставщик 4", price: 58500 },
      { name: "Поставщик 5", price: 58500 },
      { name: "Поставщик 6", price: 57000 },
      { name: "Поставщик 7", price: 59000 },
    ],
    quantity: 0,
  },
  {
    id: 2,
    name: "Труба 40x40x3",
    price: 62000,
    inStock: false,
    diameter: "40x40 мм",
    length: "6 м",
    grade: "ГОСТ 30245-2003",
    category: "Труба профильная",
    colorType: "черный",
    imageUrl: "https://evromet.md/xb/vv/uploads/2015/08/3-e1439969588667.jpg",
    suppliers: [{ name: "Поставщик 3", price: 62000 }],
    quantity: 0,
  },
  {
    id: 3,
    name: "Круг 20 мм",
    price: 49000,
    inStock: true,
    diameter: "20 мм",
    length: "6 м",
    grade: "ГОСТ 2590-2006",
    category: "Круг",
    colorType: "черный",
    imageUrl:
      "https://ustinovka46.ru/images/virtuemart/product/21e43265-2ca6-4c36-9936-30130c6535b5.jpg",
    suppliers: [
      { name: "Поставщик 2", price: 49500 },
      { name: "Поставщик 3", price: 49000 },
    ],
    quantity: 0,
  },
  {
    id: 4,
    name: "Арматура ф11 А500С",
    price: 57000,
    inStock: true,
    diameter: "12 мм",
    length: "11.7 м",
    grade: "ГОСТ 5781-82",
    category: "Арматура",
    colorType: "черный",
    imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg",
    suppliers: [
      { name: "Поставщик 1", price: 57000 },
      { name: "Поставщик 2", price: 57500 },
    ],
    quantity: 0,
  },
  {
    id: 5,
    name: "Tруба 50x50x3",
    price: 62000,
    inStock: false,
    diameter: "40x40 мм",
    length: "6 м",
    grade: "ГОСТ 30245-2003",
    category: "Труба профильная",
    colorType: "черный",
    imageUrl: "https://evromet.md/xb/vv/uploads/2015/08/3-e1439969588667.jpg",
    suppliers: [
      { name: "Поставщик 1", price: 57000 },
      { name: "Поставщик 2", price: 57500 },
    ],
    quantity: 0,
  },
  {
    id: 6,
    name: "Круг 30 мм",
    price: 49000,
    inStock: true,
    diameter: "20 мм",
    length: "6 м",
    grade: "ГОСТ 2590-2006",
    category: "Круг",
    colorType: "черный",
    imageUrl: "",
    suppliers: [
      { name: "Поставщик 1", price: 60000 },
      { name: "Поставщик 2", price: 60500 },
    ],
    quantity: 0,
  },
  {
    id: 7,
    name: "Арматура ф12 А500С",
    price: 57000,
    inStock: true,
    diameter: "12 мм",
    length: "11.7 м",
    grade: "ГОСТ 5781-82",
    category: "Арматура",
    colorType: "черный",
    imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg",
    suppliers: [
      { name: "Поставщик 1", price: 57000 },
      { name: "Поставщик 2", price: 57500 },
    ],
    quantity: 0,
  },
  {
    id: 8,
    name: "Tруба 60x50x3",
    price: 62000,
    inStock: false,
    diameter: "40x40 мм",
    length: "6 м",
    grade: "ГОСТ 30245-2003",
    category: "Труба профильная",
    colorType: "черный",
    imageUrl: "https://evromet.md/xb/vv/uploads/2015/08/3-e1439969588667.jpg",
    suppliers: [{ name: "Поставщик 3", price: 62000 }],
    quantity: 0,
  },
  {
    id: 9,
    name: "Круг 40 мм",
    price: 49000,
    inStock: true,
    diameter: "20 мм",
    length: "6 м",
    grade: "ГОСТ 2590-2006",
    category: "Круг",
    colorType: "черный",
    imageUrl: "",
    suppliers: [],
    quantity: 0,
  },
  {
    id: 10,
    name: "Арматура ф12 А500С",
    price: 57000,
    inStock: true,
    diameter: "12 мм",
    length: "11.7 м",
    grade: "ГОСТ 5781-82",
    category: "Арматура",
    colorType: "черный",
    imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg",
    suppliers: [
      { name: "Поставщик 1", price: 57000 },
      { name: "Поставщик 2", price: 57500 },
    ],
    quantity: 0,
  },
  {
    id: 11,
    name: "Труба 40x40x3",
    price: 62000,
    inStock: false,
    diameter: "40x40 мм",
    length: "6 м",
    grade: "ГОСТ 30245-2003",
    category: "Труба профильная",
    colorType: "черный",
    imageUrl: "https://evromet.md/xb/vv/uploads/2015/08/3-e1439969588667.jpg",
    suppliers: [{ name: "Поставщик 3", price: 62000 }],
    quantity: 0,
  },
  {
    id: 12,
    name: "Круг 20 мм",
    price: 49000,
    inStock: true,
    diameter: "20 мм",
    length: "6 м",
    grade: "ГОСТ 2590-2006",
    category: "Круг",
    colorType: "черный",
    imageUrl: "",
    suppliers: [],
    quantity: 0,
  },
];

interface Filters {
  category: string[];
  diameter: string[];
  length: string[];
  grade: string[];
  colorType: ("черный" | "цветной")[];
}

type SortOption = "price" | "name" | "stock";

const uniqueCategories = [...new Set(productsData.map((p) => p.category))];
const uniqueDiameters = [...new Set(productsData.map((p) => p.diameter))];
const uniqueLengths = [...new Set(productsData.map((p) => p.length))];
const uniqueGrades = [...new Set(productsData.map((p) => p.grade))];
const uniqueColorTypes = [...new Set(productsData.map((p) => p.colorType))];

const CatalogPage = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({
    category: [],
    diameter: [],
    length: [],
    grade: [],
    colorType: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [productsDataFetched, setProductsDataFetched] = useState<MetalProduct[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
     !res.data ? setProductsDataFetched([]) : setProductsDataFetched(productsData);
    
  }, []);

  const { theme } = useTheme();
  const currentColors = colors[theme];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const currentValues = prevFilters[name as keyof Filters];
      if (checked) {
        return { ...prevFilters, [name]: [...currentValues, value] };
      } else {
        return {
          ...prevFilters,
          [name]: currentValues.filter((v) => v !== value),
        };
      }
    });
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const sortedAndFilteredProducts = useMemo(() => {
    let currentProducts = productsDataFetched?.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilters = Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) {
          return true;
        }
        return values.some((value: any) => (product as any)[key] === value);
      });
      return matchesSearch && matchesFilters;
    });

    currentProducts.sort((a, b) => {
      if (sortBy === "price") {
        const priceA = a.suppliers && a.suppliers.length > 0 ? Math.min(...a.suppliers.map(s => s.price)) : a.price;
        const priceB = b.suppliers && b.suppliers.length > 0 ? Math.min(...b.suppliers.map(s => s.price)) : b.price;
        return priceA - priceB;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "stock") {
        return (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0);
      }
      return 0;
    });

    return currentProducts;
  }, [productsDataFetched, search, filters, sortBy]);

  const commonPlaceholderProps = {
    placeholder: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
  };

  return (
    <div className={`min-h-screen ${currentColors.primaryBackground} ${currentColors.primaryText}`}>
      <Header onSearchChange={handleSearchChange} searchValue={search} />
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        <Typography
          variant="h4"
          className={`font-bold mb-6 ${currentColors.primaryText}`}
          {...commonPlaceholderProps}
        >
          Каталог товаров
        </Typography>

        <div className="flex">
          <div className={`w-1/4 pr-8 rounded-lg p-4 shadow-md ${currentColors.secondaryBackground}`}>
            <Typography
              variant="h5"
              className={`font-semibold mb-4 ${currentColors.primaryText}`}
              {...commonPlaceholderProps}
            >
              Фильтры
            </Typography>

            <div className="mb-6">
              <ProductSort sortBy={sortBy} onChange={handleSortChange} />
            </div>

            {[
              { title: "Категория", name: "category", options: uniqueCategories },
              { title: "Диаметр", name: "diameter", options: uniqueDiameters },
              { title: "Длина", name: "length", options: uniqueLengths },
              { title: "Марка", name: "grade", options: uniqueGrades },
              { title: "Сплав", name: "colorType", options: uniqueColorTypes },
            ].map((filterGroup) => (
              <div key={filterGroup.name} className="mb-4">
                <Typography
                  variant="h6"
                  className={`font-semibold mb-2 ${currentColors.secondaryText}`}
                  {...commonPlaceholderProps}
                >
                  {filterGroup.title}
                </Typography>
                {filterGroup.options.map((option) => (
                  <div key={option} className="flex items-center mb-1">
                    <Checkbox
                      name={filterGroup.name}
                      value={option}
                      checked={filters[filterGroup.name as keyof Filters].includes(option as any)}
                      onChange={handleCheckboxChange}
                      ripple={false}
                      className={`h-5 w-5 rounded-md border-gray-400 ${currentColors.primaryAccent}`}
                      containerProps={{
                        className: "-ml-2.5",
                      }}
                      crossOrigin={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    />
                    <Typography
                      variant="small"
                      className={`ml-2 ${currentColors.primaryText}`}
                      {...commonPlaceholderProps}
                    >
                      {filterGroup.name === "colorType"
                        ? (option === "черный" ? "Чёрный" : "Цветной")
                        : option}
                    </Typography>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="w-3/4 pl-8">
            <ProductList products={sortedAndFilteredProducts as any} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;