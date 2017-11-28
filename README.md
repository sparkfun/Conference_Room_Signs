# Conference_Room_Signs
Google Calendar API driven conference room signage for SFE HQ
<br>
<br>
This is designed to run on top of [BenjaOS](https://github.com/WebReflection/benja) for Raspberry Pi. That said, it should run on any system with [node.js](https://nodejs.org/) and [electron](https://electron.atom.io/) installed (with some tweaking) The authentication process is a little wonky right now: a second window will launch and allow you to login to a Google account, returning a key string. You need to open a debug console in the main window and manually set the key variable to the value of this string within 20 seconds of startup. A user friendly version of this process will be implemented for the forthcoming web client.
<br>
* App - ElectronJS App Folder 
* Mechanicals - 3D Print models for the enclosure
