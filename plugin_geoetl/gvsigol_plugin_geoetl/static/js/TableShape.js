var jsonParams = []

var formData = new FormData();

var listLabel=[]

function getPerAttr(){
    var memento= this._super();
    
    for (i = 0; i < jsonParams.length; i++) {
        if(this.id == jsonParams[i]["id"]){
            var parametros = jsonParams[i]
            break
        }
    }

    memento.name = this.classLabel.getText();
    memento.entities   = [];
    
    try{
        
        this.children.each(function(i,e){
            
            if(i>0){ // skip the header of the figure
                memento.entities.push({
                    text:e.figure.getText(),
                    id: e.figure.id,
                    parameters: parametros["parameters"],
                    schema: parametros["schema"],
                    schemaold: parametros["schema-old"]
                });
            }
        });

        
        return memento;
    }
    catch{

    }
};

function isAlreadyInCanvas(jsonParams, jsonTask, ID){

    if(jsonParams.length == 0){

        jsonParams.push(jsonTask)

    } else {

        is = false

        for (i = 0; i < jsonParams.length; i++) {

            if(ID == jsonParams[i]["id"]){

                jsonParams[i] = jsonTask
                is = true
                break;

            };
        };

        if(is == false) {

            jsonParams.push(jsonTask)
        };
    };
};

function setColorIfIsOpened(jsonParams, type, ID, icon){
    setTimeout(function(){
        
        for(k=0;k<jsonParams.length;k++){
            if (jsonParams[k]['id'] == ID){

                if (type.startsWith('input')){ 
                    icon.setColor('#01b0a0')
                }else if (type.startsWith('output')){ 
                    icon.setColor("#e79600")
                }else if (type.startsWith('trans')){ 
                    icon.setColor("#4682B4")
                }
                break;
            }
        } },1)

};

function getPathFile(fileType, ID){
    $('#select-file-button-'+ID).click(function (e) {
        window.open("/gvsigonline/filemanager/?popup=1","Ratting","width=640, height=480,left=150,top=200,toolbar=0,status=0,scrollbars=1");
    });
    
    window.filemanagerCallback = function(url) {
        $("#"+fileType+"-file-"+ID).val("file://" + fm_directory + url)
    }
};


////////////////////////////////////////////////  INPUTS /////////////////////////////////////////////////////////
//// INPUT CSV ////
input_Csv = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "input_Csv",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
      
        this.classLabel = new draw2d.shape.basic.Label({
            text:"CSV", 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#83d0c9", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
       
        var icon = new draw2d.shape.icon.Gear({ 
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)


        $('#canvas-parent').append('<div id="dialog-input-csv-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title">'+gettext('CSV Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column20">'+
                                '<label class="col-form-label" >'+gettext('Choose csv file:')+'</label><br>'+
                                '<a href="#" id="select-file-button-'+ID+'" class="btn btn-default btn-sm"><i class="fa fa-folder-open margin-r-5"></i>'+gettext('Select file')+'</a>'+
                            '</div>'+ 
                            '<div class="column60">'+
                            '<label class="col-form-label" >'+gettext('Path:')+'</label>'+
                                '<input type="text" id="csv-file-'+ID+'" name="file" class="form-control"></input>'+
                            '</div>'+ 
                            '<div class="column20">'+
                                '<label class="col-form-label">'+gettext('Separator:')+'</label>'+
                                '<select class="form-control" id="separator-'+ID+'">'+
                                    '<option value=";"> ; </option>'+
                                    '<option value=","> , </option>'+
                                '</select>'+
                            '</div>'+ 
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="input-csv-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        getPathFile('csv', ID)

        var context = this

        icon.on("click", function(){

            $('#dialog-input-csv-'+ID).modal('show')

            $('#input-csv-accept-'+ID).click(function() {

                var paramsCSV = {"id": ID,
                "parameters": [
                    {"csv-file": $('#csv-file-'+ID).val(),
                    "separator": $('#separator-'+ID).val()}
                ]}

                var formDataSchemaCSV = new FormData();

                formDataSchemaCSV.append('jsonParamsCSV', JSON.stringify(paramsCSV))

                $.ajax({
					type: 'POST',
					url: '/gvsigonline/etl/etl_schema_csv/',
					data: formDataSchemaCSV,
					beforeSend:function(xhr){
						xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
					},
					cache: false, 
                    contentType: false, 
                    processData: false,
					success: function (data) {
                        paramsCSV['schema'] = data
                        
                        passSchemaToEdgeConnected(ID, listLabel, data, context.canvas)
                        }
                    })
        
                isAlreadyInCanvas(jsonParams, paramsCSV, ID)

                icon.setColor('#01b0a0')
                
                $('#dialog-input-csv-'+ID).modal('hide')
            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(optionalIndex)
    {
	   	 var label =new draw2d.shape.basic.Label({
	   	     text:gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:40, top:3, right:10, bottom:5},
	   	     fontColor:"#009688",
             resizeable:true
	   	 });

	     var output= label.createPort("output");
	     
         output.setName("output_"+label.id);
         
	     if($.isNumeric(optionalIndex)){
             this.add(label, null, optionalIndex+1);
	     }
	     else{
	         this.add(label);
	     }
         
         listLabel.push([this.id, [], [output.name]])
         
         return label;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// INPUT EXCEL ////

input_Excel = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "input_Excel",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3, width:1},attr));
        
        this.classLabel = new draw2d.shape.basic.Label({
            text:"Excel", 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#83d0c9", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });

        var icon = new draw2d.shape.icon.Gear({ 
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-input-excel-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title">'+gettext('Excel Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column20">'+
                                '<label for ="excel-file" class="col-form-label">'+gettext('Choose excel file:')+'</label><br>'+
                                '<a href="#" id="select-file-button-'+ID+'" class="btn btn-default btn-sm"><i class="fa fa-folder-open margin-r-5"></i>'+gettext('Select file')+'</a><br>'+
                            '</div>'+
                            '<div class="column80">'+
                                '<label class="col-form-label" >'+gettext('Path:')+'</label>'+
                                '<input type="text" id="excel-file-'+ID+'" name="file" class="form-control"></input>'+
                            '</div>'+
                            '<div class="column20">'+
                                '<label for ="excel-file" class="col-form-label">'+gettext('Load sheets')+':</label><br>'+
                                '<a href="#" id="get-sheets-'+ID+'" class="btn btn-default btn-sm"><i class="fa fa-file-excel-o margin-r-5"></i>'+gettext('Load sheets')+'</a><br>'+
                            '</div>'+
                            '<div class="column80">'+
                                '<label form="sheet-name" class="col-form-label">'+gettext('Sheet:')+'</label>'+
                                '<select class="form-control" id="sheet-name-'+ID+'"> </select>'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="usecols" class="col-form-label">'+gettext('Attribute columns:')+'</label>'+
                                '<input id="usecols-'+ID+'" type="text" value="" size="40" class="form-control" pattern="[A-Za-z]{3}" placeholder="A:H">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="header" class="col-form-label">'+gettext('Skip header:')+'</label>'+
                                '<input type="number" id="header-'+ID+'" value=0 min="0" class="form-control" pattern="^[0-9]+">'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="input-excel-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        getPathFile('excel', ID)

        var context = this

        icon.on("click", function(){

            $('#dialog-input-excel-'+ID).modal('show')

            $('#get-sheets-'+ID).on("click", function(){
                                
                var formDataSheetExcel = new FormData();

                formDataSheetExcel.append('file', $('#excel-file-'+ID).val())

                $.ajax({
					type: 'POST',
					url: '/gvsigonline/etl/etl_sheet_excel/',
					data: formDataSheetExcel,
					beforeSend:function(xhr){
						xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
					},
					cache: false, 
                    contentType: false, 
                    processData: false,
					success: function (data) {

                        $('#sheet-name-'+ID).empty()

                        for (i = 0; i < data.length; i++){
                            $('#sheet-name-'+ID).append('<option>'+data[i]+'</option>')

                        }
                    }
                })
            });

            $('#input-excel-accept-'+ID).click(function() {
                
                var paramsExcel = {"id": ID,
                "parameters": [
                    { "excel-file": $('#excel-file-'+ID).val(),
                    "sheet-name": $('#sheet-name-'+ID).val(),
                    "usecols": $('#usecols-'+ID).val(),
                    "header": $('#header-'+ID).val() }
                ]}

                var formDataSchemaExcel = new FormData();
                
                formDataSchemaExcel.append('jsonParamsExcel', JSON.stringify(paramsExcel))

                $.ajax({
					type: 'POST',
					url: '/gvsigonline/etl/etl_schema_excel/',
					data: formDataSchemaExcel,
					beforeSend:function(xhr){
						xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
					},
					cache: false, 
                    contentType: false, 
                    processData: false,
					success: function (data) {
                        paramsExcel['schema'] = data
                        passSchemaToEdgeConnected(ID, listLabel, data, context.canvas)
                        
                        }
                    })
                
                isAlreadyInCanvas(jsonParams, paramsExcel, ID)

                icon.setColor('#01b0a0')

                $('#dialog-input-excel-'+ID).modal('hide')
            })
        })
    },
    
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(optionalIndex)
    {
	   	 var label =new draw2d.shape.basic.Label({
	   	     text: gettext('Input'),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:40, top:3, right:10, bottom:5},
	   	     fontColor:"#009688",
	   	     resizeable:true
	   	 });

	     var output= label.createPort("output");
         
         output.setName("output_"+label.id);
         
	     if($.isNumeric(optionalIndex)){
             this.add(label, null, optionalIndex+1);
	     }
	     else{
	         this.add(label);
         }
         
         listLabel.push([this.id, [], [output.name]])

         return label;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }

});

//// INPUT SHAPEFILE ////

input_Shp = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "input_Shp",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
      
        this.classLabel = new draw2d.shape.basic.Label({
            text:"Shapefile", 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#83d0c9", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
       
        var icon = new draw2d.shape.icon.Gear({ 
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-input-shp-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title">'+gettext('Shapefile Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column20">'+
                                '<label for ="shp-file" class="col-form-label">'+gettext('Choose shapefile:')+'</label><br>'+
                                '<a href="#" id="select-file-button-'+ID+'" class="btn btn-default btn-sm"><i class="fa fa-folder-open margin-r-5"></i>'+gettext('Select file')+'</a><br>'+
                            '</div>'+
                            '<div class="column60">'+
                                '<label class="col-form-label" >'+gettext('Path:')+'</label>'+
                                '<input type="text" id="shp-file-'+ID+'" name="file" class="form-control"></input>'+
                            '</div>'+
                            '<div class="column20">'+
                                '<label class="col-form-label">EPSG:</label>'+
                                '<input id="epsg-'+ID+'" type="text" size="40" value="" class="form-control" placeholder="'+gettext('Insert if PRJ is not loaded')+'">'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="input-shp-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        getPathFile('shp', ID)

        var context = this

        icon.on("click", function(){

            $('#dialog-input-shp-'+ID).modal('show')

            $('#input-shp-accept-'+ID).click(function() {

                var paramsSHP = {"id": ID,
                "parameters": [
                { "shp-file": $('#shp-file-'+ID).val(),
                    "epsg": $('#epsg-'+ID).val()}
                ]}

                

                var formDataSchemaShape = new FormData();
                formDataSchemaShape.append('file', $('#shp-file-'+ID).val())
                

                /*for (i = 0; i < $('#shp-file-'+ID)[0].files.length; i++) {

                    formData.append(ID+'_'+i, $('#shp-file-'+ID)[0].files[i])
                    formDataSchemaShape.append('file_'+i, $('#shp-file-'+ID)[0].files[i])

                    paramsSHP = paramsSHP+'{"shp-file_'+i+'":"'+$('#shp-file-'+ID)[0].files[i].name+'"},'

                }

                paramsSHP = paramsSHP.slice(0,-1) + ']}'
                
                var jsonParamsSHP = JSON.parse(paramsSHP)*/

                $.ajax({
					type: 'POST',
					url: '/gvsigonline/etl/etl_schema_shape/',
					data: formDataSchemaShape,
					beforeSend:function(xhr){
						xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
					},
					cache: false, 
                    contentType: false, 
                    processData: false,
					success: function (data) {
                        paramsSHP['schema'] = data
                        passSchemaToEdgeConnected(ID, listLabel, data, context.canvas)
                        }
                    })
        
                isAlreadyInCanvas(jsonParams, paramsSHP, ID)

                icon.setColor('#01b0a0')
                
                $('#dialog-input-shp-'+ID).modal('hide')
            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(optionalIndex)
    {
	   	 var label =new draw2d.shape.basic.Label({
	   	     text:gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:40, top:3, right:10, bottom:5},
	   	     fontColor:"#009688",
             resizeable:true
	   	 });

	     var output= label.createPort("output");
	     
         output.setName("output_"+label.id);
         
	     if($.isNumeric(optionalIndex)){
             this.add(label, null, optionalIndex+1);
	     }
	     else{
	         this.add(label);
	     }
         
         listLabel.push([this.id, [], [output.name]])
         
         return label;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});
////////////////////////////////////////////////  TRANSFORMERS /////////////////////////////////////////////////////////
//// JOIN ////

trans_Join = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_Join",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext('Join'), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({ 
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-join-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext('Join Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column50">'+
                                '<label form="attr1" class="col-form-label">'+gettext('Main table attribute:')+'</label>'+
                                '<select class="form-control" id="attr1-'+ID+'"> </select>'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="attr2" class="col-form-label">'+gettext('Secondary table attribute:')+'</label>'+
                                '<select class="form-control" id="attr2-'+ID+'"> </select>'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="join-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')
        
        context = this

        icon.on("click", function(){
            
            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge
                   
                    $('#attr1-'+ID).empty()
                    $('#attr2-'+ID).empty()

                    for (i = 0; i < schema[0].length; i++){
                        $('#attr1-'+ID).append('<option>'+schema[0][i]+'</option>')
                    }
                    for (i = 0; i < schema[1].length; i++){
                        $('#attr2-'+ID).append('<option>'+schema[1][i]+'</option>')
                    }
                }

            },100);

            $('#dialog-join-'+ID).modal('show')

            $('#join-accept-'+ID).click(function() {

                var paramsJoin = {"id": ID,
                "parameters": [
                    {"attr1": $('#attr1-'+ID).val(),
                    "attr2": $('#attr2-'+ID).val()}
                ]}

                paramsJoin['schema-old'] = schemaEdge

                if (Array.isArray(schema[0])){
                    schemaMod = [schema[0].concat(schema[1]), schema[0],schema[1]]
                }
                else{
                    schemaMod = [...schema]
                }

                paramsJoin['schema'] = schemaMod

                passSchemaToEdgeConnected(ID, listLabel, schemaMod, context.canvas)

                isAlreadyInCanvas(jsonParams, paramsJoin, ID)

                icon.setColor('#4682B4')
                
                $('#dialog-join-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext('Input Main'),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext('Input Sec.'),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:10, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

        var label3 =new draw2d.shape.basic.Label({
            text: gettext('Join'),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

        var label4 =new draw2d.shape.basic.Label({
            text: gettext("Main Not Used"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

        var label5 =new draw2d.shape.basic.Label({
            text: gettext("Sec. Not Used"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

        var input1 = label1.createPort("input");
        input1.setName("input_"+label1.id);

        var input2 = label2.createPort("input");
        input2.setName("input_"+label2.id);

	    var output1= label3.createPort("output");
        output1.setName("output_"+label3.id);

	    var output2= label4.createPort("output");
        output2.setName("output_"+label4.id);

	    var output3= label5.createPort("output");
        output3.setName("output_"+label5.id);

	    if($.isNumeric(optionalIndex)){
            this.add(label1, null, optionalIndex+1);
            this.add(label2, null, optionalIndex+1);
            this.add(label3, null, optionalIndex+1);
            this.add(label4, null, optionalIndex+1);
            this.add(label5, null, optionalIndex+1);
	    }
	    else{
            this.add(label1);
            this.add(label2);
            this.add(label3);
            this.add(label4);
            this.add(label5);
        }
         
        listLabel.push([this.id, [input1.name, input2.name], [output1.name, output2.name, output3.name]])

	    return label1, label2, label3, label4, label5;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     

     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// REMOVE ATTRIBUTE ////

trans_RemoveAttr = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_RemoveAttr",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Remove Attribute"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        //adding dialog for choosing parameters of the transformer
        $('#canvas-parent').append('<div id="dialog-remove-attr-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext('Remove Attribute Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<label form="attr" class="col-form-label">'+gettext('Attribute to remove:')+'</label>'+
                            '<select class="form-control" id="attr-'+ID+'"> </select>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="remove-attr-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        context = this

        icon.on("click", function(){

            setTimeout(function(){
                
                try{
                    // if it's not the first time opening parameters dialog
                    //json figure task will has already the schemas
                    //old is the schema that came from the edge
                    //the other one is result schema depending of parameters chosen
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                //get schema from the edge
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                //if edge schema and old schema is not the same is the first time you open parameters or
                //something was changed in the edge so we hace to create a new schema option
                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge
                    $('#attr-'+ID).empty()

                    for (i = 0; i < schema.length; i++){
                        
                        $('#attr-'+ID).append('<option>'+schema[i]+'</option>')
                    }
                }

            },100);
            

            $('#dialog-remove-attr-'+ID).modal('show')

            $('#remove-attr-accept-'+ID).click(function() {

                //parameters selected to json
                var paramsRemove = {"id": ID,
                "parameters": [
                {"attr": $('#attr-'+ID).val()}
                ]}

                //schema handling depending the parameters chosen
                //this case we remove an attribute
                schemaMod =[...schema]
                schemaMod.splice($('#attr-'+ID).prop('selectedIndex'), 1)
                
                //updating schema-old and schema parameters in json
                paramsRemove['schema-old'] = schemaEdge
                paramsRemove['schema'] = schemaMod

                //add the schema to a later edge if it exists
                passSchemaToEdgeConnected(ID, listLabel, schemaMod, context.canvas)
                
                //check if parameters are already in json canvas
                isAlreadyInCanvas(jsonParams, paramsRemove, ID)

                //set red color to another in order to know if parameters are checked
                icon.setColor('#4682B4')
                
                $('#dialog-remove-attr-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("Output"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

	     var output= label2.createPort("output");
         output.setName("output_"+label2.id);

	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
	     }
	     else{
             this.add(label1);
             this.add(label2);
         }
         
         listLabel.push([this.id, [input.name], [output.name]])

	     return label1, label2;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes :getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// RENAME ATTRIBUTE ////

trans_RenameAttr = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "trans_RenameAttr",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Rename Attribute"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({ 
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-rename-attr-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext("Rename Attribute Parameters")+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('Attribute to rename:')+'</label>'+
                                '<select class="form-control" id="old-attr-'+ID+'"> </select>'+
                            '</div>'+
                            '<div class="column50">'+
                            '<label class="col-form-label">'+gettext('New name:')+'</label>'+
                                '<input id="new-attr-'+ID+'" type="text" size="40" value="" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('New name')+'">'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="rename-attr-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')
        
        context = this

        icon.on("click", function(){

            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge
                    $('#old-attr-'+ID).empty()

                    for (i = 0; i < schema.length; i++){
                        
                        $('#old-attr-'+ID).append('<option>'+schema[i]+'</option>')
                    }
                }

            },100);

            $('#dialog-rename-attr-'+ID).modal('show')

            $('#rename-attr-accept-'+ID).click(function() {
                
                var paramsRename = {"id": ID,
                "parameters": [
                    {"old-attr": $('#old-attr-'+ID).val(),
                    "new-attr": $('#new-attr-'+ID).val() }
                ]}

                schemaMod =[...schema]
                schemaMod.splice($('#old-attr-'+ID).prop('selectedIndex'), 1, $('#new-attr-'+ID).val())

                paramsRename['schema-old'] = schemaEdge
                paramsRename['schema'] = schemaMod


                passSchemaToEdgeConnected(ID, listLabel, schemaMod, context.canvas)

                isAlreadyInCanvas(jsonParams, paramsRename, ID)

                icon.setColor('#4682B4')
                
                $('#dialog-rename-attr-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("Output"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

	     var output= label2.createPort("output");
         output.setName("output_"+label2.id);

	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
	     }
	     else{
             this.add(label1);
             this.add(label2);
	     }

         listLabel.push([this.id, [input.name], [output.name]])

	     return label1, label2;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// MODIFY VALUE ATTRIBUTE ////

trans_ModifyValue = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_ModifyValue",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Modify Value"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-modify-value-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext('Modify Value Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('Attribute to modify:')+'</label>'+
                                '<select class="form-control" id="attr-'+ID+'"> </select>'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('New value:')+'</label>'+
                                '<input id="value-'+ID+'" type="text" size="40" value="" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('New attribute value')+'">'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="modify-value-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')
        
        context = this

        icon.on("click", function(){
            
            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge
                    $('#attr-'+ID).empty()

                    for (i = 0; i < schema.length; i++){
                        
                        $('#attr-'+ID).append('<option>'+schema[i]+'</option>')
                    }
                }

            },100);
            

            $('#dialog-modify-value-'+ID).modal('show')

            $('#modify-value-accept-'+ID).click(function() {

                var paramsModifyValue = {"id": ID,
                "parameters": [
                    {"attr": $('#attr-'+ID).val(),
                    "value": $('#value-'+ID).val() }
                ]}

                paramsModifyValue['schema-old'] = schemaEdge
                paramsModifyValue['schema'] = schema

                passSchemaToEdgeConnected(ID, listLabel, schema, context.canvas)
                isAlreadyInCanvas(jsonParams, paramsModifyValue, ID)

                icon.setColor('#4682B4')
                
                $('#dialog-modify-value-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("Output"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

	     var output= label2.createPort("output");
         output.setName("output_"+label2.id);

	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
	     }
	     else{
             this.add(label1);
             this.add(label2);
         }
         
         listLabel.push([this.id,[input.name], [output.name]])

	     return label1, label2;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes :getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// COUNTER ////

trans_Counter = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_Counter",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Counter"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-counter-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext('Counter Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('New counter attribute:')+'</label>'+
                                '<input id="attr-'+ID+'" type="text" size="40" value="count" class="form-control" pattern="[A-Za-z]{3}">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('Group by:')+'</label>'+
                                '<select class="form-control" id="group-by-attr-'+ID+'"> </select>'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="counter-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')
        
        context = this

        icon.on("click", function(){
            
            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge
                    $('#group-by-attr-'+ID).empty()
                    $('#group-by-attr-'+ID).append('<option> </option>')

                    for (i = 0; i < schema.length; i++){
                        
                        $('#group-by-attr-'+ID).append('<option>'+schema[i]+'</option>')
                    }
                }

            },100);
            

            $('#dialog-counter-'+ID).modal('show')

            $('#counter-accept-'+ID).click(function() {

                var paramsCounter = {"id": ID,
                "parameters": [
                    {"attr": $('#attr-'+ID).val(),
                    "group-by-attr": $('#group-by-attr-'+ID).val()}
                ]}

                schemaMod =[...schema]
                
                schemaMod.push($('#attr-'+ID).val())
               
                paramsCounter['schema'] = schemaMod
                paramsCounter['schema-old'] = schemaEdge

                passSchemaToEdgeConnected(ID, listLabel, schemaMod, context.canvas)
                isAlreadyInCanvas(jsonParams, paramsCounter, ID)

                icon.setColor('#4682B4')
                
                $('#dialog-counter-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("Output"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

	     var output= label2.createPort("output");
         output.setName("output_"+label2.id);

	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
	     }
	     else{
             this.add(label1);
             this.add(label2);
         }
         
         listLabel.push([this.id,[input.name], [output.name]])

	     return label1, label2;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     

     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes :getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// CALCULATOR ////

trans_Calculator = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_Calculator",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Calculator"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-calculator-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext('Calculator Parameters')+'</h4>'+
                    '</div>'+
                    '<div  class="modal-body">'+
                        '<form>'+
                            '<div class="column33">'+
                                '<label class="col-form-label">'+gettext('Attribute:')+'</label>'+
                                '<select class="form-control" id="attr-'+ID+'"> </select>'+
                                '<label class="col-form-label">'+gettext('Math functions:')+'</label>'+
                                '<div id ="functions-calculator">'+
                                    '<ul id ="functions-'+ID+'" class="nav flex-column">'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="+">&#43;</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="-">&#8722;</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="*">&#215;</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="/">&#247;</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="math.sqrt()">&#8730;x</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="math.pow()">x&#178;</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="math.sin()">sin(x)</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="math.cos()">cos(x)</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="math.tan()">tan(x)</a>'+
                                        '</li>'+
                                        '<li class="nav-item">'+
                                            '<a class="nav-link active" name="math.pi">&#960;</a>'+
                                        '</li>'+
                                    '</ul>'+
                                '</div><br><br><br><br><br><br><br><br><br><br>'+

                                '<label class="col-form-label">'+gettext('Attributes:')+'</label>'+
                                '<div id ="schema-calculator">'+
                                    '<ul id ="schema-calculator-'+ID+'" class="nav flex-column">'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                            '<div class="column66">'+
                                '<label class="col-form-label"><a href="https://www.w3schools.com/python/module_math.asp" target="_blank">'+gettext('Expression:')+'</a></label>'+
                                '<textarea id="expression-'+ID+'" rows="20" class="form-control" placeholder="'+gettext('For more math functions check above link.')+'"></textarea>'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="calculator-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')
        

        
        context = this

        icon.on("click", function(){
            
            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                    
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge

                    $('#attr-'+ID).empty()
                    $('#schema-calculator-'+ID).empty()

                    for (i = 0; i < schema.length; i++){
                        $('#attr-'+ID).append('<option>'+schema[i]+'</option>')
                        $('#schema-calculator-'+ID).append('<li class="nav-item"><a class="nav-link active">'+schema[i]+'</a></li>')
                    }
                //this else only for this transformer for selecting attributes
                }else{
                    schema = schemaEdge
                    $('#schema-calculator-'+ID).empty()
                    for (i = 0; i < schema.length; i++){
                        $('#schema-calculator-'+ID).append('<li class="nav-item"><a class="nav-link active">'+schema[i]+'</a></li>')
                    }
                }

            },100);

            $(document).off("dblclick", "#schema-calculator-"+ID+" > li > a")

            $(document).on("dblclick", "#schema-calculator-"+ID+" > li > a", function(){
                var text = "['"+this.text+"']"
                var textarea = document.getElementById('expression-'+ID)
                
                if (textarea.value.charAt(textarea.value.length-1) == ')'){

                    textarea.value = textarea.value.substring(0,textarea.value.length-1) + text + ')'

                }else{

                    textarea.value = textarea.value + text

                }
             });
             
            $(document).off("dblclick", "#functions-"+ID+" > li > a")

            $(document).on("dblclick", "#functions-"+ID+" > li > a", function(){
                var text = this.name
                var textarea = document.getElementById('expression-'+ID)
                textarea.value = textarea.value + text
                var end = textarea.selectionEnd;
                
                if (textarea.value.charAt(textarea.value.length-1) == ')'){

                    textarea.focus()
                    textarea.selectionEnd= end - 1;

                };

            });
             
            
            $('#dialog-calculator-'+ID).modal('show')

            $('#calculator-accept-'+ID).click(function() {

                var paramsCalculator = {"id": ID,
                "parameters": [
                    {"attr": $('#attr-'+ID).val(),
                    "expression": $('#expression-'+ID).val()}
                ]}
               
                paramsCalculator['schema'] = schema
                paramsCalculator['schema-old'] = schemaEdge

                passSchemaToEdgeConnected(ID, listLabel, schema, context.canvas)
                isAlreadyInCanvas(jsonParams, paramsCalculator, ID)

                icon.setColor('#4682B4')
                
                $('#dialog-calculator-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("Output"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

	     var output= label2.createPort("output");
         output.setName("output_"+label2.id);

	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
	     }
	     else{
             this.add(label1);
             this.add(label2);
         }
         
         listLabel.push([this.id,[input.name], [output.name]])

	     return label1, label2;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     

     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes :getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 
                 entity.id = e.id;
                 
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// CREATE ATTRIBUTE ////

trans_CreateAttr = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_CreateAttr",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Create Attribute"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-create-attr-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext("Create Attribute Parameters")+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext("New attribute:")+'</label>'+
                                '<input id="attr-'+ID+'" type="text" size="40" value="" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('New attribute name')+'">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext("Value:")+'</label>'+
                                '<input id="value-'+ID+'" type="text" size="40" value="" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('New attribute value')+'">'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="create-attr-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')
        
        context = this

        icon.on("click", function(){
            
            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)
                schema = schemaEdge

            },100);
            

            $('#dialog-create-attr-'+ID).modal('show')

            $('#create-attr-accept-'+ID).click(function() {

                var paramsCreateAttr = {"id": ID,
                "parameters": [
                    {"attr": $('#attr-'+ID).val(),
                    "value": $('#value-'+ID).val()}
                ]}
                
                schemaMod =[...schema]
                
                schemaMod.push($('#attr-'+ID).val())
               
                paramsCreateAttr['schema'] = schemaMod

                passSchemaToEdgeConnected(ID, listLabel, schemaMod, context.canvas)
                isAlreadyInCanvas(jsonParams, paramsCreateAttr, ID)

                icon.setColor('#4682B4')
                
                $('#dialog-create-attr-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("Output"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

	     var output= label2.createPort("output");
         output.setName("output_"+label2.id);

	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
	     }
	     else{
             this.add(label1);
             this.add(label2);
         }
         
         listLabel.push([this.id,[input.name], [output.name]])

	     return label1, label2;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },

     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes :getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// FILTERING////

trans_Filter = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_Filter",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Filter"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-filter-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext('Filter Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column40">'+
                                '<label form="attr" class="col-form-label">'+gettext('Attribute:')+'</label>'+
                                '<select class="form-control" id="attr-'+ID+'"> </select>'+
                            '</div>'+
                            '<div class="column20">'+
                                '<label class="col-form-label">'+gettext('Operator:')+'</label>'+
                                '<select class="form-control" id="operator-'+ID+'">'+
                                    '<option value="=="> == </option>'+
                                    '<option value="!="> != </option>'+
                                    '<option value="<"> < </option>'+
                                    '<option value=">"> > </option>'+
                                    '<option value="<="> <= </option>'+
                                    '<option value=">="> >= </option>'+
                                    '<option value="starts-with">'+gettext('Starts with')+'</option>'+
                                    '<option value="ends-with">'+gettext('Ends with')+'</option>'+
                                    '<option value="contains">'+gettext('Contains')+'</option>'+
                                '</select>'+
                            '</div>'+                           
                            '<div class="column40">'+
                                '<label form="value" class="col-form-label">'+gettext('Value:')+'</label>'+
                                '<input id="value-'+ID+'" type="text" size="40" value="" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('New attribute value')+'">'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="filter-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        context = this

        icon.on("click", function(){
            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge

                    $('#attr-'+ID).empty()

                    for (i = 0; i < schema.length; i++){
                        
                        $('#attr-'+ID).append('<option>'+schema[i]+'</option>')
                    }
                }

            },100);

            $('#dialog-filter-'+ID).modal('show')

            $('#filter-accept-'+ID).click(function() {

                var paramsFilter = {"id": ID,
                "parameters": [
                {"attr": $('#attr-'+ID).val(),
                "operator": $('#operator-'+ID).val(),
                "value": $('#value-'+ID).val()}
                ]}
                
                paramsFilter['schema-old'] = schemaEdge
                paramsFilter['schema'] = schema

                passSchemaToEdgeConnected(ID, listLabel, schema, context.canvas)

                isAlreadyInCanvas(jsonParams, paramsFilter, ID)

                icon.setColor('#4682B4')
                
                $('#dialog-filter-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("True"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

        var label3 =new draw2d.shape.basic.Label({
            text:gettext("False"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

         var output1 = label2.createPort("output");
         output1.setName("output_"+label2.id);

	     var output2= label3.createPort("output");
         output2.setName("output_"+label3.id);


	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
             this.add(label3, null, optionalIndex+1);

	     }
	     else{
             this.add(label1);
             this.add(label2);
             this.add(label3);
         }
         
         listLabel.push([this.id, [input.name], [output1.name, output2.name]])

	     return label1, label2, label3;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

/// keep Attribute ////

trans_KeepAttr = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_KeepAttr",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
      
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Keep Attribute"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-keep-attr-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext("Keep Attribute Parameters")+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<label form="attr" class="col-form-label">'+gettext("Attribute to keep:")+'</label>'+
                            '<select class="form-control" id="attr-'+ID+'"> </select>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext("Close")+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="keep-attr-accept-'+ID+'">'+gettext("Accept")+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        context = this

        icon.on("click", function(){

            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge
                    $('#attr-'+ID).empty()

                    for (i = 0; i < schema.length; i++){
                        $('#attr-'+ID).append('<option>'+schema[i]+'</option>')
                    }

                }

            },100);

            $('#dialog-keep-attr-'+ID).modal('show')

            $('#keep-attr-accept-'+ID).click(function() {

                var paramsKeep = {"id": ID,
                "parameters": [
                    {"attr": $('#attr-'+ID).val()}
                ]}

                schemaMod =[$('#attr-'+ID).val()]

                paramsKeep['schema-old'] = schemaEdge
                paramsKeep['schema'] = schemaMod

                passSchemaToEdgeConnected(ID, listLabel, schemaMod, context.canvas)
                
                isAlreadyInCanvas(jsonParams, paramsKeep, ID)

                icon.setColor('#4682B4')
                
                $('#dialog-keep-attr-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("Output"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

	     var output= label2.createPort("output");
         output.setName("output_"+label2.id);

	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
	     }
	     else{
             this.add(label1);
             this.add(label2);
	     }

         listLabel.push([this.id, [input.name], [output.name]])

	     return label1, label2;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes :getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// REPROJECT ////

trans_Reproject = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "trans_Reproject",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
        this.classLabel = new draw2d.shape.basic.Label({
            text: gettext("Reproject"), 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#71c7ec", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        //adding dialog for choosing parameters of the transformer
        $('#canvas-parent').append('<div id="dialog-reproject-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title" >'+gettext('Reproject Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext("Source EPSG:")+'</label>'+
                                '<input id="source-epsg-'+ID+'" type="text" size="40" value="" class="form-control" pattern="[A-Za-z]{3}" placeholder = "'+gettext('Empty to read from input layer')+'" >'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext("Target EPSG:")+'</label>'+
                                '<input id="target-epsg-'+ID+'" type="text" size="40" value="" class="form-control" pattern="[A-Za-z]{3}" >'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="reproject-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        context = this

        icon.on("click", function(){

            setTimeout(function(){
                
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                //get schema from the edge
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

            },100);
            

            $('#dialog-reproject-'+ID).modal('show')

            $('#reproject-accept-'+ID).click(function() {

                //parameters selected to json
                var paramsReproject = {"id": ID,
                "parameters": [
                {"source-epsg": $('#source-epsg-'+ID).val(),
                "target-epsg": $('#target-epsg-'+ID).val() }
                ]}
                
                //updating schema-old and schema parameters in json
                paramsReproject['schema-old'] = schemaEdge
                paramsReproject['schema'] = schemaEdge

                //add the schema to a later edge if it exists
                passSchemaToEdgeConnected(ID, listLabel, schemaEdge, context.canvas)
                
                //check if parameters are already in json canvas
                isAlreadyInCanvas(jsonParams, paramsReproject, ID)

                //set red color to another in order to know if parameters are checked
                icon.setColor('#4682B4')
                
                $('#dialog-reproject-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function( optionalIndex)
    {
	   	 var label1 =new draw2d.shape.basic.Label({
	   	     text: gettext("Input"),
	   	     stroke:0.2,
	   	     radius:0,
	   	     bgColor:"#ffffff",
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#107dac",
             resizeable:true
	   	 });

	   	 var label2 =new draw2d.shape.basic.Label({
            text: gettext("Output"),
            stroke:0.2,
            radius:0,
            bgColor:"#ffffff",
            padding:{left:40, top:3, right:10, bottom:5},
            fontColor:"#107dac",
            resizeable:true
        });

         var input = label1.createPort("input");
         input.setName("input_"+label1.id);

	     var output= label2.createPort("output");
         output.setName("output_"+label2.id);

	     if($.isNumeric(optionalIndex)){
             this.add(label1, null, optionalIndex+1);
             this.add(label2, null, optionalIndex+1);
	     }
	     else{
             this.add(label1);
             this.add(label2);
         }
         
         listLabel.push([this.id, [input.name], [output.name]])

	     return label1, label2;
    },
        /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes :getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

////////////////////////////////////////////////  SALIDAS /////////////////////////////////////////////////////////

//// OUTPUT POSTGRESQL ////

output_Postgresql = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "output_Postgresql",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
        this.classLabel = new draw2d.shape.basic.Label({
            text:"PostgreSQL", 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#e8ca93", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        context = this

        $('#canvas-parent').append('<div id="dialog-output-postgresql-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title">'+gettext('PostgreSQL Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column50">'+
                                '<label form="host" class="col-form-label">'+gettext('Host:')+'</label>'+
                                '<input id="host-'+ID+'" type="text" value="localhost" size="40" class="form-control" pattern="[A-Za-z]{3}">'+
                            '</div>'+
                            '<div class="column50">'+    
                                '<label form="port" class="col-form-label">'+gettext('Port:')+'</label>'+
                                '<input id="port-'+ID+'" type="text" value="5432" size="40" class="form-control" pattern="[A-Za-z]{3}">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="database" class="col-form-label">'+gettext('Database:')+'</label>'+
                                '<input id="database-'+ID+'" type="text" value="" size="40" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('Name of your database')+'">'+
                            '</div>'+
                            '<div class="column50">'+                                
                                '<label form="user" class="col-form-label">'+gettext('User:')+'</label>'+
                                '<input id="user-'+ID+'" type="text" value="postgres" size="40"  class="form-control" pattern="[A-Za-z]{3}">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="password" class="col-form-label">'+gettext('Password:')+'</label>'+
                                '<input type="password" id = "password-'+ID+'" class="form-control" value="">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="tablename" class="col-form-label">'+gettext('Table name:')+'</label>'+
                                '<input id="tablename-'+ID+'" type="text" value="" size="40" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('schema.tablename')+'">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('Operation:')+'</label>'+
                                '<div class="form-check">'+
                                    '<input type="radio" id="create" name="operation-'+ID+'" class="form-check-input" value="CREATE" checked="checked">'+
                                    '<label for="create" class="form-check-label">'+gettext('CREATE')+'</label>'+
                                '</div>'+
                                '<div class="form-check">'+
                                    '<input type="radio" id="update" name="operation-'+ID+'" class="form-check-input" value="UPDATE">'+
                                    '<label for="update" class="form-check-label">'+gettext('UPDATE')+'</label>'+
                                '</div>'+
                                '<div class="form-check">'+
                                    '<input type="radio" id="delete" name="operation-'+ID+'" class="form-check-input" value="DELETE">'+
                                    '<label for="delete" class="form-check-label">'+gettext('DELETE')+'</label>'+
                                '</div>'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('Match column:')+'</label>'+
                                '<select class="form-control" id="match-'+ID+'" disabled> </select>'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="verify-postgresql-'+ID+'">'+gettext('Verify connection')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="output-postgresql-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        $('input:radio[name="operation-'+ID+'"]').change(function(){
            
            if ($(this).val()!='CREATE'){
                $('#match-'+ID).attr('disabled', false)
            }
            else{
                $('#match-'+ID).attr('disabled', true)
            }
        });
        $('#verify-postgresql-'+ID).click(function() {
                
            var paramsPostgres = {"id": ID,
            "parameters": [
                {"host": $('#host-'+ID).val(),
                "port": $('#port-'+ID).val(),
                "database": $('#database-'+ID).val(),
                "user": $('#user-'+ID).val(),
                "password": $('#password-'+ID).val()}
            ]}

            var formDataPostgres = new FormData();
            
            formDataPostgres.append('jsonParamsPostgres', JSON.stringify(paramsPostgres))

            $.ajax({
                type: 'POST',
                url: '/gvsigonline/etl/test_postgres_conexion/',
                data: formDataPostgres,
                beforeSend:function(xhr){
                    xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
                },
                cache: false, 
                contentType: false, 
                processData: false,
                success: function (response) {

                    if(response.result == true){
                        textConnection = gettext('Connection parameters are valids.')
                    }else{
                        textConnection = gettext('Connection parameters are not valids.')
                    }

                    $("#dialog-test-postgres-connection").remove();
                        
                    $('#canvas-parent').append('<div id="dialog-test-postgres-connection" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
                        '<div class="modal-dialog" role="document">'+
                            '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                        '<span aria-hidden="true">&times;</span>'+
                                    '</button>'+
                                    '<h4 class="modal-title">'+gettext('Response')+'</h4>'+
                                '</div>'+
                                '<div class="modal-body" align="center">'+textConnection+
                                '</div>'+
                                '<div class="modal-footer">'+
                                    '<button id= "close-test-postgres-connection" type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>')

                    $('#dialog-test-postgres-connection').modal('show')

                    $('#close-test-postgres-connection').click(function() {
                        
                        $('#dialog-test-postgres-connection').modal('hide')
                        
                    })
                }
            })
        });
        

        icon.on("click", function(){

            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge
                    $('#match-'+ID).empty()

                    for (i = 0; i < schema.length; i++){
                        $('#match-'+ID).append('<option>'+schema[i]+'</option>')
                    }
                }

            },100);

            $('#dialog-output-postgresql-'+ID).modal('show')

            $('#output-postgresql-accept-'+ID).click(function() {

                var paramsPostgreSQL = {"id": ID,
                "parameters": [
                    {"host": $('#host-'+ID).val(),
                    "port": $('#port-'+ID).val(),
                    "database": $('#database-'+ID).val(),
                    "user": $('#user-'+ID).val(),
                    "password": $('#password-'+ID).val(),
                    "tablename": $('#tablename-'+ID).val(),
                    "match": $('#match-'+ID).val(),
                    "operation": $('input:radio[name="operation-'+ID+'"]:checked').val()}
                ]}
                
                paramsPostgreSQL['schema-old'] = schemaEdge
                paramsPostgreSQL['schema'] = schema
                
                isAlreadyInCanvas(jsonParams, paramsPostgreSQL, ID)

                icon.setColor('#e79600')
                
                $('#dialog-output-postgresql-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(optionalIndex)
    {
	   	var label =new draw2d.shape.basic.Label({
	   	    text: gettext("Output"),
	   	    stroke:0.2,
	   	    radius:0,
	   	    bgColor:"#ffffff",
	   	    padding:{left:10, top:3, right:40, bottom:5},
	   	    fontColor:"#9a8262",
            resizeable:true
            
	   	 });

	     var input= label.createPort("input");

         input.setName("input_"+label.id);
         
	     if($.isNumeric(optionalIndex)){
             this.add(label, null, optionalIndex+1);
	     }
	     else{
	         this.add(label);
	     }
         
         listLabel.push([this.id, [input.name], []])

	     return label;
    },

    /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});

//// OUTPUT POSTGIS ////

output_Postgis = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "output_Postgis",
	
    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));
        
        this.classLabel = new draw2d.shape.basic.Label({
            text:"PostGIS", 
            stroke:1,
            fontColor:"#ffffff",  
            bgColor:"#e8ca93", 
            radius: this.getRadius(), 
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });
        
        var icon = new draw2d.shape.icon.Gear({
            minWidth:13, 
            minHeight:13, 
            width:13, 
            height:13, 
            color:"#e2504c"
        });

        this.classLabel.add(icon, new draw2d.layout.locator.XYRelPortLocator(82, 8))

        this.add(this.classLabel);

        var ID = this.id

        context = this

        setColorIfIsOpened(jsonParams, this.cssClass, ID, icon)

        $('#canvas-parent').append('<div id="dialog-output-postgis-'+ID+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                        '<h4 class="modal-title">'+gettext('PostGIS Parameters')+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<form>'+
                            '<div class="column50">'+
                                '<label form="host" class="col-form-label">'+gettext('Host:')+'</label>'+
                                '<input id="host-'+ID+'" type="text" value="localhost" size="40" class="form-control" pattern="[A-Za-z]{3}">'+
                            '</div>'+
                            '<div class="column50">'+    
                                '<label form="port" class="col-form-label">'+gettext('Port:')+'</label>'+
                                '<input id="port-'+ID+'" type="text" value="5432" size="40" class="form-control" pattern="[A-Za-z]{3}">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="database" class="col-form-label">'+gettext('Database:')+'</label>'+
                                '<input id="database-'+ID+'" type="text" value="" size="40" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('Name of your database')+'">'+
                            '</div>'+
                            '<div class="column50">'+                                
                                '<label form="user" class="col-form-label">'+gettext('User:')+'</label>'+
                                '<input id="user-'+ID+'" type="text" value="postgres" size="40"  class="form-control" pattern="[A-Za-z]{3}">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="password" class="col-form-label">'+gettext('Password:')+'</label>'+
                                '<input type="password" id = "password-'+ID+'" class="form-control" value="">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label form="tablename" class="col-form-label">'+gettext('Table name:')+'</label>'+
                                '<input id="tablename-'+ID+'" type="text" value="" size="40" class="form-control" pattern="[A-Za-z]{3}" placeholder="'+gettext('schema.tablename')+'">'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('Operation:')+'</label>'+
                                '<div class="form-check">'+
                                    '<input type="radio" id="create" name="operation-'+ID+'" class="form-check-input" value="CREATE" checked="checked">'+
                                    '<label for="create" class="form-check-label">'+gettext('CREATE')+'</label>'+
                                '</div>'+
                                '<div class="form-check">'+
                                    '<input type="radio" id="update" name="operation-'+ID+'" class="form-check-input" value="UPDATE">'+
                                    '<label for="update" class="form-check-label">'+gettext('UPDATE')+'</label>'+
                                '</div>'+
                                '<div class="form-check">'+
                                    '<input type="radio" id="delete" name="operation-'+ID+'" class="form-check-input" value="DELETE">'+
                                    '<label for="delete" class="form-check-label">'+gettext('DELETE')+'</label>'+
                                '</div>'+
                            '</div>'+
                            '<div class="column50">'+
                                '<label class="col-form-label">'+gettext('Match column:')+'</label>'+
                                '<select class="form-control" id="match-'+ID+'" disabled> </select>'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="verify-postgis-'+ID+'">'+gettext('Verify connection')+'</button>'+
                        '<button type="button" class="btn btn-default btn-sm" id="output-postgis-accept-'+ID+'">'+gettext('Accept')+'</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')

        $('input:radio[name="operation-'+ID+'"]').change(function(){
            
            if ($(this).val()!='CREATE'){
                $('#match-'+ID).attr('disabled', false)
            }
            else{
                $('#match-'+ID).attr('disabled', true)
            }
        });
        
        $('#verify-postgis-'+ID).click(function() {
                
            var paramsPostgres = {"id": ID,
            "parameters": [
                {"host": $('#host-'+ID).val(),
                "port": $('#port-'+ID).val(),
                "database": $('#database-'+ID).val(),
                "user": $('#user-'+ID).val(),
                "password": $('#password-'+ID).val()}
            ]}

            var formDataPostgres = new FormData();
            
            formDataPostgres.append('jsonParamsPostgres', JSON.stringify(paramsPostgres))

            $.ajax({
                type: 'POST',
                url: '/gvsigonline/etl/test_postgres_conexion/',
                data: formDataPostgres,
                beforeSend:function(xhr){
                    xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
                },
                cache: false, 
                contentType: false, 
                processData: false,
                success: function (response) {

                    if(response.result == true){
                        textConnection = gettext('Connection parameters are valids.')
                    }else{
                        textConnection = gettext('Connection parameters are not valids.')
                    }

                    $("#dialog-test-postgres-connection").remove();
                        
                    $('#canvas-parent').append('<div id="dialog-test-postgres-connection" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'+
                        '<div class="modal-dialog" role="document">'+
                            '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                        '<span aria-hidden="true">&times;</span>'+
                                    '</button>'+
                                    '<h4 class="modal-title">'+gettext('Response')+'</h4>'+
                                '</div>'+
                                '<div class="modal-body" align="center">'+textConnection+
                                '</div>'+
                                '<div class="modal-footer">'+
                                    '<button id= "close-test-postgres-connection" type="button" class="btn btn-default btn-sm" data-dismiss="modal">'+gettext('Close')+'</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>')

                    $('#dialog-test-postgres-connection').modal('show')

                    $('#close-test-postgres-connection').click(function() {
                        
                        $('#dialog-test-postgres-connection').modal('hide')
                        
                    })
                }
            })
        });

        

        icon.on("click", function(){
            setTimeout(function(){
                try{
                    schemas = getOwnSchemas(context.canvas, ID)
                    schema = schemas[0]
                    schemaOld = schemas[1]
                
                }catch{ 
                    schema=[]
                    schemaOld =[]
                }
                
                schemaEdge = passSchemaWhenInputTask(context.canvas, listLabel, ID)

                if (JSON.stringify(schemaEdge) != JSON.stringify(schemaOld) || schema==[]){
                    schema = schemaEdge
                    $('#match-'+ID).empty()

                    for (i = 0; i < schema.length; i++){
                        $('#match-'+ID).append('<option>'+schema[i]+'</option>')
                    }
                }

            },100);

            $('#dialog-output-postgis-'+ID).modal('show')


            $('#output-postgis-accept-'+ID).click(function() {

                var paramsPostGIS = {"id": ID,
                "parameters": [
                    {"host": $('#host-'+ID).val(),
                    "port": $('#port-'+ID).val(),
                    "database": $('#database-'+ID).val(),
                    "user": $('#user-'+ID).val(),
                    "password": $('#password-'+ID).val(),
                    "tablename": $('#tablename-'+ID).val(),
                    "match": $('#match-'+ID).val(),
                    "operation": $('input:radio[name="operation-'+ID+'"]:checked').val()}
                ]}

                paramsPostGIS['schema-old'] = schemaEdge
                paramsPostGIS['schema'] = schema
                
                isAlreadyInCanvas(jsonParams, paramsPostGIS, ID)

                icon.setColor('#e79600')
                
                $('#dialog-output-postgis-'+ID).modal('hide')

            })
        })
    },
     
    /**
     * @method
     * Add an entity to the db shape
     * 
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(optionalIndex)
    {
	   	var label =new draw2d.shape.basic.Label({
	   	    text: gettext("Output"),
	   	    stroke:0.2,
	   	    radius:0,
	   	    bgColor:"#ffffff",
	   	    padding:{left:10, top:3, right:40, bottom:5},
	   	    fontColor:"#9a8262",
            resizeable:true
            
	   	 });

	     var input= label.createPort("input");

         input.setName("input_"+label.id);
         
	     if($.isNumeric(optionalIndex)){
             this.add(label, null, optionalIndex+1);
	     }
	     else{
	         this.add(label);
	     }
         
         listLabel.push([this.id, [input.name], []])
         
         return label;
    },

    /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     * 
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     * 
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },
     
     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      * 
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);
         
         return this;
     },
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
     getPersistentAttributes : getPerAttr,
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         
         this._super(memento);
         
         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                 var entity =this.addEntity(e.text);
                 entity.id = e.id;
                 entity.getInputPort(0).setName("input_"+e.id);
                 entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }

         return this;
     }  

});