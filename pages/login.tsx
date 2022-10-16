import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from "../hooks/useAuth"

interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = useState(true)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password)
    } else {
      await signUp(data.email, data.password)
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <div className="bg-black/75 z-50 rounded py-10 px-6 md:mt-0 md:max-w-md md:px-14 mt-24 ">
        <form className="relative space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-4xl font-semibold">
            {login ? "Sign In" : "Sign Up"}
          </h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="email"
                placeholder="Email"
                className={`input ${
                  errors.email && "border-b-2 border-orange-500"
                }`}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className={`input ${
                  errors.password && "border-b-2 border-orange-500"
                }`}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Your password must contain between 4 and 60 characters.
                </p>
              )}
            </label>
          </div>
          {login ? (
            <button
              className="w-full rounded bg-[#E50914] py-3 font-semibold"
              type="submit"
            >
              Sign In
            </button>
          ) : (
            <button
              className="w-full rounded bg-[#E50914] py-3 font-semibold"
              type="submit"
            >
              Sign Up
            </button>
          )}
        </form>
        <div className="text-[gray] mt-5">
          {login ? `New to Netflix? ` : `Already have an account? `}

          {login ? (
            <button
              className="cursor-pointer text-white hover:underline"
              onClick={() => setLogin(false)}
            >
              Sign up now
            </button>
          ) : (
            <button
              className="cursor-pointer text-white hover:underline"
              onClick={() => setLogin(true)}
            >
              Sign in now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
