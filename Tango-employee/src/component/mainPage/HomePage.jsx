import React from "react";
import HomeSidebar from "./HomeSidebar";
import UpperNavMain from "./UpperNavMain";
import FooterMainlower from "./FooterMainlower";

const HomePage = () => {
  return (
    <div>
      <main className="">
        <div>
          <UpperNavMain />
        </div>
        <div>
          <HomeSidebar />
        </div>
        {/* <div>
          <FooterMainlower />
        </div> */}
      </main>
    </div>
  );
};

export default HomePage;
