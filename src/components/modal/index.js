import Add from './modalAdd.jsx';
import Remove from './modalRemove.jsx';
import Rename from './modalRename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
