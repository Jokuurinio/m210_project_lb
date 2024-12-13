import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../styles/raids.css";
import AddRaid from "./AddRaid";
import RaidEditor from "./RaidEditor";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Raids() {
  const [raids, setRaids] = useState([]);
  const [editingRaid, setEditingRaid] = useState(null); // Welcher Raid wird bearbeitet?

  useEffect(() => {
    getRaids();
  }, [getRaids]);

  async function getRaids() {
    const { data } = await supabase.from("raids").select();
    setRaids(data);
  }

  // Funktion zum Aktualisieren eines Raids
  async function updateRaid(id, updatedRaid) {
    const { error } = await supabase
      .from("raids")
      .update(updatedRaid)
      .eq("id", id);

    if (error) {
      console.error("Fehler beim Aktualisieren des Raids:", error);
    } else {
      console.log("Raid erfolgreich aktualisiert!");
      setEditingRaid(null); // Beenden des Bearbeitungsmodus
      getRaids(); // Liste erneut laden
    }
  }

  // Funktion zum löschen eines Raids
  async function deleteRaid(id) {
    const { error } = await supabase
      .from("raids")
      .delete()
      .eq("id", id);
  
    if (error) {
      console.error("Fehler beim Löschen des Raids:", error);
    } else {
      console.log("Raid erfolgreich gelöscht!");
      getRaids(); // Liste der Raids nach dem Löschen aktualisieren
    }
  }
  

  return (
    <div>
      <ul className="raids-list">
        {raids.map((raid) =>
          editingRaid === raid.id ? (
            <RaidEditor
              key={raid.id}
              raid={raid}
              onSave={(updatedRaid) => updateRaid(raid.id, updatedRaid)}
              onCancel={() => setEditingRaid(null)}
            />
          ) : (
            <li key={raid.id} className="raids-item">
              <h3>{raid.name}</h3>
              <p>Required Itemlevel: {raid.itemlevel}</p>
              <p>Gold Reward: {raid.gold_reward}</p>
              <button onClick={() => setEditingRaid(raid.id)}>Edit</button>
              <button onClick={() => deleteRaid(raid.id)}>Delete</button>
            </li>
          )
        )}
      </ul>
      <AddRaid />
    </div>
  );
}

export default Raids;