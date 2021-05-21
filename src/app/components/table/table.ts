import { AuctionFilter, AuctionResponse } from '../../models/auction.model';
import { AuctionStatus } from '../../models/auction-status.enum';
import { AuctionService } from '../../services/auction.service';
import Filter from './filter/filter';
import Paginator from './paginator/paginator';
import { PaginatorEvent } from './paginator/paginator.enum';
import tableHtml from './table.html';
import styles from './table.scss';
import { TableAuction } from './table-auction.model';
import { TableViewBuilder } from './table-view/table-view-builder';

class Table extends HTMLElement {
    private _shadowRoot: ShadowRoot;
    private paginator: HTMLElement = document.createElement('auction-paginator');
    private filter: HTMLElement = document.createElement('auction-filter');
    private currentFilter: AuctionFilter = { offset: 0, auctionStatuses: [AuctionStatus.Planned, AuctionStatus.InProgress] };

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'closed' });
        this.render();
        this.initAuctionsTable(this.currentFilter);
        this.paginatorListener();
        this.filterListener();
    }

    private initAuctionsTable(filter: AuctionFilter): void {
        void AuctionService.getAuctions(filter).then((auctions) => this.buildAuctionTable(auctions));
    }

    private render(): void {
        this._shadowRoot.innerHTML = tableHtml;
        const style = document.createElement('style');
        style.innerText = styles;
        this._shadowRoot.appendChild(style);
    }

    private buildAuctionTable(response: AuctionResponse): void {
        const tableAuctions = response.entities.map((auction) => new TableAuction(auction));
        new TableViewBuilder(this._shadowRoot, tableAuctions).build();
        this.currentFilter = response.filter;
        this.updatePaginator(response.totalCount);
        this.updateFilter();
    }

    private updatePaginator(totalCount: number): void {
        this.paginator.setAttribute('count', `${this.currentFilter.count}`);
        this.paginator.setAttribute('offset', `${this.currentFilter.offset}`);
        this.paginator.setAttribute('total', `${totalCount}`);
        this._shadowRoot.appendChild(this.paginator);
    }

    private updateFilter(): void {
        this.filter.setAttribute('auctionName', `${this.currentFilter.auctionName || ''}`);
        this.filter.setAttribute('companyName', `${this.currentFilter.companyName || ''}`);
        this.filter.setAttribute('auctionStatuses', `${this.currentFilter.auctionStatuses}`);
        this._shadowRoot.prepend(this.filter);
    }

    private paginatorListener(): void {
        this.paginator.addEventListener('paginatorChangePage', ((event: CustomEvent<PaginatorEvent>) => {
            const offset = Number(this.paginator.getAttribute('offset'));
            const count = Number(this.paginator.getAttribute('count'));

            if (event.detail === PaginatorEvent.Previous) {
                this.initAuctionsTable(this.getNewFilter({ offset: offset - count, count }));
            }

            if (event.detail === PaginatorEvent.Next) {
                this.initAuctionsTable(this.getNewFilter({ offset: offset + count, count }));
            }
        }) as EventListener);

        this.paginator.addEventListener('paginatorChangeOptions', ((event: CustomEvent<number>) => {
            this.initAuctionsTable(this.getNewFilter({ offset: 0, count: event.detail }));
        }) as EventListener);
    }

    private filterListener(): void {
        this.filter.addEventListener('filterSubmit', ((event: CustomEvent<AuctionFilter>) => {
            this.initAuctionsTable(this.getNewFilter(event.detail));
        }) as EventListener);
    }

    private getNewFilter(filter: AuctionFilter): AuctionFilter {
        return Object.assign(this.currentFilter, filter);
    }
}

customElements.define('auction-paginator', Paginator);
customElements.define('auction-filter', Filter);

export default Table;
