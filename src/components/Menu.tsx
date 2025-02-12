import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline,
         documentText,
         documentTextSharp,
         listCircle,
         listCircleSharp,
         people,
         peopleSharp,
         reader,
         readerSharp,
         archiveSharp,
         bookmarkOutline,
         heartOutline,
         heartSharp,
         mailOutline,
         mailSharp,
         paperPlaneOutline,
         paperPlaneSharp,
         trashOutline,
         trashSharp,
         warningOutline,
         warningSharp,
         logOutOutline,
         logOut,
         logOutSharp, 
         fileTray,
         fileTraySharp,
         locationSharp,
         location,
         checkmarkCircle,
         checkmarkCircleSharp,
         settings,
         settingsSharp} from 'ionicons/icons';
import './Menu.css';

import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';

const handleLogout = async () => {
  try {

    const response = await fetch("https://mocabapi.ddns.net/logout", {
      method: "POST",
      credentials: "include", // Ensures cookies are sent with the request
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

  } catch (error) {
    console.error('Logout error:', error);
  }
};

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Consultar Guías Remisión',
    url: '/page/consultar-guias-remision',
    iosIcon: listCircle,
    mdIcon: listCircleSharp,
  },
  {
    title: 'Nueva Guía Remisión',
    url: '/page/nueva-guia-remision',
    iosIcon: documentText,
    mdIcon: documentTextSharp,
  },
  {
    title: 'Aprobaciones',
    url: '/page/aprobaciones',
    iosIcon: checkmarkCircle,
    mdIcon: checkmarkCircleSharp,
  },
  {
    title: 'Usuarios',
    url: '/page/usuarios',
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: 'Códigos',
    url: '/page/codigos',
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: 'Remitentes',
    url: '/page/remitentes',
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: 'Destinatarios',
    url: '/page/destinatarios',
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: 'Productores',
    url: '/page/productores',
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: 'Productos',
    url: '/page/productos',
    iosIcon: fileTray,
    mdIcon: fileTraySharp,
  },
  {
    title: 'Transportistas',
    url: '/page/transportistas',
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: 'Conductores',
    url: '/page/conductores',
    iosIcon: people,
    mdIcon: peopleSharp,
  },
  {
    title: 'Documentos Fiscales',
    url: '/page/cai',
    iosIcon: reader,
    mdIcon: readerSharp,
  },
  {
    title: 'Centros de Recolección',
    url: '/page/centros-rec',
    iosIcon: location,
    mdIcon: locationSharp,
  },
  {
    title: 'Configuraciones',
    url: '/page/configuraciones',
    iosIcon: settings,
    mdIcon: settingsSharp,
  },
  {
    title: 'Cerrar Sesión',
    url: '/page/login',
    iosIcon: logOut,
    mdIcon: logOutSharp,
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay" className="hide-menu-print">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>MOCAB.NET</IonListHeader>
          <IonNote>servicio.cliente@agroinca.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} 
                         routerLink={appPage.url} 
                         routerDirection="none" 
                         lines="none" 
                         detail={false}
                         onClick={appPage.title === 'Cerrar Sesión' ? handleLogout : undefined}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
