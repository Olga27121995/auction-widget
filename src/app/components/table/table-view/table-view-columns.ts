import {ColumnName} from '../table-auction.model';
import {TableViewElement} from './table-view-element';

export class TableViewColumns extends TableViewElement {
    public columns = [
        ColumnName.Id,
        ColumnName.Name,
        ColumnName.StartTime,
        ColumnName.EndTime,
        ColumnName.CompanyName,
        ColumnName.IsAuction,
        ColumnName.IsOpen,
        ColumnName.Status
    ];

    constructor(public shadowRoot: ShadowRoot) {
        super(shadowRoot);
    }

    public appendColumnRow(): void {
        const tr = document.createElement('tr');
        tr.className = 'column-row';
        this.appendBySelector('table thead', tr);
    }

    public setColumns(column: ColumnName): void {
        const td = document.createElement('td');
        const span = document.createElement('span');
        span.className = 'column-value';
        span.innerText = this.columnsTranslates[column];
        td.append(span);
        this.appendBySelector('.column-row', td);
    }

    public get columnsTranslates(): Record<ColumnName, string> {
        return {
            [ColumnName.Id]: 'Номер аукциона',
            [ColumnName.Name]: 'Название аукциона',
            [ColumnName.StartTime]: 'Дата начала аукциона',
            [ColumnName.EndTime]: 'Дата завершения аукциона',
            [ColumnName.CompanyName]: 'Наименование организатора',
            [ColumnName.IsAuction]: 'Аукцион на повышение',
            [ColumnName.IsOpen]: 'Доступ',
            [ColumnName.Status]: 'Статус'
        };
    }
}
