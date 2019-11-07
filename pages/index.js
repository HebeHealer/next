import React, { Fragment } from "react";
import Link from "next/link";
import './index.styl';

import fetch from 'isomorphic-unfetch';

class Home extends React.Component{
  static async getInitialProps() {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    const result = await res.json();
    console.log(`this is data ${ JSON.stringify(result) }`);
    return {
      result
    };
  }
  
  clickIntoView() {
    document.getElementById('test').scrollIntoView();
  }

  render() {
    return (
      <div>
        <Link href="/user">
          <button>HOME</button>
        </Link>
        <button onClick={this.clickIntoView}>点击scroll</button>
        <p id="test">描述scrollIntoView</p>
      </div>
    );
  }
}

export default Home;
