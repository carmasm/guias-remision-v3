import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import LoginPage from './pages/Login';
import ConsultarGuiasRemisionPage from './pages/ConsultarGuiasRemision/ConsultarGuiasRemision';
import DocumentosFiscalesPage from './pages/CAI/DocumentosFiscales';
import NuevaGuiaRemisionPage from './pages/NuevaGuiaRemision/NuevaGuiaRemision';
import ListaUsuariosPage from './pages/Usuarios/ListaUsuarios';
import Aprobaciones from './pages/Aprobaciones/Aprobaciones';
import Codigos from './pages/Codigos/Codigos';
import Remitentes from './pages/Remitentes/Remitentes';
import Destinatarios from './pages/Destinatarios/Destinatarios';
import Productores from './pages/Productores/Productores';
import Productos from './pages/Productos/Productos';
import Transportistas from './pages/Transportistas/Transportistas';
import Conductores from './pages/Conductores/Conductores';
import CentrosDeRecoleccion from './pages/CentrosDeRecoleccion/CentrosDeRecoleccion';
import Configuraciones from './pages/Configuraciones/Configuraciones';

setupIonicReact();

const App: React.FC = () => {

  const isLoginPage = window.location.pathname === '/page/login';

  return (
    // <IonApp> // No renderiza después de hacer login, queda en blanco
    //   <IonReactRouter>
    //     {location.pathname !== '/' && ( // Only render IonSplitPane if not on root URL
    //       <IonSplitPane contentId="main">
    //         <Menu />
    //         <IonRouterOutlet id="main">
    //           <Route path="/page/consultar-guias-remision" component={ConsultarGuiasRemisionPage} />
    //         </IonRouterOutlet>
    //       </IonSplitPane>
    //     )}
    //     <Route path="/" exact={true}>
    //       <Redirect to="/page/login" />
    //     </Route>
    //     <Route path="/page/login" component={LoginPage} />
    //     {/* <Route path="/page/:name" exact={true}>
    //           <Page />
    //         </Route> */}
    //   </IonReactRouter>
    // </IonApp>
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            {/* <Redirect exact from="/" to="/page/login" /> // Se muestra el IonSplitPane en la pantalla de login pero mantiene los efectos de transición
            <Route path="/page/login" component={LoginPage} /> */}
            <Route path="/page/consultar-guias-remision" component={ConsultarGuiasRemisionPage} />
            <Route path="/page/cai" component={DocumentosFiscalesPage} />
            <Route path="/page/nueva-guia-remision" component={NuevaGuiaRemisionPage} />
            <Route path="/page/usuarios" component={ListaUsuariosPage} />
            <Route path="/page/aprobaciones" component={Aprobaciones} />
            <Route path="/page/codigos" component={Codigos} />
            <Route path="/page/remitentes" component={Remitentes} />
            <Route path="/page/destinatarios" component={Destinatarios} />
            <Route path="/page/productores" component={Productores} />
            <Route path="/page/productos" component={Productos} />
            <Route path="/page/transportistas" component={Transportistas} />
            <Route path="/page/conductores" component={Conductores} />
            <Route path="/page/centros-rec" component={CentrosDeRecoleccion} />
            <Route path="/page/configuraciones" component={Configuraciones} />
          </IonRouterOutlet>
        </IonSplitPane>
        {/* <Redirect exact from="/" to="/page/login" /> // Al darle refresh regresa al login en lugar de quedarse en la ruta que está
        <Route path="/page/login" component={LoginPage} /> */}
         <Route path="/" exact={true}>
            <Redirect to="/page/login" />
         </Route>
         <Route path="/page/login" component={LoginPage} /> {/* Al estar fuera del IonRouterOutlet se pierde el efecto de transición entre el login y la siguiente URL */}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
