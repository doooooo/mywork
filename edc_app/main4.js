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
                if(filter.name=="" && filter.identity=="" && filter.crn=="" && !filter.consumption){
                    //console.log(filter);
                    /* empModel = new $.cordys.model({ objectName: "App", 
                                fields:[ "identity","name", "crn", "consumption"], 
                                defaults: { namespace: "http://schemas/BASSEGASProject/App/operations", 
                                           dataType: "json",
                                            method: "GetAllApps" }, 
                                read:{ method: "GetAllApps" } 
                            });
                    console.log(empModel);
                    
                     var result = {
                            data: empModel,
                            itemsCount: empModel.length
                        }
                        
                        console.log(result);
                        return result;
                    */
                    
                   
                    /*var d = $.Deferred();
                    
                    var empModel = new $.cordys.model({ objectName: "App", 
                                fields:[ "identity","name", "crn", "consumption"], 
                                defaults: { namespace: "http://schemas/BASSEGASProject/App/operations", 
                                           //dataType: "json",
                                            method: "GetAllApps" }, 
                                read:{ method: "GetAllApps" } 
                            });
                    */
                    /*console.log(empModel.read());
                    
                    empModel.read().promise().then(function(result) {
                        console.log(result);
                    });
                    
                    empModel.read().done(function(response) {
                        //alert('load-success');
                        //d.resolve(response);
                        //d.resolve(response.result);
                        console.log(response);
                    }).then(function(t,n,r) {
                        console.log(t);
                        console.log(n);
                        console.log(r);
                    }).fail(function() {
                        //alert('fail');
                        //d.resolve(previousItem);
                    });*/
                    
                    //return empModel.read().promise();*/
                    
                   // console.log(d.promise());
                    
                    /* console.log(empModel.read().catch(function(error) {
                        console.log(error);
                        
                    }));*/
                    
                    var result;
                    var data;
                    //var arr=[{}];
                    var arr=new Array(0);
                    var d = $.Deferred();
                    
                    $.cordys.ajax({ method: "GetAllApps", namespace:
                        "http://schemas/BASSEGASProject/App/operations"
                        //dataType: 'json'
                        }).done(function(employeesResponse) { // Show the employees on the screen
                        
                        console.log(employeesResponse);
                        
                       data=employeesResponse;
                        
                        $.each(data, function(k, v) {
                        //for (k in data) {
                            console.log(v);
                            if(k.indexOf("App")>-1)
                                {
                                    arr.push({
                                        "itemId":v['App-id'].ItemId,
                                        "Id":v['App-id'].Id,
                                        "identity":v.identity,
                                        "name":v.name,
                                        "crn":v.crn,
                                        "consumption":v.consumption
                                    });
                                }
                          });
                        
                        console.log(arr);
                        console.log(arr.length);
                        
                        d.resolve(arr);
                        
                        /*result = {
                            data: arr,
                            itemsCount: arr.length
                        }
                        
                    
                        console.log(result);

                        return result;*/ 
                        
                        //var json = $.cordys.json.xml2js(data);
                        
                       // console.log(json);
                        
                       
                       
                        }).catch(function(error) {
                        console.log(error);
                        alert('Error '+error);
                        
                    }).fail(function(error) { alert("Error " + error + " in getting Employees"); })
                   
                     
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
                    
                    //////////////////
                    
                    
                    empModel = new $.cordys.model({ objectName: "App", 
                                fields:[ "identity","name", "crn", "consumption"], 
                                defaults: { namespace: "http://schemas/BASSEGASProject/App/operations", 
                                           dataType: "json",
                                            method: "GetAllApps" }, 
                                read:{ method: "GetAllApps" } 
                            });
                    console.log(empModel);
                    
                     var result = {
                            data: empModel,
                            itemsCount: empModel.length
                        }
                        
                        console.log(result);
                        return result;
                    ///////////////////
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
 
                /*$.cordys.ajax({ method: "UpdateApp", namespace:
                        "http://schemas/BASSEGASProject/App/operations",
                        parameters: { "App-id":{Id:"",ItemId:item.itemId},
                                    consumption:item.consumption,
                                    name: item.name,
                                    crn: item.crn,
                                    identity: item.identity }       
                        //dataType: 'json'
                        }).done(function(employeesResponse) { // Show the employees on the screen
                        
                        console.log(item.name);
                        console.log(employeesResponse);
                        d.resolve(employeesResponse);
                       
                        }).catch(function(error) {
                        console.log(error);
                        alert('Error '+error);
                        
                    }).fail(function(error) { 
                    console.log(error);
                    alert("Error " + error + " in getting Employees"); });*/
                   
                    
                $.cordys.ajax({ method: "UpdateApp", namespace:
                        "http://schemas/BASSEGASProject/App/operations",
                        parameters: { "App-id":{Id:item.Id,ItemId:item.itemId},
                                    "App-update": {consumption:""+item.consumption,
                                        name: item.name,
                                        crn: item.crn,
                                        identity: item.identity }
                                    },
                        success: function(data, textStatus,jqXHR) {
                            console.log(data);
                            console.log(textStatus);
                            console.log(jqXHR);
                            //d.resolve(data);   
                        },
                        error: function(jqXHR, textStatus,errorThrown) {
                            console.log(textStatus);
                            console.log(jqXHR);
                            console.log(errorThrown);
                        }      
                    });
                         
                    var data={ consumption:item.consumption,
                                    name: item.name,
                                    crn: item.crn,
                                    identity: item.identity }
                    
                    d.resolve(data); 
                    return d.promise();
            },
        },
 
        fields: [
            { name: "itemId", type: "text", title: "itemId", editing: false, visible: false, width: 90, autosearch: true },
            { name: "Id", type: "text", title: "Id", editing: false, visible: false, width: 90, autosearch: true },
            { name: "identity", type: "text", title: "الرقم القومي", editing: false, width: 90, autosearch: true },
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