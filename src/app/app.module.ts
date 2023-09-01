import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesListComponent } from './components/files-list/files-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { SortPipe } from './helpers/pipes/sort.pipe';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

@NgModule({
  declarations: [AppComponent, FilesListComponent, MenuNavComponent, SortPipe, ToolBarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [SortPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
