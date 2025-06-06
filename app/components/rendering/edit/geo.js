import { set, action, get } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { trackedFunction } from 'reactiveweb/function';

export default class RenderingEditGeoComponent extends Component {
  asyncGeoCoordinate = trackedFunction(this, () => get( this.args.resource, this.args.property ));

  get centerLocation() {
    return this.hasGeo
      ? this.geo
      : { latitude: 50.8796, longitude: 4.7021 };
  }

  get hasGeo() {
    return this.geo && this.geo.latitude && this.geo.longitude;
  }

  get zoom() {
    return this.hasGeo ? 15 : 8;
  }

  get geo() {
    return this.asyncGeoCoordinate?.value;
  }

  get markerLocation() {
    if (this.hasGeo)
      return [ this.geo.latitude, this.geo.longitude ];
    else
      return undefined;
  }

  @service store;

  @action
  async updateLocation(data) {
    // we don't have to wait for the geo-coordinate to be fetched
    // because the map is not show before.
    const geo = this.geo || this.store.createRecord('geo-coordinate');
    geo.latitude = data.latlng.lat;
    geo.longitude = data.latlng.lng;
    set( this.args.resource, this.args.property, geo );
  }
}
