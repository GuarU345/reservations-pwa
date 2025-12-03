import { useEffect, useState } from "react";
import { useIsOnline } from "../hooks/useIsOnline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLocalPendings,
  getPendingsCount,
  removeLocalPending,
} from "../services/local/pendings";
import { reservationsService } from "../services/reservations";
import { IonBadge, IonChip, IonIcon, IonSpinner, IonText } from "@ionic/react";
import { cloudOffline, cloudDone, time } from "ionicons/icons";

const IsOnline: React.FC = () => {
  const { isOnline, isLoading: isLoadingStatus } = useIsOnline();
  const [pendingCount, setPendingCount] = useState(0);
  const queryClient = useQueryClient();

  const loadPendingCount = async () => {
    const count = await getPendingsCount();
    setPendingCount(count);
  };

  useEffect(() => {
    loadPendingCount();
  }, []);

  const { mutate, isPending: isSyncing } = useMutation({
    mutationFn: async () => {
      const pendings = await getLocalPendings();

      if (pendings.length === 0) return;

      for (const { id, ...pending } of pendings) {
        try {
          await reservationsService.createReservation(pending);
          await removeLocalPending(id);
        } catch (error) {
          console.error("Error sincronizando reservación:", error);
        }
      }
    },
    onSuccess: async () => {
      await loadPendingCount();
      await queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  useEffect(() => {
    if (isOnline === true && pendingCount > 0) {
      mutate();
    }
  }, [isOnline, pendingCount, mutate]);

  useEffect(() => {
    loadPendingCount();
  }, [isOnline]);

  if (isLoadingStatus) {
    return null;
  }

  return (
    <div
      style={{
        display: isOnline ?? true ? "none" : "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        backgroundColor: isOnline ? "#e8f5e9" : "#ffebee",
        borderBottom: `2px solid ${isOnline ? "#4caf50" : "#f44336"}`,
      }}
    >
      <IonChip color={isOnline ? "success" : "danger"} outline>
        <IonIcon icon={isOnline ? cloudDone : cloudOffline} />
        <IonText style={{ marginLeft: "4px" }}>
          {isOnline ? "En línea" : "Sin conexión"}
        </IonText>
      </IonChip>

      {pendingCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isSyncing ? (
            <>
              <IonSpinner
                name="crescent"
                style={{ width: "16px", height: "16px" }}
              />
              <IonText color="medium">Sincronizando...</IonText>
            </>
          ) : (
            <>
              <IonIcon icon={time} color="warning" />
              <IonText color="warning">
                <strong>{pendingCount}</strong>{" "}
                {pendingCount === 1
                  ? "reservación pendiente"
                  : "reservaciones pendientes"}
              </IonText>
              <IonBadge color="warning">{pendingCount}</IonBadge>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IsOnline;
