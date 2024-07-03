"use client";

import Head from "next/head";
import { doLogin } from "./services/Web3Service";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Home() {

  const [message, setMessage] = useState("")

  const { push } = useRouter("");


  function btnLoginClick() {
    doLogin().then(account => push("/vote")).catch(err => {
      alert(err.message)
    })
  }

  return (
    <>
      <Head>
        <title>Webbb3 | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=devide-width, initial-scale=1" />
      </Head>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="https://plus.unsplash.com/premium_photo-1681084014855-464052e0a379?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmlnJTIwYnJvdGhlciUyMGJyYXNpbHxlbnwwfHwwfHx8MA%3D%3D" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 ,b-3">Webbb3</h1>
            <p className="lead">Votação on-chain</p>
            <p className="lead">Autentique sua carteira e faça sua votação</p>
            <div className="d-grip gap-2 d-md-flex justify-content-md-start">
              <button type="button" onClick={btnLoginClick} className="btn btn-primary btn-lg px-4 me-md-2">
                <img src="/metamask.jpg" width={64} className="me-3" />
                Conectar com a MetaMask
              </button>
            </div>
            <p className="message">
              {message}
            </p>
          </div>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">
            &copy; 2024 Webbb3, Inc</p>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">Home</a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link px-2 text-body-secondary">About</a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
