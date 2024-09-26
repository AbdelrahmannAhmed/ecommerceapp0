import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  async function sendDataToBackend(values) {
    setLoading(false);
    let data = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data);
        setLoading(true);
        if (data.message == "success") navigate("/home");
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(true);
      });
  }

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string()
        .matches(
          /^[A-z][A-Za-z0-9]{6,}$/,
          "Password must start with Capital letter and 7 characters"
        )
        .required(),
    });
    return schema;
  }
  let register = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToBackend(values);
    },
  });

  return (
    <div>
      <div className="w-75 m-auto">
        <h1 className="my-4">Sign in:</h1>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            onBlur={register.handleBlur}
            placeholder="Type your email..."
            onChange={register.handleChange}
            type="email"
            name="email"
            className="form-control mb-3"
            id="email"
          />
          {register.errors.email && register.touched.email ? (
            <div className="alert alert-danger">{register.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={register.handleBlur}
            placeholder="Type your password..."
            onChange={register.handleChange}
            type="password"
            name="password"
            className="form-control mb-3"
            id="password"
          />
          {register.errors.password && register.touched.password ? (
            <div className="alert alert-danger">{register.errors.password}</div>
          ) : (
            ""
          )}

          {error ? <div className="alert alert-danger">{error}</div> : ""}
          <button
            disabled={!(register.dirty && register.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? (
              "Sign in"
            ) : (
              <div className="">
                <BallTriangle
                  height={24}
                  width={58.422}
                  radius={5}
                  color="#fff"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
