import index from './index.html';

class HelloWorld extends HTMLElement {

    connectedCallback() {
        this.innerHTML = index;
    }

}

customElements.define('hello-world', HelloWorld);