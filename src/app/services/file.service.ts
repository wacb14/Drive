import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  updatePath = new EventEmitter<string>();
  updateFilesList = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  GetFolderContent(folderPath: string): Observable<any> {
    if (folderPath == '') folderPath = 'root';
    return this.http.get<any>(
      environment.apiURL + '/File/GetFolderContent?folderPath=' + folderPath
    );
  }

  PostFile(fileInfo: FormData): Observable<any> {
    if (fileInfo.get('folderPath') == '') fileInfo.set('folderPath', 'root');
    return this.http.post<any>(environment.apiURL + '/File/PostFile', fileInfo);
  }

  DeleteFile(id: number): Observable<number> {
    return this.http.delete<number>(
      environment.apiURL + '/File/DeleteFile?id=' + id
    );
  }
}
