import axios from "axios"
import React, { useState } from "react"
import { useQuery } from "react-query"
import Loading from "../Loading/Loading"
import Product from "../Product/Product"
import { Helmet } from "react-helmet"

export default function Products() {
  const [page, setPage] = useState(1)
  const limit = 10

  function getProducts({ queryKey }) {
    const [_key, { page, limit }] = queryKey
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${page}`)
  }

  let { data, isError, isLoading, isFetching } = useQuery(["getProducts", { page, limit }], getProducts, {
    // cacheTime: 3000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: true, // علشان ميحصلش reloading لما تغير الصفحة
    // refetchInterval: 1000,
  })
  // console.log("isLoading" + isLoading);
  // console.log("isFetching" + isFetching);
  // console.log(data?.data.data);

  // const [Load, setLoad] = useState(true);
  // const [products, setProducts] = useState([]);
  // async function getProducts() {
  //   let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   setProducts(data.data);
  //   console.log(data.data);
  //   setLoad(false);
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <>
      <div className='container my-5'>
        <div className='row'>
          {data?.data.data.map((item) => {
            return <Product item={item} key={item._id}></Product>
          })}
        </div>
        {/* Pagination controls */}
        <div className='d-flex justify-content-between align-items-center mt-4'>
          <button className='btn btn-light' onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1 || isFetching}>
            Previous
          </button>
          <span>Page {page}</span>
          <button className='btn btn-light' onClick={() => setPage((prev) => prev + 1)} disabled={data?.data?.data.length < limit || isFetching}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}
