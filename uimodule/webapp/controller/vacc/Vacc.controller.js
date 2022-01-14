sap.ui.define([
		"com/lp/trainingUI5/controller/BaseController",
		"sap/ui/model/json/JSONModel"
], function(
        Controller,
        JSONModel,
		ChartFormatter,
		Format,
		BindingMode
) {
        "use strict";

        return Controller.extend("com.lp.trainingUI5.controller.vacc.Vacc", {
			onInit: function() {
				let oVaccModel = new JSONModel(this.getBaseURL() + "/model/vacc.json");
				this.getView().setModel(oVaccModel, "vacc");
				let myViewModel = {
					table : true,
					calendar: false
				}
				this.setModel(new JSONModel(myViewModel), "view");
			},
			formatDate: function(input){
				return new Date(input);
			},
			formatState: function(input){
				let currenteDate = new Date();
				let inputDate = new Date(input);
				if(currenteDate > inputDate){
					return "Success";
				}else if(currenteDate < inputDate){
					return "Warning";
				}
				return "Error"
			}
			
        });
});