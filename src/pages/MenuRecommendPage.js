import React from "react";
import MenuRecommendOption from "../components/menu/MenuRecommendOption";
import MenuRecommendTitle from "../components/menu/MenuRecommendTitle";
import Header2 from "../components/layouts/Header2";

const MenuRecommendPage = () => {
  return (
    <div>
      <Header2 />
      <MenuRecommendTitle />
      <MenuRecommendOption />
    </div>
  );
};

export default MenuRecommendPage;
