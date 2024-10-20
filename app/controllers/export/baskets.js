import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';

function toDateString(date) {
  if (date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + (month) + "-" + (day);
  } else {
    return null;
  }
}

function download( filename, string, type="text/plain" ) {
  // Not sure if there's a nicer way to do this, but this is a dirty and fun trick.  It only lives in the browser so I'm good with it for now.
  // Based on:
  // - https://stackoverflow.com/questions/57709550/how-to-download-text-from-javascript-variable-on-all-browsers
  // - https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(
    new Blob([string], { type })
  );

  // Use download attribute to set set desired file name
  a.setAttribute("download", filename);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

export default class ExportBasketsController extends Controller {
  @tracked startDate = null;
  @tracked endDate = null;

  get startDateString() {
    return toDateString(this.startDate);
  }
  get endDateString() {
    return toDateString(this.endDate);
  }

  // Easier options for sharing the dates
  get dateOptions() {
    const options = [];
    if (this.startDate)
      options.push(`from=${this.startDate.toISOString()}`);
    if (this.endDate) {
      // We need to extend this with 1 day so we include the selected date
      const nextDay = new Date();
      nextDay.setDate( this.endDate.getDate() + 1 );
      options.push(`to=${nextDay.toISOString()}`);
    }
    return options;
  }

  get dateOptionsQueryString() {
    const options = this.dateOptions;
    return `${options.length > 0 ? "?" : ""}${options.join("&")}`;
  }

  // Fetching of effective data
  @tracked effectiveOrders;

  @action
  async fetchEffectiveOrders() {
    this.effectiveOrders =
      await (
        await fetch(`/export/baskets${this.dateOptionsQueryString}`)
      ).text();

    download(`confirmed-baskets-${toDateString(new Date())}.csv`, this.effectiveOrders);
  }

  @tracked draftOrders;

  @action
  async fetchDraftOrders() {
    const options = this.dateOptions;
    options.push("status=draft");

    this.draftOrders =
      await (
        await fetch(`/export/baskets?${options.join("&")}`)
      ).text();

    download(`draft-baskets-${toDateString(new Date())}.csv`, this.draftOrders);
  }

  @tracked changedBaskets;

  @action
  async fetchChangedBaskets() {
    this.changedBaskets =
      await (
        await fetch(`/export/changed${this.dateOptionsQueryString}`)
      ).text();

    download(`changed-baskets-${toDateString(new Date())}.csv`, this.changedBaskets);
  }
}
