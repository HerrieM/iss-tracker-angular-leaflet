import {Component, OnInit} from '@angular/core';
import {LeafletComponent} from '../leaflet/leaflet.component';
import {IssService} from '../iss.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private leaflet = new LeafletComponent(this.issService);
  private lat: number;
  private lon: number;
  private latArray: Array<number> = [];
  private lonArray: Array<number> = [];
  private i = 0;
  private drawing = false;

  createMap() {
    this.leaflet.createMap();
    this.leaflet.addMapLayer();
  }

  showISS(lat, lon) {
    if (this.drawing === true) {
      this.leaflet.removeISSMarker();
    } else if (this.drawing === false) {
      this.drawing = true;
    }
    this.leaflet.createISSMarker(lat, lon);
    if (this.i !== 0) {
      this.leaflet.drawISS(this.latArray[this.i - 1], this.lonArray[this.i - 1], this.latArray[this.i], this.lonArray[this.i]);
    }
  }

  getCoordinates() {
    return this.issService.getCoordinates();
  }

  showCoordinates() {
    this.getCoordinates()
      .subscribe(res => {
          this.lat = parseFloat(res.iss_position.latitude),
            this.lon = parseFloat(res.iss_position.longitude),
            this.fillCoordinatesArray(),
            this.showISS(this.lat, this.lon),
            console.log('i: ' + this.i + ' lat: ' + this.lat + ' lon: ' + this.lon),
            this.i++;
        },
        error => (console.log(error)));
    setTimeout(() => this.showCoordinates(), 5000);
  }

  fillCoordinatesArray() {
    this.latArray.push(this.lat);
    this.lonArray.push(this.lon);
    if (this.lonArray[this.i] < this.lonArray[this.i - 1]) {
      this.latArray = [];
      this.lonArray = [];
      this.latArray[0] = this.lat;
      this.lonArray[0] = this.lon;
      this.i = 0;
    }
  }

  constructor(private issService: IssService) {
  }

  ngOnInit() {
    this.createMap();
    this.showCoordinates();
  }
}
