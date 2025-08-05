import { useMutation, useQuery } from "convex/react";
import normalizeAmount from "../../utils/normalizeAmount";
import {
  AddCircle,
  CardOutline,
  CreateOutline,
  ReturnDownBack,
  WalletOutline,
} from "react-ionicons";
import { api } from "../../convex/_generated/api";
import PedidosHeader from "../components/PedidosHeader";
import { useState } from "react";
import { ClimbingBoxLoader, GridLoader } from "react-spinners";
import RefundModal from "../components/RefundModal";
import ReturnModal from "../components/ReturnModal";
import PedidoForm from "../components/PedidoFrom";

export default function Pedidos({ setOpenAddPedido }) {
  const [activeFilter, setActiveFilter] = useState("pendientes");
  const [showModify, setShowModify] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [wasReturned, setWasReturned] = useState(false);
  const [wasRefunded, setWasRefunded] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [refundDate, setRefundDate] = useState("");

  const pedidos = useQuery(api.pedidos.getPedidos);
  const updatePedido = useMutation(api.pedidos.updatePedido);

  function getReturnButtonColor(pedido) {
    if (pedido.returned) return "bg-success";

    const deadline = new Date(pedido.returnDeadline);

    if (deadline <= in7Days) return "bg-danger";

    return "bg-primary";
  }

  const today = new Date();
  const in7Days = new Date();
  in7Days.setDate(today.getDate() + 7);

  const filteredPedidos = pedidos?.filter((pedido) => {
    const returnDate = new Date(pedido.returnDeadline);

    switch (activeFilter) {
      case "pendientes":
        return returnDate > in7Days && !pedido.returned;
      case "proximos":
        return returnDate >= today && returnDate <= in7Days;
      case "devueltos":
        return pedido.returned && !pedido.refundReceived;
      case "reembolsados":
        return pedido.refundReceived;
      default:
        return true;
    }
  });

  const handleModifyPedido = async (modifiedPedido) => {
    const { amount, paymentType } = modifiedPedido;
    let cuotas = 1;

    if (paymentType === "amazon4") cuotas = 4;
    else if (paymentType === "klarna3") cuotas = 3;

    const normalized = normalizeAmount(amount);
    const valor = normalized && cuotas ? normalized / cuotas : 0;

    await updatePedido({
      id: modifiedPedido._id,
      updates: {
        productname: modifiedPedido.productname,
        amount: normalized,
        deliveryDate: modifiedPedido.deliveryDate,
        returnDeadline: modifiedPedido.returnDeadline,
        paymentType: modifiedPedido.paymentType,
        installmentValue: Number(valor.toFixed(2)),
        notes: modifiedPedido.notes,
      },
    });
    setShowModify(false);
    setSelectedPedido(null);
  };

  return (
    <div>
      <PedidosHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {pedidos === undefined && (
        <div className="text-muted flex h-[50vh] w-full flex-col items-center justify-center">
          <ClimbingBoxLoader loading color="#fff" className="opacity-40" />
          <p>Cargando...</p>
        </div>
      )}
      {pedidos !== undefined && filteredPedidos?.length === 0 && (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 p-7">
          <GridLoader
            loading
            color="#fff"
            className="blur-xs absolute opacity-40"
          />
          <p className="text text-center text-sm">
            No se han encontrado pedidos con el filtro seleccionado
          </p>
        </div>
      )}

      <div className="bg mt-12 flex h-screen w-full flex-col gap-7">
        {pedidos &&
          filteredPedidos.map((pedido) => (
            <div
              key={pedido._id}
              className="bg-light outline-border mx-7 flex flex-col gap-2 rounded-2xl p-4 outline-1"
            >
              <div className="flex w-full justify-between text-lg font-bold">
                <div className="flex gap-2">
                  <p className="text">{pedido.productname}</p>
                  <CreateOutline
                    width="20px"
                    className="text-muted fill-muted hover:fill-white hover:text-white"
                    onClick={() => {
                      setShowModify(true);
                      setSelectedPedido(pedido);
                    }}
                  />
                </div>
                <p className="text-secondary">{pedido.installmentValue}€</p>
              </div>
              <p className="text-muted text-sm">
                Entrega: {pedido.deliveryDate}
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedPedido(pedido);
                    setWasReturned(pedido.returned);
                    setReturnDate(pedido.returnDate);
                    setShowReturnModal(true);
                  }}
                  className={`${getReturnButtonColor(pedido)} text flex items-center justify-center gap-2 rounded-2xl px-2 py-0.5 text-sm`}
                >
                  <ReturnDownBack width="12px" />
                  {pedido.returnDeadline}
                </button>
                <button
                  onClick={() => {
                    setSelectedPedido(pedido);
                    setWasRefunded(pedido.refundReceived);
                    setRefundDate(pedido.returnDate);
                    setShowRefundModal(true);
                  }}
                  className={`${pedido.refundReceived ? "bg-success" : "bg-danger"} text flex items-center justify-center gap-2 rounded-2xl px-2 py-0.5 text-sm`}
                >
                  <WalletOutline width="12px" />
                  {pedido.refundReceived ? "Si" : "No"}
                </button>
                <button className="bg-secondary text flex items-center justify-center gap-2 rounded-2xl px-2 py-0.5 text-sm">
                  <CardOutline width="12px" />
                  {pedido.paymentType.slice(0, 1).toUpperCase() +
                    pedido.paymentType.slice(1)}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* BOTÓN PARA AÑADIR NUEVO PEDIDO */}
      <div className="fixed bottom-32 right-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white">
        <AddCircle
          onClick={() => setOpenAddPedido(true)}
          color="oklch(0.76 0.1 280)"
          width="60px"
        />
      </div>

      {/* MODALES PARA MARCAR DEVOLUCIÓN O REEMBOLSO */}
      {showReturnModal && selectedPedido && (
        <ReturnModal
          wasReturned={wasReturned}
          setWasReturned={setWasReturned}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          setShowReturnModal={setShowReturnModal}
          updatePedido={updatePedido}
          selectedPedido={selectedPedido}
          setSelectedPedido={setSelectedPedido}
        />
      )}
      {showRefundModal && selectedPedido && (
        <RefundModal
          wasRefunded={wasRefunded}
          setWasRefunded={setWasRefunded}
          refundDate={refundDate}
          setRefundDate={setRefundDate}
          setShowRefundModal={setShowRefundModal}
          updatePedido={updatePedido}
          selectedPedido={selectedPedido}
          setSelectedPedido={setSelectedPedido}
        />
      )}
      {/* MODAL PARA MODIFICAR PEDIDO */}
      {showModify && selectedPedido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <PedidoForm
            pedido={{
              ...selectedPedido,
              amount: selectedPedido.amount?.toString() || "",
            }}
            setPedido={setSelectedPedido}
            action={() => handleModifyPedido(selectedPedido)}
            buttonText="Modificar"
            eliminate
          />
        </div>
      )}
    </div>
  );
}
