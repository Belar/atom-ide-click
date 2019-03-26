'use babel';

import * as AtomIdeClick from '../lib/main';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomIdeClick', () => {
  beforeEach(function() {
    spyOn(atom.config, 'get').andCallFake(function(value) {
      const config = {
        'atom-ide-click.grammarScopes': [],
        'atom-ide-click.priority': 0
      }
      return config[value]
    });

    spyOn(atom.views, 'getView').andReturn('FakeEditorView')
  });


  it('verify provider result', () => {
    const provider = AtomIdeClick.getProvider()

    expect(provider.priority).toEqual(0)
    expect(provider.grammarScopes).toBeNull()
    expect(typeof provider.getSuggestionForWord).toEqual('function')
  });

  it('verify suggestionForWord result', () => {
    const suggestionForWord = AtomIdeClick.suggestionForWordHandler('FakeEditor', 'FakeText', 'FakeRange')

    expect(suggestionForWord.range).toEqual('FakeRange')
    expect(typeof suggestionForWord.callback).toEqual('function')
  });

  it('verify suggestionForWord handler stops if there is no text value', () => {
    const suggestionForWord = AtomIdeClick.suggestionForWordHandler('FakeEditor', '', 'FakeRange')

    expect(suggestionForWord).toBeUndefined()
  });

  it('verify triggerGoToDefinition dispatches "go to definition" event on editor view', () => {
    spyOn(atom.commands, 'dispatch').andCallFake(function(textEditorView, event) {
      expect(atom.views.getView).toHaveBeenCalled()
      expect(textEditorView).toEqual('FakeEditorView')

      expect(event).toEqual('atom-ide-go-to-definition:go-to-definition')
    });

    AtomIdeClick.triggerGoToDefinition('FakeTextEditor')
  });
});
