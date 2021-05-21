export class PaginatorView {
    constructor(private count: number, private offset: number, private total: number) {
    }

    public getCount(): string {
        const offsetCount = this.offset + this.count;
        return `${this.offset + 1} - ${this.total >= offsetCount ? offsetCount : this.total } из ${this.total}`;
    }

    public getOption(value: string): HTMLOptionElement {
        const option = document.createElement('option');
        option.value = option.innerText = value;
        return option;
    }

    public isBtnPreviousDisabled(): boolean {
        return this.offset <= 0;
    }

    public isBtnNextDisabled(): boolean {
        const offsetCount = this.offset + this.count;
        return offsetCount >= this.total;
    }
}
