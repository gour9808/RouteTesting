import {Injectable} from '@angular/core';

const url = 'https://maps.google.com/maps/api/js?key=AIzaSyCDAXGspOuqxMX_Ek1Idz5_Yamag1vog4o&libraries=places,drawing,geometry&callback=__onGoogleLoaded';
// tslint:disable-next-line:prefer-const
let marker_scripts = [
  'https://cdnjs.cloudflare.com/ajax/libs/marker-animate-unobtrusive/0.2.8/vendor/markerAnimate.js',
  'https://cdnjs.cloudflare.com/ajax/libs/marker-animate-unobtrusive/0.2.8/SlidingMarker.min.js'
]
@Injectable()
export class MapLoaderService {

  private static promise;

  public static load() {
    // First time 'load' is called?
    if (!MapLoaderService.promise) {

      // Make promise to load
      MapLoaderService.promise = new Promise(resolve => {
        console.log('Resolved');
        // Set callback for when google maps is loaded.
        window['__onGoogleLoaded'] = (ev) => {
          console.log('Maps Ready');
          resolve('google maps api loaded');
        };

        const node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return MapLoaderService.promise;
  }
}

function loadScripts(resolve, scripts) {
  const scriptUrl = scripts.shift();
  const node = document.createElement('script');
  node.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(node);
  node.onload = (script) => {
    console.log(script + ' loaded!');
    if (scripts.length) {
      loadScripts(resolve, scripts);
    } else {
      window['SlidingMarker'].initializeGlobally();
      console.log('run app');
      resolve('google maps api loaded');
    }
  }
  node.src = scriptUrl;
}
