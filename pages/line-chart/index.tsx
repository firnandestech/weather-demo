import { Fragment } from 'react'
import dynamic from "next/dynamic";

import Layout from "components/Layout";

const Line = dynamic(() => import("components/Line"));

const PageComponent = () => {
  return (
    <Layout>
          <Fragment>
            <section className="content">
              <div className="container mx-auto">
                <h1 className="text-lg font-semibold text-center mb-5">
                  Temperature History in San Francisco
                </h1>
                <div className="mb-4">
              
                  <Line />
                </div>
              </div>
            </section>
          </Fragment>
    </Layout>
  )
};

export default PageComponent;
