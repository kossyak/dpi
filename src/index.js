import Editor from './editor/index.js'
import Collection from './collection/index.js'
import Favorites from './collection/favorites/index.js'

const editor = new Editor()
const favorites = new Favorites()
new Collection(editor, favorites)

editor.create()