/*
 * For the purposes of this script, 'first' will always refer to the data displayed on
 * the left side of the screen.
 */ 
var MAX_NUM_QIDS = 20;
var MS_PER_CHOICE = 30000;
// contain the HTML IDs of the titles
var firstTitleIDs = [];
var secondTitleIDs = [];

// contain the HTML IDs of the snippets
var firstSnippetIDs = [];
var secondSnippetIDs = [];

// the qids we have not yet displayed
var unseenQids = [];
var numQidsSeen = 0;
// the qid we are currently testing
var currQid = -1;
var secondsRemaining = Math.round((MS_PER_CHOICE - 1000) / 1000);
var timer = setInterval(updateSeconds, 1000);
var queryTimeout = setTimeout(nextQuery, MS_PER_CHOICE);

// see uploadData()
var firstRankList = null;
var secondRankList = null;

// builds lists of titleIDs and snippetIDs
for (j = 1; j <= 5; j++) {
	firstTitleIDs.push("at".concat(j));
	secondTitleIDs.push("bt".concat(j));
	firstSnippetIDs.push("ad".concat(j));
	secondSnippetIDs.push("bd".concat(j));
}

// gets and removes a random Qid from the unseenQids list
function updateRandomQid() {
	if (unseenQids.length != 0) {
		var index = Math.floor(Math.random() * unseenQids.length);
		currQid = unseenQids.splice(index, 1)[0];
	}
}

// gets and removes the next Qid in the unseenQids list
function updateNextQid() {
	if (unseenQids.length != 0) {
		currQid = unseenQids.splice(0, 1)[0];
	}
}

/*
input snippet data will be in the format:
    {
        qid1: [[query_name, snippet1title, snippet1url, snippet1desc], [query_name, snippet2title...]],
        qid2: [...]
    }

for each qid, snippet1 corresponds to the first snippet in the reranked list
*/
function uploadData(firstJSON, secondJSON) {
	console.log("uploadData");
	
	// cleans up the JSON data, which gets a little corrupted when passed through
	// the html from django
	firstJSON = firstJSON.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
	secondJSON = secondJSON.replace(/&quot;/g, '"').replace(/&#39;/g, "'");

	firstRankList = JSON.parse(firstJSON);
	secondRankList = JSON.parse(secondJSON);
	
	for (qid in firstRankList) {
		if (!(qid in secondRankList)) {
			console.log("QID MISMATCH");
		}
		unseenQids.push(qid);
	}
	updateRandomQid();
	//updateNextQid();
}

// selects and displays the next or a random query along with corresponding search 
// result titles and snippets
function nextQuery() {
	if (numQidsSeen < MAX_NUM_QIDS) {
		var snipData = firstRankList[currQid];
		document.getElementById("qstring").innerHTML = "Query: " + snipData[0][0];
	
		for (i = 0; i < snipData.length; i++) {
			document.getElementById(firstTitleIDs[i]).innerHTML = snipData[i][1];
			document.getElementById(firstSnippetIDs[i]).innerHTML = snipData[i][3];
		}
	
		snipData = secondRankList[currQid];
		for (i = 0; i < snipData.length; i++) {
			document.getElementById(secondTitleIDs[i]).innerHTML = snipData[i][1];
			document.getElementById(secondSnippetIDs[i]).innerHTML = snipData[i][3];
		}
		numQidsSeen++;
		//updateNextQid();
		updateRandomQid();
		
		clearTimeout(queryTimeout);
		queryTimeout = setTimeout(nextQuery, MS_PER_CHOICE);
		secondsRemaining = Math.round((MS_PER_CHOICE - 1000) / 1000);
		clearInterval(timer);
		updateSeconds();
		timer = setInterval(updateSeconds, 1000);
	} else {
		document.getElementById("qstring").innerHTML = "Survey Completed";
		clearInterval(timer);
		secondsRemaining = 0;
		updateSeconds();
		for (i = 0; i < firstTitleIDs.length; i++) {
			document.getElementById(firstTitleIDs[i]).innerHTML = "";
			document.getElementById(secondTitleIDs[i]).innerHTML = "";
			document.getElementById(firstSnippetIDs[i]).innerHTML = "";
			document.getElementById(secondSnippetIDs[i]).innerHTML = "";
		}
	}
}

function updateSeconds() {
	document.getElementById("timer").innerHTML = secondsRemaining;
	secondsRemaining--;
}