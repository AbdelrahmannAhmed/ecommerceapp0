import { useFormik } from "formik"
import React, { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { storeContext } from "../../context/storeContext"
import { BallTriangle } from "react-loader-spinner"

export default function Address() {
  const [dataPay, setDataPay] = useState([])
  const [loading, setLoading] = useState(true)
  let { Id } = useParams()

  let { pay } = useContext(storeContext)
  let navigate = useNavigate()
  async function payOnline(id, values) {
    setLoading(false)
    let data = await pay(id, values)
    setLoading(true)
    setDataPay(data)
    if (data.status === "success") {
      window.location.href = data.session.url
      console.log("Navigating to:", data.session.url)
    } else {
      console.log("Payment failed or something went wrong.")
    }
    console.log(data)
  }

  let register = useFormik({
    initialValues: {
      city: "",
      details: "",
      phone: "",
    },
    onSubmit: (values) => {
      payOnline(Id, values)
    },
  })

  return (
    <>
      <div className='container my-5'>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor='city'>City:</label>
          <input onBlur={register.handleBlur} placeholder='Type your City...' onChange={register.handleChange} type='text' name='city' className='form-control mb-3' id='city' />

          <label htmlFor='details'>Details:</label>
          <input onBlur={register.handleBlur} placeholder='Type details...' onChange={register.handleChange} type='text' name='details' className='form-control mb-3' id='details' />

          <label htmlFor='phone'>Phone:</label>
          <input onBlur={register.handleBlur} placeholder='Type your phone...' onChange={register.handleChange} type='text' name='phone' className='form-control mb-3' id='phone' />

          <button
            onClick={() => {
              return
            }}
            type='submit'
            className='btn bg-main text-white'
          >
            {loading ? (
              "Pay"
            ) : (
              <div className=''>
                <BallTriangle height={24} width={58.422} radius={5} color='#fff' ariaLabel='ball-triangle-loading' wrapperStyle={{}} wrapperClass='' visible={true} />
              </div>
            )}
          </button>
        </form>
      </div>
    </>
  )
}
