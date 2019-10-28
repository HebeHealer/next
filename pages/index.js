import React, { Fragment } from "react";
import Link from "next/link";

const Home = () => {
  return (
    <Link href="/user">
      <button>HOME</button>
    </Link>
  );
};

export default Home;
