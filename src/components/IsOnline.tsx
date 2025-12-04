import { useEffect, useState } from "react";
import { useIsOnline } from "../hooks/useIsOnline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLocalPendings,
  getPendingsCount,
  removeLocalPending,
} from "../services/local/pendings";
import { reservationsService } from "../services/reservations";
import { IonBadge, IonChip, IonIcon, IonSpinner, IonText, useIonToast } from "@ionic/react";
import { cloudOffline, cloudDone, time } from "ionicons/icons";

const IsOnline: React.FC = () => {
  const { isOnline, isLoading: isLoadingStatus } = useIsOnline();
  const queryClient = useQueryClient();
  const [present] = useIonToast()

  const { data: pendingCount = 0, refetch: refetchPendings } = useQuery({
    queryKey: ["localPendingsCount"],
    queryFn: getPendingsCount,
    refetchOnWindowFocus: true,
  });

  const { mutate: syncPendings, isPending: isSyncing } = useMutation({
    mutationFn: async () => {
      const pendings = await getLocalPendings();
      if (pendings.length === 0) return;

      for (const { id, ...pending } of pendings) {
        try {
          await reservationsService.createReservation(pending);
          await removeLocalPending(id);
        } catch (error: any) {
          const errors = error.response?.data?.errors || [];
          let errorMessage = ""
          if (errors.length > 0) {
            const errorMessages = errors.map((err: any) => err.message)
            errorMessage = errorMessages[0]
          } else {
            errorMessage = error.response?.data.message
          }

          presentReservationOfflineErrors(errorMessage)
          await removeLocalPending(id);
        }
      }
    },
    onSuccess: async () => {
      await refetchPendings();
      await queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  const presentReservationOfflineErrors = (errorMessage: string) => {
    present({
      message: `${errorMessage} - asegurate de generar correctamente tu reservación`,
      duration: 2000,
      position: "top"
    })
  }

  useEffect(() => {
    if (isOnline) {
      refetchPendings().then(({ data: count }) => {
        if (count && count > 0) {
          syncPendings();
        }
      });
    }
  }, [isOnline, refetchPendings, syncPendings]);

  if (isLoadingStatus) return null;

  const shouldShow = !isOnline || isSyncing || pendingCount > 0;

  if (!shouldShow) return null;

  return (
    <div
      style={{
        display: isOnline ? "none" : "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        backgroundColor: isOnline ? "#e8f5e9" : "#ffebee",
        borderBottom: `2px solid ${isOnline ? "#4caf50" : "#f44336"}`,
        transition: "all 0.3s ease",
      }}
    >
      <IonChip color={isOnline ? "success" : "danger"} outline>
        <IonIcon icon={isOnline ? cloudDone : cloudOffline} />
        <IonText style={{ marginLeft: "4px" }}>
          {isOnline ? "En línea" : "Sin conexión"}
        </IonText>
      </IonChip>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {isSyncing ? (
          <>
            <IonSpinner name="crescent" style={{ width: "16px", height: "16px" }} />
            <IonText color="medium">Sincronizando...</IonText>
          </>
        ) : pendingCount > 0 ? (
          <>
            <IonIcon icon={time} color="warning" />
            <IonText color="warning">
              <strong>{pendingCount}</strong>{" "}
              {pendingCount === 1 ? "pendiente" : "pendientes"}
            </IonText>
            <IonBadge color="warning">{pendingCount}</IonBadge>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default IsOnline;