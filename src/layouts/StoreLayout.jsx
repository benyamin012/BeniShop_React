import { Outlet } from "react-router-dom";
import Header from "../Header";
import FooterPart from "../footer";

export default function StoreLayout() {
  return (
    <>
      <Header />

      <main className="pt-20">
        <Outlet />
      </main>

      <FooterPart />
    </>
  );
}
