import { useState } from "react";

function CharacterEditor({ character, onSave, onCancel }) {
  const [name, setName] = useState(character.character_name);
  const [itemlevel, setItemlevel] = useState(character.itemlevel);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ character_name: name, itemlevel: parseInt(itemlevel) });
  };

  return (
    <form onSubmit={handleSubmit} className="character-editor">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Character Name"
      />
      <input
        type="number"
        value={itemlevel}
        onChange={(e) => setItemlevel(e.target.value)}
        placeholder="Itemlevel"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default CharacterEditor;
