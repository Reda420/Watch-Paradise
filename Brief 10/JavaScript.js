

$(document).ready(function(){
  $.getJSON('store.json',(data)=>{
    console.log(data)  
  $.each(data, function(idx, elem){
    $('#tbdy').append("<tr class='table-row'><th scope='row' class='table-data'>"+elem.id+"</th><td class='table-data'>"+elem.désignation+"</td> <td>"+elem.prix+" <td class='table-data'>" + elem.catégorie+"</td> <td class='table-data'>"+elem.disponibilité+"</td> <td class='table-data'>"+elem.fournisseur.Adresse+' /'+elem.fournisseur.rs+'</td></tr  >');

  });
});
})
$(document).ready(function(){
    $("#bar").on("keyup",function(){
        var value =$(this).val().toLowerCase();
        $("#tbdy tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)

        });
    });
    });


    // function sortTable(column, type) {
    //     //Get and set order
    //     //Use -data to store wheater it will be sorted ascending or descending
    //     var order = $('table thead tr>th:eq(' + column + ')').data('order');
    //     order = order === 'ASC' ? 'DESC' : 'ASC';
    //     $('table thead tr>th:eq(' + column + ')').data('order', order);
    
    
    //     $('#tbdy tr').sort(function(a, b) {
    
    //       a = $(a).find('td:eq(' + column + ')').text();
    //       b = $(b).find('td:eq(' + column + ')').text();
    //       switch (type) {
    //         case 'text':
    //           return order === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
    //           break;
    //         case 'number':
    //           return order === 'ASC' ? a - b : b - a;
    //           break;
    
    //       }
    
    //     }).appendTo('table tbody');
    //   }
    //   $('#ID').click(function() {
        
    //     sortTable(0, 'number');
    //   });
    //   $('#Name').click(function() {
    //     sortTable(1, 'text');
    //   });
    //   $('#PRX').click(function() {
    //     sortTable(2, 'text');
    //   });
    //   $('#CAT').click(function() {
    //     sortTable(3, 'text');
    //   });
    //   $('#DISP').click(function() {
    //     sortTable(4, 'text');
    //   });
    //   $('#FOUR').click(function() {
    //     sortTable(5, 'text');
    //   });

    var properties =[           // select all th from table to click
      'ID',
      'Name',
      'PRX',
      'Description',
      'Price',
      'CAT',
      'DISP',
      'FOUR'
    ];
    
    $.each( properties, function( i, val ) { // for each elemen in th list
      var orderClass = '';
    
      $("#" + val).click(function(e){
          e.preventDefault();
          $('.filter__link.filter__link--active').not(this).removeClass('filter__link--active'); // insure that the columns doesnt contain only nums 
            $(this).toggleClass('filter__link--active');
             $('.filter__link').removeClass('asc desc'); // keep track if the sorting is asciding or descending
    
             if(orderClass == 'desc' || orderClass == '') { // if sorting is --
                  $(this).addClass('asc'); // add this class of ascending ++ 
                  orderClass = 'asc';
             } else {
                 $(this).addClass('desc'); // else --
                 orderClass = 'desc';
             }
    
          var parent = $(this).closest('.header__item'); // Get the child elements of tbody
          var index = $(".header__item").index(parent); // get index number of parrent (TH)
          var $table = $('.table-content');
          var rows = $table.find('.table-row').get();
          var isSelected = $(this).hasClass('filter__link--active'); // sort by string
          var isNumber = $(this).hasClass('filter__link--number'); // sort by number
              
          rows.sort(function(a, b){
    
              var x = $(a).find('.table-data').eq(index).text(); // get text of td
              var y = $(b).find('.table-data').eq(index).text(); // get text of td to compare
                  
              if(isNumber == true) { // if the TD is number
                          
                  if(isSelected) {
                      return x - y;
                  } else {
                      return y - x;
                  }
    
              } else {
              
                  if(isSelected) {		 // if the TD is string
                      if(x < y) return -1;
                      if(x > y) return 1;
                      return 0;
                  } else {
                      if(x > y) return -1;
                      if(x < y) return 1;
                      return 0;
                  }
              }
              });
    
          $.each(rows, function(index,row) {
              $table.append(row); // append each row back to the table again
          });
    
          return false; // if something went wrong return nothing . 
      });
    
    });