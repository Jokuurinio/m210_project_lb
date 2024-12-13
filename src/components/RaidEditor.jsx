import { useState } from "react";

function RaidEditor({ raid, onSave, onCancel }) {
  const [name, setName] = useState(raid.name);
  const [itemlevel, setItemlevel] = useState(raid.itemlevel);
  const [goldReward, setGoldReward] = useState(raid.gold_reward);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, itemlevel: parseInt(itemlevel), gold_reward: parseInt(goldReward) });
  };

  return (
    <form onSubmit={handleSubmit} className="raid-editor">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Raid Name"
      />
      <input
        type="number"
        value={itemlevel}
        onChange={(e) => setItemlevel(e.target.value)}
        placeholder="Required Itemlevel"
      />
      <input
        type="number"
        value={goldReward}
        onChange={(e) => setGoldReward(e.target.value)}
        placeholder="Gold Reward"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default RaidEditor;
