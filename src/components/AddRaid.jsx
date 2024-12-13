import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../styles/addRaid.css"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AddRaid() {
  const [raidName, setRaidName] = useState("");
  const [itemLevel, setItemLevel] = useState("");
  const [goldreward, setGoldReward] = useState("");

  async function setRaids() {
    const { error } = await supabase
      .from("raids") // Tabelle "raids"
      .insert({ name: raidName, itemlevel: parseInt(itemLevel), gold_reward: parseInt(goldreward) });

    if (error) {
      console.error("Fehler beim Hinzufügen des Raids:", error);
    } else {
      console.log("Raid erfolgreich hinzugefügt!");
      setRaidName(""); // Eingabe zurücksetzen
      setItemLevel("");
      setGoldReward("");
    }
  }

  return (
    <div className="addRaid">
      <input
        type="text"
        placeholder="Raid Name"
        value={raidName}
        onChange={(e) => setRaidName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Item Level"
        value={itemLevel}
        onChange={(e) => setItemLevel(e.target.value)}
      />
      <input
        type="number"
        placeholder="Gold Reward"
        value={goldreward}
        onChange={(e) => setGoldReward(e.target.value)}
      />
      <button className="addRaid_btn" onClick={setRaids}>
        Add Raid
      </button>
    </div>
  );
}