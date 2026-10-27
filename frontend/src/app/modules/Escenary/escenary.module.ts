import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './Components/breadcrumb/breadcrumb/breadcrumb.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterPanelComponent } from './Components/filter-panel/filter-panel.component';
import { EscenaryRoutingModule } from './escenary-routing.module';
import { EscenaryComponent } from './Components/escenary.component';
import { AddEditEscenaryComponent } from './Components/add-edit-escenary/add-edit-escenary.component';
import { EscenaryListComponent } from './Components/escenary-list/escenary-list.component';
import { TableEscenaryComponent } from './Components/table-escenary/table-escenary.component';
@NgModule({
  declarations: [FilterPanelComponent,BreadcrumbComponent,EscenaryComponent,AddEditEscenaryComponent,TableEscenaryComponent,EscenaryListComponent],
  imports: [CommonModule,SharedModule,EscenaryRoutingModule],
})
export class EscenaryModule {}