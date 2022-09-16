import dynamic from "next/dynamic";

import Layout from "components/Layout";

const WorldMap = dynamic(() => import("components/WorldMap"));
const CardLocalWeather = dynamic(() => import("components/CardLocalWeather"));

const PageComponent = () => {
  return (
    <Layout>
      <h1 className="text-lg font-semibold text-center mb-5">
        World Map - Location of Data Center
      </h1>
      <div className="mb-4 relative">
        <WorldMap />
        <CardLocalWeather />
      </div>
    </Layout>
  );
};

export default PageComponent;
