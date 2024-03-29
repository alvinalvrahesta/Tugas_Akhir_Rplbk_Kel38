import { useContext, useEffect, useState } from "react";
import { FetchingContext, ProductStateContext } from "../App";
import ProductCard from "./ProductCard";
import "./Sorter.css";

const Sorter = () => {
  const [sortBy, setSortBy] = useState("title"); //Modul 4 (React Hooks - UseState Hook)
  const [order, setOrder] = useState("asc");
  const isFetching = useContext(FetchingContext); //Modul 4 (React Hooks - UseContext Hook)
  const productState = useContext(ProductStateContext);
  const [sortedProducts, setSortedProducts] = useState(
    productState.selectedProducts
  );

  useEffect(() => { //Modul 4 (React Hooks - UseEffect Hook)
    const sorter = (a, b) => {
      if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1; //Set ASC
      if (a[sortBy] > b[sortBy]) return order === "asc" ? 1 : -1; //Set DESC
      return 0;
    };

    const newSortedProducts = productState.selectedProducts.sort(sorter);
    setSortedProducts([...newSortedProducts]);
  }, [sortBy, order, productState.selectedProducts]);

  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };
  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  return (
    <div>
      <h3>Urut Berdasarkan:</h3>
      <select onChange={handleChangeSort}>
        <option value="title">Nama</option>
        <option value="price">Harga</option>
      </select>
      <select onChange={handleChangeOrder}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      {isFetching && <p>Loading...</p>}
      <div>
        <div className="grid-container">
          {sortedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sorter;
