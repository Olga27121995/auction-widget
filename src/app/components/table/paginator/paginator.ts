import { Config } from '../../../configs/config';
import { PaginatorEvent } from './paginator.enum';
import html from './paginator.html';
import styles from './paginator.scss';
import { PaginatorView } from './paginator-view';

export class Paginator extends HTMLElement {
    private _shadowRoot: ShadowRoot;
    private count = 0;
    private offset = 0;
    private total = 0;
    private btnPrevious: HTMLButtonElement = {} as HTMLButtonElement;
    private btnNext: HTMLButtonElement = {} as HTMLButtonElement;
    private options: HTMLOptionElement = {} as HTMLOptionElement;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    private render(): void {
        this._shadowRoot.innerHTML = html;
        const style = document.createElement('style');
        style.innerText = styles;
        this._shadowRoot.appendChild(style);
        this.btnPrevious = this._shadowRoot.getElementById('auction_paginator_btn-previous') as HTMLButtonElement;
        this.btnNext = this._shadowRoot.getElementById('auction_paginator_btn-next') as HTMLButtonElement;
        this.options = this._shadowRoot.getElementById('auction_paginator-options') as HTMLOptionElement;
        this.buildView();
        this.eventListener();
    }

    private buildView(): void {
        const view = new PaginatorView(this.count, this.offset, this.total);
        const countElement = this._shadowRoot.getElementById('auction_paginator_count');
        if (countElement) {
            countElement.innerHTML = view.getCount();
        }
        const optionsElement = this._shadowRoot.getElementById('auction_paginator-options') as HTMLOptionElement;
        if (optionsElement) {
            const options = Config.auctionOptions.map((value) => view.getOption(String(value)));
            optionsElement.append(...options);
            optionsElement.value = String(this.count);
        }

        this.btnPrevious.disabled = view.isBtnPreviousDisabled();
        this.btnNext.disabled = view.isBtnNextDisabled();
    }

    private updateAttributes(): void {
        this.count = Number(this.getAttribute('count'));
        this.offset = Number(this.getAttribute('offset'));
        this.total = Number(this.getAttribute('total'));
    }

    private eventListener(): void {
        this.btnPrevious.addEventListener('click', () => {
            const offsetCount = this.offset - this.count;
            if (offsetCount >= 0) {
                this.dispatchEvent(new CustomEvent('paginatorChangePage', { detail: PaginatorEvent.Previous }));
            }
        });

        this.btnNext.addEventListener('click', () => {
            const offsetCount = this.offset + this.count;
            if (this.total > offsetCount) {
                this.dispatchEvent(new CustomEvent('paginatorChangePage', {detail: PaginatorEvent.Next}));
            }
        });

        this.options.addEventListener('change', () => {
            this.setAttribute('count', this.options.value);
            this.dispatchEvent(new CustomEvent('paginatorChangeOptions', { detail: this.options.value }));
        });
    }

    private attributeChangedCallback(): void {
        this.updateAttributes();
        this.render();
    }

    public static get observedAttributes(): string[] {
        return ['count', 'offset', 'total'];
    }
}

export default Paginator;
