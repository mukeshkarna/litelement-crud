import { css, html, LitElement } from 'lit';

import '@polymer/paper-card/paper-card';

class LandingPage extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return [
      css`
        .main-wrapper,
        paper-card {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  render() {
    return html` <div class="main-wrapper">
      <paper-card>
        <div class="menu-wrapper">
          <a href="/home">Home</a>
          <a href="/post">Posts</a>
        </div>
        <div>
          <slot></slot>
        </div>
      </paper-card>
    </div>`;
  }
}

customElements.define('landing-page', LandingPage);
