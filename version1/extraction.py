from classes.snippet import *
import pickle

# splits the DOCUMENT# by the middle '00' to get qid and r
def splitByDoubleZeros(docNum):
    # finds index of last zero, not including any trailing zeroes
    numTrailing = 0
    tempInd = len(docNum) - 1
    while docNum[tempInd] == str(0):
        numTrailing += 1
        tempInd -= 1
    
    lastZeroInd = docNum[:len(docNum) - numTrailing].rindex('0')
    
    # [qid, r]
    return [docNum[:lastZeroInd - 1], docNum[lastZeroInd + 1:]]
    

# finds the index of a Snippet with the given original rank in a list of Snippets
# might be improved upon with binary search if the snippet_list is sorted by original rank
# returns -1 if the desired Snippet is not found
def getIndexOf(rank, snippet_list):
    ind = 0
    for snip in snippet_list:
        if (int(snip.get_rank()) == rank):
            return ind
        ind += 1
    
    return -1

"""
returns snippet data in the format:
    {
        qid1: [[query_name, snippet1title, snippet1url, snippet1desc], [query_name, snippet2title...]],
        qid2: [...]
    }

for each qid, snippet1 corresponds to the first snippet in the reranked list
"""
def extractFromFile(fileName, numSnippets):
    file = open(r"./version1/txtdata/version1/" + fileName, "r")
    lines = file.readlines()
    file.close()
    
    with open(r"./version1/snippet.pickle", 'rb') as fr:
        query_snippet_list = pickle.load(fr)
        
    results = {}
    for i in range(100):
        qid = i + 1
        results[qid] = []
    
    j = 0
    while j < len(lines):
        # since qids are in groups of 10 in ascending order, this will work
        query_snippet = query_snippet_list[int(j / 10)]
        snippet_list = query_snippet.snippetList
        
        # there are 10 results for a given query, but we only want to
        # inspect a certain number
        for k in range(numSnippets):
            line = lines[j + k]
            tokens = line.split(' ')
            qAndR = splitByDoubleZeros(tokens[2])
            qid = int(qAndR[0])
            ogRank = int(qAndR[1])
            newRank = int(tokens[3]) # corresponds to RANK
            if (newRank != k + 1):
                print("RANK does not correspond with the snippets position in the output list.")
            
            query_snippet = query_snippet_list[qid - 1]
            snippet_list = query_snippet.snippetList            
            sid = getIndexOf(ogRank, snippet_list)
            currSnippet = snippet_list[sid]
            
            if ogRank != int(currSnippet.get_rank()):
                print("Current Snippet's original rank is unequal to the 'r' field in the .txt file.")
            # [query_name, title, url, description]
            # replaces double quotes with single quotes to avoid messing up JSON
            results[qid].append([query_snippet.query.replace('"', "'"), currSnippet.get_title().replace('"', "'"), 
                                currSnippet.get_url().replace('"', "'"), currSnippet.get_desc().replace('"', "'")])
        
        j += 10
    
    return results
  


    
    


