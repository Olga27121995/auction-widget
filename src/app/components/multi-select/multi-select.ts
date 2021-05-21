import {AuctionStatus, statusTranslate} from '../../models/auction-status.enum';
import html from './multi-select.html';
import styles from './multi-select.scss';

export class MultiSelect extends HTMLElement {
    private _shadowRoot: ShadowRoot;
    private multiselect: HTMLElement = {} as HTMLElement;
    private multiselectOptions: HTMLElement = {} as HTMLElement;
    private overlay: HTMLElement = {} as HTMLElement;
    private statusElements: HTMLInputElement[] = [];
    private pickValues:HTMLElement = {} as HTMLElement;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    private render(): void {
        this._shadowRoot.innerHTML = html;
        const style = document.createElement('style');
        style.innerText = styles;
        this._shadowRoot.appendChild(style);

        this.multiselect = this._shadowRoot.getElementById('multi-select') as HTMLElement;
        this.multiselectOptions = this._shadowRoot.getElementById('multi-select-options') as HTMLElement;
        this.overlay = this._shadowRoot.getElementById('overlay') as HTMLElement;
        this.pickValues = this._shadowRoot.getElementById('pick-values') as HTMLElement;
        this.statusElements = [
            this._shadowRoot.getElementById('auction_status_0') as HTMLInputElement,
            this._shadowRoot.getElementById('auction_status_1') as HTMLInputElement,
            this._shadowRoot.getElementById('auction_status_2') as HTMLInputElement
        ];

        this.updateValuesByAttribute();
        this.updatePickValues();
        this.eventListener();
    }

    private updateValuesByAttribute(): void {
        const auctionStatuses = this.getAttribute('options');
        if (auctionStatuses) {
            auctionStatuses.split(',').forEach(el => {
                this.statusElements[el].checked = true;
            });
        } else {
            this.statusElements.forEach(el => el.checked = true);
        }
    }

    private updatePickValues(): void {
        const auctionStatuses = this.getAttribute('options');
        if (auctionStatuses) {
            this.pickValues.innerText = auctionStatuses.split(',')
                .reduce((prev, curr) => `${prev ? prev + ',' : ''} ${statusTranslate[curr]}`, '');
        } else {
            this.statusElements.forEach(el => el.checked = true);
            this.pickValues.innerText = [AuctionStatus.Planned, AuctionStatus.InProgress, AuctionStatus.Ended]
                .reduce((prev, curr) => `${prev ? prev + ',' : ''} ${statusTranslate[curr]}`, '');
        }
    }

    private eventListener(): void {
        this.multiselect.addEventListener('click', () => {
            if (this.multiselect.classList.contains('active')) {
                this.multiselect.classList.remove('active');
                this.setAttribute('options', this.getOptionsValue().toString());
            } else {
                this.multiselect.classList.add('active');
            }
        });

        this.multiselectOptions.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    private getOptionsValue(): AuctionStatus[] {
        const statuses: AuctionStatus[] = [];

        this.statusElements.forEach((element, index) => {
            if (element.checked) {
                statuses.push(index);
            }
        });

        return statuses;
    }

    private attributeChangedCallback(): void {
        this.render();
    }

    public static get observedAttributes(): string[] {
        return ['options'];
    }
}

export default MultiSelect;
