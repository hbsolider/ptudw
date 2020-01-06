const btnDecreaseBid = $('.decreaseBid');
const btnIncreaseBid = $('.increaseBid');
var bidValue = 100;
function up()
{
  bidValue += 100;
  document.getElementById('NewBidText').value = bidValue;
  return;
}
function down()
{
  if (bidValue > 100) 
    bidValue -= 100;
  document.getElementById('NewBidText').value = bidValue;
  return;
}

