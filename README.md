# LB Modul 210

Aufgrund der eingeschränkten Zeit und engen Timeline, welche für dieses Projekt zur Verfügung standen, habe ich mich dazu entschieden die Grundidee eines früheren Projektes weiter zu verfolgen.
Die Idee eine Übersicht für das Online Spiel Lost Ark zu erstellen, wo ich als User eine Übersicht über meine Charaktere und mögliche Aufgaben habe.
Ich habe mich darauf beschränkt das ich mich meine Charaktere Darstellen lassen kann, diese bei bedarf anpassen oder auch löschen kann. 
Ebenfalls sollen mir alle verfügbaren Raids (Grössere Gegner, welche diverse Belohnungen je level geben) aufgeführt sein. Diese sollen für mich nur ersichtlich sein, jedoch soll ein Admin mit entsprechenden Berechtigungen diese anpassen, ergänzen und löschen können.
Ich habe mich nun also damit auseinander gesetzt mein alter Projekt herzunehmen und das Backend mit der Datenstruktur auf Supabase zu verlagern, bevor ich mich an das Frontend und die Anpassung der CRUD Operationen gemacht habe.

## Funktionalitäten

- Als User kann ich mich beim ersten Besuch der Seite per Mail neu registrieren und erhalte eine Bestätigungs-Mail.
- Als User kann ich mich mit meiner E-Mail und meinem Passwort anmelden und erhalte direkte Rückmeldung ob erfolgreich oder nicht.
- Als User habe ich eine Übersicht über alle meine aktuellen Charaktere (mein Roster) und kann nach belieben diese anpassen, löschen oder neue hinzufügen.
- Als User habe ich eine Übersicht über alle aktuell verfügbaren Raids im Spiel und sehe was ich für Belohnungen dafür bekommen kann.
- Als User kann ich die Raids NICHT bearbeiten, löschen oder neue hinzufügen.
- Als Admin kann ich Raids hinzufügen, bearbeiten und löschen.
- Ich kann mich jederzeit unten links abmelden.

## Zeitplan
| Arbeitsschritt                                                              | Soll-Zeit | Ist-Zeit |
| --------------------------------------------------------------------------- | --------- | -------- |
| Idee festlegen                                                              | 15min     | 20min    |
| Projekt initialisieren                                                      | 10min     | 10min    |
| Erstellen des Supabase Projekt                                              | 10min     | 10min    |
| Erstellen der Datenbank-Struktur mit jeweiligen Tabellen und Berechtigungen | 60min     | 300min   |
| Design-Idee für Frontend definieren                                         | 30min     | 20min    |
| CRUD Operationen programmieren                                              | 200min    | 300min   |
| Git commits/merges                                                          | 10min     | 15min    |

Rückblick Zeitplan:
Es ging extrem viel Zeit beim Konfigurieren mit Supabase flöten. Das fehlende Wissen und Routine dazu machte es nicht gerade einfacher. Daher habe ich sehr viele loops gefahren und einen enormen Zeitaufwand beim erstellen der Tabellen sowie vergeben der korrekten Berechtigungen betrieben.
Für das Frontend Design wurde keine Zeit eingeplant und aufgewendet, da schlichtweg keine Zeit vorhanden war.

## Abschlussreview
Durch die sehr kurze Zeit, welche für das Projekt vorgesehen war, stand ich Anfang extrem unter Stress, da ich keine genaue Idee davon hatte was ich nun genau machen soll. Vieles schien mir extrem Aufwändig und ich habe mich dann dazu entschlossen etwas bereits halbwegs fertiges herzunehmen.
Da ich keine Ahnung hatte was ich eigentlich genau machen will oder was das Endprodukt sein soll respektive das immerno nicht so genau weiss was ich gemacht habe, finde ich ist das ganze ganz ok geworden für einen knapp 9h Arbeitstag. Ich denke die meisten Punkte sollten jedoch abgedeckt sein und schlussentlich bin ich zufrieden was ich in dieser kurzen Zeit geschafft habe und das die oben genannten Punkte so funktionieren wie sie sollten.