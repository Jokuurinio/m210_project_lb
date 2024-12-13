/*
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../styles/characters.css";
import AddCharacter from "./AddCharacter";
import CharacterEditor from "./CharacterEditor";

// Supabase-URL und API-Key aus den Umgebungsvariablen laden
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Vite-spezifisch
const supabase = createClient(supabaseUrl, supabaseKey);

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);


  useEffect(() => {
    getCharacters();
  }, []);

  async function getCharacters() {
    const { data } = await supabase.from("characters").select();
    setCharacters(data);
  }

  async function updateCharacter(id, updatedCharacter) {
    const { error } = await supabase
      .from("characters")
      .update(updatedCharacter)
      .eq("id", id);

    if (error) {
      console.error("Fehler beim Aktualisieren des Charakters:", error);
    } else {
      console.log("Character erfolgreich aktualisiert!");
      setEditingCharacter(null); // Bearbeitungsmodus beenden
      getCharacters(); // Liste erneut laden
    }
  }

  async function deleteCharacter(id) {
    const confirmed = window.confirm(
      "Möchtest du diesen Character wirklich löschen?"
    );
    if (!confirmed) return;

    const { error } = await supabase.from("characters").delete().eq("id", id);

    if (error) {
      console.error("Fehler beim Löschen des Charakters:", error);
    } else {
      console.log("Character erfolgreich gelöscht!");
      getCharacters(); // Liste erneut laden
    }
  }

  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character.id} className="character-item">
          <h3>{character.character_name}</h3>
          <p>Itemlevel: {character.itemlevel}</p>
          <button onClick={() => setEditingCharacter(character.id)}>Edit</button>
<button onClick={() => deleteCharacter(character.id)}>Delete</button>

        </li>
      ))}
      <AddCharacter />
    </ul>
  );
}

export default Characters;

*/

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../styles/characters.css";
import AddCharacter from "./AddCharacter";
import CharacterEditor from "./CharacterEditor";

// Supabase-URL und API-Key aus den Umgebungsvariablen laden
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Vite-spezifisch
const supabase = createClient(supabaseUrl, supabaseKey);

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [userId, setUserId] = useState(null); // Zustand für die Benutzer-ID

  useEffect(() => {
    const getUserAndCharacters = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id); // Benutzer-ID aus der Session holen
        getCharacters(session.user.id); // Nur Charaktere des aktuellen Benutzers laden
      }
    };

    getUserAndCharacters();
  }, [getCharacters]);

  async function getCharacters(userId) {
    // Abrufen der Characters mit Filter auf die user_id
    const { data, error } = await supabase
      .from("characters")
      .select()
      .eq("user_id", userId); // Filter nach user_id

    if (error) {
      console.error("Fehler beim Abrufen der Charaktere:", error);
    } else {
      setCharacters(data);
    }
  }

  async function updateCharacter(id, updatedCharacter) {
    const { error } = await supabase
      .from("characters")
      .update(updatedCharacter)
      .eq("id", id);

    if (error) {
      console.error("Fehler beim Aktualisieren des Charakters:", error);
    } else {
      console.log("Character erfolgreich aktualisiert!");
      setEditingCharacter(null);
      getCharacters(userId); // Liste erneut laden
    }
  }

  async function deleteCharacter(id) {
    const confirmed = window.confirm(
      "Möchtest du diesen Character wirklich löschen?"
    );
    if (!confirmed) return;

    const { error } = await supabase.from("characters").delete().eq("id", id);

    if (error) {
      console.error("Fehler beim Löschen des Charakters:", error);
    } else {
      console.log("Character erfolgreich gelöscht!");
      getCharacters(userId); // Liste erneut laden
    }
  }

  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character.id} className="character-item">
          <h3>{character.character_name}</h3>
          <p>Itemlevel: {character.itemlevel}</p>
          <button onClick={() => setEditingCharacter(character.id)}>Edit</button>
          <button onClick={() => deleteCharacter(character.id)}>Delete</button>
        </li>
      ))}
      <AddCharacter userId={userId} onCharacterAdded={() => getCharacters(userId)} />
    </ul>
  );
}

export default Characters;
