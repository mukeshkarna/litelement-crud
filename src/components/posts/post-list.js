import { css, html, LitElement } from 'lit';

import '../commons/table-view';

class PostList extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
    };
  }

  static get styles() {
    return [css``];
  }

  constructor() {
    super();

    this.posts = [
      {
        id: 1,
        title: 'Title 1',
        description: 'This is description of post',
      },
      {
        id: 2,
        title: 'Title 2',
        description: 'This is description of post',
      },
      {
        id: 3,
        title: 'Title 3',
        description: 'This is description of post',
      },
    ];
  }

  render() {
    return html`
      <div>
        <h2>Post Lists</h2>
        <div>
          <table-view .posts="${this.posts}"></table-view>
        </div>
      </div>
    `;
  }
}
customElements.define('post-list', PostList);
