var previousItem;

////////translation///////////////

var nid,postpaid,prepaid,consumption;

var fields;

var url = new URL(window.location.href);
var lang = url.searchParams.get("language");
var role = url.searchParams.get("role");

console.log(role);

if(lang!=null && lang.indexOf("ar")>-1)
{
    document.getElementById("nav").className = "navbar navbar-light bg-light ar";
    document.getElementById("grid").className = "col-sm-12 grid ar"; 
    
    fields= [
            { name: "itemId", type: "text", title: "itemId", editing: false, visible: false, width: 90, autosearch: true },
            { name: "Id", type: "text", title: "Id", editing: false, visible: false, width: 90, autosearch: true },
            { name: "identity", type: "link", title: "الرقم القومي", editing: false, width: 90, autosearch: true, filtering: true },
            { name: "prepaid_num", type: "text", title: "كود الشحن", editing: false, width: 150, autosearch: true },
             { name: "postpaid_num", type: "text", title: "كود السداد الإلكتروني", editing: false, width: 200, autosearch: true },
            { name: "lifecycle", type: "text", title: "lifecycle", editing: false, width: 200, autosearch: true },
            { name: "consumption", title: "متوسط استهلاك الكهرباء - كيلووات", type: "consumption", width: 50, editcss: "edit", filtering: false, 
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
            },
            {
                headerTemplate: function() {
                    return $("<button>").attr("type", "button").text("Process")
                            .on("click", function () {
                                processSelectedItems();
                            });
                },
                itemTemplate: function(_, item) {
                    return $("<input>").attr("type", "checkbox")
                            .prop("checked", $.inArray(item, selectedItems) > -1)
                            .on("change", function () {
                                $(this).is(":checked") ? selectItem(item) : unselectItem(item);
                            });
                },
                align: "center",
                width: 50
            }
        ];
}
else{
    document.getElementById("nav").className = "navbar navbar-light bg-light"; 
    document.getElementById("grid").className = "col-sm-12 grid"; 
    
    fields= [
            { name: "itemId", type: "text", title: "itemId", editing: false, visible: false, width: 90, autosearch: true },
            { name: "Id", type: "text", title: "Id", editing: false, visible: false, width: 90, autosearch: true },
            { name: "identity", type: "link", title: "National ID", editing: false, width: 90, autosearch: true, filtering: true },
            { name: "prepaid_num", type: "text", title: "Prepaid No.", editing: false, width: 150, autosearch: true },
             { name: "postpaid_num", type: "text", title: "Digital Payment No.", editing: false, width: 200, autosearch: true },
            { name: "lifecycle", type: "text", title: "lifecycle", editing: false, width: 200, autosearch: true },
            { name: "consumption", title: "Consumption - Kilowatt", type: "consumption", width: 50, editcss: "edit", filtering: false, 
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
            },
            {
                headerTemplate: function() {
                    return $("<button>").attr("type", "button").text("Process")
                            .on("click", function () {
                                processSelectedItems();
                            });
                },
                itemTemplate: function(_, item) {
                    return $("<input>").attr("type", "checkbox")
                            .prop("checked", $.inArray(item, selectedItems) > -1)
                            .on("change", function () {
                                $(this).is(":checked") ? selectItem(item) : unselectItem(item);
                            });
                },
                align: "center",
                width: 50
            }
        ];
}



$.cordys.translation.getBundle("lang").done(function(mBundle) {
    //alert('translated');
    mBundle.translate("th",function() {
                var $this = $(this);
                $this.text(mBundle.getMessage($this.text()));
                /*
                eg. an input field like this:
                <input id="fldOrganization" placeholder="- Leave empty for default -"
                value=""/>
                will be translated for japanese to:
                <input id="fldOrganization" placeholder="- デフォルトの場合は空のままに-"
                value=""/>
                */
                });
    nid = mBundle.getMessage("identity","en");
    postpaid = mBundle.getMessage("postpaid_num");
    prepaid = mBundle.getMessage("prepaid_num");
    consumption = mBundle.getMessage("consumption");
    console.log(nid);
    console.log(postpaid);
    console.log(mBundle.getMessage("identity","en","US"));
    console.log(mBundle.getMessage("identity","US"));
    
    /*
    var url = new URL(window.location.href);
    var c = url.searchParams.get("language");
    console.log(c);
    alert(c);
    */
    
    //alert(nid);
}).fail(function(error) { //alert("Error " + error ); 
    console.log(error); });

////////custom_field//////////////

var IDField = function(config) {
    jsGrid.Field.call(this, config);
};
 
IDField.prototype = new jsGrid.Field({
 
    //css: "date-field",            // redefine general property 'css'
    align: "center",              // redefine general property 'align'
 
    //myCustomProperty: "foo",      // custom property
 
    /*sorter: function(date1, date2) {
        return new Date(date1) - new Date(date2);
    },*/
 
    itemTemplate: function(value,item) {
        //return new Date(value).toDateString();
        console.log(value);
        console.log(item);
        var url=window.location.href;
        url=url.substr(0,url.indexOf("/app"));
        console.log(url);
        return $("<a>").attr("href",url+'/app/start/web/item/'+item.itemId).attr("target","_blank").text(item.identity);
    },
 
    filterTemplate: function() { 
        return this._filterControl = $("<input>").attr("type","text");
    },
    
    filterValue: function() {
        return this._filterControl.val();
    }
    
});
 
jsGrid.fields.link = IDField;

////
function ConsumptionField(config) {
    jsGrid.NumberField.call(this, config);
}

ConsumptionField.prototype = new jsGrid.NumberField({

    itemTemplate: function(value) {
        return value;//.toFixed(2);
    },

    /*filterValue: function() {
        return parseFloat(this.filterControl.val() || 0);
    },*/

    insertValue: function() {
        return parseFloat(this.insertControl.val() || 0);
    },

    editValue: function() {
        return parseFloat(this.editControl.val() || 0);
    }

});

jsGrid.fields.consumption = ConsumptionField;


////////custom_field END//////////

$(function() {
 
    var previousUpdateItem;
    
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
        
        onItemUpdating: function(args) {
            previousUpdateItem=args.previousItem;
            
        },
        
        controller: {
            loadData: function(filter) {
                //alert(filter);
                //alert(!filter);
                console.log(filter);
                
                //&& !filter.consumption
                if(filter.prepaid_num=="" && filter.identity=="" && filter.postpaid_num=="" ){
                    //console.log(filter);
                    
                    var result;
                    var data;
                    //var arr=[{}];
                    var arr=new Array(0);
                    var d = $.Deferred();
                    
                    $.cordys.ajax({ method: "GetEDCApplications", namespace:
                        "http://schemas/BASSEGASProject/Application/operations"
                        //dataType: 'json'
                        }).done(function(employeesResponse) { // Show the employees on the screen
                        
                        console.log(employeesResponse);
                        
                       data=employeesResponse;
                        
                        $.each(data, function(k, v) {
                        //for (k in data) {
                            console.log(v);
                            var lifecycle_instance;
                            
                            if(k.indexOf("Application")>-1)
                                {
                                    $.each(v, function(key, val) {
                                        if(key.indexOf("Lifecycle")>-1)
                                            {
                                                lifecycle_instance=val.InstanceIdentifier;
                                                break;
                                            }
                                    }
                                           
                                    arr.push({
                                        "itemId":v['Application-id'].ItemId,
                                        "Id":v['Application-id'].Id,
                                        "identity":v.national_id,
                                        "prepaid_num":v.Member_Identification_Number,
                                        "postpaid_num":v.Digital_Payment_Number,
                                        "consumption":v.consumption,
                                        "lifecycle":lifecycle_instance
                                    });
                                }
                          });
                        
                        console.log(arr);
                        console.log(arr.length);
                        
                        d.resolve(arr);
                        
                        })/*.catch(function(error) {
                        console.log(error);
                        alert('Error '+error);
                        
                    })*/.fail(function(error) { alert("Error " + error + " in getting applications"); })
                   
                     
                    return d.promise();
                    
                }
                else{
                    /*
                    console.log(this.data);
                    var grid = $("#grid").data("JSGrid");
                    console.log(grid);
                    return $.grep(this.data, function (item) {
                        return (!filter.identity || item.identity.indexOf(filter.identity) > -1)
                        && (!filter.postpaid_num || item.postpaid_num === filter.postpaid_num)
                        && (!filter.prepaid_num || item.prepaid_num.indexOf(filter.prepaid_num) > -1); 
                //      && (!filter.consumption || item.consumption === filter.consumption);
                    });
                    */
                    
                    //////////////////
                    
                    
                        //var arr=[{}];
                        var arr=new Array(0);
                        var d = $.Deferred();

                        $.cordys.ajax({ method: "filterEDCApplications", namespace:
                            "http://schemas/BASSEGASProject/Application/operations",
                            parameters: { identity:filter.identity,
                                         postpaid:filter.postpaid_num,
                                         prepaid:filter.prepaid_num
                                    }           
                            //dataType: 'json'
                            }).done(function(employeesResponse) { // Show the employees on the screen

                            console.log(employeesResponse);

                           data=employeesResponse;

                            $.each(data, function(k, v) {
                            //for (k in data) {
                                console.log(v);
                                var lifecycle_instance;
                                if(k.indexOf("Application")>-1)
                                    {
                                        $.each(v, function(key, val) {
                                        if(key.indexOf("Lifecycle")>-1)
                                            {
                                                lifecycle_instance=val.InstanceIdentifier;
                                                break;
                                            }
                                        }
                                        
                                        arr.push({
                                            "itemId":v['Application-id'].ItemId,
                                            "Id":v['Application-id'].Id,
                                            "identity":v.national_id,
                                            "prepaid_num":v.Member_Identification_Number,
                                            "postpaid_num":v.Digital_Payment_Number,
                                            "consumption":v.consumption,
                                            "lifecycle":lifecycle_instance   
                                        });
                                    }
                              });

                            console.log(arr);
                            console.log(arr.length);

                            d.resolve(arr);

                            }).fail(function(error) { alert("Error " + error + " in getting applications"); })


                        return d.promise();
                    
                    ///////////////////
                }
            },
            
            updateItem: function(item){
                
            },
        },
 
        fields: fields
    });
 
    var selectedItems = [];
    
    var selectItem = function(item) {
        selectedItems.push(item);
    };
 
    var unselectItem = function(item) {
        selectedItems = $.grep(selectedItems, function(i) {
            return i !== item;
        });
    };
 
    var processSelectedItems = function() {
        if(!selectedItems.length || !confirm("Are you sure?"))
            return;
 
        processItems(selectedItems);
 
        var $grid = $("#jsGrid");
        $grid.jsGrid("option", "pageIndex", 1);
        $grid.jsGrid("loadData");
 
        selectedItems = [];
    };
 
    var processItems = function(selectedItems) {
        selectedItems.forEach(function (arrayItem) {
            
            
            $.cordys.case.sendEvent(arrayItem.lifecycle, "finalize"); //, activityid, options
            
            /*$.cordys.ajax({ method: "SendEvent", namespace:
                        "http://schemas.cordys.com/casemanagement/execution/1.0",
                        parameters: { "caseinstanceid":arrayItem.lifecycle,
                                    "event": "finalize"
                                    },
                        success: function(data, textStatus,jqXHR) {
                            console.log(data);
                            console.log(textStatus);
                            console.log(jqXHR);
                            
                            },
                        error: function(jqXHR, textStatus,errorThrown) {
                            console.log(textStatus);
                            console.log(jqXHR);
                            console.log(errorThrown);
                            alert('Error updating consumption');
                            
                            data = previousUpdateItem;
                            console.log(data);
                            
                        }      
                    });
            */
            
        });
    };
    
    
});