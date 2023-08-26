import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesListComponent } from './components/files-list/files-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    FilesListComponent,
    MenuNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
