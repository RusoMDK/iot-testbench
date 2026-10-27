import { Component } from '@angular/core';

interface ModuleLink {
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  readonly modules: ModuleLink[] = [
    { title: 'Dispositivos', description: 'Alta y gestión de los dispositivos físicos bajo prueba.', route: '/devices/list-device' },
    { title: 'Sensores', description: 'Sensores asociados a cada dispositivo y sus tipos de lectura.', route: '/sensors/list-sensors' },
    { title: 'Escenarios', description: 'Escenarios de prueba que agrupan dispositivos y condiciones.', route: '/escenary/list-escenary' },
    { title: 'Datos', description: 'Lecturas recibidas por MQTT y almacenadas en PostgreSQL.', route: '/data' },
    { title: 'Gráficas', description: 'Visualización de las lecturas por día y por tipo de parámetro.', route: '/charts' },
    { title: 'Usuarios', description: 'Gestión de usuarios y roles de acceso.', route: '/user/list-user' },
  ];
}
