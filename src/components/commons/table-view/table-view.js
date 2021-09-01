import { LitElement, html, css } from 'lit';

import '@polymer/paper-input/paper-input';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-button/paper-button';

export class TableView extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
      operation: { type: String },
      selectedItem: { type: Object },
      item: { type: Object },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        table {
          border: 1px solid black;
        }

        thead td {
          font-weight: 600;
        }

        tbody tr td:last-child {
          display: flex;
          flex-direction: row;
          margin: 0px 12px;
        }

        .mr {
          margin-right: 12px;
        }

        .dflex {
          display: flex;
          flex-direction: column;
        }
        .input-container {
          margin: 4px 4px;
        }

        paper-dialog {
          width: 500px;
        }

        .edit-button {
          background-color: green;
          color: white;
        }

        .delete-button {
          background-color: red;
          color: white;
        }

        .add-button {
          background-color: blue;
          color: white;
        }

        .ml-auto {
          margin-left: auto;
        }
      `,
    ];
  }

  constructor() {
    super();

    this.operation = 'Add';

    this.item = {};
    this.selectedItem = {};

    this.toggleDialog = this.toggleDialog.bind(this);
    this.setItemValue = this.setItemValue.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.onAcceptBtnClick = this.onAcceptBtnClick.bind(this);
  }

  renderAddButton() {
    return html`<div class="ml-auto" @click="${() => this.toggleDialog()}">
      <paper-button raised class="add-button">Add</paper-button>
    </div>`;
  }

  toggleDialog(item) {
    if (item) {
      this.operation = 'Edit';
      this.selectedItem = item;
    } else {
      this.operation = 'Add';
    }
    this.shadowRoot.querySelector('paper-dialog').open();
  }

  onAcceptBtnClick() {
    if (this.operation === 'Add') {
      this.item = { id: this.posts.length + 1, ...this.item };
      this.posts = [...this.posts, this.item];
    } else {
      this.posts = this.posts.map((post) => {
        if (post.id === this.selectedItem.id) {
          return this.selectedItem;
        }
        return post;
      });
    }
  }

  closeDialog() {
    this.shadowRoot.querySelector('paper-dialog').close();
    this.selectedItem = {};
  }

  openAddEditDialog() {
    return html`<paper-dialog>
      <h2>${this.operation} Post</h2>
      <div class="input-container">
        <paper-input
          label="Title"
          @input="${(event) => this.setItemValue('title', event.target.value)}"
          value="${this.selectedItem.title || ''}"
        ></paper-input>
        <paper-input
          label="Description"
          value="${this.selectedItem.description || ''}"
          @input="${(event) =>
            this.setItemValue('description', event.target.value)}"
        ></paper-input>
      </div>
      <div class="buttons">
        <paper-button dialog-confirm autofocus @click="${this.onAcceptBtnClick}"
          >${this.operation === 'Add' ? 'Save' : 'Update'}</paper-button
        >
        <paper-button dialog-dismiss @click="${this.closeDialog}"
          >Cancel</paper-button
        >
      </div>
    </paper-dialog>`;
  }

  setItemValue(key, value) {
    if (this.operation === 'Edit') {
      this.selectedItem = {
        ...this.selectedItem,
        [key]: value,
      };
    } else {
      this.item = {
        ...this.item,
        [key]: value,
      };
    }
  }
  
  handleOnDelete(item) {
    this.posts = this.posts.filter((post) => {
      return post.id !== item.id;
    });
  }

  render() {
    return html`
      <div class="dflex">
        ${this.renderAddButton()}
        <div>
          <table>
            <thead>
              <tr>
                <td>S.No.</td>
                <td>Title</td>
                <td>Description</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              ${this.posts.map((item, index) => {
                return html`
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.title}</td>
                    <td>${item.description}</td>
                    <td>
                      <div class="mr" @click="${() => this.toggleDialog(item)}">
                        <paper-button raised class="edit-button">
                          Edit
                        </paper-button>
                      </div>
                      <div @click="${() => this.handleOnDelete(item)}">
                        <paper-button raised class="delete-button">
                          Delete
                        </paper-button>
                      </div>
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>
        ${this.openAddEditDialog()}
      </div>
    `;
  }
}
customElements.define('table-view', TableView);
