import { TableViewElement } from './table-view-element';

export class TableViewRows extends TableViewElement {
  constructor(public shadowRoot: ShadowRoot) {
    super(shadowRoot);
  }

  public appendRow(index: number): void {
    const tr = document.createElement('tr');
    tr.id = this.getRowIndex(index);
    this.appendBySelector('table tbody', tr);
  }

  public appendCell(index: number, value: string): {td: HTMLTableCellElement, span: HTMLElement} {
    const {td, span} = this.createCell();
    span.innerText = value;
    this.appendBySelector('#' + this.getRowIndex(index), td);
    return {td, span};
  }

  public appendLinkCell(index: number, value: string, link: string): void {
    const {td, span} = this.createCell();
    const a = document.createElement('a');
    a.className = 'cell-value-link';
    a.href = link;
    a.innerText = value;
    a.target = '_blank';
    span.append(a);
    this.appendBySelector('#' + this.getRowIndex(index), td);
  }

  private createCell(): {td: HTMLTableCellElement, span: HTMLElement} {
    const td = document.createElement('td');
    const span = document.createElement('span');
    span.className = 'cell-value';
    td.append(span);
    return {td, span};
  }

  private getRowIndex(index: number): string {
    return `auction-table-${index}`;
  }
}
