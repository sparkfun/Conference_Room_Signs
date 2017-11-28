# Conference_Room_Signs
Google Calendar API driven conference room signage for SFE HQ
<br>
<br>
This is designed to run on a Raspberry Pi equipped with 7" touch display. That said, it should run on any system with node.js and electron installed. Run "electron ." in this directory to launch. The authentication process is a little wonky right now: a second window will launch and allow you to login to a Google account, returning a key string. You need to open a debug console in the main window and manually set the key variable to the value of this string within 20 seconds of startup. A user friendly version of this process will be implemented for the forthcoming web client.
<br>
* conference_sign_enclosure v1.f3d - Fusion 360 Archive File
* conference_sign_enclosure v1.iges - IGES CAD File
* conference_sign_enclosure v1.step - STEP CAD File
* conference_sign_enclosure v1.stl - Mesh File
