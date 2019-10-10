import {Injectable} from '@angular/core';
import {HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IssService {
  coordinates = 'http://api.open-notify.org/iss-now.json';
  overPassTime = 'http://api.open-notify.org/iss-pass.json?lat=';
  url: string;

  constructor(private http: HttpClient, private jsonp: HttpClientJsonpModule) {
  }

  getCoordinates(): Observable<any> {
    return this.http.get(this.coordinates);
  }

  getOverPassTime(lat, lon): Observable<any> {
    this.url = (this.overPassTime + lat + '&lon=' + lon + '&n=2');
    return this.http.jsonp(this.url, 'callback');
  }
}
