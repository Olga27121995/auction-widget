import {AuctionFilter} from '../../../models/auction.model';
import {AuctionStatus} from '../../../models/auction-status.enum';
import html from './filter.html';
import styles from './filter.scss';

export class Filter extends HTMLElement {
    private _shadowRoot: ShadowRoot;

    private auctionName: HTMLInputElement = {} as HTMLInputElement;
    private companyName: HTMLInputElement = {} as HTMLInputElement;
    private submit: HTMLButtonElement = {} as HTMLButtonElement;
    private multiSelect: HTMLElement = document.createElement('multi-select');

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    private render(): void {
        this._shadowRoot.innerHTML = html;
        const style = document.createElement('style');
        style.innerText = styles;
        this._shadowRoot.appendChild(style);

        this.auctionName = this._shadowRoot.getElementById('auction_name') as HTMLInputElement;
        this.companyName = this._shadowRoot.getElementById('auction_organizer') as HTMLInputElement;
        this.submit = this._shadowRoot.getElementById('auction_filter-search') as HTMLButtonElement;

        (this._shadowRoot.getElementById('multi-select-wrapper') as HTMLElement).append(this.multiSelect);
        this.updateValuesByAttribute();
        this.eventListener();
    }

    private updateValuesByAttribute(): void {
        const auctionName = this.getAttribute('auctionname');
        if (auctionName) {
            this.auctionName.value = auctionName || '';
        }

        const companyName = this.getAttribute('companyname');
        if (companyName) {
            this.companyName.value = companyName || '';
        }

        const auctionStatuses = this.getAttribute('auctionstatuses');
        if (auctionStatuses) {
            this.multiSelect.setAttribute('options', auctionStatuses);
        }
    }

    private eventListener(): void {
        this.submit.addEventListener('click', () => {
            const options = this.multiSelect.getAttribute('options');
            const formValue: AuctionFilter = {
                auctionName: this.auctionName.value,
                companyName: this.companyName.value,
                auctionStatuses: options?.split(',').map((option) => (option as unknown) as AuctionStatus),
            };
            this.dispatchEvent(new CustomEvent('filterSubmit', { detail: formValue }));
        });
    }

    private attributeChangedCallback(): void {
        this.render();
    }

    public static get observedAttributes(): string[] {
        return ['auctionstatuses', 'auctionname', 'companyname'];
    }
}

export default Filter;
