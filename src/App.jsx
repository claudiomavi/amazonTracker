import { useState } from "react";
import TabBar from "./components/TabBar";
import Pedidos from "./pages/Pedidos";
import AddPedido from "./pages/AddPedido";

export default function App() {
  const [openAddPedido, setOpenAddPedido] = useState(false);

  return (
    <div className="bg relative flex h-screen w-screen flex-col">
      {openAddPedido && <AddPedido setOpenAddPedido={setOpenAddPedido} />}

      {!openAddPedido && (
        <div>
          <Pedidos setOpenAddPedido={setOpenAddPedido} />
          <TabBar />
        </div>
      )}
    </div>
  );
}
