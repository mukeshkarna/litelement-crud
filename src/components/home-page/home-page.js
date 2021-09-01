import { LitElement, css, html } from 'lit';

class HomePage extends LitElement {
  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <div>
        Home Page
      </div>
    `;
  }
}
customElements.define('home-page', HomePage);
