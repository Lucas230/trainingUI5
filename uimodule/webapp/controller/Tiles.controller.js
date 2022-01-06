sap.ui.define([
    "com/lp/trainingUI5/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (
    Controller,
	JSONModel
    ) {
    "use strict";

    return Controller.extend("com.lp.trainingUI5.controller.Tiles", {
        onInit: function(){
            let myTilesModel = new JSONModel("../model/tiles.json");
            this.getView().setModel(myTilesModel, "tiles");
        },

        press: function(oRoute){
            if(oRoute.substring(0,4) == 'EXT-'){
                let selItem = this.getModel("tiles").getData().find(item => {if (item.route == oRoute){ return item;}});
                //Navega para uma url esterna na mesma aba
                sap.m.URLHelper.redirect(selItem.url);
            }else{
                this.getOwnerComponent().getRouter().navTo(oRoute);
            }
        }

    });
});
