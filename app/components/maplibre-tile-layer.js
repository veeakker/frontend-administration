import 'maplibre-gl/dist/maplibre-gl.css';
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import TileLayer from 'ember-leaflet/components/tile-layer';

export default class MaplibreTileLayerComponent extends TileLayer {
  leafletRequiredOptions = [];

  // Positron is the Carto light vector base.
  baseStyle = 'https://tiles.openfreemap.org/styles/positron';

  createLayer() {
    return maplibreGL({
      style: this.baseStyle,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
  }
}
