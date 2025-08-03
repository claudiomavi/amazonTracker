import { useState } from "react";
import TabBar from "./components/TabBar";
import AddPedido from "./pages/AddPedido";
import { AddCircle } from "react-ionicons";

export default function App() {
  const [openAddPedido, setOpenAddPedido] = useState(false);

  return (
    <div className="bg relative flex h-[812px] w-[375px] flex-col">
      <div className="absolute bottom-32 right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white">
        <AddCircle
          onClick={() => setOpenAddPedido(true)}
          color="oklch(0.76 0.1 280)"
          width="60px"
        />
      </div>

      {openAddPedido && <AddPedido setOpenAddPedido={setOpenAddPedido} />}

      <TabBar />
    </div>
  );
}
