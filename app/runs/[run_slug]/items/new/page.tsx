import NewItemForm from "./form";
// const NewItemForm = dynamic(() => import("./form"), { ssr: false });

export default function NewItemPage() {
  return <NewItemForm />;
}
