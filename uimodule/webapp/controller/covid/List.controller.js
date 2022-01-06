sap.ui.define([
		"com/lp/trainingUI5/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		'sap/viz/ui5/format/ChartFormatter',
		'sap/viz/ui5/api/env/Format',
		'sap/ui/model/BindingMode',
], function(
        Controller,
        JSONModel,
		ChartFormatter,
		Format,
		BindingMode
) {
        "use strict";

        return Controller.extend("com.lp.trainingUI5.controller.covid.List", {
			dataPath : "https://api.rootnet.in/covid19-in/stats/latest",
			onInit: function() {
                
				var dataModel = new JSONModel(this.dataPath);
				this.setModel(dataModel, "Latest");
				
			},
            
        });
});