var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
var authcode = null;
var clientSecretGlobal;

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  clientSecretGlobal = content;
  setInterval(function(){authorize(JSON.parse(clientSecretGlobal), listEvents);}, 30000);
  authorize(JSON.parse(clientSecretGlobal), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function startTime() {	
  var now = moment();
  document.getElementById('time').innerHTML = now.format("h:mm A");
  document.getElementById('date').innerHTML = now.format("dddd, MMM Do");
  t = setTimeout(function() {
    startTime();
  }, 500);
}
startTime();
var style_attr = "background-image: url(\"" + BACKGROUND_IMG + "\");";
document.getElementById('view').setAttribute("style", style_attr);
document.getElementById('room-name').innerHTML = ROOM_NAME;

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  var win2 = new BrowserWindow({ width: 800, height: 600 });
  win2.loadURL(authUrl);
  
  console.log("20 seconds to enter authcode");
  
  setTimeout(function(){var code = authcode;
  
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  }, 20000);
  
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  var calendar = google.calendar('v3');
  var now = moment(new Date());
  var startOfDay = now.startOf('day').toDate();
  var endOfDay = now.endOf('day').toDate();  
  calendar.events.list({
    auth: auth,
    calendarId: CALENDAR_ID,
    timeMin: startOfDay.toISOString(),
	timeMax: endOfDay.toISOString(),
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Happening Today');
	  var tableContents = "<h3 style=\"padding-top:25px;\">Happening Today</h3><table>";
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
		var startMoment = moment(start);
        console.log('%s - %s', startMoment.format("dddd, MMMM Do YYYY, h:mm:ss a"), event.summary);
		tableContents += "<tr><td>"+startMoment.format("h:mma")+"</td><td>"+event.summary+"</td></tr>";
		}
	  tableContents += "</table>";
	  document.getElementById("view1").innerHTML = tableContents;
    }
  });

  setTimeout(function(){authorize(JSON.parse(clientSecretGlobal), currentEvent);}, 15000);
  
  }
  
function currentEvent(auth) {
	
  console.log("Fetching current event...");	
  calendar = google.calendar('v3');	
  var view2Contents = '';
  var now = moment(new Date());
  var startOfDay = now.startOf('day').toDate();
  var endOfDay = now.endOf('day').toDate();  
  calendar.events.list({
    auth: auth,
    calendarId: CALENDAR_ID,
    timeMin: startOfDay.toISOString(),
	timeMax: (new Date()).toISOString(),
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
    } else {
	  console.log("Events from this morning until now:");
	  console.log(events);
	  var occupied = 0;	
      for (var i = 0; i < events.length; i++) {
		var now = moment(new Date());  
        var event = events[i];
        var end = event.end.dateTime || event.end.date;
		var endMoment = moment(end);
		console.log("checking event... ends " + endMoment.format("h:mm a") + " and now is " + now.format("h:mm a"));
		if (endMoment.isAfter(now)){
			
			console.log("Displaying current event...");
			view2Contents += "<h3 style=\"padding-top:25px;\">Happening Now</h3>";
			view2Contents += "<p style=\"font-size: 14pt;\">" + event.summary + "</p>";
			view2Contents += "<p style=\"font-size: 14pt;\">For the next " + now.to(endMoment, true).replace("an","").replace("a","") + "</p>";
			document.getElementById("view1").innerHTML = view2Contents;
			occupied = 1;
			break;
			
		}	
	  }
	  if(occupied==0){
		  
		console.log("No current event, fetching free until...");
		setTimeout(function(){authorize(JSON.parse(clientSecretGlobal), freeUntil);}, 3000);
		  
	  }
    }
  });
  
}

function freeUntil(auth){
	
	console.log("getting free until info...");
	var view2Contents = '';
    var now = moment(new Date());
    var startOfDay = now.startOf('day').toDate();
    var endOfDay = now.endOf('day').toDate();  
	calendar.events.list({
			auth: auth,
			calendarId: CALENDAR_ID,
			timeMin: (new Date()).toISOString(),
			timeMax: endOfDay.toISOString(),
			singleEvents: true,
			orderBy: 'startTime'
		  }, function(err, response) {
			if (err) {
			  console.log('The API returned an error: ' + err);
			  return;
			}
			var events = response.items;
			if (events.length == 0) {
				console.log("displaying free until info...");
				view2Contents = "<p>This conference room is free for the rest of the day</p>";
				document.getElementById("view1").innerHTML = view2Contents;				
			} else {
				console.log("displaying free until info...");
				var now = moment(new Date());
			  	var event = events[0];
				var start = event.start.dateTime || event.start.date;
				var startMoment = moment(start);
				var timeToNext = now.to(startMoment, true);
				view2Contents += "<p>This conference room is free for " + timeToNext + "</p>";
				document.getElementById("view1").innerHTML = view2Contents;
			}
	});
	
}