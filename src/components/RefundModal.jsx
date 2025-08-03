import React from "react";

export default function RefundModal({
  wasRefunded,
  setWasRefunded,
  refundDate,
  setRefundDate,
  setShowRefundModal,
  updatePedido,
  selectedPedido,
  setSelectedPedido,
}) {
  return (
    <div className="bg/10 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="text bg outline-border flex w-80 flex-col items-center justify-center gap-8 rounded-2xl p-4 outline-1">
        <h2 className="text-lg font-bold">Marcar como reembolsado</h2>

        <div className="flex items-center justify-around gap-4">
          <label>¿Se ha reembolsado?</label>
          <input
            type="checkbox"
            checked={wasRefunded}
            onChange={(e) => setWasRefunded(e.target.checked)}
          />
        </div>

        <div className="flex flex-col items-center justify-around gap-4">
          <label>Fecha de devolución:</label>
          <input
            type="date"
            value={refundDate}
            onChange={(e) => setRefundDate(e.target.value)}
            className="bg-light outline-border w-full rounded-2xl px-4 py-2 outline-1"
          />
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <button
            onClick={() => setShowRefundModal(false)}
            className="bg-muted rounded-2xl px-4 py-2"
          >
            Cancelar
          </button>

          <button
            onClick={async () => {
              try {
                await updatePedido({
                  id: selectedPedido._id,
                  updates: {
                    refundReceived: wasRefunded,
                    refundCheckDate: refundDate,
                  },
                });
                setShowRefundModal(false);
                setSelectedPedido(null);
              } catch (error) {
                alert("Error actualizando pedido: " + error.message);
              }
            }}
            className="bg-primary rounded-2xl px-4 py-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
