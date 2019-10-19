/*
 This script constructs a few random queries and search results and provides
 a method for replacing the content in the three content containers.
*/

// contains the HTML IDs of the titles
var titleIDs = [];
// contains the HTML IDs of the snippets
var snippetIDs = [];
// the qid we are currently testing
var currQid = 1;

//
var firstRankList = null;
var secondRankList = null;

// builds lists of titles, snippets, titleIDs, and snippetIDs
for (i = 97; i <= 98; i++) {
	for (j = 1; j <= 5; j++) {
		// the following two lines of code are what would stay once we are dealing
		// with actual search results
		titleIDs.push(String.fromCharCode(i).concat("t".concat(j)));
		snippetIDs.push(String.fromCharCode(i).concat("d".concat(j)));
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
	console.log("entered uploadData");
	var fj = firstJSON.replace(/&quot;/g, '"');
	fj = fj.replace(/&#39;/g, "'");
	console.log(fj);
	var sj = secondJSON.replace(/&quot;/g, '"');
	sj = sj.replace(/&#39;/g, "'");

	console.log(fj.charAt(4343));
	firstRankList = JSON.parse(fj);
	secondRankList = JSON.parse(sj);
}

// randomly selects and displays a new query along with random search result titles
// and snippets
function nextQuery() {
	var snipData = firstRankList[currQid];
	document.getElementById("qstring").innerHTML = "Query: " + snipData[0][0];
	
	for (i = 0; i < snipData.length; i++) {
		document.getElementById(titleIDs[i]).innerHTML = snipData[i][1];
		document.getElementById(snippetIDs[i]).innerHTML = snipData[i][3];
	}
	
	snipData = secondRankList[currQid];
	for (i = 0; i < snipData.length; i++) {
		document.getElementById(titleIDs[i + 5]).innerHTML = snipData[i][1];
		document.getElementById(snippetIDs[i + 5]).innerHTML = snipData[i][3];
	}
	currQid++;
}