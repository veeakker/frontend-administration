import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class UiTypeaheadSelectComponent extends Component {
  @tracked query = '';
  @tracked open = false;

  get records() {
    return this.args.records?.records || [];
  }

  get selectedRecord() {
    const id = this.args.selectedId;
    if (!id) return null;
    return this.records.find((r) => r.id === id);
  }

  get displayValue() {
    if (this.open) return this.query;
    return this.selectedRecord?.label || '';
  }

  get filteredRecords() {
    const q = this.query.toLowerCase().trim();
    if (!q) return this.records;
    return this.records.filter((r) =>
      (r.label || '').toLowerCase().includes(q)
    );
  }

  @action
  onInput(event) {
    this.query = event.target.value;
    this.open = true;
  }

  @action
  onFocus() {
    this.open = true;
    this.query = '';
  }

  @action
  onBlur() {
    setTimeout(() => { this.close(); }, 150);
  }

  @action
  select(id) {
    this.args.onSelect?.(id);
    this.close();
  }

  @action
  clear() {
    this.args.onSelect?.('');
    this.close();
  }

  @action
  close() {
    this.open = false;
    this.query = '';
  }
}
