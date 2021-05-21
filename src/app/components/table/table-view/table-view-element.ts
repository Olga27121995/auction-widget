export class TableViewElement {
    constructor(public shadowRoot: ShadowRoot) {
    }

    public appendBySelector(selector: string, appendSelector: Node): void {
        const element = this.shadowRoot.querySelector(selector);
        if (element) {
            element.appendChild(appendSelector);
        } else  {
            // eslint-disable-next-line no-throw-literal
            throw 'error create table';
        }
    }
}