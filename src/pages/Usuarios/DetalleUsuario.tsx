import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router';

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const DetalleUsuario: React.FC<UserDetailPageProps> = ({ match, history }) => {

    const [idUsuario, setIdUsuario] = useState(0);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [cContrasena, setcContrasena] = useState('');
    const [correlativosAsignados, setCorrelativosAsignados] = useState(0);
    const [correlativosDisponibles, setCorrelativosDisponibles] = useState(150);
    const [rol, setRol] = useState<string>();
    const [acopio, setAcopio] = useState('');
    const [activo, setActivo] = useState(true);
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const location = useLocation<any>();

    useEffect(() => {

        if (location.state != undefined) {
            setIdUsuario(location.state._id);
            setNombre(location.state.Nombre);
            setApellido(location.state.Apellido);
            setUsuario(location.state.Usuario);
            setContrasena(location.state.Contrasena);
            setcContrasena(location.state.Contrasena);
            setCorrelativosAsignados(location.state.CorrelativosAsignados);
            // setAcopio(location.state.acopio);
            setRol(location.state.Rol);
            setActivo(location.state.Activo);
        }

    }, []);

    function handleSaveNewUser() {

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/page/usuarios' />
                    </IonButtons>
                    <IonTitle>Registrar</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {/* <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Usuarios</IonTitle>
                </IonToolbar>
                </IonHeader> */}
                {/* <IonAlert
                    isOpen={iserror}
                    onDidDismiss={() => setIserror(false)}
                    cssClass="my-custom-class"
                    header={"Error!"}
                    message={message}
                    buttons={["Dismiss"]}
                /> */}
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Nombre</IonLabel>
                            <IonInput onIonChange={e => setNombre(e.detail.value!)} value={nombre} />
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Apellido</IonLabel>
                            <IonInput onIonChange={e => setApellido(e.detail.value!)} value={apellido} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Usuario</IonLabel>
                            <IonInput onIonChange={e => setUsuario(e.detail.value!)} value={usuario} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Contraseña</IonLabel>
                            <IonInput type='password' onIonChange={e => setContrasena(e.detail.value!)} value={contrasena} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Confirmar Contraseña</IonLabel>
                            <IonInput type='password' onIonChange={e => setcContrasena(e.detail.value!)} value={cContrasena} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Correlativos Asignados</IonLabel>
                            <IonInput onIonChange={e => setCorrelativosAsignados(parseInt(e.detail.value!))} value={correlativosAsignados} />
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Correlativos Disponibles</IonLabel>
                            <IonInput onIonChange={e => setCorrelativosDisponibles(parseInt(e.detail.value!))} disabled={true} value={correlativosDisponibles} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Rol</IonLabel>
                            <IonSelect interface='popover' value={rol} onIonChange={e => setRol(e.detail.value)}>
                                <IonSelectOption>ADMINISTRADOR</IonSelectOption>
                                <IonSelectOption>LIMITADO</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Acopio</IonLabel>
                            <IonInput onIonChange={e => setAcopio(e.detail.value!)} value={acopio} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel>Activo</IonLabel>
                            <IonToggle slot='end' color='success' checked={activo} onIonChange={e => setActivo(e.detail.checked)}></IonToggle>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand='block' onClick={handleSaveNewUser}>Salvar</IonButton>
                    </IonCol>
                </IonRow>
                {/* <IonToast
                    isOpen={showToast}
                    onDidDismiss={toastOnDidDismiss}
                    message="Hecho"
                    duration={3000}
                    color='success'
                    position={'middle'}
                    cssClass={'custom-toast'}
                /> */}
            </IonContent>
        </IonPage>
    );
};

export default DetalleUsuario;