'use babel'

export function triggerGoToDefinition (textEditor) {
  atom.commands.dispatch(atom.views.getView(textEditor), 'atom-ide-go-to-definition:go-to-definition')
}

export function suggestionForWordHandler (textEditor, text, range) {
  const targetValue = text && text.trim()
  if (!targetValue) return

  return {
    range,
    callback: () => triggerGoToDefinition(textEditor)
  };
}

export function getProvider() {
  const grammarScopes = atom.config.get('atom-ide-click.grammarScopes')
  const priority = atom.config.get('atom-ide-click.priority')

  return {
    priority,
    // Assign value only if at least one scope is available. Falsey triggers default behaviour, "apply to all".
    grammarScopes: grammarScopes && !!grammarScopes[0] && grammarScopes || null,
    getSuggestionForWord: suggestionForWordHandler
  };
}
