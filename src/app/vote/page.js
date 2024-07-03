"use client";

import Head from "next/head";
import { getCurrentVoting, addVote } from "../services/Web3Service";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

export default function Vote() {

    const DEFAULT_OPTION = { name: "Loading...", image: "https://images.unsplash.com/photo-1591772504183-7e2c6490cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlc3NvYXxlbnwwfHwwfHx8MA%3D%3D" }

    const [message, setMessage] = useState("")
    const [voting, setVoting] = useState({ maxDate: Date.now() })
    const [option1, setOption1] = useState(DEFAULT_OPTION)
    const [option2, setOption2] = useState(DEFAULT_OPTION)
    const [showVotes, setShowVotes] = useState(0)



    useEffect(() => {
        if (!localStorage.getItem("wallet")) return push("/")


        getCurrentVoting().then(voting => {
            console.log(voting);
            setVoting(voting)
            setOption1(getOption(voting.option1))
            setOption2(getOption(voting.option2))
        }).catch(err => {
            console.log(err);
            setMessage(err.message)
        })

    }, [])

    function getOption(option) {
        switch (option) {
            case "Alguem": return { name: "Alguem ", image: "https://plus.unsplash.com/premium_photo-1674777843203-da3ebb9fbca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVzc29hfGVufDB8fDB8fHww" };
            case "Eu": return { name: "Eu ", image: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlc3NvYXxlbnwwfHwwfHx8MA%3D%3D" };
            default: return DEFAULT_OPTION;
        }
    }

    function btnVoting2Click() {
        setMessage("Connecting...")
        addVote(2).then(() => {
            setShowVotes(2)
            setMessage("Resultados parciais sujeito a alterações...")
        }).catch(err => {
            alert(err)
            setMessage(err.message)
        })
    }

    function btnVoting1Click() {
        setMessage("Connecting...")
        addVote(1).then(() => {
            setShowVotes(1)
            setMessage("Resultados parciais sujeito a alterações...")
        }).catch(err => {
            alert(err)
            setMessage(err.message)
        })
    }

    return (
        <>
            <Head>
                <title>Webbb3 | Votação</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=devide-width, initial-scale=1" />
            </Head>
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row align-items-center">
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 ,b-3">Webbb3</h1>
                    <p className="lead">Votação on-chain</p>
                    {
                        voting.maxDate > (Date.now() / 1000)
                            ? <p className="lead mb-3">Você tem ate {new Date(Number(voting.maxDate) * 1000).toString()} para dar seu voto</p>
                            : <p className="lead mb-3">votação encerrada</p>
                    }
                </div>
                <div className="row flex-lg--row-reverse align-items-center g1 py-5">
                    <div className="col-1">

                    </div>
                    <div className="col-5">
                        <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                            {voting.option2}
                        </h3>
                        <img src={option2.image} className="d-block mx-auto img-fluid rounded" width={250} height={250} />
                        {

                            showVotes > 0 || voting.maxDate < (Date.now() / 1000)
                                ? <button className="btn btn-secondary p-3 my-2 d-block mx-auto" style={{ width: 250 }} disabled={true}>{showVotes === 2 ? Number(voting.votes2) + 1 : Number(voting.votes2)} votos</button>
                                : <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={btnVoting2Click}>Votar</button>
                        }
                    </div>
                    <div className="col-5">
                        <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                            {voting.option1}
                        </h3>
                        <img src={option1.image} className="d-block mx-auto img-fluid rounded" width={250} height={250} />
                        {

                            showVotes > 0 || voting.maxDate < (Date.now() / 1000)
                                ? <button className="btn btn-secondary p-3 my-2 d-block mx-auto" style={{ width: 250 }} disabled={true}>{showVotes === 1 ? Number(voting.votes1) + 1 : Number(voting.votes1)} votos</button>
                                : <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={btnVoting1Click}>Votar</button>
                        }
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
