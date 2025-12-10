import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ValidationAlert from "../../components/ValidationAlert";
import { useFetchSignin } from "../../hooks/useFetchSignin";

const Login: React.FC = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    handleSignin,
    isLoading,
    isSuccess,
    error,
    setError,
    setValidationErrors,
    validationErrors,
  } = useFetchSignin();

  const router = useIonRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setValidationErrors(["Debes completar el reCAPTCHA"]);
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      recaptcha: captchaToken,
    };

    handleSignin(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio de sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" name="email" required />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput type="password" name="password" required />
            </IonItem>

            {/* ⭐ reCAPTCHA aquí */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ReCAPTCHA
                sitekey={import.meta.env.SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            <IonToast
              isOpen={isSuccess}
              position="middle"
              message="Inicio de sesión correcto"
              duration={2000}
            />

            <ValidationAlert
              isOpen={validationErrors.length > 0}
              onDidDismiss={() => setValidationErrors([])}
              header="Corrige los siguientes errores"
              validationErrors={validationErrors}
            />

            <IonAlert
              isOpen={!!error}
              onDidDismiss={() => setError("")}
              header="Error"
              message={error || ""}
              buttons={["Entendido"]}
            />

            <div>
              <IonButton type="submit" expand="block" disabled={isLoading}>
                {isLoading ? <IonSpinner name="crescent" /> : "Iniciar Sesión"}
              </IonButton>
            </div>

            <div>
              <IonButton
                fill="clear"
                color="primary"
                onClick={() => router.push("/register")}
              >
                ¿No tienes cuenta? Regístrate
              </IonButton>
            </div>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
