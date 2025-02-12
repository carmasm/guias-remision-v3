import { IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar, useIonLoading } from '@ionic/react';
import React, { useState, useRef, useEffect, useContext } from 'react';
// import axios from "axios";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
// import { UserContext } from '../../UserContext';

function validateEmail(email: string) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const Login: React.FC = () => {
  const history = useHistory();

  // const [userName, setUserName] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [loginData, setLoginData] = useState({
    userName: null,
    password: null,
  })

  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const splitPaneRef = useRef<HTMLIonSplitPaneElement>(null);
  const [present, dismiss] = useIonLoading();

  // const [user, setUser] = useContext(UserContext);

  // const [user, setUser] = useContext(UserContext);

  // useEffect(() => {
  //     splitPaneRef = document.getElementById("main");
  //   }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    console.log(name, value);
    setLoginData({
      ...loginData,
      [name]: value
    });
  }


  const handleLogin = async () => {

    if (!loginData.userName || !loginData.password) {
      setMessage("Ingrese usuario y contraseña");
      setIserror(true);
      return;
    }

    // const loginData = {
    //     "idUsuario": 0,
    //     "codigo": userName,
    //     "nombre": "string",
    //     "contrasena": password,
    //     "rol": "string",
    //     "activo": true
    // }

    try {
      present('Iniciando sesión...');

      const email = `${loginData.userName}@gplanet.com`
      debugger

      // Call your ASP.NET Core endpoint
      const response = await fetch("https://mocabapi.ddns.net/login?useCookies=true&useSessionCookies=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: loginData.password
        }),
        credentials: "include" // Required for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Authentication failed");
      }

      dismiss();
      history.push("/page/consultar-guias-remision");

    } catch (error) {
      debugger
      console.error('Authentication error:', error)
      setMessage((error as Error).message);
      setIserror(true);
      // IonToast()
      dismiss();
    }

  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                //   header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3">
              <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3">
              <IonItem>
                {/* <IonLabel position="floating">Usuario</IonLabel> */}
                <IonInput
                  label="Usuario"
                  labelPlacement="floating"
                  type="email"
                  value={loginData.userName}
                  onIonInput={(e) => handleInputChange(e)}
                  name="userName"
                >
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3">
              <IonItem>
                {/* <IonLabel position="floating">Contraseña</IonLabel> */}
                <IonInput
                  label="Contraseña"
                  labelPlacement="floating"
                  type="password"
                  value={loginData.password}
                  onIonInput={(e) => handleInputChange(e)}
                  name="password"
                >
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3">
              <p style={{ fontSize: "small" }}>
                Al hacer clic en LOGIN aceptas nuestra <a href="#">Política de Privacidad</a>
              </p>
              <IonButton expand="block" onClick={() => { handleLogin(); }}>
                Login
              </IonButton>
              <p style={{ fontSize: "medium" }}>
                ¿Aún no tienes cuenta? <a href="#">Solicita una</a>
              </p>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Login);