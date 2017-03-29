webpackJsonp([1,4],{

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* unused harmony export Station */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Station = (function () {
    function Station(id, name, cabi_id, short_name, region_id, capacity, latitude, longitude, statistics, route_name, last_bike_times) {
        this.id = id;
        this.name = name;
        this.cabi_id = cabi_id;
        this.short_name = short_name;
        this.region_id = region_id;
        this.capacity = capacity;
        this.latitude = latitude;
        this.longitude = longitude;
        this.statistics = statistics;
        this.route_name = route_name;
        this.last_bike_times = last_bike_times;
    }
    return Station;
}());




var StationService = (function () {
    function StationService(http) {
        this.http = http;
        this.url = 'https://cabi-wakeup-api.herokuapp.com/stations';
    }
    StationService.prototype.getStations = function () {
        return this.http.get(this.url)
            .map(function (response) { return response.json(); });
    };
    StationService.prototype.getStation = function (route) {
        return this.http.get(this.url + "/" + route + "/show_by_route_name")
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    StationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], StationService);
    return StationService;
    var _a;
}());
//# sourceMappingURL=station.service.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bowser__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bowser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bowser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__station_service__ = __webpack_require__(196);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StationPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StationPageComponent = (function () {
    function StationPageComponent(route, router, ss, location) {
        this.route = route;
        this.router = router;
        this.ss = ss;
        this.location = location;
    }
    StationPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.stations = data.stations;
            _this.station = _this.stationData = data.station;
            _this.isLoadingStationData = false;
            _this.showStationDetails = false;
        });
        this.inputFocused = false;
        this.graphOptions = {
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scales: {
                yAxes: [{
                        ticks: {
                            callback: function (v) { return _this.formatSecsAsMins(v); },
                            stepSize: 300,
                        }
                    }]
            },
        };
    };
    StationPageComponent.prototype.changeStation = function () {
        var _this = this;
        this.isLoadingStationData = true;
        this.ss.getStation(this.station.route_name)
            .then(function (data) {
            _this.stationData = data;
            _this.isLoadingStationData = false;
        });
        this.location.replaceState(this.station.route_name);
    };
    StationPageComponent.prototype.time = function () {
        if (this.stationData) {
            return this.stationData.statistics.mean ?
                this.stationData.statistics.mean + " AM"
                : 'No data';
        }
    };
    StationPageComponent.prototype.removeStation = function () {
        this.station = null;
        this.stationData = null;
        this.showStationDetails = false;
        this.location.replaceState('/');
    };
    StationPageComponent.prototype.toggleStationDetails = function () {
        this.showStationDetails = !this.showStationDetails;
    };
    StationPageComponent.prototype.onInputFocus = function ($event) {
        this.inputFocused = true;
        if (__WEBPACK_IMPORTED_MODULE_4_bowser__["mobile"]) {
            $event.target.scrollIntoView(true);
        }
        $event.target.select();
    };
    StationPageComponent.prototype.onInputFocusOut = function ($event) {
        this.inputFocused = false;
    };
    StationPageComponent.prototype.formattedStatistics = function () {
        return {
            median: this.stationData.statistics.median + " AM",
            mean: this.stationData.statistics.mean + " AM",
            'standard deviation': this.stationData.statistics.standard_deviation + " minutes",
            range: this.stationData.statistics.range + " minutes",
            q1: this.stationData.statistics.q1 + " AM",
            q3: this.stationData.statistics.q3 + " AM",
            min: this.stationData.statistics.min + " AM",
            max: this.stationData.statistics.max + " AM",
            outliers: this.stationData.statistics.outliers.length ? this.stationData.statistics.outliers.map(function (o) {
                return o + " AM";
            }) : 'none'
        };
    };
    StationPageComponent.prototype.parseGraphData = function () {
        return this.stationData.last_bike_times.map(function (t) {
            var parts = t.split('T');
            var date = parts[0];
            var time = __WEBPACK_IMPORTED_MODULE_3_moment__(parts[1], "HH:mm").unix();
            return {
                date: date,
                time: time
            };
        });
    };
    StationPageComponent.prototype.graphData = function () {
        return this.parseGraphData().map(function (d) { return d.time; });
    };
    StationPageComponent.prototype.graphLabels = function () {
        return this.parseGraphData().map(function (d) { return d.date; });
    };
    StationPageComponent.prototype.formatSecsAsMins = function (t) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__["unix"](t).format("h:mm");
    };
    StationPageComponent.prototype.showVeryTallDropdown = function () {
        return __WEBPACK_IMPORTED_MODULE_4_bowser__["mobile"] && this.inputFocused;
    };
    StationPageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-station-page',
            template: __webpack_require__(714),
            styles: [__webpack_require__(701)],
            animations: [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('stationFormSize', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('true', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        flex: '.4',
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('false', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        flex: '1'
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('.5s'))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('stationTitleSize', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('false', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        transform: 'scale(1)',
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('true', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        transform: 'scale(.5)',
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('.5s'))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('stationTimeSize', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('false', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        flex: '.0001',
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('true', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        flex: '.7'
                    })),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => *', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('.5s'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__station_service__["a" /* StationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__station_service__["a" /* StationService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"]) === 'function' && _d) || Object])
    ], StationPageComponent);
    return StationPageComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=station-page.component.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__station_service__ = __webpack_require__(196);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StationsResolver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StationResolver; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StationsResolver = (function () {
    function StationsResolver(ss, router) {
        this.ss = ss;
        this.router = router;
    }
    StationsResolver.prototype.resolve = function (route, state) {
        return this.ss.getStations();
    };
    StationsResolver = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__station_service__["a" /* StationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__station_service__["a" /* StationService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === 'function' && _b) || Object])
    ], StationsResolver);
    return StationsResolver;
    var _a, _b;
}());
var StationResolver = (function () {
    function StationResolver(ss, router) {
        this.ss = ss;
        this.router = router;
    }
    StationResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var id = route.params['id'];
        return this.ss.getStation(id).then(function (station) {
            if (station) {
                return station;
            }
            else {
                _this.router.navigate(['/']);
                return null;
            }
        })
            .catch(function () {
            _this.router.navigate(['/']);
        });
    };
    StationResolver = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__station_service__["a" /* StationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__station_service__["a" /* StationService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === 'function' && _b) || Object])
    ], StationResolver);
    return StationResolver;
    var _a, _b;
}());
//# sourceMappingURL=station-resolver.service.js.map

/***/ }),

/***/ 464:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 464;


/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(586);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__station_page_station_page_component__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__station_page_station_resolver_service__ = __webpack_require__(311);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__station_page_station_page_component__["a" /* StationPageComponent */],
        resolve: {
            stations: __WEBPACK_IMPORTED_MODULE_3__station_page_station_resolver_service__["b" /* StationsResolver */]
        }
    },
    {
        path: ':id',
        component: __WEBPACK_IMPORTED_MODULE_2__station_page_station_page_component__["a" /* StationPageComponent */],
        resolve: {
            station: __WEBPACK_IMPORTED_MODULE_3__station_page_station_resolver_service__["a" /* StationResolver */],
            stations: __WEBPACK_IMPORTED_MODULE_3__station_page_station_resolver_service__["b" /* StationsResolver */]
        }
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angulartics2__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angulartics2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angulartics2__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(angulartics2GoogleAnalytics) {
        this.title = "when's the last bike at";
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(712),
            styles: [__webpack_require__(699)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angulartics2__["Angulartics2GoogleAnalytics"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_angulartics2__["Angulartics2GoogleAnalytics"]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_file_loader_name_CNAME_CNAME__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_file_loader_name_CNAME_CNAME___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_file_loader_name_CNAME_CNAME__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_auto_complete__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_chart_js__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angulartics2__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angulartics2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angulartics2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routing_module__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__station_page_station_page_component__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__station_page_station_resolver_service__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__station_page_station_service__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__keys_pipe__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__navbar_navbar_component__ = __webpack_require__(585);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_11__station_page_station_page_component__["a" /* StationPageComponent */],
                __WEBPACK_IMPORTED_MODULE_14__keys_pipe__["a" /* KeysPipe */],
                __WEBPACK_IMPORTED_MODULE_15__navbar_navbar_component__["a" /* NavbarComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_9__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_5_ng2_auto_complete__["Ng2AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_6_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_8_angulartics2__["Angulartics2Module"].forRoot([__WEBPACK_IMPORTED_MODULE_8_angulartics2__["Angulartics2GoogleAnalytics"]])
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__station_page_station_resolver_service__["a" /* StationResolver */],
                __WEBPACK_IMPORTED_MODULE_12__station_page_station_resolver_service__["b" /* StationsResolver */],
                __WEBPACK_IMPORTED_MODULE_13__station_page_station_service__["a" /* StationService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    KeysPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'keys'
        }), 
        __metadata('design:paramtypes', [])
    ], KeysPipe);
    return KeysPipe;
}());
//# sourceMappingURL=keys.pipe.js.map

/***/ }),

/***/ 585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavbarComponent = (function () {
    function NavbarComponent() {
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(713),
            styles: [__webpack_require__(700)]
        }), 
        __metadata('design:paramtypes', [])
    ], NavbarComponent);
    return NavbarComponent;
}());
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(56)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(56)();
// imports


// module
exports.push([module.i, ".nav {\n  position: fixed;\n  width: 100%;\n  background-color: transparent;\n}\n\n.icon {\n  color: #ffdd57;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(56)();
// imports


// module
exports.push([module.i, ".stations {\n  min-height: 100vh;\n  overflow: hidden;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.stations .title {\n  color: #fff;\n}\n\n.form-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-bottom: 30px;\n}\n\n.field {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n.with-station .field {\n  margin-top: -2rem;\n}\n\n.has-icon-right .icon {\n  height: 3.5rem;\n  width: 3.5rem;\n  color: #ffdd57;\n}\n\n.delete {\n  background-color: #ffdd57;\n}\n\n.notification {\n  color: #000;\n}\n\n.control.has-icon .icon.remove-station {\n  cursor: pointer;\n  pointer-events: all;\n}\n\n.stats {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.stats strong {\n  color: #fff;\n}\n\n.stats .pipe {\n  margin: 15px 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "CNAME";

/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 327,
	"./af.js": 327,
	"./ar": 334,
	"./ar-dz": 328,
	"./ar-dz.js": 328,
	"./ar-kw": 329,
	"./ar-kw.js": 329,
	"./ar-ly": 330,
	"./ar-ly.js": 330,
	"./ar-ma": 331,
	"./ar-ma.js": 331,
	"./ar-sa": 332,
	"./ar-sa.js": 332,
	"./ar-tn": 333,
	"./ar-tn.js": 333,
	"./ar.js": 334,
	"./az": 335,
	"./az.js": 335,
	"./be": 336,
	"./be.js": 336,
	"./bg": 337,
	"./bg.js": 337,
	"./bn": 338,
	"./bn.js": 338,
	"./bo": 339,
	"./bo.js": 339,
	"./br": 340,
	"./br.js": 340,
	"./bs": 341,
	"./bs.js": 341,
	"./ca": 342,
	"./ca.js": 342,
	"./cs": 343,
	"./cs.js": 343,
	"./cv": 344,
	"./cv.js": 344,
	"./cy": 345,
	"./cy.js": 345,
	"./da": 346,
	"./da.js": 346,
	"./de": 349,
	"./de-at": 347,
	"./de-at.js": 347,
	"./de-ch": 348,
	"./de-ch.js": 348,
	"./de.js": 349,
	"./dv": 350,
	"./dv.js": 350,
	"./el": 351,
	"./el.js": 351,
	"./en-au": 352,
	"./en-au.js": 352,
	"./en-ca": 353,
	"./en-ca.js": 353,
	"./en-gb": 354,
	"./en-gb.js": 354,
	"./en-ie": 355,
	"./en-ie.js": 355,
	"./en-nz": 356,
	"./en-nz.js": 356,
	"./eo": 357,
	"./eo.js": 357,
	"./es": 359,
	"./es-do": 358,
	"./es-do.js": 358,
	"./es.js": 359,
	"./et": 360,
	"./et.js": 360,
	"./eu": 361,
	"./eu.js": 361,
	"./fa": 362,
	"./fa.js": 362,
	"./fi": 363,
	"./fi.js": 363,
	"./fo": 364,
	"./fo.js": 364,
	"./fr": 367,
	"./fr-ca": 365,
	"./fr-ca.js": 365,
	"./fr-ch": 366,
	"./fr-ch.js": 366,
	"./fr.js": 367,
	"./fy": 368,
	"./fy.js": 368,
	"./gd": 369,
	"./gd.js": 369,
	"./gl": 370,
	"./gl.js": 370,
	"./gom-latn": 371,
	"./gom-latn.js": 371,
	"./he": 372,
	"./he.js": 372,
	"./hi": 373,
	"./hi.js": 373,
	"./hr": 374,
	"./hr.js": 374,
	"./hu": 375,
	"./hu.js": 375,
	"./hy-am": 376,
	"./hy-am.js": 376,
	"./id": 377,
	"./id.js": 377,
	"./is": 378,
	"./is.js": 378,
	"./it": 379,
	"./it.js": 379,
	"./ja": 380,
	"./ja.js": 380,
	"./jv": 381,
	"./jv.js": 381,
	"./ka": 382,
	"./ka.js": 382,
	"./kk": 383,
	"./kk.js": 383,
	"./km": 384,
	"./km.js": 384,
	"./kn": 385,
	"./kn.js": 385,
	"./ko": 386,
	"./ko.js": 386,
	"./ky": 387,
	"./ky.js": 387,
	"./lb": 388,
	"./lb.js": 388,
	"./lo": 389,
	"./lo.js": 389,
	"./lt": 390,
	"./lt.js": 390,
	"./lv": 391,
	"./lv.js": 391,
	"./me": 392,
	"./me.js": 392,
	"./mi": 393,
	"./mi.js": 393,
	"./mk": 394,
	"./mk.js": 394,
	"./ml": 395,
	"./ml.js": 395,
	"./mr": 396,
	"./mr.js": 396,
	"./ms": 398,
	"./ms-my": 397,
	"./ms-my.js": 397,
	"./ms.js": 398,
	"./my": 399,
	"./my.js": 399,
	"./nb": 400,
	"./nb.js": 400,
	"./ne": 401,
	"./ne.js": 401,
	"./nl": 403,
	"./nl-be": 402,
	"./nl-be.js": 402,
	"./nl.js": 403,
	"./nn": 404,
	"./nn.js": 404,
	"./pa-in": 405,
	"./pa-in.js": 405,
	"./pl": 406,
	"./pl.js": 406,
	"./pt": 408,
	"./pt-br": 407,
	"./pt-br.js": 407,
	"./pt.js": 408,
	"./ro": 409,
	"./ro.js": 409,
	"./ru": 410,
	"./ru.js": 410,
	"./sd": 411,
	"./sd.js": 411,
	"./se": 412,
	"./se.js": 412,
	"./si": 413,
	"./si.js": 413,
	"./sk": 414,
	"./sk.js": 414,
	"./sl": 415,
	"./sl.js": 415,
	"./sq": 416,
	"./sq.js": 416,
	"./sr": 418,
	"./sr-cyrl": 417,
	"./sr-cyrl.js": 417,
	"./sr.js": 418,
	"./ss": 419,
	"./ss.js": 419,
	"./sv": 420,
	"./sv.js": 420,
	"./sw": 421,
	"./sw.js": 421,
	"./ta": 422,
	"./ta.js": 422,
	"./te": 423,
	"./te.js": 423,
	"./tet": 424,
	"./tet.js": 424,
	"./th": 425,
	"./th.js": 425,
	"./tl-ph": 426,
	"./tl-ph.js": 426,
	"./tlh": 427,
	"./tlh.js": 427,
	"./tr": 428,
	"./tr.js": 428,
	"./tzl": 429,
	"./tzl.js": 429,
	"./tzm": 431,
	"./tzm-latn": 430,
	"./tzm-latn.js": 430,
	"./tzm.js": 431,
	"./uk": 432,
	"./uk.js": 432,
	"./ur": 433,
	"./ur.js": 433,
	"./uz": 435,
	"./uz-latn": 434,
	"./uz-latn.js": 434,
	"./uz.js": 435,
	"./vi": 436,
	"./vi.js": 436,
	"./x-pseudo": 437,
	"./x-pseudo.js": 437,
	"./yo": 438,
	"./yo.js": 438,
	"./zh-cn": 439,
	"./zh-cn.js": 439,
	"./zh-hk": 440,
	"./zh-hk.js": 440,
	"./zh-tw": 441,
	"./zh-tw.js": 441
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 706;


/***/ }),

/***/ 712:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ 713:
/***/ (function(module, exports) {

module.exports = "<nav class=\"nav\">\n  <div class=\"nav-right\">\n    <a\n      target=\"_blank\"\n      class=\"nav-item\"\n      href=\"https://medium.com/@jessrrobins/what-time-do-i-have-to-wake-up-to-get-a-bike-112a110a91dd\n\">\n      <span class=\"icon is-large\">\n        <i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i>\n      </span>\n    </a>\n  </div>\n</nav>\n"

/***/ }),

/***/ 714:
/***/ (function(module, exports) {

module.exports = "<section class=\"stations container has-text-centered\">\n  <div\n    [ngClass]=\"{'with-station': !!stationData}\"\n    [@stationFormSize]=\"!!stationData\"\n    class=\"form-container\">\n    <h1\n      [@stationTitleSize]=\"!!stationData\"\n      class=\"title very-big\">\n      when's the last bike at\n    </h1>\n    <div \n      [ngClass]=\"{'very-tall': showVeryTallDropdown()}\"\n      class=\"field\">\n      <p class=\"control has-icon has-icon-right\">\n        <input\n          class=\"input is-large\"\n          auto-complete\n          [(ngModel)]=\"station\"\n          [source]=\"stations\"\n          display-property-name=\"name\"\n          placeholder=\"Select a station\"\n          value-formatter=\"name\"\n          list-formatter=\"name\"\n          [match-formatted]=\"true\"\n          (valueChanged)=\"changeStation($event)\"\n          (focus)=\"onInputFocus($event)\" \n          (focusout)=\"onInputFocusOut($event)\" />\n        <span class=\"icon is-large\" *ngIf=\"!station && !isLoadingStationData\">\n          <i class=\"fa fa-angle-down\"></i>\n        </span>\n        <span\n          class=\"icon is-medium\"\n          *ngIf=\"isLoadingStationData\">\n          <i class=\"fa fa-cog fa-spin fa-fw\"></i>\n        </span>\n        <span\n          (click)=\"removeStation()\"\n          class=\"icon is-medium remove-station\"\n          *ngIf=\"station && !isLoadingStationData\">\n          <i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i>\n        </span>\n      </p>\n    </div>\n  </div>\n  <div\n    [@stationTimeSize]=\"!!stationData\">\n    <p class=\"title very-very-big\">\n      {{time()}}\n    </p>\n    <a\n      [ngClass]=\"{'hidden': !stationData || !stationData.statistics}\"\n      class=\"button is-warning is-outlined\"\n      (click)=\"toggleStationDetails()\">\n      More info\n    </a>\n  </div>\n  \n</section>\n<div\n  *ngIf=\"!!showStationDetails\"\n  [ngClass]=\"{'is-active': !!showStationDetails}\"\n  class=\"modal\">\n  <div class=\"modal-background\"></div>\n  <div class=\"modal-content\">\n    <canvas baseChart\n      [data]=\"graphData()\"\n      [labels]=\"graphLabels()\"\n      chartType=\"line\"\n      [options]=\"graphOptions\"></canvas>\n    <div class=\"stats\">\n      <span *ngFor=\"let s of formattedStatistics() | keys; let last = last\">\n        <strong>{{s.key}}</strong>: {{s.value}} <span class=\"pipe\" *ngIf=\"!last\">|</span>\n      </span>\n    </div>\n  </div>\n  <button\n    (click)=\"toggleStationDetails()\"\n    class=\"modal-close\"></button>\n</div>\n"

/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(465);


/***/ })

},[743]);
//# sourceMappingURL=main.bundle.js.map
