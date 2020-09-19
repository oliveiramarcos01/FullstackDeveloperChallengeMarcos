(function (a) {

    a.get("/api/clients", function(data, status){
        console.log(data);

        a("#template-data").html(Mustache.render("{{#data}}<tr><td><img src='{{picture}}' class='rounded-circle'/></td><td>{{name}}</td><td>{{balance}}</td><td class='date_format sorter-shortDate dateFormat-ddmmyyyy'>{{registered}}</td></tr>{{/data}}", {data:data}))

        var longDateFormat = 'dd/MM/yyyy';
        a(".date_format").each(function (idx, elem) {
            if (a(elem).is(":input")) {
                a(elem).val(DateFormat.format.date(a(elem).val(), longDateFormat));
            } else {
                a(elem).text(DateFormat.format.date(a(elem).text(), longDateFormat));
            }
        });

        a("table").tablesorter({
            theme : "bootstrap", 
            widthFixed: true,
            // widget code contained in the jquery.tablesorter.widgets.js file
            // use the zebra stripe widget if you plan on hiding any rows (filter widget)
            widgets : [ "filter", "columns", "zebra" ],
            dateFormat : "ddmmyyyy",
            widgetOptions : {
              // using the default zebra striping class name, so it actually isn't included in the theme variable above
              // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
              zebra : ["even", "odd"],
        
              // class names added to columns when sorted
              columns: [ "primary", "secondary", "tertiary" ],
        
              // reset filters button
              filter_reset : ".reset",
        
              // extra css class name (string or array) added to the filter element (input or select)
              filter_cssFilter: [
                'form-control input-off',
                'form-control search-input',
                'form-control input-off',
                'form-control input-off',
              ]
        
            }
          })
          .tablesorterPager({
        
            // target the pager markup - see the HTML block below
            container: $(".ts-pager"),
        
            // target the pager page select dropdown - choose a page
            cssGoto  : ".pagenum",
        
            // remove rows from the table to speed up the sort of large tables.
            // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
            removeRows: false,
        
            // output string - default is '{page}/{totalPages}';
            // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
            output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
        
          });

        a('.search-input').attr("placeholder", "Buscar...");
    });    


})(jQuery);