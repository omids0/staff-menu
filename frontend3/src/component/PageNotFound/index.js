import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";

function PageNotFound() {
  return (
    <Layout>
      <div className="flex flex-col">
        <img
          className="mx-auto max-h-[50vh]"
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="page-not-found"
        />
        <h1 className="mx-auto text-6xl text-gray-500 mb-4">!404</h1>
        <p className="mx-auto">...Page Not Found</p>
        <Link className="mx-auto text-blue-500" to="/">
          Go Home
        </Link>
      </div>
    </Layout>
  );
}

export default PageNotFound;
