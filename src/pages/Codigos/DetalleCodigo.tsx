import { IonAlert, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonInput, IonItem, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToggle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router';
import { pouchdbService } from '../../pouchdbService';

interface CodeDetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const DetalleCodigo: React.FC<CodeDetailPageProps> = ({ match, history }) => {

    const [codeData, setCodeData] = useState<any>([]);
    const [toast, setToast] = useState(false);

    const location = useLocation<any>();


    useEffect(() => {

        // debugger
        if (location.state && location.state.codigo) {

            console.count('useEffect detalle codigo count');
            
            setCodeData(location.state.codigo);
        }

    }, [location.state]);



    const toastOnDidDismiss = () => {
        setToast(false)

        setCodeData({});

        // history.goBack();
        history.push("/page/codigos");
    }

    function handleInputChange(propertyName: string, value: any) {
        setCodeData((prevUserData: any) => ({
            ...prevUserData,
            [propertyName]: value
        }));
    }

    function handleSaveCode() {
        if (!codeData._id) {

            console.log('Saving new code...');

            const gmt6Date = new Date().toLocaleString('en-US', { timeZone: 'America/Guatemala' });
            const fechaTransaccion = new Date(gmt6Date).toISOString(); //REALMENTE ES NECESARIO CONVERTIR LA FECHA A FORMATO ISO????

            const newCode = {
                ...codeData,
                FechaTransaccion: fechaTransaccion,
                DeviceInfo: navigator.userAgent,
                Collection: 'Codigos'
            }

            debugger

            pouchdbService.addDocument(newCode)
                .then(() => {
                    setToast(true);
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {

            if (!codeData) return;

            console.log('Updating code...');

            const gmt6Date = new Date().toLocaleString('en-US', { timeZone: 'America/Guatemala' });
            const fechaTransaccion = new Date(gmt6Date).toISOString(); //REALMENTE ES NECESARIO CONVERTIR LA FECHA A FORMATO ISO????

            const updatedCode = {
                ...codeData,
                FechaTransaccion: fechaTransaccion,
                DeviceInfo: navigator.userAgent,
            }

            debugger

            pouchdbService.updateDocument(updatedCode)
                .then(() => {
                    setToast(true);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    };


    return (
        <IonPage>
            <IonToast isOpen={toast} onDidDismiss={toastOnDidDismiss} message="¡Hecho!" duration={2000} color={'success'} />
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/page/codigos' />
                    </IonButtons>
                    <IonTitle>Registrar</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        Información General
                    </IonCardHeader>

                    <IonCardContent>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonInput label="Nombre Corto" labelPlacement="stacked"
                                        onIonChange={e => handleInputChange('NombreCorto', e.detail.value!)} value={codeData.NombreCorto} />
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonInput label="Nombre Largo" labelPlacement="stacked"
                                        onIonChange={e => handleInputChange('NombreLargo', e.detail.value!)} value={codeData.NombreLargo} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonInput label="Direccion 1" labelPlacement="stacked"
                                        onIonChange={e => handleInputChange('Direccion1', e.detail.value!)} value={codeData.Direccion1} />
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonInput label="Direccion 2" labelPlacement="stacked"
                                        onIonChange={e => handleInputChange('Direccion2', e.detail.value!)} value={codeData.Direccion2} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonInput label="RTN" labelPlacement="stacked"
                                        onIonChange={e => handleInputChange('RTN', e.detail.value!)} value={codeData.RTN} />
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonInput label="Email" labelPlacement="stacked"
                                        onIonChange={e => handleInputChange('Email', e.detail.value!)} value={codeData.Email} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonInput label="Teléfono" labelPlacement="stacked"
                                        onIonChange={e => handleInputChange('Telefono', e.detail.value!)} value={codeData.Telefono} />
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonToggle slot='start' color='success' checked={codeData.Activo || false} onIonChange={e => handleInputChange('Activo', e.detail.checked!)}>Activo</IonToggle>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>

                <IonRow>
                    <IonCol>
                        <IonButton expand='block' id="present-alert3">Salvar</IonButton>
                    </IonCol>
                </IonRow>

                <IonAlert
                    // header="Alert!"
                    message="¿Está seguro que desea salvar los datos?"
                    trigger="present-alert3"
                    buttons={[
                        {
                            text: 'No',
                            role: 'cancel',
                        },
                        {
                            text: 'Si',
                            role: 'confirm',
                            handler: handleSaveCode,
                        },
                    ]}
                // onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
                ></IonAlert>
            </IonContent>
        </IonPage>
    );
};

export default DetalleCodigo;