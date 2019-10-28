import React, { Fragment } from "react";
import Link from "next/link";

import fetch from 'isomorphic-unfetch';

const Home = () => {
  return (
    <Link href="/user">
      <button>HOME</button>
    </Link>
  );
};

Home.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const result = await res.json();
  console.log(`this is data ${ JSON.stringify(result) }`);
  return {
    result
  };
}

export default Home;
