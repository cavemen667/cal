
var current_date = new Date();
var total_rows = 6;
var total_cols = 7;
var week_array = new Array("Sun",
			"Mon", 
			"Tue", 
			"Wed", 
			"Thu", 
			"Fri",
			"Sat");

var month_array = new Array("January", 
			"Febuary", 
			"March", 
			"April", 
			"May", 
			"June", 
			"July",
			"August",
			"September",
			"October",
			"November",
			"December");


var current_month = month_array[current_date.getMonth()];
var current_year = current_date.getFullYear();

function getStartDay(month, year){
  var d = new Date(year, month, 1);
  return d.getDay();
}
function getEndDay(month, year){
  var d = new Date(year, month, 32);
  return 32 - d.getDate();
}
function getPrevMonth(month, year){
  if (month-1 < 0){
    year--;
    return 11;
  } else {
    return month-1;
  }
}
function getNextMonth(month, year){
  if (month+1 > 11){
    year++;
    return 0;
  } else {
    return month+1;
  }
}
function getCurrentMonth(){
  return current_month;
}

function getCell_ID(day){
  var offset = getStartDay(current_date.getMonth(),current_date.getFullYear());
  return day+offset-1;
}

function checkWindowSize(isResize){
  var w = $(window).width();
  var h = $(window).height();
  if (isResize){
    if (w > 50 && h>50){
      $('.cells').animate({width: ''+(w-190)/7+'px',
      height: ''+(h-200)/8+'px'}, 'fast');
      $('#display_month').animate({width: ''+(w-190)/7+'px'}, 'fast');
    } else if (h > 50) {
      $('.cells').animate({height: ''+(h-200)/8+'px'},'fast');
    } else if (w > 50) {
     $('.cells').animate({width: ''+(w-190)/7+'px'}, 'fast');
    }
  } else {
    if (w > 50){
      $('.cells').css('width', (w-190)/7);
      $('#display_month').css('width', (w-190)/7);
    } if (h > 50){
      $('.cells').css('height', (h-200)/8);
    }
  }
}

function refresh(){

  var start_day = getStartDay(current_date.getMonth(),current_date.getFullYear());
  var end_day = getEndDay(current_date.getMonth(),current_date.getFullYear());
  var prev_end_day =  getEndDay(getPrevMonth(current_date.getMonth()),
                                             current_date.getFullYear());
  var day = 1;
  var isNextMonth = false; 
  var tr = '';
  var th = '';
  var td = '';
  var tmp_id = 0;
  for (var j=0; j < total_cols; j++){
    th += '<th>'+week_array[j]+'</th>';
  }
  for (var i=0; i < total_rows; i++)
  {
    for (var k=0; k < total_cols; k++){
      td += '<td id="table_cell'+tmp_id++ +'"></td>';
    }
    tr += '<tr>'+ td + '</tr>';
    td = '';
  }
  $("#calendar").html(
    '<p>My calendar</p>'+ 
    '<table id="cal_menu_table"><tr>'+

    '<td><div id="getLastYear" class="date_nav">'+
    '<button type="button" class="css3button">&lt&lt</button>'+
    '</div></td>'+
    '<td><div id="getLastMonth" class="date_nav">'+
    '<button type="button" class="css3button">&lt</button>'+
    '</div></td>'+
    '<td><div id="display_month" ><span>'+current_month+' '+current_year+
                    '</span></div></td>'+
    '<td><div id="getNextMonth" class="date_nav">'+ 
    '<button type="button" class="css3button">&gt</button>'+
    '</div></td>'+
    '<td><div id="getNextYear" class="date_nav">'+
    '<button type="button" class="css3button">&gt&gt</button>'+
    '</div></td>'+

    '</tr>'+
    '</table>'+
    '<table id="cal_table">'+
	'<thead><tr>'+
	th +
	'</tr></thead>'+
	'<tbody>'+
	tr +
	'</tbody>'+
    '</table><div id="popup"><span id="popup_text"></span></div>'
    )
    tmp_id = 0;
$("#cal_table tr").find('td').each(function(){
    
    if (start_day == 0 && end_day >= day && !isNextMonth){
      $(this).html("<pan class = 'dates'>"+day++ +"</pan>");
    } else if (start_day>0){
      start_day--;
      var prev_dates = prev_end_day-start_day;
      $(this).html("<pan class = 'other_dates'>"+prev_dates+"</pan>");
    } else if (isNextMonth){
      $(this).html("<pan class = 'other_dates'>"+day++ +"</pan>");
    } else {
      day = 1;
      isNextMonth = true;
      $(this).html("<pan class = 'other_dates'>"+day++ +"</pan>");
    }
    $(this).append("<div id = 'div_cell"+tmp_id++ +"'class = 'cells'><div>");
    $('.dates').animate({opacity:'1'});
    $('.other_dates').animate({opacity:'1'});
  });  

$("#getLastMonth").click(function(){
  current_date.setMonth(current_date.getMonth()-1);
  current_year = current_date.getFullYear();
  current_month = month_array[current_date.getMonth()];
  refresh();
});
$("#getNextMonth").click(function(){
  current_date.setMonth(current_date.getMonth()+1);
  current_year = current_date.getFullYear();
  current_month = month_array[current_date.getMonth()];
  refresh();
});
$("#getNextYear").click(function(){
  current_date.setFullYear(current_date.getFullYear()+1);
  current_year = current_date.getFullYear();
  refresh();
});
$("#getLastYear").click(function(){
  current_date.setFullYear(current_date.getFullYear()-1);
  current_year = current_date.getFullYear();
  refresh();
});

 $("#cal_table tr").find("td").click(function(e){
   var popup_height = $("#popup").height();
   var popup_width = $("#popup").width();
   var x = e.pageX - popup_width/2;
   var y = e.pageY - popup_height;

   if ( $(window).width() < x+popup_width){
     x = $(window).width() - popup_width;
   }
   if ( x-popup_width/4 < 0){
     x = 0;
   }
   if ( y < 0){
     y = 0;
   }
   $("#popup").css({'display': 'block', 'left': ''+x+'px', 'top': ''+y+'px'});
   $("#popup").html('<span>When: '+current_month+' '+$(this).text()+', '+current_year+'</span><br>'+
                    '<span>What: </span><input type="text" name="eventname"></input><br>'+
                    '<button type="button" class="css3button">Create</button>'

   );
  });

checkWindowSize(false);

  var time_check = new Date();
//set current day to be grey
  if (current_month == month_array[time_check.getMonth()] &&
    current_year == time_check.getFullYear() ){
    $("#table_cell"+
       getCell_ID(current_date.getDate())).css("background-color","#c3c3c3");
  }
}

$(document).ready(function(){

refresh();
checkWindowSize(false);
$(window).resize(checkWindowSize);
});



