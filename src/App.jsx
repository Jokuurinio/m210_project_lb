
/*
import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Characters from "./components/Characters";
import Raids from "./components/Raids";

// Supabase-URL und API-Key aus den Umgebungsvariablen laden
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Vite-spezifisch
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [session, setSession] = useState(null);
  const [testing, setTesting] = useState(true); // Set to `true` for testing purposes

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session && !testing) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  return (
    <div>
      <div>
        <h1>My Roster</h1>
        <Characters />
      </div>
      <div>
        <h1>Raids</h1>
        <Raids />
      </div>
      <div>
        <button
          onClick={() => {
            supabase.auth.signOut();
            setSession(null);
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
*/

import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Characters from "./components/Characters";
import Raids from "./components/Raids";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [session, setSession] = useState(null);
  const [testing, setTesting] = useState(false); // Set to `true` for testing purposes

  useEffect(() => {
    // Aktuelle Session laden
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
      }
    };

    loadSession();

    // Auth-State-Listener hinzufügen
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup-Function, um das Abonnement zu entfernen
    return () => {
      if (subscription) {
        if (typeof subscription.unsubscribe === "function") {
          subscription.unsubscribe();
        } else if (typeof subscription.remove === "function") {
          subscription.remove();
        }
      }
    };
  }, []);

  if (!session && !testing) {
    return <div className="app-container">
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>;
  }

  return (
    <div>
      <div>
        <h1>My Roster</h1>
        <Characters userId={session?.user?.id} />
      </div>
      <div>
        <h1>Raids</h1>
        <Raids />
      </div>
      <div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            setSession(null);
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

