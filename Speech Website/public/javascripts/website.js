function addFeedback(){
  var tableRef = document.getElementById('BallotTable').getElementsByTagName('tbody')[0];
  var newRow   = tableRef.insertRow(tableRef.rows.length);
  var cell1  = newRow.insertCell(0);
  var cell2 =  newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var feedback = document.createTextNode(document.getElementById("FeedbackBox").value)
  var tourney  = document.createTextNode('Tournament 1')
  var round = document.createTextNode('Finals')
  var time = document.createTextNode('10:00')
  cell1.appendChild(tourney);
  cell2.appendChild(round);
  cell3.appendChild(feedback);
  cell4.appendChild(time);
}

function calculate(){
  var entries = $('#entries').val();
  var breaks = document.getElementById('breaks').value;
  var rounds = document.getElementById('prelims').value;
  var result = Math.round((breaks/entries)*6*rounds);
  console.log(result)
  document.getElementById('result').innerHTML = "You need no more than a total of " + result + " to break";

}
