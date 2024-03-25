import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToggle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router';
import { pouchdbService } from '../../pouchdbService';

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const DetalleUsuario: React.FC<UserDetailPageProps> = ({ match, history }) => {

    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [toast, setToast] = useState(false);

    const [userData, setUserData] = useState({
        _id: null,
        _rev: null,
        IdCodigo: null,
        Nombre: null,
        Apellido: null,
        Usuario: null,
        Contrasena: null,
        CContrasena: null,
        CorrelativosAsignados: null,
        CorrelativosDisponibles: 150,
        Rol: null,
        Activo: null,
        Collection: 'Usuarios'
    });

    const location = useLocation<any>();

    useEffect(() => {

        // debugger
        if (location.state != undefined) {

            //¡¡ REEMPLAZAR TODAS LAS PROPIEDADES POR UN SPREAD OPERATOR !! ??
            setUserData({
                _id: location.state._id,
                _rev: location.state._rev,
                IdCodigo: location.state.idCodigo,
                Nombre: location.state.Nombre,
                Apellido: location.state.Apellido,
                Usuario: location.state.Usuario,
                Contrasena: location.state.Contrasena,
                CContrasena: location.state.CContrasena,
                CorrelativosAsignados: location.state.CorrelativosAsignados,
                CorrelativosDisponibles: 150,
                Rol: location.state.Rol,
                Activo: location.state.Activo,
                Collection: 'Usuarios'
            });

            debugger
        }

    }, []);

    function handleSaveUser() {
        if (userData._id === null) {

            console.log('Saving new user...');

            const gmt6Date = new Date().toLocaleString('en-US', { timeZone: 'America/Guatemala' });
            const fechaTransaccion = new Date(gmt6Date).toISOString(); //REALMENTE ES NECESARIO CONVERTIR LA FECHA A FORMATO ISO????

            const newUser = {
                ...userData,
                 FechaTransaccion: fechaTransaccion
            }

            debugger

            pouchdbService.addDocument(newUser)
                .then(() => {
                    setToast(true);
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {

            if (!userData) return;

            console.log('Updating user...');

            const gmt6Date = new Date().toLocaleString('en-US', { timeZone: 'America/Guatemala' });
            const fechaTransaccion = new Date(gmt6Date).toISOString(); //REALMENTE ES NECESARIO CONVERTIR LA FECHA A FORMATO ISO????

            const updatedUser = {
                ...userData,
                 FechaTransaccion: fechaTransaccion
            }

            debugger

            pouchdbService.updateDocument(updatedUser)
                .then(() => {
                    setToast(true);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }

    function handleInputChange(propertyName: string, value: any) {
        setUserData(prevUserData => ({
            ...prevUserData,
            [propertyName]: value
        }));
    }

    const toastOnDidDismiss = () => {
        setToast(false)

        setUserData({
            _id: null,
            _rev: null,
            IdCodigo: null,
            Nombre: null,
            Apellido: null,
            Usuario: null,
            Contrasena: null,
            CContrasena: null,
            CorrelativosAsignados: null,
            CorrelativosDisponibles: 0,
            Rol: null,
            Activo: null,
            Collection: 'Usuarios'
        });
        
        // history.goBack();
        history.push("/page/usuarios");
    }

    const handleUpdateUser = () => {

    }

    return (
        <IonPage>
            <IonToast isOpen={toast} onDidDismiss={toastOnDidDismiss} message="¡Hecho!" duration={2000} color={'success'} />
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
                            <IonInput label="Nombre" labelPlacement="stacked"
                                onIonChange={e => handleInputChange('Nombre', e.detail.value!)} value={userData.Nombre} />
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput label="Apellido" labelPlacement="stacked"
                                onIonChange={e => handleInputChange('Apellido', e.detail.value!)} value={userData.Apellido} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput label="Usuario" labelPlacement="stacked"
                                onIonChange={e => handleInputChange('Usuario', e.detail.value!)} value={userData.Usuario} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput label="Contraseña" labelPlacement="stacked" type='password'
                                onIonChange={e => handleInputChange('Contrasena', e.detail.value!)} value={userData.Contrasena} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput label="Confirmar Contraseña" labelPlacement="stacked" type='password'
                                onIonChange={e => handleInputChange('CContrasena', e.detail.value!)} value={userData.CContrasena} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput label="Correlativos Asignados" labelPlacement="stacked"
                                onIonChange={e => handleInputChange('CorrelativosAsignados', e.detail.value!)} value={userData.CorrelativosAsignados} />
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput label="Correlativos Disponibles" labelPlacement="stacked"
                                onIonChange={e => handleInputChange('CorrelativosDisponibles', e.detail.value!)} disabled={true} value={userData.CorrelativosDisponibles} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonSelect label="Rol" interface='popover' value={userData.Rol} onIonChange={e => handleInputChange('Rol', e.detail.value!)}>
                                <IonSelectOption>Administrador</IonSelectOption>
                                <IonSelectOption>Limitado</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput label="Acopio" labelPlacement="stacked" onIonChange={e => handleInputChange('IdCodigo', e.detail.value!)} value={userData.IdCodigo} />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonToggle slot='start' color='success' checked={userData.Activo || false} onIonChange={e => handleInputChange('Activo', e.detail.checked!)}>Activo</IonToggle>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand='block' onClick={handleSaveUser}>Salvar</IonButton>
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