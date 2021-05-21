import { RouteConfig } from '../../../configs/route.config';
import { ColumnName, TableAuction } from '../table-auction.model';
import { TableViewColumns } from './table-view-columns';
import { TableViewRows } from './table-view-rows';

export class TableViewBuilder {
    private viewRows: TableViewRows;
    private viewColumns: TableViewColumns;

    constructor(public shadowRoot: ShadowRoot, private auctions: TableAuction[]) {
        this.viewRows = new TableViewRows(shadowRoot);
        this.viewColumns = new TableViewColumns(shadowRoot);
    }

    public build(): void {
        this.clear();
        if (this.auctions.length === 0) {
            this.viewRows.appendRow(0);
            this.viewRows.appendCell(0, 'По данному запросу аукционы не найдены').td.colSpan = this.viewColumns.columns.length;
        }
        this.auctions.forEach((auction, index) => {
            this.viewRows.appendRow(index);
            this.viewColumns.columns.forEach((column) => {
                if (column === ColumnName.Name) {
                    this.viewRows.appendLinkCell(index, auction[column] || '', `${RouteConfig.schedule}${auction[ColumnName.Id]}`);
                } else {
                    this.viewRows.appendCell(index, auction[column] || '');
                }
            });
        });
        this.viewColumns.appendColumnRow();
        this.viewColumns.columns.forEach((column) => {
            this.viewColumns.setColumns(column);
        });
    }

    private clear(): void {
        const tbody = this.shadowRoot.querySelector('table tbody');
        if (tbody) {
            tbody.innerHTML = '';
        }
        const thead = this.shadowRoot.querySelector('table thead');
        if (thead) {
            thead.innerHTML = '';
        }
    }
}
