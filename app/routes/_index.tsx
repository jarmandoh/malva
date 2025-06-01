import type { MetaFunction } from "@remix-run/node";
import BannerMain from "~/components/BannerMain/BannerMain";
import ProductSlider from "~/components/ProductSlider/ProductSlider";

export const meta: MetaFunction = () => {
  return [
    { title: "Malva" },
    { name: "description", content: "Welcome to Malva!" },
  ];
};

export default function Index() {
  return (
    <>
    <BannerMain />
    <ProductSlider />
    </>
  );
}

