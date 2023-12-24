import { ReactNode } from "react";
import NavBar from "../../components/NavBar";

interface Props {
  children?: ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default MainLayout;
