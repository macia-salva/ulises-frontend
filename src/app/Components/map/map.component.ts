//Link important per angular
// https://medium.com/techno101/google-maps-javascript-api-with-angular-10-dea03ba95153

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
//  center: google.maps.LatLngLiteral = {lat: 39.527981, lng: 2.5076097};

  constructor() { }

  ngOnInit(): void {
    if (document.getElementById('map')) {
      console.log("Map loading");
      let mapDOM:HTMLElement=document.getElementById('map') as HTMLElement;
      console.log(mapDOM);
/*      let map = new google.maps.Map(mapDOM, {
        center: this.center,
        zoom: 18
      });*/
  }
  }

}
