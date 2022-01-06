sap.ui.define([
    "com/lp/trainingUI5/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], 
function (
    Controller,
    JSONModel
) {
    "use strict";

    return Controller.extend("com.lp.trainingUI5.controller.portfolio.Portfolio", {
        onInit:function(){
            let oModel = new JSONModel("../model/data.json");
            this.setModel(oModel, "portfolio");
        }
    });
});
