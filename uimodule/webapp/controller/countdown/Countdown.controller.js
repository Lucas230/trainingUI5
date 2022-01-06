sap.ui.define([
        "com/lp/trainingUI5/controller/BaseController",
        "sap/ui/model/json/JSONModel"
], function(
        Controller,
        JSONModel
) {
        "use strict";

        return Controller.extend("com.lp.trainingUI5.controller.countdown.Countdown", {
			onInit: function() {
                this.timer = {
                    "days": 0,
                    "hours": 0,
                    "minutes": 0,
                    "seconds": 0
                }

                let myTimerModel = new JSONModel(this.timer);
                this.getView().setModel(myTimerModel, "timer");

                setInterval(this.calculateTime.bind(this), 1000);
			},

            calculateTime: function(){
                let teachedDate = new Date("Dec 31 2022");
                let currentDate = new Date();
                let diff = teachedDate.getTime() - currentDate.getTime();  
                
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                this.getModel("timer").setProperty("/days", days);
                this.getModel("timer").setProperty("/hours", hours);
                this.getModel("timer").setProperty("/minutes", minutes);
                this.getModel("timer").setProperty("/seconds", seconds);

            }

        });
});