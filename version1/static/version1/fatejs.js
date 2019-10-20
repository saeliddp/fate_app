/*
 * For the purposes of this script, 'first' will always refer to the data displayed on
 * the left side of the screen.
 */ 
 
// contain the HTML IDs of the titles
var firstTitleIDs = [];
var secondTitleIDs = [];

// contain the HTML IDs of the snippets
var firstSnippetIDs = [];
var secondSnippetIDs = [];

var unseenQids = [];
// the qid we are currently testing
var currQid = -1;

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

function updateRandomQid() {
	if (unseenQids.length != 0) {
		var index = Math.floor(Math.random() * unseenQids.length);
		currQid = unseenQids.splice(index, 1)[0];
	}
}

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
	//updateRandomQid();
	updateNextQid();
}

// selects and displays the next query along with corresponding search result titles
// and snippets
function nextQuery() {
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
	updateNextQid();
}