import { useState } from "react";
import TabBar from "./components/TabBar";
import Pedidos from "./pages/Pedidos";
import AddPedido from "./pages/AddPedido";
import Stats from "./pages/Stats";

export default function App() {
  const [openAddPedido, setOpenAddPedido] = useState(false);
  const [showPedidosPage, setShowPedidosPage] = useState(true);

  return (
    <div className="bg relative flex h-screen w-screen flex-col">
      {openAddPedido && <AddPedido setOpenAddPedido={setOpenAddPedido} />}

      {!openAddPedido && (
        <div className="flex-1 overflow-y-auto">
          {showPedidosPage ? (
            <Pedidos setOpenAddPedido={setOpenAddPedido} />
          ) : (
            <Stats />
          )}
          <TabBar
            showPedidosPage={showPedidosPage}
            setShowPedidosPage={setShowPedidosPage}
          />
        </div>
      )}
    </div>
  );
}
