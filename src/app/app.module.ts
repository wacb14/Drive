import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesListComponent } from './components/files-list/files-list.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { SortPipe } from './helpers/pipes/sort.pipe';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

@NgModule({ declarations: [AppComponent, FilesListComponent, MenuNavComponent, SortPipe, ToolBarComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule], providers: [SortPipe, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
