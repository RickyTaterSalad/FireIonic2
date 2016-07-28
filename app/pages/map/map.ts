import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 Generated class for the MapPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
  map:google.maps.Map;

  constructor(private nav:NavController) {
    this.map = null;
    this.loadMap();
  }

  loadMap() {

    let options = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let mapEle = document.getElementById('map');
        this.map = new google.maps.Map(mapEle, mapOptions);
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
        });
      },
      (error) => {
        console.log(error);
      }, options
    );

  }


}
