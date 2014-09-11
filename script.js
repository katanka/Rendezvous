var clientId = 'YOUR_CLIENT_ID';
var apiKey = 'YOUR_API_KEY';
var scopes = 'https://www.googleapis.com/auth/calendar';


function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
   }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary'
    });
          
    request.execute(function(resp) {
      for (var i = 0; i < resp.items.length; i++) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(resp.items[i].summary));
        document.getElementById('events').appendChild(li);
      }
    });
  });
}


/*google.load("gdata", "1");
google.setOnLoadCallback(getMyFeed);

var myService;
var feedUrl = "https://www.google.com/calendar/feeds/katanka.gleeson@gmail.com/private/full";

function setupMyService() {
  myService = new google.gdata.calendar.CalendarService('optimal-aurora-700');
  logMeIn();
}

function getMyFeed() {
  setupMyService();

  myService.getEventsFeed(feedUrl, handleMyFeed, handleError);
}

function handleMyFeed(myResultsFeedRoot) {
  alert("This feed's title is: " + myResultsFeedRoot.feed.getTitle().getText());
}

function handleError(e) {
  alert("There was an error!");
  alert(e.cause ? e.cause.statusText : e.message);
}

function logMeIn() {
  scope = "https://www.google.com/calendar/feeds/";
  var token = google.accounts.user.login(scope);
}

function logMeOut() {
  google.accounts.user.logout();
}*/