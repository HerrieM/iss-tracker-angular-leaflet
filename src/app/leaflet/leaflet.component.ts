import {Component, OnInit} from '@angular/core';
import {IssService} from '../iss.service';

declare let L;

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css']
})
export class LeafletComponent implements OnInit {
  private mapLeaflet;
  private issMarker;
  private mapLayer;
  private issIcon = L.icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/124/124542.svg',
    iconSize: [15, 15],
    iconAnchor: [13, 0]
  });
  private polyline;
  private date;
  private overhead: string;
  private popup = L.popup();
  private errorOverPass = false;

  createMap() {
    this.mapLeaflet = L.map('map').setView([51.4920157, 5.1332294], 13);
    this.mapLeaflet.on('click', e => {
      this.addClickedMarker(e.latlng.lat, e.latlng.lng);
    });
  }

  getOverPassTime(lat, lon) {
    this.issService.getOverPassTime(lat, lon)
      .subscribe(data => {
          data.response.forEach(d => {
            this.date = new Date(d.risetime * 1000);
          });
        },
        // Fix me -> the error message toggle is shown with one click delay
        error => {
          console.log(error),
            this.errorOverPass = true;
        }
      );
    return this.date;
  }

  addClickedMarker(lat, lon) {
    this.overhead = this.getOverPassTime(lat, lon).toString();
    this.popup.setLatLng([lat, lon]);
    if (this.errorOverPass) {
      this.popup.setContent('The ISS will not pass at this location');
      this.errorOverPass = false;
    } else {
      this.popup.setContent('The ISS will pass at coordinates: lat: ' + lat + ' lon: ' + lon + ' at the following date: ' + this.overhead);
    }
    this.popup.openOn(this.mapLeaflet);
  }

  removeISSMarker() {
    this.mapLeaflet.removeLayer(this.issMarker);
  }

  addMapLayer() {
    this.mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapLeaflet);
  }

  createISSMarker(lat, lon) {
    this.issMarker = new L.Marker([lat, lon], {
      icon: this.issIcon
    }).addTo(this.mapLeaflet);
    this.issMarker.setLatLng([lat, lon]);
    this.mapLeaflet.panTo([lat, lon]);
  }

  drawISS(latOld, lonOld, latNew, lonNew) {
    this.polyline = L.polyline(
      [[latOld, lonOld],
        [latNew, lonNew]]
    ).addTo(this.mapLeaflet);
  }

  constructor(private issService: IssService) {
  }

  ngOnInit() {
  }
}
