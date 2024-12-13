import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AddCharacter() {
  const [characterName, setCharacterName] = useState("");
  const [itemLevel, setItemLevel] = useState("");

  async function setCharacters() {
    // Benutzer-ID aus der Session abrufen
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.error("Benutzer ist nicht eingeloggt.");
      return;
    }

    const userId = session.user.id; // Benutzer-ID abrufen

    const { error } = await supabase
      .from("characters")
      .insert({
        character_name: characterName,
        itemlevel: parseInt(itemLevel),
        user_id: userId, // Benutzer-ID setzen
      });

    if (error) {
      console.error("Fehler beim Hinzufügen des Charakters:", error);
    } else {
      console.log("Charakter erfolgreich hinzugefügt!");
      setCharacterName(""); // Eingabe zurücksetzen
      setItemLevel("");
    }
  }

  return (
    <div className="addCharacter">
      <input
        type="text"
        placeholder="Character Name"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Item Level"
        value={itemLevel}
        onChange={(e) => setItemLevel(e.target.value)}
      />
      <button className="addCharacter_btn" onClick={setCharacters}>
        Add Character
      </button>
    </div>
  );
}
