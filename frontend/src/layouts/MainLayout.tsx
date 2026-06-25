import type { ReactNode } from "react";

import Navbar
from "../components/Navbar";

interface Props {
  children: ReactNode;
}

function MainLayout({
  children
}: Props) {

  return (
    <div>

      <Navbar />

      <div
        style={{
          padding: "20px",
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default MainLayout;