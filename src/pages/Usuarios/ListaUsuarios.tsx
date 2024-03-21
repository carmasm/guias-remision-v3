import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router';
import { pouchdbService } from '../../pouchdbService';

const ListaUsuarios: React.FC<RouteComponentProps> = ({history}) => {

  const [usuarios, setUsuarios] = useState<any>([]);
  const location = useLocation();

  useEffect(() => {

    pouchdbService.findAllDocumentsByType('Usuarios', 'Nombre', 'asc')
      .then(data => {
        setUsuarios(data)
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, [location.key]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {
            usuarios?.map((usuario: any) => {
              return (
                <IonItem key={usuario._id}>
                  <IonLabel>{usuario.Usuario}</IonLabel>
                  <IonLabel>
                    <h4>{usuario.Nombre} {usuario.Apellido}</h4>
                    <h3>Acopio: {usuario.IdCodigo}</h3>
                    <h3>Correlativos: {usuario.CorrelativosAsignados}</h3>
                  </IonLabel>
                  <IonLabel>{usuario.Rol}</IonLabel>
                  <IonButton onClick={e => {
                    e.preventDefault();
                    // history.push(`/page/usuarios/${usuario.idUsuario}`)
                    history.push({
                      pathname: `/page/usuarios/${usuario._id}`,
                      state: {
                        _id: usuario._id,
                        Nombre: usuario.Nombre,
                        Apellido: usuario.Apellido,
                        Usuario: usuario.Usuario,
                        Contrasena: usuario.Contrasena,
                        CorrelativosAsignados: usuario.CorrelativosAsignados,
                        // acopio: usuario.acopio,
                        Rol: usuario.Rol,
                        Activo: usuario.Activo
                      }
                    })
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

export default ListaUsuarios;