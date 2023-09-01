import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesListComponent } from './components/files-list/files-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { SortPipe } from './helpers/pipes/sort.pipe';

@NgModule({
  declarations: [AppComponent, FilesListComponent, MenuNavComponent, SortPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [SortPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
