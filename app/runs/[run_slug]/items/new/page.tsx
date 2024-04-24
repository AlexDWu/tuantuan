import dynamic from "next/dynamic";

const NewItemPage = dynamic(() => import("./form"), { ssr: false });

export default NewItemPage;
