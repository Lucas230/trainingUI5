sap.ui.define([
    "com/lp/trainingUI5/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/integration/widgets/Card"
], function (
    Controller,
    JSONModel,
    Card
) {
    "use strict";

    return Controller.extend("com.lp.trainingUI5.controller.cards.Cards", {
        onInit: function () {
            let weatherData = new JSONModel(
                "https://api.openweathermap.org/data/2.5/onecall?lat=22.9797&lon=49.8666&appid=c76887dfb6663b2fa9bce5f375788d6c&units=metric"
            );
            this.getView().setModel(weatherData);       
        },  

        onSelectingWeatherOption: function (oEvent) {
            let configuration;
            let container = this.byId("idAppControl");
            let weatherData = JSON.parse(this.getView().getModel().getJSON());
            
            switch (oEvent.getSource().getSelectedButton().getText()) {
                case "Current Object Card":
                    configuration = {
                        "_version": "1.15.0",
                        "sap.app": {
                            "id": "card.explorer.object.card",
                            "type": "card"
                        },
                        "sap.card": {
                            "type": "Object",
                            "data": {
                                "json": weatherData.current
                            },
                            "header": {
                                "icon": {
                                    "src": "http://openweathermap.org/img/wn/{weather/0/icon}@2x.png"
                                },
                                "title": "{weather/0/main}",
                                "subTitle": "{weather/0/description}"
                            },
                            "content": {
                                "groups": [
                                    {
                                        "title": "Temperature Details",
                                        "items": [
                                            {
                                                "label": "Temperature",
                                                "value": "{temp}"
                                            },
                                            {
                                                "label": "Feels Like",
                                                "value": "{feels_like}"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "Other",
                                        "items": [
                                            {
                                                "label": "Pressure",
                                                "value": "{pressure}"
                                            },
                                            {
                                                "label": "Humidity:",
                                                "value": "{humidity}"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                    break;
                case "Hourly Table Card":
                    configuration = {
                        "_version": "1.15.0",
                        "sap.app": {
                            "id": "card.explorer.table.card",
                            "type": "card"
                        },
                        "sap.card": {
                            "type": "Table",
                            "data": {
                                "json": weatherData.hourly
                            },
                            "header": {
                                "title": "Weather forecast",
                                "subTitle": "Today",
                                "status": {
                                    "text": "{headerData/statusText}"
                                }
                            },
                            "content": {
                                "row": {
                                    "columns": [{
                                        "title": "Date",
                                        "value": "{dt}",
                                        "identifier": true
                                    },
                                    {
                                        "title": "Temperature",
                                        "value": "{temp}"
                                    },
                                    {
                                        "title": "Pressure",
                                        "value": "{pressure}"
                                    },
                                    {
                                        "title": "Humidity",
                                        "value": "{humidity}",
                                        "state": "{statusState}"
                                    }
                                    ]
                                }
                            }
                        }
                    }

                    break;
                case "Hourly List Card":
                    configuration = {
                        "_version": "1.14.0",
                        "sap.app": {
                            "id": "card.explorer.highlight.list.card",
                            "type": "card"
                        },
                        "sap.card": {
                            "type": "List",
                            "header": {
                                "title": "Weather Data in list"
                            },
                            "content": {
                                "data": {
                                    "json": weatherData.hourly
                                },
                                "item": {
                                    "title": "Date is {dt}",
                                    "description": "Temperature is {temp}",
                                    "highlight": "Warning"
                                }
                            }
                        }
                    }


                    break;
                case "Hourly Analytical Card":
                    configuration = {
                        "_version": "1.14.0",
                        "sap.app": {
                            "id": "card.explorer.line.card",
                            "type": "card"
                        },
                        "sap.card": {
                            "type": "Analytical",
                            "header": {
                                "type": "Numeric",
                                "data": {
                                    "json": {
                                        "number": "65.34",
                                        "unit": "K",
                                        "trend": "Down",
                                        "state": "Error",
                                        "target": {
                                            "number": 100,
                                            "unit": "K"
                                        },
                                        "deviation": {
                                            "number": 34.7
                                        },
                                        "details": "Q1, 2018"
                                    }
                                },
                                "title": "Weather data analytical",


                            },
                            "content": {
                                "chartType": "Line",
                                "legend": {
                                    "visible": true,
                                    "position": "Bottom",
                                    "alignment": "TopLeft"
                                },
                                "plotArea": {
                                    "dataLabel": {
                                        "visible": true
                                    },
                                    "categoryAxisText": {
                                        "visible": false
                                    },
                                    "valueAxisText": {
                                        "visible": false
                                    }
                                },
                                "title": {
                                    "text": "Line chart",
                                    "visible": true,
                                    "alignment": "Left"
                                },
                                "measureAxis": "valueAxis",
                                "dimensionAxis": "categoryAxis",
                                "data": {
                                    "json": weatherData.hourly

                                },
                                "dimensions": [
                                    {
                                        "label": "Date",
                                        "value": "{dt}"
                                    }
                                ],
                                "measures": [
                                    {
                                        "label": "Temperature",
                                        "value": "{temp}"
                                    },
                                    {
                                        "label": "Humidity",
                                        "value": "{humidity}"
                                    }
                                ]
                            }
                        }
                    }

                    break;
            }
            let myCard = new Card();
            myCard.setManifest(configuration);
            container.getContent()[0].removeItem(container.getContent()[0].getItems()[2])
            container.getContent()[0].addAggregation("items",myCard);

        }
    });
});
