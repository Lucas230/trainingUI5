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

	return Controller.extend("com.lp.trainingUI5.controller.covid.Pie", {
		dataPath : "https://api.rootnet.in/covid19-in/stats/latest",
		oVizFrame : null,
		onInit: function() {
			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			// set explored app's demo model on this sample
			var oModel = new JSONModel(this.settingsModel);
			oModel.setDefaultBindingMode(BindingMode.OneWay);
			this.getView().setModel(oModel);

			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFramePie");
			oVizFrame.setVizProperties({
                legend: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false
                }
            });
			var dataModel = new JSONModel(this.dataPath);
			oVizFrame.setModel(dataModel);

			var oPopOver = this.getView().byId("idPopOverPie");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

			
		}
		
	});
});