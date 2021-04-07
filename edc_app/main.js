var previousItem;

$(function() {
 
    $("#jsGrid").jsGrid({
        height: "auto",
        width: "100%",
 
        filtering: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        //pageLoading: false,
        
        onItemUpdating: function(args) {
            //alert('grid update');
            previousItem = args.previousItem;
        },
        
        pageSize: 10,
        pageButtonCount: 5,
 
        deleteConfirm: "Do you really want to delete the client?",
 
        controller: {
            loadData: function(filter) {
                //alert(filter);
                //alert(!filter);
                console.log(filter);
                if(filter.name=="" && filter.id=="" && filter.crn=="" && !filter.consumption){
                    //console.log(filter);
                    var d = $.Deferred();
                    //alert('load');
                    $.ajax({
                        url: "http://192.168.1.141:8080/tickets",
                        type : "GET",
                        contentType : "application/json; charset=utf-8",
                        dataType: "json",
                        //data: filter
                    }).done(function(response) {
                        //alert('load-success');
                        d.resolve(response);
                        //d.resolve(response.result);
                        console.log(response);
                    }).fail(function() {
                        //alert('fail');
                        //d.resolve(previousItem);
                    });
                    
                    return d.promise();
                    
                    /*return $.get('http://localhost:8080/tickets', filter).then(function(response) {

                        var result = {
                            data: response,
                            itemsCount: response.length
                        }
                        
                        console.log(result);
                        return result;

                    });*/
                }
                else{
                    /*console.log(this.data);
                    var grid = $("#grid").data("JSGrid");
                    console.log(grid);
                    return $.grep(this.data, function (item) {
                        return (!filter.name || item.name.indexOf(filter.name) > -1)
                        && (!filter.id || item.id === filter.id)
                        && (!filter.crn || item.crn.indexOf(filter.crn) > -1)
                        && (!filter.consumption || item.consumption === filter.consumption);
                    });*/
                    
                    var d = $.Deferred();
                    //alert('load');
                    $.ajax({
                        url: "http://192.168.1.141:8080/filter",
                        type : "GET",
                        contentType : "application/json; charset=utf-8",
                        dataType: "json",
                        data: filter
                    }).done(function(response) {
                        //alert('load-success');
                        d.resolve(response);
                        //d.resolve(response.result);
                        console.log(response);
                    }).fail(function() {
                        //alert('fail');
                        //d.resolve(previousItem);
                    });
                    
                    return d.promise();
                }
            },
            
            updateItem: function(item) {
                //alert('update');
                //alert(item.consumption);
                /*return $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/save",
                    data: item
                });*/
                
                var d = $.Deferred();
 
                $.ajax({
                    url: "http://192.168.1.141:8080/save",
                    type : "POST",
                    data: item
                }).done(function(response) {
                    //alert('success');
                    d.resolve(response);
                    //d.resolve(response.result);
                    //alert(response);
                }).fail(function() {
                    //alert('fail');
                    d.resolve(previousItem);
                });
 
                return d.promise();
            },
        },
 
        fields: [
            { name: "id", type: "text", title: "الرقم القومي", editing: false, width: 90, autosearch: true },
            { name: "name", type: "text", title: "الاسم", editing: false, width: 150, autosearch: true },
             { name: "crn", type: "text", title: "CRN", editing: false, width: 200, autosearch: true },
            { name: "consumption", title: "الاستهلاك - كيلو وات", type: "number", width: 50, editcss: "edit", filtering: false,
             //editValue: function() { alert('200');return 200; }
            //editTemplate: function(value, item) {console.log(this);}
             editTemplate: function(value, item) {
                // To get the 'input' element.
                var $result = jsGrid.fields.text.prototype.editTemplate.call(this, value);
                // It only works with 'setTimeout' function.
                setTimeout(function() {
                    $result.focus();
                });
                return $result;
            }
            },
            { type: "control",deleteButton: false
                /*cellRenderer: function(value, item){
                    var $cell = $("<td>").addClass("jsgrid-cell jsgrid-control-field jsgrid-align-center").attr("style", "width: 50px");
                    var $btn = $("<input>").addClass("jsgrid-button jsgrid-edit-button").attr("type","button").attr("tabindex","0");

                    return $cell.append($btn);
                }*/
            }
        ]
    });
 
});