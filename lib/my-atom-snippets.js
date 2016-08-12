'use babel';

import MyAtomSnippetsView from './my-atom-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  myAtomSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myAtomSnippetsView = new MyAtomSnippetsView(state.myAtomSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myAtomSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-atom-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myAtomSnippetsView.destroy();
  },

  serialize() {
    return {
      myAtomSnippetsViewState: this.myAtomSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('MyAtomSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
