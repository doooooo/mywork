var previousItem;

var apps = [
        { "name": "Otto Clay", "crn": "3434343", "itemId": "Ap #897-1459 Quam Avenue", "Id": "#897-1459", "identity": "12334" },
        { "name": "Otto Clay", "crn": "3434343", "itemId": "Ap #897-1459 Quam Avenue", "Id": "#897-1459", "identity": "12334" },
        { "name": "Otto Clay", "crn": "3434343", "itemId": "Ap #897-1459 Quam Avenue", "Id": "#897-1459", "identity": "12334" },
        { "name": "Otto Clay", "crn": "3434343", "itemId": "Ap #897-1459 Quam Avenue", "Id": "#897-1459", "identity": "12334" },
        { "name": "Otto Clay", "crn": "3434343", "itemId": "Ap #897-1459 Quam Avenue", "Id": "#897-1459", "identity": "12334" },
        { "name": "Otto Clay", "crn": "3434343", "itemId": "Ap #897-1459 Quam Avenue", "Id": "#897-1459", "identity": "12334" }
    ];


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
        
        data: apps,
        
        //rowDoubleClick
        /*rowClick: function(args) {
            showDetailsDialog("Edit", args.item);
        },*/
        
        controller: {
            
            
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
    
    
    $("#detailsDialog").dialog({
        autoOpen: false,
        width: 400,
        close: function() {
            $("#detailsForm").validate().resetForm();
            $("#detailsForm").find(".error").removeClass("error");
        }
    });

/*$("#detailsForm").validate({
        rules: {
            name: "required",
            age: { required: true, range: [18, 150] },
            address: { required: true, minlength: 10 },
            country: "required"
        },
        messages: {
            name: "Please enter name",
            age: "Please enter valid age",
            address: "Please enter address (more than 10 chars)",
            country: "Please select country"
        },
        submitHandler: function() {
            formSubmitHandler();
        }
    });*/

var showDetailsDialog = function(dialogType, client) {
    alert('Hi');
        $("#name").val(client.name);
        $("#crn").val(client.crn);
        $("#Id").val(client.Id);
        $("#consumption").val(client.consumption);
 
        formSubmitHandler = function() {
            saveClient(client, dialogType === "Add");
        };
 
        $("#detailsDialog").dialog("option", "title", dialogType + " Client")
                .dialog("open");
    };
 
});



