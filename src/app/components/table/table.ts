import tableHtml from "./table.html";
// @ts-ignore
import styles from "./table.scss";


class Table extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.innerHTML = tableHtml;
        let style = document.createElement("style");
        style.innerText = styles;
        shadowRoot.appendChild(style)
    }
}

customElements.define('auction-table', Table);

export default Table;
