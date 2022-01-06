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

        return Controller.extend("com.lp.trainingUI5.controller.covid.Covid", {
			dataPath : "https://api.rootnet.in/covid19-in/stats/history",
			oVizFrame : null,
			onInit: function() {
				this.getView().setBusy(true);
                Format.numericFormatter(ChartFormatter.getInstance());
				var formatPattern = ChartFormatter.DefaultPattern;
				// set explored app's demo model on this sample
				var oModel = new JSONModel(this.settingsModel);
				oModel.setDefaultBindingMode(BindingMode.OneWay);
				this.getView().setModel(oModel);

				var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
				oVizFrame.setVizProperties({
					plotArea: {
						dataLabel: {
							formatString:formatPattern.SHORTFLOAT_MFD2,
							visible: true
						}
					},
					valueAxis: {
						label: {
							formatString: formatPattern.SHORTFLOAT
						},
						title: {
							visible: false
						}
					},
					categoryAxis: {
						title: {
							visible: false
						}
					},
					title: {
						visible: false,
						text: 'Covid Cases History'
					}
				});
				var dataModel = new JSONModel(this.dataPath);
				oVizFrame.setModel(dataModel);

				var oPopOver = this.getView().byId("idPopOver");
				oPopOver.connect(oVizFrame.getVizUid());
				oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

				this.getView().setBusy(false);
			},

			onPressList: function(){
				this.getOwnerComponent().getRouter().navTo("second-list");
			},

			onPressGraph: function(){
				this.getOwnerComponent().getRouter().navTo("second-pie");
			}
            
        });
});