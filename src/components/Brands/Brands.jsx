import { useState } from "react"
import axios from "axios"
import { useQuery } from "react-query"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

export default function Brands() {
  const [page, setPage] = useState(1)
  const limit = 16

  function getBrands({ queryKey }) {
    const [_key, { page, limit }] = queryKey
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands?limit=${limit}&page=${page}`)
  }

  let { data, isLoading, isFetching } = useQuery(["getBrands", { page, limit }], getBrands, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: true,
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {" "}
      <Helmet>
        <meta charSet='utf-8' />
        <title>Brands</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className='container py-4'>
        <div className='row gx-3 gy-3'>
          {data?.data?.data?.map((item) => (
            <div className='col-md-3 shadow-lg rounded-3' key={item._id}>
              <div>
                <img src={item.image} className='w-100 rounded-3' alt={item.name} />
              </div>
            </div>
          ))}
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
