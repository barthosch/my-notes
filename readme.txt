This is a simple To-Do App I did last year (2016) as exercise to learn Angular 1.4 - and
to get my current job :-)

I've come a long way in the last one and a half year. Now, I see many flaws in this attempt
- and if I find some spare time, I should really spice it up someday.

Nothing fancy required to run this thing. Just open index.html.




Old version of readme.txt:

WebApp "MyNotes"
================
Probearbeit eingereicht von Sven Bartholomay (mail@sven-bartholomay.de)

Eingesetzte Technologien:
- HTML, Javascript, CSS im Texteditor (Adobe Brackets)
- AngularJS 1.4.9
- FontAwesome 4.5.0 (http://fortawesome.github.io/Font-Awesome) für diverse Icons


Das Design der App habe ich mittels Sass komplett selbst umgesetzt und keine Frameworks
wie Bootstrap o.ä. eingesetzt. Außer der Kompilierung von SCSS zu CSS habe ich keinen
Buildprozess durchgeführt, um den Quelltext für Sie lesbar zu belassen.

Getestet habe ich bisher unter Chrome, Opera und Safari unter Mac OS X 10.11 sowie Chrome
und Edge unter Windows 10.


----------
Benutzung
----------
Beim ersten Start der App (bzw. wenn in der localStorage noch keine Einträge vorhanden
sind) werden einige Demo-Listen mit beispielhaften Einträgen angelegt.

Neue Listen lassen sich unten links durch "Add list" hinzufügen.

Liste bearbeiten: Doppelklick auf Liste oder Liste auswählen und oben rechts auf "Edit 
List" klicken.

Jede Notiz hat eine Bezeichnung, auf Wunsch eine Farbe und den Erledigt-Status.
Des Weiteren gibt es je nach Listentyp weitere Einstellungen.

	Sticky Notes: eine einfache Liste, dargestellt als Haftnotizen. Comic Sans war hier
	Absicht ;-)

	Deadlines: Notizen mit Fälligkeitsdatum

	Tasks: Notizen mit der Möglichkeit, eine Priorität und einen zusätzlichen
	Beschreibungstext zu erfassen

	Shopping List: Einkaufsliste mit einstellbarer Anzahl der einzelnen Positionen

Der Typ einer Liste lässt sich nachträglich durch "Edit List" verändern.

Weitere Listentypen wären denkbar. Sie sind in den "noteDefaults" definiert (siehe
js/notes.js, Zeile 43).

Notizen (bis auf Sticky Notes) können in der Liste durch einen Klick auf die linke Check-
box erledigt werden. Sie erscheinen dann durchgestrichen. Über der Notizenansicht steht
die Möglichkeit, erledigte Einträge auszublenden, zur Verfügung ("Hide done").

Über "All pending" und "All done" können alle Notizen der aktuellen Liste auf unerledigt,
bzw. erledigt gesetzt werden.

Über einen Klick auf eine Notiz lässt sich eine Notiz bearbeiten und entfernen.

Ich habe eine Hand voll Farben gewählt, um die Benutzung einfach zu halten (welcher 
Anwender möchte in der Eile schon schon einen RGB-Farbwert mischen...) Durch einen 
erneuten Klick auf eine Farbe lässt sie sich abschalten.


-----------------------
Verbesserungspotential
-----------------------
- Responsives Design / Optimierung für Mobile: bisher nur Desktop ausgelegt. Für mobile 
Geräte sollte das CSS (über Media-Queries) optimiert und Elemente ggf. anders angeordnet
werden.

- Sicherheitsabfrage, ob eine Notiz, oder - noch wichtiger - eine Liste wirklich gelöscht
werden soll

- Schönere Messageboxen statt der Browser-Standard "alert"-Fenster anzeigen.

- Erledigte Notizen löschen

- Die Änderungen an einer Notiz oder Liste sind wegen des Databindings im Hintergrund
direkt sichtbar. Eventuell nicht optimal (verwirrt den Anwender)... Ein paar subtile 
Animationen könnten das Erlebnis für den Anwender noch verbessern.

- Tastatursteuerung: Dialoge können nicht durch Enter- oder Escape-Taste bestätigt oder
abgebrochen werden.

- Datumsbehandlung: Das Fälligkeitsdatum wird aktuell nur als String abgespeichert. Es
sollte selbstverständlich als Datum gespeichert werden, um z.B. auch ermitteln zu können,
ob ein Eintrag einer Deadline-Liste bereits überfällig ist. Ein Date-Picker wäre evtl.
hilfreich, da m.E. die Browser <input type="date"> immer noch nicht vernünftig umsetzen.

- Umsortierung der Notizen durch Drag & Drop, automatisches Sortieren nach Fälligkeits-
Datum, Farbe, Priorität usw... 

- Möglichkeit, alle Einträge einer Liste zu löschen.

- Rückgängig-Funktion

- Das + Zeichen im floating "Add Note"-Button ist unter Windows ein wenig verrutscht.

- Alles in einem Controller: Der "NotesController" könnte in mehrere Controller (für
Liste, Notiz usw.) aufgeteilt werden.

- Speichern: sicher nicht optimal, dass immer wieder alle Daten (alle Listen mit allen
Notizen) gespeichert werden, egal wie klein die Änderung auch war.