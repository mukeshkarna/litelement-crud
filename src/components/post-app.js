import { LitElement, html } from 'lit';

import initRouter from '../router/router';

class PostApp extends LitElement {
  firstUpdated() {
    const el = this.shadowRoot.querySelector('main');

    initRouter(el);
  }

  render() {
    return html` <main></main> `;
  }
}
customElements.define('post-app', PostApp);
