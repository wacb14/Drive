import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesListComponent } from './components/files-list/files-list.component';

const routes: Routes = [{ path: '', component: FilesListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
