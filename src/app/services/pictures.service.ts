import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  private _url = "../assets/sample.json"
  constructor(private _http: HttpClient) { }

  getPictures() {
    return this._http.get(this._url);
  }
}
