import { IonAvatar, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router';
import { pouchdbService } from '../../pouchdbService';
import { add } from 'ionicons/icons';

const Codigos: React.FC<RouteComponentProps> = ({ history }) => {

  const [codigos, setCodigos] = useState<any>([]);
  const location = useLocation();

  useEffect(() => {

    if (location.pathname === '/page/codigos') {
      pouchdbService.findAllDocumentsByCollectionSorted('Codigos', 'NombreCorto', 'asc')
        .then(data => {
          setCodigos(data)
          console.log(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

  }, [location.key]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Códigos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {
            codigos?.map((codigo: any) => {
              return (
                <IonItem key={codigo._id}>
                  <IonAvatar slot="start"><img src="user-96.png" /></IonAvatar>
                  <IonLabel>{codigo.RTN}</IonLabel>
                  <IonLabel>
                    <h4>{codigo.NombreCorto}</h4>
                    <h3>Teléfono: {codigo.Telefono}</h3>
                    <h3>Email: {codigo.Email}</h3>
                  </IonLabel>
                  <IonLabel>{codigo.Activo}</IonLabel>
                  <IonButton onClick={e => {
                    e.preventDefault();
                    // history.push(`/page/codigos/${codigo.idUsuario}`)
                    // history.push({
                    //   pathname: `/page/codigos/${codigo._id}`,
                    //   state: {
                    //     _id: codigo._id,
                    //     _rev: codigo._rev,
                    //     IdCodigo: codigo.IdCodigo,
                    //     Nombre: codigo.Nombre,
                    //     Apellido: codigo.Apellido,
                    //     Usuario: codigo.Usuario,
                    //     Contrasena: codigo.Contrasena,
                    //     CContrasena: codigo.CContrasena,
                    //     CorrelativosAsignados: codigo.CorrelativosAsignados,
                    //     Rol: codigo.Rol,
                    //     Activo: codigo.Activo
                    //   }
                    // })
                  }}>
                    <IonLabel>Ver</IonLabel>
                  </IonButton>
                </IonItem>
              );
            })
          }
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            {/* <IonRouterLink routerDirection="forward" routerLink={`/item/${item.id}`}> */}
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonTitle>Footer</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Codigos;