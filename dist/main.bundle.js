webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/dashboard/home.module.ngfactory": [
		"./src/app/dashboard/home.module.ngfactory.js",
		"home.module"
	],
	"app/discussions/discussion.module.ngfactory": [
		"./src/app/discussions/discussion.module.ngfactory.js",
		"discussion.module"
	],
	"app/events/events.module.ngfactory": [
		"./src/app/events/events.module.ngfactory.js",
		"common",
		"events.module"
	],
	"app/mine/mine.module.ngfactory": [
		"./src/app/mine/mine.module.ngfactory.js",
		"mine.module",
		"common"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/all/all.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__ = __webpack_require__("./src/app/services/mine-logs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_auto_unsubscribe__ = __webpack_require__("./src/app/utils/auto-unsubscribe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__ = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_interval__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/interval.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AllComponent = (function () {
    function AllComponent(mineService, toast, vcr, router, route) {
        this.mineService = mineService;
        this.toast = toast;
        this.router = router;
        this.route = route;
        this.allLogs$ = [];
        this.label = "Stop watching";
        this.toast.setRootViewContainerRef(vcr);
    }
    AllComponent.prototype.ngOnInit = function () {
        this.choose();
    };
    AllComponent.prototype.ngOnDestroy = function () { };
    AllComponent.prototype.getAllLogs = function () {
        var _this = this;
        this.loading = true;
        this.mineService.getAllLogs().subscribe(function (res) {
            console.log("res for all logs", res);
            _this.allLogs$ = res.records;
            _this.loading = false;
        }, function (err) {
            _this.toast.error(err);
        });
    };
    AllComponent.prototype.goToViewPage = function (event) {
        console.log("on row select", event);
        this.router.navigate(['../details', event.Id], { relativeTo: this.route });
    };
    AllComponent.prototype.deleteAllCached = function () {
        var _this = this;
        this.deleteAllCache = true;
        this.loading = true;
        this.mineService.deleteAllCached().subscribe(function (res) {
            console.log(res);
            _this.allLogs$ = res.records;
            _this.loading = false;
        });
    };
    AllComponent.prototype.choose = function () {
        if (this.deleteAllCache === true) {
            this.deleteAllCached();
        }
        else {
            this.getAllLogs();
        }
    };
    AllComponent.prototype.downloadLogs = function (event) {
        var _this = this;
        console.log("log Id is", event.Id);
        this.recordId = event.Id;
        var title = "apex - " + event.Id;
        this.mineService.downloadLogs(this.recordId).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err.error.text);
            _this.data = err.error.text;
            _this.saveToFileSystem(_this.data);
        });
    };
    AllComponent.prototype.saveToFileSystem = function (response) {
        var filename = "Apex- " + this.recordId;
        var blob = new Blob([response], { type: 'application/octet-stream' });
        Object(__WEBPACK_IMPORTED_MODULE_4_file_saver__["saveAs"])(blob, filename);
    };
    AllComponent.prototype.goToNewWindow = function () {
        chrome.windows.create({
            url: "index.html",
            type: 'panel',
            width: 1200,
            height: 800,
        }, function () {
        });
    };
    AllComponent.prototype.handleChange = function (event) {
        var _this = this;
        console.log("click", event);
        if (event.checked === true) {
            console.log("hi");
            this.i = setInterval(function () {
                _this.choose();
            }, 2000 * 30);
        }
        else {
            clearInterval(this.i);
            this.choose();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_storage_provider__["a" /* Cache */])({ pool: 'DeleteAllCached' }),
        __metadata("design:type", Boolean)
    ], AllComponent.prototype, "deleteAllCache", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_storage_provider__["a" /* Cache */])({ pool: 'LogUserId' }),
        __metadata("design:type", Object)
    ], AllComponent.prototype, "logUserId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_storage_provider__["a" /* Cache */])({ pool: 'LastSeenTime' }),
        __metadata("design:type", Object)
    ], AllComponent.prototype, "lastSeenTime", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_storage_provider__["a" /* Cache */])({ pool: 'NewWindow' }),
        __metadata("design:type", Boolean)
    ], AllComponent.prototype, "NewWindow", void 0);
    AllComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__utils_auto_unsubscribe__["a" /* AutoUnsubscribe */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__["a" /* MineLogsService */], __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__["ToastsManager"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]])
    ], AllComponent);
    return AllComponent;
}());



/***/ }),

/***/ "./src/app/app.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_AppComponent */
/* unused harmony export View_AppComponent_0 */
/* unused harmony export View_AppComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component_scss_shim_ngstyle__ = __webpack_require__("./src/app/app.component.scss.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_AppComponent = [__WEBPACK_IMPORTED_MODULE_0__app_component_scss_shim_ngstyle__["a" /* styles */]];
var RenderType_AppComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_AppComponent, data: {} });

function View_AppComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 212992, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_router__["RouterOutlet"], [__WEBPACK_IMPORTED_MODULE_2__angular_router__["ChildrenOutletContexts"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ComponentFactoryResolver"], [8, null], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
function View_AppComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */], [], null, null)], null, null); }
var AppComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-root", __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */], View_AppComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/app.component.scss.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".full-width[_ngcontent-%COMP%] {\n  width: 100%; }"];



/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModuleNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__callback_callback_component_ngfactory__ = __webpack_require__("./src/app/callback/callback.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_loader_data_loader_component_ngfactory__ = __webpack_require__("./src/app/data-loader/data-loader.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__container_container_component_ngfactory__ = __webpack_require__("./src/app/container/container.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_ng2_toastr_src_toast_container_component_ngfactory__ = __webpack_require__("./node_modules/ng2-toastr/src/toast-container.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component_ngfactory__ = __webpack_require__("./src/app/app.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_animations_browser__ = __webpack_require__("./node_modules/@angular/animations/@angular/animations/browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/@angular/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__ = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_slim_loading_bar_src_slim_loading_bar_service__ = __webpack_require__("./node_modules/ng2-slim-loading-bar/src/slim-loading-bar.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_toasty_src_toasty_service__ = __webpack_require__("./node_modules/ng2-toasty/src/toasty.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__interceptor_http_interceptor_service__ = __webpack_require__("./src/app/interceptor/http.interceptor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ng2_toastr_src_toast_options__ = __webpack_require__("./node_modules/ng2-toastr/src/toast-options.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ng2_toastr_src_toast_options___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_ng2_toastr_src_toast_options__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ng2_toastr_src_toast_manager__ = __webpack_require__("./node_modules/ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_toast_message_service__ = __webpack_require__("./src/app/services/toast-message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_mine_logs_service__ = __webpack_require__("./src/app/services/mine-logs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_oauth_guard_service__ = __webpack_require__("./src/app/services/oauth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_toolbar_title_service__ = __webpack_require__("./src/app/services/toolbar-title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_cookie_service__ = __webpack_require__("./src/app/services/cookie.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_communicator_service__ = __webpack_require__("./src/app/services/communicator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_debug_level_service__ = __webpack_require__("./src/app/services/debug-level.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_events_service__ = __webpack_require__("./src/app/services/events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_primeng_components_common_shared__ = __webpack_require__("./node_modules/primeng/components/common/shared.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_primeng_components_common_shared___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_32_primeng_components_common_shared__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_primeng_components_dropdown_dropdown__ = __webpack_require__("./node_modules/primeng/components/dropdown/dropdown.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_primeng_components_dropdown_dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33_primeng_components_dropdown_dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_primeng_components_paginator_paginator__ = __webpack_require__("./node_modules/primeng/components/paginator/paginator.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_primeng_components_paginator_paginator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_34_primeng_components_paginator_paginator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_primeng_components_dataview_dataview__ = __webpack_require__("./node_modules/primeng/components/dataview/dataview.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_primeng_components_dataview_dataview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35_primeng_components_dataview_dataview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_primeng_components_scrollpanel_scrollpanel__ = __webpack_require__("./node_modules/primeng/components/scrollpanel/scrollpanel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_primeng_components_scrollpanel_scrollpanel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36_primeng_components_scrollpanel_scrollpanel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_primeng_components_panel_panel__ = __webpack_require__("./node_modules/primeng/components/panel/panel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_primeng_components_panel_panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_37_primeng_components_panel_panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_primeng_components_checkbox_checkbox__ = __webpack_require__("./node_modules/primeng/components/checkbox/checkbox.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_primeng_components_checkbox_checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_38_primeng_components_checkbox_checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_primeng_components_button_button__ = __webpack_require__("./node_modules/primeng/components/button/button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_primeng_components_button_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_39_primeng_components_button_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_primeng_components_calendar_calendar__ = __webpack_require__("./node_modules/primeng/components/calendar/calendar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_primeng_components_calendar_calendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_40_primeng_components_calendar_calendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__callback_callback_component__ = __webpack_require__("./src/app/callback/callback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__data_loader_data_loader_component__ = __webpack_require__("./src/app/data-loader/data-loader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__container_container_component__ = __webpack_require__("./src/app/container/container.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_primeng_components_tabmenu_tabmenu__ = __webpack_require__("./node_modules/primeng/components/tabmenu/tabmenu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_primeng_components_tabmenu_tabmenu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_44_primeng_components_tabmenu_tabmenu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__widgets_widget_module__ = __webpack_require__("./src/app/widgets/widget.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_primeng_components_togglebutton_togglebutton__ = __webpack_require__("./node_modules/primeng/components/togglebutton/togglebutton.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_primeng_components_togglebutton_togglebutton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_46_primeng_components_togglebutton_togglebutton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_primeng_components_dialog_dialog__ = __webpack_require__("./node_modules/primeng/components/dialog/dialog.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_primeng_components_dialog_dialog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_47_primeng_components_dialog_dialog__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_primeng_components_inputtext_inputtext__ = __webpack_require__("./node_modules/primeng/components/inputtext/inputtext.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_primeng_components_inputtext_inputtext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_48_primeng_components_inputtext_inputtext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_primeng_components_autocomplete_autocomplete__ = __webpack_require__("./node_modules/primeng/components/autocomplete/autocomplete.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_primeng_components_autocomplete_autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_49_primeng_components_autocomplete_autocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__app_routes__ = __webpack_require__("./src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51_ng2_toastr_src_toast_module__ = __webpack_require__("./node_modules/ng2-toastr/src/toast.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51_ng2_toastr_src_toast_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_51_ng2_toastr_src_toast_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52_primeng_components_overlaypanel_overlaypanel__ = __webpack_require__("./node_modules/primeng/components/overlaypanel/overlaypanel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52_primeng_components_overlaypanel_overlaypanel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_52_primeng_components_overlaypanel_overlaypanel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_primeng_components_datatable_datatable__ = __webpack_require__("./node_modules/primeng/components/datatable/datatable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_primeng_components_datatable_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_53_primeng_components_datatable_datatable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_primeng_components_table_table__ = __webpack_require__("./node_modules/primeng/components/table/table.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_primeng_components_table_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_54_primeng_components_table_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_ng2_toasty_index__ = __webpack_require__("./node_modules/ng2-toasty/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56_ng2_slim_loading_bar_index__ = __webpack_require__("./node_modules/ng2-slim-loading-bar/index.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

























































var AppModuleNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵcmf"](__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]], function (_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmod"]([__WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵCodegenComponentFactoryResolver"], [[8, [__WEBPACK_IMPORTED_MODULE_3__callback_callback_component_ngfactory__["a" /* CallbackComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_4__data_loader_data_loader_component_ngfactory__["a" /* DataLoaderComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_5__container_container_component_ngfactory__["a" /* ContainerComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_6__node_modules_ng2_toastr_src_toast_container_component_ngfactory__["a" /* ToastContainerNgFactory */], __WEBPACK_IMPORTED_MODULE_7__app_component_ngfactory__["a" /* AppComponentNgFactory */]]], [3, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleRef"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵq"], [[3, __WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_8__angular_common__["NgLocalization"], __WEBPACK_IMPORTED_MODULE_8__angular_common__["NgLocaleLocalization"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"], [2, __WEBPACK_IMPORTED_MODULE_8__angular_common__["ɵa"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_ID"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵi"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵn"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵo"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["DomSanitizer"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵe"], [__WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Sanitizer"], null, [__WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["DomSanitizer"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["HAMMER_GESTURE_CONFIG"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["HammerGestureConfig"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["EVENT_MANAGER_PLUGINS"], function (p0_0, p0_1, p1_0, p2_0, p2_1) { return [new __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵDomEventsPlugin"](p0_0, p0_1), new __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵKeyEventsPlugin"](p1_0), new __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵHammerGesturesPlugin"](p2_0, p2_1)]; }, [__WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"], __WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["HAMMER_GESTURE_CONFIG"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["EventManager"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["EventManager"], [__WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["EVENT_MANAGER_PLUGINS"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](135680, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵDomSharedStylesHost"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵDomSharedStylesHost"], [__WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵDomRendererFactory2"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵDomRendererFactory2"], [__WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["EventManager"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵDomSharedStylesHost"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_10__angular_animations_browser__["a" /* AnimationDriver */], __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["d" /* ɵc */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_10__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */], __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["e" /* ɵd */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_10__angular_animations_browser__["b" /* ɵAnimationEngine */], __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["c" /* ɵb */], [__WEBPACK_IMPORTED_MODULE_10__angular_animations_browser__["a" /* AnimationDriver */], __WEBPACK_IMPORTED_MODULE_10__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["RendererFactory2"], __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["f" /* ɵe */], [__WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵDomRendererFactory2"], __WEBPACK_IMPORTED_MODULE_10__angular_animations_browser__["b" /* ɵAnimationEngine */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵSharedStylesHost"], null, [__WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵDomSharedStylesHost"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Testability"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Testability"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["Meta"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["Meta"], [__WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["Title"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["Title"], [__WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_12__angular_animations__["AnimationBuilder"], __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["b" /* ɵBrowserAnimationBuilder */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["RendererFactory2"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ɵi"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ɵi"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["FormBuilder"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["a" /* BREAKPOINTS */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["c" /* DEFAULT_BREAKPOINTS_PROVIDER_FACTORY */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["b" /* BreakPointRegistry */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["b" /* BreakPointRegistry */], [__WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["a" /* BREAKPOINTS */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["k" /* MatchMedia */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["k" /* MatchMedia */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["j" /* MEDIA_MONITOR_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["l" /* MediaMonitor */]], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["b" /* BreakPointRegistry */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["k" /* MatchMedia */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["o" /* ObservableMedia */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["n" /* OBSERVABLE_MEDIA_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["o" /* ObservableMedia */]], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["k" /* MatchMedia */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["b" /* BreakPointRegistry */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_15__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵf"], [__WEBPACK_IMPORTED_MODULE_15__angular_router__["Router"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_15__angular_router__["NoPreloading"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["NoPreloading"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_15__angular_router__["PreloadingStrategy"], null, [__WEBPACK_IMPORTED_MODULE_15__angular_router__["NoPreloading"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](135680, __WEBPACK_IMPORTED_MODULE_15__angular_router__["RouterPreloader"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["RouterPreloader"], [__WEBPACK_IMPORTED_MODULE_15__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["PreloadingStrategy"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_15__angular_router__["PreloadAllModules"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["PreloadAllModules"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_15__angular_router__["ROUTER_INITIALIZER"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵi"], [__WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵg"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_BOOTSTRAP_LISTENER"], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_15__angular_router__["ROUTER_INITIALIZER"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_16__angular_http__["c" /* BrowserXhr */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["c" /* BrowserXhr */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_16__angular_http__["g" /* ResponseOptions */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["b" /* BaseResponseOptions */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_16__angular_http__["i" /* XSRFStrategy */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["j" /* ɵa */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_16__angular_http__["h" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["h" /* XHRBackend */], [__WEBPACK_IMPORTED_MODULE_16__angular_http__["c" /* BrowserXhr */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["g" /* ResponseOptions */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["i" /* XSRFStrategy */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_16__angular_http__["f" /* RequestOptions */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["a" /* BaseRequestOptions */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_16__angular_http__["d" /* Http */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["k" /* ɵb */], [__WEBPACK_IMPORTED_MODULE_16__angular_http__["h" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["f" /* RequestOptions */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["i" /* HttpXsrfTokenExtractor */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["o" /* ɵh */], [__WEBPACK_IMPORTED_MODULE_8__angular_common__["DOCUMENT"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["PLATFORM_ID"], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["m" /* ɵf */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["p" /* ɵi */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["p" /* ɵi */], [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["i" /* HttpXsrfTokenExtractor */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["n" /* ɵg */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_15__angular_router__["Router"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_19_ng2_slim_loading_bar_src_slim_loading_bar_service__["b" /* SlimLoadingBarService */], __WEBPACK_IMPORTED_MODULE_19_ng2_slim_loading_bar_src_slim_loading_bar_service__["b" /* SlimLoadingBarService */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_20_ng2_toasty_src_toasty_service__["a" /* ToastyConfig */], __WEBPACK_IMPORTED_MODULE_20_ng2_toasty_src_toasty_service__["a" /* ToastyConfig */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_20_ng2_toasty_src_toasty_service__["c" /* ToastyService */], __WEBPACK_IMPORTED_MODULE_20_ng2_toasty_src_toasty_service__["d" /* toastyServiceFactory */], [__WEBPACK_IMPORTED_MODULE_20_ng2_toasty_src_toasty_service__["a" /* ToastyConfig */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["a" /* HTTP_INTERCEPTORS */], function (p0_0, p1_0, p1_1, p1_2, p1_3) { return [p0_0, new __WEBPACK_IMPORTED_MODULE_21__interceptor_http_interceptor_service__["a" /* HttpInterceptorService */](p1_0, p1_1, p1_2, p1_3)]; }, [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["p" /* ɵi */], __WEBPACK_IMPORTED_MODULE_15__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_19_ng2_slim_loading_bar_src_slim_loading_bar_service__["b" /* SlimLoadingBarService */], __WEBPACK_IMPORTED_MODULE_20_ng2_toasty_src_toasty_service__["c" /* ToastyService */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["l" /* ɵe */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["l" /* ɵe */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["j" /* XhrFactory */], null, [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["l" /* ɵe */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["h" /* HttpXhrBackend */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["h" /* HttpXhrBackend */], [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["j" /* XhrFactory */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["b" /* HttpBackend */], null, [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["h" /* HttpXhrBackend */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["f" /* HttpHandler */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["k" /* ɵc */], [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["b" /* HttpBackend */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["c" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["c" /* HttpClient */], [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["f" /* HttpHandler */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_22_ng2_toastr_src_toast_options__["ToastOptions"], __WEBPACK_IMPORTED_MODULE_22_ng2_toastr_src_toast_options__["ToastOptions"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23_ng2_toastr_src_toast_manager__["ToastsManager"], __WEBPACK_IMPORTED_MODULE_23_ng2_toastr_src_toast_manager__["ToastsManager"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_22_ng2_toastr_src_toast_options__["ToastOptions"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_24__services_toast_message_service__["a" /* ToastMessageService */], __WEBPACK_IMPORTED_MODULE_24__services_toast_message_service__["a" /* ToastMessageService */], [__WEBPACK_IMPORTED_MODULE_20_ng2_toasty_src_toasty_service__["c" /* ToastyService */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_25__services_mine_logs_service__["a" /* MineLogsService */], __WEBPACK_IMPORTED_MODULE_25__services_mine_logs_service__["a" /* MineLogsService */], [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["c" /* HttpClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_26__services_oauth_guard_service__["a" /* OAuthGuard */], __WEBPACK_IMPORTED_MODULE_26__services_oauth_guard_service__["a" /* OAuthGuard */], [__WEBPACK_IMPORTED_MODULE_15__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_27__services_toolbar_title_service__["a" /* ToolbarTitleService */], __WEBPACK_IMPORTED_MODULE_27__services_toolbar_title_service__["a" /* ToolbarTitleService */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_28__services_cookie_service__["a" /* CookieService */], __WEBPACK_IMPORTED_MODULE_28__services_cookie_service__["a" /* CookieService */], [__WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__services_communicator_service__["a" /* CommunicatorService */], __WEBPACK_IMPORTED_MODULE_29__services_communicator_service__["a" /* CommunicatorService */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_30__services_debug_level_service__["a" /* DebugLevelService */], __WEBPACK_IMPORTED_MODULE_30__services_debug_level_service__["a" /* DebugLevelService */], [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["c" /* HttpClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_31__services_events_service__["a" /* EventsService */], __WEBPACK_IMPORTED_MODULE_31__services_events_service__["a" /* EventsService */], [__WEBPACK_IMPORTED_MODULE_17__angular_common_http__["c" /* HttpClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_8__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_8__angular_common__["CommonModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵa"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgProbeToken"], function () { return [__WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵb"]()]; }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵg"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵg"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_INITIALIZER"], function (p0_0, p1_0) { return [__WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["ɵh"](p0_0), __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵh"](p1_0)]; }, [[2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgProbeToken"]], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵg"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"], [[2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_INITIALIZER"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](131584, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵConsole"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationModule"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationModule"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["BrowserModule"], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["BrowserModule"], [[3, __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["BrowserModule"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_32_primeng_components_common_shared__["SharedModule"], __WEBPACK_IMPORTED_MODULE_32_primeng_components_common_shared__["SharedModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33_primeng_components_dropdown_dropdown__["DropdownModule"], __WEBPACK_IMPORTED_MODULE_33_primeng_components_dropdown_dropdown__["DropdownModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ɵba"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ɵba"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["FormsModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_34_primeng_components_paginator_paginator__["PaginatorModule"], __WEBPACK_IMPORTED_MODULE_34_primeng_components_paginator_paginator__["PaginatorModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_35_primeng_components_dataview_dataview__["DataViewModule"], __WEBPACK_IMPORTED_MODULE_35_primeng_components_dataview_dataview__["DataViewModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_36_primeng_components_scrollpanel_scrollpanel__["ScrollPanelModule"], __WEBPACK_IMPORTED_MODULE_36_primeng_components_scrollpanel_scrollpanel__["ScrollPanelModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_37_primeng_components_panel_panel__["PanelModule"], __WEBPACK_IMPORTED_MODULE_37_primeng_components_panel_panel__["PanelModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_38_primeng_components_checkbox_checkbox__["CheckboxModule"], __WEBPACK_IMPORTED_MODULE_38_primeng_components_checkbox_checkbox__["CheckboxModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_39_primeng_components_button_button__["ButtonModule"], __WEBPACK_IMPORTED_MODULE_39_primeng_components_button_button__["ButtonModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_40_primeng_components_calendar_calendar__["CalendarModule"], __WEBPACK_IMPORTED_MODULE_40_primeng_components_calendar_calendar__["CalendarModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵa"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵd"], [[3, __WEBPACK_IMPORTED_MODULE_15__angular_router__["Router"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_15__angular_router__["UrlSerializer"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["DefaultUrlSerializer"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_15__angular_router__["ChildrenOutletContexts"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ChildrenOutletContexts"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_15__angular_router__["ROUTER_CONFIGURATION"], { paramsInheritanceStrategy: "always" }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_8__angular_common__["LocationStrategy"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵc"], [__WEBPACK_IMPORTED_MODULE_8__angular_common__["PlatformLocation"], [2, __WEBPACK_IMPORTED_MODULE_8__angular_common__["APP_BASE_HREF"]], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ROUTER_CONFIGURATION"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_8__angular_common__["Location"], __WEBPACK_IMPORTED_MODULE_8__angular_common__["Location"], [__WEBPACK_IMPORTED_MODULE_8__angular_common__["LocationStrategy"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["SystemJsNgModuleLoader"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], [2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["SystemJsNgModuleLoaderConfig"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_15__angular_router__["ROUTES"], function () { return [[{ path: "", redirectTo: "load", pathMatch: "full" }, { path: "auth/callback", component: __WEBPACK_IMPORTED_MODULE_41__callback_callback_component__["a" /* CallbackComponent */] }, { path: "load", component: __WEBPACK_IMPORTED_MODULE_42__data_loader_data_loader_component__["a" /* DataLoaderComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_26__services_oauth_guard_service__["a" /* OAuthGuard */]] }, { path: "home", component: __WEBPACK_IMPORTED_MODULE_43__container_container_component__["a" /* ContainerComponent */], loadChildren: "app/dashboard/home.module#HomeModule", canActivate: [__WEBPACK_IMPORTED_MODULE_26__services_oauth_guard_service__["a" /* OAuthGuard */]] }]]; }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_15__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵe"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["UrlSerializer"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ChildrenOutletContexts"], __WEBPACK_IMPORTED_MODULE_8__angular_common__["Location"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ROUTES"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["ROUTER_CONFIGURATION"], [2, __WEBPACK_IMPORTED_MODULE_15__angular_router__["UrlHandlingStrategy"]], [2, __WEBPACK_IMPORTED_MODULE_15__angular_router__["RouteReuseStrategy"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_15__angular_router__["RouterModule"], __WEBPACK_IMPORTED_MODULE_15__angular_router__["RouterModule"], [[2, __WEBPACK_IMPORTED_MODULE_15__angular_router__["ɵa"]], [2, __WEBPACK_IMPORTED_MODULE_15__angular_router__["Router"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_44_primeng_components_tabmenu_tabmenu__["TabMenuModule"], __WEBPACK_IMPORTED_MODULE_44_primeng_components_tabmenu_tabmenu__["TabMenuModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ReactiveFormsModule"], __WEBPACK_IMPORTED_MODULE_13__angular_forms__["ReactiveFormsModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["m" /* MediaQueriesModule */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["m" /* MediaQueriesModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["e" /* FlexLayoutModule */], __WEBPACK_IMPORTED_MODULE_14__angular_flex_layout__["e" /* FlexLayoutModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_45__widgets_widget_module__["a" /* WidgetsModule */], __WEBPACK_IMPORTED_MODULE_45__widgets_widget_module__["a" /* WidgetsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_46_primeng_components_togglebutton_togglebutton__["ToggleButtonModule"], __WEBPACK_IMPORTED_MODULE_46_primeng_components_togglebutton_togglebutton__["ToggleButtonModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_47_primeng_components_dialog_dialog__["DialogModule"], __WEBPACK_IMPORTED_MODULE_47_primeng_components_dialog_dialog__["DialogModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_48_primeng_components_inputtext_inputtext__["InputTextModule"], __WEBPACK_IMPORTED_MODULE_48_primeng_components_inputtext_inputtext__["InputTextModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_49_primeng_components_autocomplete_autocomplete__["AutoCompleteModule"], __WEBPACK_IMPORTED_MODULE_49_primeng_components_autocomplete_autocomplete__["AutoCompleteModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_50__app_routes__["a" /* AppRoutingModule */], __WEBPACK_IMPORTED_MODULE_50__app_routes__["a" /* AppRoutingModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_51_ng2_toastr_src_toast_module__["ToastModule"], __WEBPACK_IMPORTED_MODULE_51_ng2_toastr_src_toast_module__["ToastModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_52_primeng_components_overlaypanel_overlaypanel__["OverlayPanelModule"], __WEBPACK_IMPORTED_MODULE_52_primeng_components_overlaypanel_overlaypanel__["OverlayPanelModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_16__angular_http__["e" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_16__angular_http__["e" /* HttpModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_53_primeng_components_datatable_datatable__["DataTableModule"], __WEBPACK_IMPORTED_MODULE_53_primeng_components_datatable_datatable__["DataTableModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_54_primeng_components_table_table__["TableModule"], __WEBPACK_IMPORTED_MODULE_54_primeng_components_table_table__["TableModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["e" /* HttpClientXsrfModule */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["e" /* HttpClientXsrfModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["d" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["d" /* HttpClientModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_55_ng2_toasty_index__["a" /* ToastyModule */], __WEBPACK_IMPORTED_MODULE_55_ng2_toasty_index__["a" /* ToastyModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_56_ng2_slim_loading_bar_index__["a" /* SlimLoadingBarModule */], __WEBPACK_IMPORTED_MODULE_56_ng2_slim_loading_bar_index__["a" /* SlimLoadingBarModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], __WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["m" /* ɵf */], "XSRF-TOKEN", []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["n" /* ɵg */], "X-XSRF-TOKEN", [])]); });



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export eventRoutes */
/* unused harmony export discussionsRoutes */
/* unused harmony export MineRoutes */
/* unused harmony export dashboardRoutes */
/* unused harmony export appRoutes */
/* unused harmony export routingConfiguration */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__container_container_component__ = __webpack_require__("./src/app/container/container.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events_events_component__ = __webpack_require__("./src/app/events/events.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__discussions_discussions_component__ = __webpack_require__("./src/app/discussions/discussions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_loader_data_loader_component__ = __webpack_require__("./src/app/data-loader/data-loader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_oauth_guard_service__ = __webpack_require__("./src/app/services/oauth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__callback_callback_component__ = __webpack_require__("./src/app/callback/callback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mine_mine_component__ = __webpack_require__("./src/app/mine/mine.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__all_all_component__ = __webpack_require__("./src/app/all/all.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__flag_flag_component__ = __webpack_require__("./src/app/flag/flag.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_log_detail_view_log_detail_component__ = __webpack_require__("./src/app/view-log-detail/view-log-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__view_debug_level_log_view_debug_level_log_component__ = __webpack_require__("./src/app/view-debug-level-log/view-debug-level-log.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__credits_credits_component__ = __webpack_require__("./src/app/credits/credits.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__view_logs_by_user_view_logs_by_user_component__ = __webpack_require__("./src/app/view-logs-by-user/view-logs-by-user.component.ts");














var eventRoutes = [
    { path: 'all', component: __WEBPACK_IMPORTED_MODULE_1__events_events_component__["a" /* EventsComponent */] },
];
var discussionsRoutes = [
    { path: 'all', component: __WEBPACK_IMPORTED_MODULE_2__discussions_discussions_component__["a" /* DiscussionsComponent */] }
];
var MineRoutes = [
    { path: "", redirectTo: "logs" },
    { path: "logs", component: __WEBPACK_IMPORTED_MODULE_7__mine_mine_component__["a" /* MineComponent */] },
    { path: "details/:recordId", component: __WEBPACK_IMPORTED_MODULE_10__view_log_detail_view_log_detail_component__["a" /* ViewLogDetailComponent */] },
    { path: "allLogs", component: __WEBPACK_IMPORTED_MODULE_8__all_all_component__["a" /* AllComponent */] },
    { path: 'view', component: __WEBPACK_IMPORTED_MODULE_13__view_logs_by_user_view_logs_by_user_component__["a" /* ViewLogsByUserComponent */] },
    { path: "flag", component: __WEBPACK_IMPORTED_MODULE_9__flag_flag_component__["a" /* FlagComponent */] },
    { path: "debugLevelLog", component: __WEBPACK_IMPORTED_MODULE_11__view_debug_level_log_view_debug_level_log_component__["a" /* ViewDebugLevelLogComponent */] },
];
var dashboardRoutes = [
    { path: '', redirectTo: 'my' },
    { path: 'my', component: __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_component__["a" /* DashboardComponent */], loadChildren: "app/mine/mine.module#MineModule" },
    { path: 'events', loadChildren: 'app/events/events.module#EventsModule' },
    { path: 'discussions', loadChildren: 'app/discussions/discussion.module#DisscussionsModule' },
    { path: "credits", component: __WEBPACK_IMPORTED_MODULE_12__credits_credits_component__["a" /* CreditsComponent */] },
];
var appRoutes = [
    { path: '', redirectTo: 'load', pathMatch: 'full' },
    { path: 'auth/callback', component: __WEBPACK_IMPORTED_MODULE_6__callback_callback_component__["a" /* CallbackComponent */] },
    { path: 'load', component: __WEBPACK_IMPORTED_MODULE_4__data_loader_data_loader_component__["a" /* DataLoaderComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__services_oauth_guard_service__["a" /* OAuthGuard */]] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_0__container_container_component__["a" /* ContainerComponent */], loadChildren: 'app/dashboard/home.module#HomeModule', canActivate: [__WEBPACK_IMPORTED_MODULE_5__services_oauth_guard_service__["a" /* OAuthGuard */]] }
];
var routingConfiguration = {
    paramsInheritanceStrategy: 'always'
};
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/callback/callback.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_CallbackComponent */
/* unused harmony export View_CallbackComponent_0 */
/* unused harmony export View_CallbackComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallbackComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__callback_component__ = __webpack_require__("./src/app/callback/callback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_CallbackComponent = [];
var RenderType_CallbackComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵcrt"]({ encapsulation: 2, styles: styles_CallbackComponent, data: {} });

function View_CallbackComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](1, 0, null, null, 3, "div", [["class", "app-header"], ["style", "position:relative;width:100%;height:100%"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](3, 0, null, null, 0, "img", [["class", "logo animated zoomIn"], ["src", "assets/logo.png"], ["style", "position:absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n        "]))], null, null); }
function View_CallbackComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](0, 0, null, null, 1, "app-callback", [], null, null, null, View_CallbackComponent_0, RenderType_CallbackComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_1__callback_component__["a" /* CallbackComponent */], [__WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CallbackComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵccf"]("app-callback", __WEBPACK_IMPORTED_MODULE_1__callback_component__["a" /* CallbackComponent */], View_CallbackComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/callback/callback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CallbackComponent = (function () {
    function CallbackComponent(router, currentRoute, auth) {
        this.router = router;
        this.currentRoute = currentRoute;
        this.auth = auth;
    }
    CallbackComponent.prototype.ngOnInit = function () {
        this.getHostName();
    };
    CallbackComponent.prototype.getHostName = function () {
        var _this = this;
        chrome.cookies.getAll({ domain: "salesforce.com", name: "sid_Client" }, function (value) {
            console.log(value);
            for (var idx = 0; idx < value.length; idx++) {
                var replacementNodeName = _this.hostName(value[idx].domain);
                console.log('Visualforce / lightning - Salesforce URL Match ', replacementNodeName);
                _this.salesforcePodName = {
                    name: replacementNodeName
                };
                console.log("instance url ", value[idx].domain);
                _this.instanceUrl = {
                    currentURL: "https://" + value[idx].domain
                };
                chrome.cookies.get({ url: _this.instanceUrl.currentURL, name: 'disco' }, function (logUserId) {
                    var str = logUserId.value;
                    var a = str.split(':')[2];
                    console.log("value of a ", a);
                    _this.logUserId = {
                        userId: a
                    };
                });
                chrome.cookies.get({
                    "url": 'https://' + value[idx].domain,
                    "name": "sid"
                }, function (cookie) {
                    console.log('cookie value', cookie.value);
                    if (cookie.value) {
                        _this.userSession = {
                            token: cookie.value
                        };
                        console.log("get Cookies", _this.userSession);
                        _this.router.navigate(['/load']);
                    }
                    else {
                        _this.router.navigate(['/auth/callback']);
                    }
                });
            }
        });
    };
    CallbackComponent.prototype.hostName = function (name) {
        return name.substring(0, name.indexOf('.salesforce.com'));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'Session' }),
        __metadata("design:type", Object)
    ], CallbackComponent.prototype, "userSession", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'LogUserId' }),
        __metadata("design:type", Object)
    ], CallbackComponent.prototype, "logUserId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'instance' }),
        __metadata("design:type", Object)
    ], CallbackComponent.prototype, "instanceUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'salesforcePodName' }),
        __metadata("design:type", Object)
    ], CallbackComponent.prototype, "salesforcePodName", void 0);
    return CallbackComponent;
}());



/***/ }),

/***/ "./src/app/container/container.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_ContainerComponent */
/* unused harmony export View_ContainerComponent_0 */
/* unused harmony export View_ContainerComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContainerComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__container_component_scss_shim_ngstyle__ = __webpack_require__("./src/app/container/container.component.scss.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar_toolbar_component_ngfactory__ = __webpack_require__("./src/app/toolbar/toolbar.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toolbar_toolbar_component__ = __webpack_require__("./src/app/toolbar/toolbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__container_component__ = __webpack_require__("./src/app/container/container.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






var styles_ContainerComponent = [__WEBPACK_IMPORTED_MODULE_0__container_component_scss_shim_ngstyle__["a" /* styles */]];
var RenderType_ContainerComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_ContainerComponent, data: {} });

function View_ContainerComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "app-toolbar", [], null, null, null, __WEBPACK_IMPORTED_MODULE_2__toolbar_toolbar_component_ngfactory__["b" /* View_ToolbarComponent_0 */], __WEBPACK_IMPORTED_MODULE_2__toolbar_toolbar_component_ngfactory__["a" /* RenderType_ToolbarComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_3__toolbar_toolbar_component__["a" /* ToolbarComponent */], [__WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 212992, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_router__["RouterOutlet"], [__WEBPACK_IMPORTED_MODULE_4__angular_router__["ChildrenOutletContexts"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ComponentFactoryResolver"], [8, null], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 23, "footer", [["class", "footer"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, null, 20, "div", [["class", "container-fluid"], ["style", "padding:5px;"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, null, 4, "div", [["class", "pull-left"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](13, 0, null, null, 1, "small", [["class", "text-muted"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Created for devs by devs with \u2661 "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](17, 0, null, null, 11, "div", [["class", "pull-right"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 0, null, null, 3, "a", [["class", "text-muted"], ["href", "https://bitbucket.org/concretio/tooling-chrome-ext/"], ["target", "_blank"], ["title", "Report bug"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](21, 0, null, null, 0, "i", [["class", "fa fa-bug"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, [" Bugs \u00A0\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](24, 0, null, null, 3, "a", [["class", "text-muted"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.goToCredits() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](26, 0, null, null, 0, "i", [["class", "fa fa-thumbs-up"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, [" Credits"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { _ck(_v, 1, 0); _ck(_v, 5, 0); }, null); }
function View_ContainerComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-container", [], null, null, null, View_ContainerComponent_0, RenderType_ContainerComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_5__container_component__["a" /* ContainerComponent */], [__WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_4__angular_router__["ActivatedRoute"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ContainerComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-container", __WEBPACK_IMPORTED_MODULE_5__container_component__["a" /* ContainerComponent */], View_ContainerComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/container/container.component.scss.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/container/container.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContainerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");

var ContainerComponent = (function () {
    function ContainerComponent(router, currentRoute) {
        this.router = router;
        this.currentRoute = currentRoute;
        this.showSidenav = true;
        this.showNewWindow = false;
        this.menuItems = [{
                name: "Debug",
                icon: "fa-dashboard",
                path: "/home/my",
                active: true
            },
            {
                name: "Events",
                icon: "fa-line-chart",
                path: "/home/events/all",
                active: true
            },
            {
                name: "Discussions",
                icon: "fa-users",
                path: "/home/discussions/all",
                active: true,
            },
        ];
    }
    ContainerComponent.prototype.ngOnInit = function () {
        console.log('Init Container');
    };
    ContainerComponent.prototype.openInNewWindow = function () {
        chrome.windows.create({
            url: "index.html",
            type: 'panel',
            width: 1200,
            height: 800,
        }, function () { });
    };
    ContainerComponent.prototype.goToCredits = function () {
        console.log(this.currentRoute);
        this.router.navigate(['./credits'], { relativeTo: this.currentRoute });
    };
    return ContainerComponent;
}());



/***/ }),

/***/ "./src/app/credits/credits.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditsComponent; });
var CreditsComponent = (function () {
    function CreditsComponent() {
    }
    CreditsComponent.prototype.ngOnInit = function () {
    };
    return CreditsComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auto_unsubscribe__ = __webpack_require__("./src/app/utils/auto-unsubscribe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_communicator_service__ = __webpack_require__("./src/app/services/communicator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(comms) {
        this.comms = comms;
        this.tabs = [
            { name: 'All', path: 'allLogs', closable: false },
            { name: 'Mine', path: 'logs', closable: false },
            { name: '', path: 'flag', icon: 'fa fa-flag', closable: false }
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.comms.on('Add-new-tab', function (a) {
            console.log("Adding new Tab", a);
            _this.tabs.push({ name: a.DebugLevel.DeveloperName, path: 'view', closable: true });
        });
    };
    DashboardComponent.prototype.ngOnDestroy = function () { };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_auto_unsubscribe__["a" /* AutoUnsubscribe */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_communicator_service__["a" /* CommunicatorService */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/data-loader/data-loader.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_DataLoaderComponent */
/* unused harmony export View_DataLoaderComponent_0 */
/* unused harmony export View_DataLoaderComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataLoaderComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_loader_component_scss_shim_ngstyle__ = __webpack_require__("./src/app/data-loader/data-loader.component.scss.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__ = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__spalsh_loader_spalsh_loader_component_ngfactory__ = __webpack_require__("./src/app/spalsh-loader/spalsh-loader.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__spalsh_loader_spalsh_loader_component__ = __webpack_require__("./src/app/spalsh-loader/spalsh-loader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_loader_component__ = __webpack_require__("./src/app/data-loader/data-loader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_toast_message_service__ = __webpack_require__("./src/app/services/toast-message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_communicator_service__ = __webpack_require__("./src/app/services/communicator.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










var styles_DataLoaderComponent = [__WEBPACK_IMPORTED_MODULE_0__data_loader_component_scss_shim_ngstyle__["a" /* styles */]];
var RenderType_DataLoaderComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_DataLoaderComponent, data: {} });

function View_DataLoaderComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 0, "div", [["class", "dash"], ["style", "margin-top:5px;margin-left:14px;width:80px;height:12px"]], null, null, null, null, null))], null, null); }
function View_DataLoaderComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 0, "div", [["class", "dash"], ["style", "margin-top:5px;margin-left:14px;width:120px;height:12px"]], null, null, null, null, null))], null, null); }
function View_DataLoaderComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 10, "div", [["fxLayout", "row"], ["style", "margin-top:25px;margin-left:12px"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { layout: [0, "layout"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, null, 0, "div", [["class", "widget-icon"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_DataLoaderComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_DataLoaderComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "]))], function (_ck, _v) { var currVal_0 = "row"; _ck(_v, 1, 0, currVal_0); var currVal_1 = _v.context.$implicit.odd; _ck(_v, 6, 0, currVal_1); var currVal_2 = !_v.context.$implicit.odd; _ck(_v, 9, 0, currVal_2); }, null); }
function View_DataLoaderComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 44, "div", [["class", "blur"], ["fxLayout", "row"], ["style", "height:100%"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { layout: [0, "layout"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, null, 21, "div", [["class", "sidebar"], ["fxLayout", "column"], ["style", "opacity: 0.5;filter: alpha(opacity=50);"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { layout: [0, "layout"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 17, "div", [["fxLayout", "column"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { layout: [0, "layout"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, null, 6, "div", [["fxLayout", "row"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { layout: [0, "layout"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 0, "div", [["class", "icon"], ["style", "top:15px;left:5px"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 0, "div", [["class", "dash"], ["style", "top:27px;left:38px;background:lightslategrey"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](17, 0, null, null, 0, "div", [["class", "underline"], ["style", "top:27px;height:2px"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 0, null, null, 0, "div", [["style", "height:15px"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_DataLoaderComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](22, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_common__["NgForOf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](26, 0, null, null, 17, "div", [["fxFlex", ""], ["fxLayout", "column"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](27, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { layout: [0, "layout"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](28, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["d" /* FlexDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [3, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */]], [3, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["i" /* LayoutWrapDirective */]]], { flex: [0, "flex"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](30, 0, null, null, 9, "div", [["class", "toolbar"], ["fxLayout", "row"], ["fxLayoutAlign", "start right"], ["style", "opacity: 0.5;filter: alpha(opacity=50);"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](31, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { layout: [0, "layout"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](32, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["f" /* LayoutAlignDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [2, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */]]], { align: [0, "align"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](34, 0, null, null, 1, "span", [["fxFlex", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](35, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["d" /* FlexDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [3, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */]], [3, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["i" /* LayoutWrapDirective */]]], { flex: [0, "flex"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](37, 0, null, null, 1, "div", [["class", "dash2"], ["fxFlex", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](38, 737280, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["d" /* FlexDirective */], [__WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["l" /* MediaMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [3, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["g" /* LayoutDirective */]], [3, __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["i" /* LayoutWrapDirective */]]], { flex: [0, "flex"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](41, 0, null, null, 1, "app-splash-loader", [], null, null, null, __WEBPACK_IMPORTED_MODULE_4__spalsh_loader_spalsh_loader_component_ngfactory__["b" /* View_SplashLoaderComponent_0 */], __WEBPACK_IMPORTED_MODULE_4__spalsh_loader_spalsh_loader_component_ngfactory__["a" /* RenderType_SplashLoaderComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](42, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_5__spalsh_loader_spalsh_loader_component__["a" /* SplashLoaderComponent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "row"; _ck(_v, 1, 0, currVal_0); var currVal_1 = "column"; _ck(_v, 4, 0, currVal_1); var currVal_2 = "column"; _ck(_v, 7, 0, currVal_2); var currVal_3 = "row"; _ck(_v, 10, 0, currVal_3); var currVal_4 = _co.times; _ck(_v, 22, 0, currVal_4); var currVal_5 = "column"; _ck(_v, 27, 0, currVal_5); var currVal_6 = ""; _ck(_v, 28, 0, currVal_6); var currVal_7 = "row"; _ck(_v, 31, 0, currVal_7); var currVal_8 = "start right"; _ck(_v, 32, 0, currVal_8); var currVal_9 = ""; _ck(_v, 35, 0, currVal_9); var currVal_10 = ""; _ck(_v, 38, 0, currVal_10); _ck(_v, 42, 0); }, null); }
function View_DataLoaderComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-data-loader", [], null, null, null, View_DataLoaderComponent_0, RenderType_DataLoaderComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_6__data_loader_component__["a" /* DataLoaderComponent */], [__WEBPACK_IMPORTED_MODULE_7__services_toast_message_service__["a" /* ToastMessageService */], __WEBPACK_IMPORTED_MODULE_8__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_8__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_9__services_communicator_service__["a" /* CommunicatorService */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var DataLoaderComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-data-loader", __WEBPACK_IMPORTED_MODULE_6__data_loader_component__["a" /* DataLoaderComponent */], View_DataLoaderComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/data-loader/data-loader.component.scss.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".sidebar[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 300px;\n  z-index: 10;\n  background: #ffffff;\n  z-index: 1191;\n  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);\n          box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12); }\n  .sidebar[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n    -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-name: placeHolderShimmer;\n            animation-name: placeHolderShimmer;\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    background: orange;\n    background-size: 600px 104px;\n    height: 36px;\n    position: relative;\n    width: 36px;\n    border-radius: 50%; }\n  .sidebar[_ngcontent-%COMP%]   .dash[_ngcontent-%COMP%] {\n    -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-name: placeHolderShimmer;\n            animation-name: placeHolderShimmer;\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    background: #f6f7f8;\n    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));\n    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);\n    background-size: 600px 104px;\n    height: 15px;\n    position: relative;\n    width: 120px;\n    border-radius: 50px; }\n  .sidebar[_ngcontent-%COMP%]   .underline[_ngcontent-%COMP%] {\n    position: relative;\n    height: 5px;\n    width: 100%;\n    background: #f6f7f8;\n    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));\n    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);\n    -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-name: placeHolderShimmer;\n            animation-name: placeHolderShimmer;\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear; }\n  .sidebar[_ngcontent-%COMP%]   .widget-icon[_ngcontent-%COMP%] {\n    -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-name: placeHolderShimmer;\n            animation-name: placeHolderShimmer;\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    background: darkgray;\n    background-size: 600px 104px;\n    height: 24px;\n    position: relative;\n    width: 24px;\n    border-radius: 50%; }\n  .toolbar[_ngcontent-%COMP%] {\n  \n  background: #ff6d00;\n  z-index: 0;\n  padding: 5px;\n  height: 64px;\n  color: white;\n  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);\n          box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);\n  z-index: 1190; }\n  .toolbar[_ngcontent-%COMP%]   .dash2[_ngcontent-%COMP%] {\n    -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-name: placeHolderShimmer;\n            animation-name: placeHolderShimmer;\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    height: 15px;\n    position: relative;\n    max-width: 120px;\n    border-radius: 50px;\n    margin-top: 20px;\n    background: wheat; }"];



/***/ }),

/***/ "./src/app/data-loader/data-loader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataLoaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_toast_message_service__ = __webpack_require__("./src/app/services/toast-message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_communicator_service__ = __webpack_require__("./src/app/services/communicator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataLoaderComponent = (function () {
    function DataLoaderComponent(msgService, current, router, comms) {
        this.msgService = msgService;
        this.current = current;
        this.router = router;
        this.comms = comms;
        this.times = [{ odd: true }, { odd: false }, { odd: true }, { odd: false }];
        console.log('Init Data Loader');
        console.log("token is on data loader", this.userSession.token);
    }
    DataLoaderComponent.prototype.ngOnInit = function () {
        this.fetchSession();
    };
    DataLoaderComponent.prototype.fetchSession = function () {
        console.log('go to route');
        if (this.userSession.token) {
            this.router.navigate(['/home']);
        }
        else {
            this.router.navigate(['/auth/callback']);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_storage_provider__["a" /* Cache */])({ pool: 'Session' }),
        __metadata("design:type", Object)
    ], DataLoaderComponent.prototype, "userSession", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_storage_provider__["a" /* Cache */])({ pool: 'LogUserId' }),
        __metadata("design:type", Object)
    ], DataLoaderComponent.prototype, "logUserId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_storage_provider__["a" /* Cache */])({ pool: 'instance' }),
        __metadata("design:type", Object)
    ], DataLoaderComponent.prototype, "instanceUrl", void 0);
    return DataLoaderComponent;
}());



/***/ }),

/***/ "./src/app/discussions/discussions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscussionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auto_unsubscribe__ = __webpack_require__("./src/app/utils/auto-unsubscribe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DiscussionsComponent = (function () {
    function DiscussionsComponent() {
    }
    DiscussionsComponent.prototype.ngOnInit = function () {
    };
    DiscussionsComponent.prototype.ngOnDestroy = function () { };
    DiscussionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_auto_unsubscribe__["a" /* AutoUnsubscribe */])(),
        __metadata("design:paramtypes", [])
    ], DiscussionsComponent);
    return DiscussionsComponent;
}());



/***/ }),

/***/ "./src/app/events/events.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auto_unsubscribe__ = __webpack_require__("./src/app/utils/auto-unsubscribe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__ = __webpack_require__("./src/app/services/mine-logs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_events_service__ = __webpack_require__("./src/app/services/events.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EventsComponent = (function () {
    function EventsComponent(events, mineService) {
        this.events = events;
        this.mineService = mineService;
        this.events$ = [];
        this.event = false;
    }
    EventsComponent.prototype.ngOnInit = function () {
        this.fromRangeDates = new Date();
        this.fromRangeDates.setDate(this.fromRangeDates.getDate() - 15);
        this.toRangeDates = new Date();
        this.toRangeDates.setDate(this.toRangeDates.getDate());
        this.fetchEventsData();
        this.config = [
            { label: 'All', value: 'All' },
            { label: 'API', value: 'API' },
            { label: 'ApexCallout', value: 'ApexCallout' },
            { label: 'ApexExecution', value: 'ApexExecution' },
            { label: 'ApexSoap', value: 'ApexSoap' },
            { label: 'ApexTrigger', value: 'ApexTrigger' },
            { label: 'AsyncReportRun', value: 'AsyncReportRun' },
            { label: 'BulkApi', value: 'BulkApi' },
            { label: 'ChangeSetOperation', value: 'ChangeSetOperation' },
            { label: 'ContentDistribution', value: 'ContentDistribution' },
            { label: 'ContentDocumentLink', value: 'ContentDocumentLink' },
            { label: 'ContentTransfer', value: 'ContentTransfer' },
            { label: 'Dashboard', value: 'Dashboard' },
            { label: 'DocumentAttachmentDownloads', value: 'DocumentAttachmentDownloads' },
            { label: 'Login', value: 'Login' },
            { label: 'LoginAs', value: 'LoginAs' },
            { label: 'Logout', value: 'Logout' },
            { label: 'MetadataApiOperation', value: 'MetadataApiOperation' },
            { label: 'MultiBlockReport', value: 'MultiBlockReport' },
            { label: 'PackageInstall', value: 'PackageInstall' },
            { label: 'Report', value: 'Report' },
            { label: 'ReportExport', value: 'ApexCallout' },
            { label: 'Sandbox', value: 'Sandbox' },
            { label: 'Sites', value: 'Sites' },
            { label: 'TimeBasedWorkflow', value: 'TimeBasedWorkflow' },
            { label: 'UITracking', value: 'UITracking' },
            { label: 'URI', value: 'URI' },
            { label: 'VisualforceRequest', value: 'VisualforceRequest' },
        ];
    };
    EventsComponent.prototype.ngOnDestroy = function () { };
    EventsComponent.prototype.fetchEventsData = function () {
        var _this = this;
        this.loading = true;
        this.events.fetchEventData().subscribe(function (res) {
            console.log(res);
            _this.events$ = res.records;
            _this.loading = false;
        });
    };
    EventsComponent.prototype.downloadLogs = function (event) {
        console.log("log Id is", event.Id);
        this.recordId = event.Id;
        var title = "apex - " + event.Id;
        this.events.downloadEventLogs(this.recordId).subscribe(function (res) {
            console.log(res);
        });
    };
    EventsComponent.prototype.saveToFileSystem = function (response) {
        var filename = "LogFile";
        var blob = new Blob([response], { type: 'application/octet-stream' });
        Object(__WEBPACK_IMPORTED_MODULE_2_file_saver__["saveAs"])(blob, filename);
    };
    EventsComponent.prototype.fromDateValues = function (event) {
        console.log("from date", event);
        this.fromRangeDates = new Date(event).toISOString();
        this.from = true;
        console.log("iso string", this.fromRangeDates);
    };
    EventsComponent.prototype.toDateValues = function (event) {
        console.log("to date", event);
        this.toRangeDates = new Date(event).toISOString();
        this.to = true;
        console.log(this.toRangeDates);
    };
    EventsComponent.prototype.setEventType = function (event) {
        console.log("event type", event);
        this.event = true;
        this.eventType = event.value;
    };
    EventsComponent.prototype.fetchFilteredDataForEvent = function () {
        var _this = this;
        this.loading = true;
        this.events.fetchFilteredDataForEventType(this.eventType).subscribe(function (res) {
            console.log(res);
            _this.events$ = res.records;
            _this.loading = false;
        });
    };
    EventsComponent.prototype.fetchFilteredDataForDate = function () {
        var _this = this;
        this.loading = true;
        this.events.fetchFilteredDataForDate(this.fromRangeDates, this.toRangeDates).subscribe(function (res) {
            console.log(res);
            _this.events$ = res.records;
            _this.loading = false;
        });
    };
    EventsComponent.prototype.fetchFilteredDataForDateAndEvent = function () {
        var _this = this;
        this.loading = true;
        this.events.fetchFilteredDataForEventTypeAndDate(this.fromRangeDates, this.toRangeDates, this.eventType).subscribe(function (res) {
            console.log(res);
            _this.events$ = res.records;
            _this.loading = false;
        });
    };
    EventsComponent.prototype.choose = function () {
        if (this.from === true && this.to === true && this.event === false) {
            this.fetchFilteredDataForDate();
        }
        else if (this.event === true) {
            this.fetchFilteredDataForEvent();
        }
        else {
            this.fetchFilteredDataForDateAndEvent();
        }
    };
    EventsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_auto_unsubscribe__["a" /* AutoUnsubscribe */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_events_service__["a" /* EventsService */], __WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__["a" /* MineLogsService */]])
    ], EventsComponent);
    return EventsComponent;
}());



/***/ }),

/***/ "./src/app/flag/flag.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlagComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__ = __webpack_require__("./src/app/services/mine-logs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_auto_unsubscribe__ = __webpack_require__("./src/app/utils/auto-unsubscribe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_user__ = __webpack_require__("./src/app/model/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr__ = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_debug_level_service__ = __webpack_require__("./src/app/services/debug-level.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_communicator_service__ = __webpack_require__("./src/app/services/communicator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FlagComponent = (function () {
    function FlagComponent(mine, comms, route, router, toast, debugLevel, vcr) {
        this.mine = mine;
        this.comms = comms;
        this.route = route;
        this.router = router;
        this.toast = toast;
        this.debugLevel = debugLevel;
        this.vcr = vcr;
        this.fetchLogs$ = [];
        this.config = [];
        this.filtereUserForUser$ = [];
        this.filterUserForClass$ = [];
        this.filterUserForTrigger$ = [];
        this.filterDebugLevel$ = [];
        this.fetchDebugLevel$ = [];
        this.add = new __WEBPACK_IMPORTED_MODULE_3__model_user__["a" /* CreateUser */]();
        this.remove = new __WEBPACK_IMPORTED_MODULE_3__model_user__["b" /* clearUsername */]();
        this.toast.setRootViewContainerRef(vcr);
    }
    FlagComponent.prototype.ngOnInit = function () {
        this.fetchTraceLogs();
        this.config = [
            { label: 'User', value: 'User' },
            { label: 'Class', value: 'Class' },
            { label: 'Trigger', value: 'Trigger' },
        ];
    };
    FlagComponent.prototype.ngOnDestroy = function () { };
    FlagComponent.prototype.fetchTraceLogs = function () {
        var _this = this;
        this.loading = true;
        this.mine.fetchFlags().subscribe(function (res) {
            console.log("Trace flag data", res);
            _this.fetchLogs$ = res.records;
            _this.loading = false;
        }, function (err) {
            _this.toast.error("Error in fetching Logs");
        });
    };
    FlagComponent.prototype.deleteTraceLogs = function (event) {
        var _this = this;
        console.log(event);
        this.mine.deleteParticularTracelag(event.Id).subscribe(function (res) {
            console.log(res);
            _this.toast.success("Deleted Successfully");
            _this.fetchTraceLogs();
        }, function (err) {
            _this.toast.error("Error deleting log", err);
        });
    };
    FlagComponent.prototype.setData = function (event) {
        console.log(event);
        if (event.value === "User") {
            this.showUserDialog = true;
        }
        else if (event.value === "Class") {
            this.showClassDialog = true;
        }
        else {
            this.showTriggerDialog = true;
        }
    };
    FlagComponent.prototype.filterUserDataForUser = function (event) {
        var _this = this;
        console.log(event.query);
        this.mine.searchUserForUser(event.query).subscribe(function (res) {
            console.log(res.records);
            if (res.records.length === 0) {
                _this.emptyMessage = "No records found";
            }
            _this.filtereUserForUser$ = res.records;
        });
    };
    FlagComponent.prototype.filterUserDataForClass = function (event) {
        var _this = this;
        console.log(event.query);
        this.mine.searchUserForClass(event.query).subscribe(function (res) {
            console.log(res.records);
            if (res.records.length === 0) {
                _this.emptyMessage = "No records found";
            }
            _this.filterUserForClass$ = res.records;
        });
    };
    FlagComponent.prototype.filterUserDataForTrigger = function (event) {
        var _this = this;
        console.log(event.query);
        this.mine.searchUserForTrigger(event.query).subscribe(function (res) {
            console.log(res.records);
            if (res.records.length === 0) {
                _this.emptyMessage = "No records found";
            }
            _this.filterUserForTrigger$ = res.records;
        });
    };
    FlagComponent.prototype.setUserIdForUser = function (event) {
        console.log(event);
        this.add.TracedEntityId = event.Id;
        this.userName = event.Name;
        console.log("USerId", this.add.TracedEntityId);
        console.log(this.userName);
    };
    FlagComponent.prototype.setDebugLevelId = function (event) {
        console.log(event);
        this.add.DebugLevelId = event.Id;
        this.devName = event.DeveloperName;
        console.log("debug level ID ", this.add.DebugLevelId);
    };
    FlagComponent.prototype.filterDebugLevel = function (event) {
        var _this = this;
        console.log(event.query);
        this.mine.searchDebugLevel(event.query).subscribe(function (res) {
            console.log(res.records);
            if (res.records.length === 0) {
                _this.emptyMessage = "No records found";
            }
            _this.filterDebugLevel$ = res.records;
        });
    };
    FlagComponent.prototype.createUser = function () {
        var _this = this;
        console.log(this.add);
        var date = new Date();
        date.setDate(date.getDate() + 1);
        console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
        console.log("tomorrow date", date);
        this.add.ExpirationDate = date;
        this.add.LogType = "DEVELOPER_LOG";
        this.mine.create(this.add).subscribe(function (res) {
            _this.showUserDialog = false;
            _this.toast.success("Success");
            console.log(res);
            _this.fetchTraceLogs();
        }, function (err) {
            console.log(err.error[0].message);
            _this.toast.error("error", err.error[0].message);
        });
    };
    FlagComponent.prototype.createClass = function () {
        var _this = this;
        console.log(this.add);
        var date = new Date();
        date.setDate(date.getDate() + 1);
        console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
        console.log("tomorrow date", date);
        this.add.ExpirationDate = date;
        this.add.LogType = "CLASS_TRACING";
        this.mine.create(this.add).subscribe(function (res) {
            _this.showClassDialog = false;
            _this.toast.success("Success");
            console.log(res);
            _this.fetchTraceLogs();
        }, function (err) {
            console.log(err.error[0].message);
            _this.toast.error("error", err.error[0].message);
        });
    };
    FlagComponent.prototype.cancelClass = function () {
        this.showClassDialog = false;
        this.remove.devName = "";
        this.remove.userName = "";
    };
    FlagComponent.prototype.createTrigger = function () {
        var _this = this;
        console.log(this.add);
        var date = new Date();
        date.setDate(date.getDate() + 1);
        console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
        console.log("tomorrow date", date);
        this.add.ExpirationDate = date;
        this.add.LogType = "CLASS_TRACING";
        this.mine.create(this.add).subscribe(function (res) {
            _this.showTriggerDialog = false;
            _this.toast.success("Success");
            console.log(res);
            _this.fetchTraceLogs();
        }, function (err) {
            console.log(err.error[0].message);
            _this.toast.error("error", err.error[0].message);
        });
    };
    FlagComponent.prototype.goForIgnition = function () {
        return this.add.TracedEntityId && this.add.DebugLevelId;
    };
    FlagComponent.prototype.goToNewWindow = function () {
        chrome.windows.create({
            url: "index.html",
            type: 'panel',
            width: 1200,
            height: 800,
        });
        this.showDialog = false;
        this.NewWindow = true;
    };
    FlagComponent.prototype.select = function () {
        if (this.NewWindow === true) {
            this.showDialog = false;
            this.route.navigate(['../debugLevelLog'], { relativeTo: this.router });
        }
        else {
            this.showDialog = true;
        }
    };
    FlagComponent.prototype.getDebugLevel = function () {
        var _this = this;
        this.debugLevel.getDebugLevel().subscribe(function (res) {
            console.log("debug level", res);
            _this.fetchDebugLevel$ = res.records;
        });
    };
    FlagComponent.prototype.addNewTab = function (event) {
        console.log(event);
        this.comms.broadcast('Add-new-tab', event);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_storage_provider__["a" /* Cache */])({ pool: 'NewWindow' }),
        __metadata("design:type", Boolean)
    ], FlagComponent.prototype, "NewWindow", void 0);
    FlagComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_auto_unsubscribe__["a" /* AutoUnsubscribe */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__["a" /* MineLogsService */], __WEBPACK_IMPORTED_MODULE_8__services_communicator_service__["a" /* CommunicatorService */], __WEBPACK_IMPORTED_MODULE_7__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_7__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_4_ng2_toastr__["ToastsManager"], __WEBPACK_IMPORTED_MODULE_6__services_debug_level_service__["a" /* DebugLevelService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
    ], FlagComponent);
    return FlagComponent;
}());



/***/ }),

/***/ "./src/app/interceptor/http.interceptor.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpInterceptorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_slim_loading_bar__ = __webpack_require__("./node_modules/ng2-slim-loading-bar/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_observable_EmptyObservable__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/EmptyObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_toasty__ = __webpack_require__("./node_modules/ng2-toasty/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HttpInterceptorService = (function () {
    function HttpInterceptorService(router, auth, loader, toast) {
        var _this = this;
        this.router = router;
        this.auth = auth;
        this.loader = loader;
        this.toast = toast;
        this._pendingRequests = 0;
        this._pendingRequestsStatus = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.loader.color = '#0d4ca6';
        this.loader.height = '8px';
        console.log("interceptor", this.userSession);
        this._pendingRequestsStatus.subscribe(function (progress) {
            if (progress.started) {
                _this.loader.start();
            }
            if (progress.completed) {
                _this.loader.complete();
            }
        });
    }
    HttpInterceptorService.prototype._requestStarted = function () {
        this._pendingRequestsStatus.next({
            started: this._pendingRequests === 0,
            pendingRequests: ++this._pendingRequests
        });
    };
    HttpInterceptorService.prototype._requestEnded = function () {
        this._pendingRequestsStatus.next({
            completed: this._pendingRequests === 1,
            pendingRequests: --this._pendingRequests
        });
    };
    HttpInterceptorService.prototype.handleError = function (error) {
        switch (error.status) {
            case 401:
            case 403:
                console.log('Session Expired. Show Alert and redirect to login', error);
                this.router.navigate(['/auth/callback']);
                break;
            case 500:
                console.log('Something broke from server. Show 500 page');
                this.toast.error({
                    title: '500 | INTERNAL SERVER ERROR',
                    msg: error.message,
                    showClose: false,
                    timeout: 3000,
                    theme: 'default'
                });
                break;
            case 409:
                console.error('Intercepted Error', error);
                break;
            default:
                this.toast.error({
                    title: error.status + '|' + error.statusText,
                    msg: error.message,
                    showClose: false,
                    timeout: 3000,
                    theme: 'default'
                });
        }
        this._requestEnded();
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["a" /* Observable */].throw(error);
    };
    HttpInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        if (this.auth.isAuthenticated()) {
            this._requestStarted();
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.auth.getToken()
                }
            });
            return next.handle(request)
                .catch(function (error) { return _this.handleError(error); })
                .finally(function () {
                _this._requestEnded();
            });
        }
        else {
            this.router.navigate(['/auth/callback'], { queryParams: { redirect: true } });
            this._requestEnded();
            return new __WEBPACK_IMPORTED_MODULE_9_rxjs_observable_EmptyObservable__["a" /* EmptyObservable */]();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_8__utils_storage_provider__["a" /* Cache */])({ pool: 'Session' }),
        __metadata("design:type", Object)
    ], HttpInterceptorService.prototype, "userSession", void 0);
    return HttpInterceptorService;
}());



/***/ }),

/***/ "./src/app/mine/mine.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_toast_message_service__ = __webpack_require__("./src/app/services/toast-message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__ = __webpack_require__("./src/app/services/mine-logs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_auto_unsubscribe__ = __webpack_require__("./src/app/utils/auto-unsubscribe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_interval__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/interval.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MineComponent = (function () {
    function MineComponent(mineService, route, router, toast) {
        this.mineService = mineService;
        this.route = route;
        this.router = router;
        this.toast = toast;
        this.mineLogs$ = [];
        this.label = "Stop watching";
    }
    MineComponent.prototype.ngOnInit = function () {
        this.sortOptions = [
            { label: 'Newest First', value: '!year' },
            { label: 'Oldest First', value: 'year' },
            { label: 'Brand', value: 'brand' }
        ];
        this.choose();
    };
    MineComponent.prototype.ngOnDestroy = function () { };
    MineComponent.prototype.getMineLogs = function () {
        var _this = this;
        this.loading = true;
        this.mineService.getMineLogs(this.logUserId.userId).subscribe(function (res) {
            console.log("mine logs", res.records);
            if (res.records.length === 0) {
                _this.lastSeenTime = "";
            }
            _this.lastSeenTime = res.records[0].StartTime;
            _this.mineLogs$ = res.records;
            _this.loading = false;
        });
    };
    MineComponent.prototype.goToViewPage = function (event) {
        console.log("on row select", event);
        this.router.navigate(['../details', event.Id], { relativeTo: this.route });
    };
    MineComponent.prototype.deleteMineCached = function () {
        var _this = this;
        this.deleteMyCache = true;
        this.loading = true;
        this.mineService.deleteMineCached().subscribe(function (res) {
            console.log(res);
            _this.mineLogs$ = res.records;
            _this.loading = false;
        });
    };
    MineComponent.prototype.choose = function () {
        if (this.deleteMyCache === true) {
            this.deleteMineCached();
        }
        else {
            this.getMineLogs();
        }
    };
    MineComponent.prototype.downloadLogs = function (event) {
        var _this = this;
        console.log("log Id is", event.Id);
        this.recordId = event.Id;
        var title = "apex - " + event.Id;
        this.mineService.downloadLogs(this.recordId).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err.error.text);
            _this.data = err.error.text;
            _this.saveToFileSystem(_this.data);
        });
    };
    MineComponent.prototype.saveToFileSystem = function (response) {
        var filename = "Apex- " + this.recordId;
        var blob = new Blob([response], { type: 'application/octet-stream' });
        Object(__WEBPACK_IMPORTED_MODULE_5_file_saver__["saveAs"])(blob, filename);
    };
    MineComponent.prototype.goToNewWindow = function (event) {
        console.log(event);
        chrome.windows.create({
            url: "index.html",
            type: 'panel',
            width: 1200,
            height: 800,
        }, function () { });
    };
    MineComponent.prototype.goToNewTab = function (event) {
        console.log(event);
        chrome.tabs.create({
            url: "/home/my/details/" + event.Id + '&instanceUrl=' + this.instanceUrl.currentURL,
            selected: true
        }, function () { });
    };
    MineComponent.prototype.handleChange = function (event) {
        var _this = this;
        console.log("click", event);
        if (event.checked === true) {
            this.i = setInterval(function () {
                _this.choose();
            }, 2000 * 30);
        }
        else {
            clearInterval(this.i);
            this.choose();
        }
    };
    MineComponent.prototype.selectCar = function (event, mine) {
        console.log(event, mine);
        this.selectedCar = mine;
        this.displayDialog = true;
        event.preventDefault();
    };
    MineComponent.prototype.onSortChange = function (event) {
        var value = event.value;
        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    };
    MineComponent.prototype.onDialogHide = function () {
        this.selectedCar = null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'LogUserId' }),
        __metadata("design:type", Object)
    ], MineComponent.prototype, "logUserId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'LastSeenTime' }),
        __metadata("design:type", Object)
    ], MineComponent.prototype, "lastSeenTime", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'DeleteMineCached' }),
        __metadata("design:type", Boolean)
    ], MineComponent.prototype, "deleteMyCache", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'instance' }),
        __metadata("design:type", Object)
    ], MineComponent.prototype, "instanceUrl", void 0);
    MineComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__utils_auto_unsubscribe__["a" /* AutoUnsubscribe */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__["a" /* MineLogsService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_0__services_toast_message_service__["a" /* ToastMessageService */]])
    ], MineComponent);
    return MineComponent;
}());



/***/ }),

/***/ "./src/app/model/debug-level.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateDebugLevel; });
var CreateDebugLevel = (function () {
    function CreateDebugLevel() {
        this.ApexCode = "";
        this.ApexProfiling = "";
        this.Callout = "";
        this.Database = "";
        this.DeveloperName = "";
        this.MasterLabel = "";
        this.System = "";
        this.Validation = "";
        this.Visualforce = "";
        this.Workflow = "";
    }
    return CreateDebugLevel;
}());



/***/ }),

/***/ "./src/app/model/node.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
var Node = (function () {
    function Node() {
    }
    return Node;
}());



/***/ }),

/***/ "./src/app/model/root.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return Root; });
var Root = (function () {
    function Root() {
    }
    return Root;
}());



/***/ }),

/***/ "./src/app/model/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clearUsername; });
var CreateUser = (function () {
    function CreateUser() {
        this.DebugLevelId = "";
        this.ExpirationDate = new Date();
        this.LogType = "";
        this.TracedEntityId = "";
    }
    return CreateUser;
}());

var clearUsername = (function () {
    function clearUsername() {
    }
    return clearUsername;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthService = (function () {
    function AuthService(router) {
        this.router = router;
    }
    AuthService.prototype.createSession = function (data) {
        this.userSession.token = data;
    };
    AuthService.prototype.isAuthenticated = function () {
        if (this.userSession && this.userSession.token) {
            return true;
        }
        return false;
    };
    AuthService.prototype.getToken = function () {
        return this.userSession.token ? this.userSession.token : false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'Session' }),
        __metadata("design:type", Object)
    ], AuthService.prototype, "userSession", void 0);
    return AuthService;
}());

/**
 * Authentication strategy
 * Store token and time when received.
 *
 */


/***/ }),

/***/ "./src/app/services/communicator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommunicatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);


var CommunicatorService = (function () {
    function CommunicatorService() {
        var _this = this;
        this.listeners = {};
        this.eventsSubject = new __WEBPACK_IMPORTED_MODULE_0_rxjs__["BehaviorSubject"]({});
        this.events = __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].from(this.eventsSubject);
        this.events.subscribe(function (params) {
            if (_this.listeners[params.name]) {
                for (var _i = 0, _a = _this.listeners[params.name]; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener.apply(void 0, params.args);
                }
            }
        });
    }
    CommunicatorService.prototype.on = function (name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
    };
    CommunicatorService.prototype.broadcast = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.eventsSubject.next({
            name: name,
            args: args
        });
    };
    return CommunicatorService;
}());



/***/ }),

/***/ "./src/app/services/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = (function () {
    function Constants() {
    }
    Constants.BASE_URL = "https://ap5.salesforce.com/services/data/v35.0/tooling/query/?q=";
    Constants.USER_SEARCH_BASE_URL = "https://ap5.salesforce.com/services/data/v35.0/query/?q=";
    Constants.CREATE_USER_URL = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/TraceFlag/";
    Constants.FETCH_EVENTS_URL = "https://ap5.salesforce.com/services/data/v35.0/query/?q=";
    Constants.CREATE_DEBUG_LEVEL_URL = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/DebugLevel/";
    Constants.DELETE_DEBUG_LEVEL_LOG_BY_ID = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/DebugLevel/";
    Constants.UPDATE_DEBUG_LEVEL_BY_ID = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/DebugLevel/";
    Constants.GET_MINE_LOGS = function (LogUserId) {
        return "SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog where   LogUserId = " + "'" + LogUserId + "'" + "  ORDER BY StartTime  DESC LIMIT 20";
    };
    Constants.GET_ALL_LOGS = function () {
        return "SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog ORDER BY StartTime DESC LIMIT 20";
    };
    Constants.GET_PARTICULAR_LOG = function (recordId) {
        return "/services/data/v41.0/sobjects/ApexLog/" + recordId + "/Body/";
    };
    Constants.DOWNLOAD_LOGS = function (recordId) {
        return "/servlet/servlet.FileDownload?file=" + recordId;
    };
    Constants.DELETE_PARTICULAR_FLAG = function (traceFlagId) {
        return "/services/data/v35.0/tooling/sobjects/TraceFlag/" + traceFlagId;
    };
    Constants.DELETE_DEBUG_LEVEL_LOG_BY_ID_URL = function (logLevelId) {
        return "/services/data/v35.0/tooling/sobjects/DebugLevel/" + logLevelId;
    };
    Constants.FETCH_DEBUG_LEVEL_LOG_BY_ID_URL = function (logLevelId) {
        return "/services/data/v35.0/tooling/sobjects/DebugLevel/" + logLevelId;
    };
    Constants.UPDATE_DEBUG_LEVEL_LOG_BY_ID_URL = function (id) {
        return "/services/data/v35.0/tooling/sobjects/DebugLevel/" + id;
    };
    return Constants;
}());



/***/ }),

/***/ "./src/app/services/cookie.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CookieService; });
var CookieService = (function () {
    function CookieService(document) {
        this.document = document;
        // To avoid issues with server side prerendering, check if `document` is defined.
        this.documentIsAccessible = document !== undefined;
    }
    /**
     * @param name Cookie name
     * @returns {boolean}
     */
    CookieService.prototype.check = function (name) {
        if (!this.documentIsAccessible) {
            return false;
        }
        name = encodeURIComponent(name);
        var regExp = this.getCookieRegExp(name);
        var exists = regExp.test(this.document.cookie);
        return exists;
    };
    /**
     * @param name Cookie name
     * @returns {any}
     */
    CookieService.prototype.get = function (name) {
        if (this.documentIsAccessible && this.check(name)) {
            name = encodeURIComponent(name);
            var regExp = this.getCookieRegExp(name);
            var result = regExp.exec(this.document.cookie);
            return decodeURIComponent(result[1]);
        }
        else {
            return '';
        }
    };
    /**
     * @returns {}
     */
    CookieService.prototype.getAll = function () {
        if (!this.documentIsAccessible) {
            return {};
        }
        var cookies = {};
        var document = this.document;
        if (document.cookie && document.cookie !== '') {
            var split = document.cookie.split(';');
            for (var i = 0; i < split.length; i += 1) {
                var currentCookie = split[i].split('=');
                currentCookie[0] = currentCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currentCookie[0])] = decodeURIComponent(currentCookie[1]);
            }
        }
        return cookies;
    };
    /**
     * @param name    Cookie name
     * @param value   Cookie value
     * @param expires Number of days until the cookies expires or an actual `Date`
     * @param path    Cookie path
     * @param domain  Cookie domain
     * @param secure  Secure flag
     */
    CookieService.prototype.set = function (name, value, expires, path, domain, secure) {
        if (!this.documentIsAccessible) {
            return;
        }
        var cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                var dateExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                cookieString += 'expires=' + dateExpires.toUTCString() + ';';
            }
            else {
                cookieString += 'expires=' + expires.toUTCString() + ';';
            }
        }
        if (path) {
            cookieString += 'path=' + path + ';';
        }
        if (domain) {
            cookieString += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieString += 'secure;';
        }
        this.document.cookie = cookieString;
    };
    /**
     * @param name   Cookie name
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    CookieService.prototype.delete = function (name, path, domain) {
        if (!this.documentIsAccessible) {
            return;
        }
        this.set(name, '', -1, path, domain);
    };
    /**
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    CookieService.prototype.deleteAll = function (path, domain) {
        if (!this.documentIsAccessible) {
            return;
        }
        var cookies = this.getAll();
        for (var cookieName in cookies) {
            if (cookies.hasOwnProperty(cookieName)) {
                this.delete(cookieName, path, domain);
            }
        }
    };
    /**
     * @param name Cookie name
     * @returns {RegExp}
     */
    CookieService.prototype.getCookieRegExp = function (name) {
        var escapedName = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/ig, '\\$1');
        return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
    };
    return CookieService;
}());



/***/ }),

/***/ "./src/app/services/debug-level.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DebugLevelService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DebugLevelService = (function () {
    function DebugLevelService(http) {
        this.http = http;
    }
    DebugLevelService.prototype.getDebugLevel = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        var url = "Select Id, DeveloperName, ApexCode, ApexProfiling, Callout ,Database,  System ,Validation ,Visualforce, Workflow  from DebugLevel  order by LastModifiedDate DESC ";
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        headers.append('Accept', "application/json");
        var BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/tooling/query/?q=";
        return this.http.get(BASE_URL + encodeURIComponent(url), { headers: headers });
    };
    DebugLevelService.prototype.createDebugLevel = function (body) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        headers.append('Accept', "application/json");
        return this.http.post(this.instanceUrl.currentURL + "/services/data/v35.0/tooling/sobjects/DebugLevel/", body);
    };
    DebugLevelService.prototype.deleteDebugLogLevelById = function (debugLevelLogId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        headers.append('Accept', "application/json");
        return this.http.delete(this.instanceUrl.currentURL + __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].DELETE_DEBUG_LEVEL_LOG_BY_ID_URL(debugLevelLogId), { headers: headers });
    };
    DebugLevelService.prototype.getparticularDebugLevelData = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        headers.append('Accept', "application/json");
        return this.http.get(this.instanceUrl.currentURL + __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].DELETE_DEBUG_LEVEL_LOG_BY_ID_URL(id), { headers: headers });
    };
    DebugLevelService.prototype.updateDebugLevelData = function (id, body) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        headers.append('Accept', "application/json");
        return this.http.patch(this.instanceUrl.currentURL + __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].UPDATE_DEBUG_LEVEL_LOG_BY_ID_URL(id), body);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'Session' }),
        __metadata("design:type", Object)
    ], DebugLevelService.prototype, "userSession", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'LogUserId' }),
        __metadata("design:type", Object)
    ], DebugLevelService.prototype, "logUserId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'instance' }),
        __metadata("design:type", Object)
    ], DebugLevelService.prototype, "instanceUrl", void 0);
    return DebugLevelService;
}());



/***/ }),

/***/ "./src/app/services/events.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventsService = (function () {
    function EventsService(http) {
        this.http = http;
    }
    EventsService.prototype.fetchEventData = function () {
        var today = new Date();
        today.setDate(today.getDate());
        new Date(today.toString().split('GMT')[0] + 'UTC').toISOString();
        console.log("today", new Date(today.toString().split('GMT')[0] + ' UTC').toISOString());
        var date = new Date();
        date.setDate(date.getDate() - 15);
        console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
        console.log("15 din baad date", date);
        var url = "SELECT Id, EventType, LogDate, LogFileLength, LogFile From EventLogFile  where  LogDate >= " + new Date(date.toString().split('GMT')[0] + ' UTC').toISOString() + " and  LogDate <= " + new Date(today.toString().split('GMT')[0] + ' UTC').toISOString() + " ORDER BY LogDate DESC LIMIT 20";
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        return this.http.get(this.instanceUrl.currentURL + "/services/data/v35.0/query/?q=" + encodeURIComponent(url));
    };
    EventsService.prototype.fetchFilteredDataForDate = function (from, to) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        var url = "SELECT Id, EventType, LogDate, LogFileLength, LogFile From EventLogFile  where  LogDate >= " + from + " and  LogDate <= " + to + " ORDER BY LogDate DESC LIMIT 20";
        return this.http.get(this.instanceUrl.currentURL + "/services/data/v35.0/query/?q=" + encodeURIComponent(url));
    };
    EventsService.prototype.fetchFilteredDataForEventType = function (eventType) {
        var today = new Date();
        today.setDate(today.getDate());
        new Date(today.toString().split('GMT')[0] + 'UTC').toISOString();
        console.log("today", new Date(today.toString().split('GMT')[0] + ' UTC').toISOString());
        var date = new Date();
        date.setDate(date.getDate() - 15);
        console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
        console.log("15 din baad date", date);
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        var url = "SELECT Id, EventType, LogDate, LogFileLength, LogFile From EventLogFile  where  LogDate >= " + new Date(date.toString().split('GMT')[0] + ' UTC').toISOString() + " and  eventtype = " + "'" + eventType + "'" + " ORDER BY LogDate DESC LIMIT 20";
        return this.http.get(this.instanceUrl.currentURL + "/services/data/v35.0/query/?q=" + encodeURIComponent(url));
    };
    EventsService.prototype.fetchFilteredDataForEventTypeAndDate = function (from, to, eventType) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        var url = "SELECT Id, EventType, LogDate, LogFileLength, LogFile From EventLogFile  where  LogDate >= " + from + " and  LogDate <= " + to + " and  eventtype = " + "'" + eventType + "'" + " ORDER BY LogDate DESC LIMIT 20";
        return this.http.get(this.instanceUrl.currentURL + "/services/data/v35.0/query/?q=" + encodeURIComponent(url));
    };
    EventsService.prototype.downloadEventLogs = function (logId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        var url = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/EventLogFile/" + logId + "/LogFile";
        return this.http.get(url);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'Session' }),
        __metadata("design:type", Object)
    ], EventsService.prototype, "userSession", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'LogUserId' }),
        __metadata("design:type", Object)
    ], EventsService.prototype, "logUserId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'LastSeenTime' }),
        __metadata("design:type", Object)
    ], EventsService.prototype, "lastSeenTime", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_storage_provider__["a" /* Cache */])({ pool: 'instance' }),
        __metadata("design:type", Object)
    ], EventsService.prototype, "instanceUrl", void 0);
    return EventsService;
}());



/***/ }),

/***/ "./src/app/services/mine-logs.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MineLogsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__("./src/app/services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MineLogsService = (function () {
    function MineLogsService(http) {
        this.http = http;
    }
    MineLogsService.prototype.getMineLogs = function (logUserId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        console.log("mine logs services", this.userSession.token);
        console.log("current URL", this.instanceUrl.currentURL);
        headers.append("Authorization", "Bearer " + this.userSession.token);
        headers.append('Accept', "application/json");
        var BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/tooling/query/?q=";
        return this.http.get(BASE_URL + encodeURIComponent(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].GET_MINE_LOGS(logUserId)), { headers: headers });
    };
    MineLogsService.prototype.getAllLogs = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        headers.append('Accept', "application/json");
        var BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/tooling/query/?q=";
        return this.http.get(BASE_URL + encodeURIComponent(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].GET_ALL_LOGS()), { headers: headers });
    };
    MineLogsService.prototype.getParticularLog = function (recordId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        // headers.append('Accept', "text/plain");
        // headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        return this.http.get(this.instanceUrl.currentURL + __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].GET_PARTICULAR_LOG(recordId), { headers: headers });
    };
    MineLogsService.prototype.deleteMineCached = function () {
        var url = "SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog where  StartTime > " + this.lastSeenTime + " and  LogUserId = " + "'" + this.logUserId.userId + "'" + "  ORDER BY StartTime DESC LIMIT 20";
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        var BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/tooling/query/?q=";
        return this.http.get(BASE_URL + encodeURIComponent(url), { headers: headers });
    };
    MineLogsService.prototype.downloadLogs = function (recordId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        return this.http.get(this.instanceUrl.currentURL + __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].DOWNLOAD_LOGS(recordId), { headers: headers });
    };
    MineLogsService.prototype.deleteAllCached = function () {
        var url = "SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog where  StartTime > " + this.lastSeenTime + " ORDER BY StartTime DESC LIMIT 20";
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        var BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/tooling/query/?q=";
        return this.http.get(BASE_URL + encodeURIComponent(url), { headers: headers });
    };
    MineLogsService.prototype.fetchFlags = function () {
        var url = "Select Id, LogType, DebugLevelId, DebugLevel.DeveloperName,  TracedEntityId, TracedEntity.Name, ExpirationDate  from TraceFlag  order by ExpirationDate DESC ";
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        var BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/tooling/query/?q=";
        return this.http.get(BASE_URL + encodeURIComponent(url), { headers: headers });
    };
    MineLogsService.prototype.deleteParticularTracelag = function (traceFlagId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        return this.http.delete(this.instanceUrl.currentURL + __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Constants */].DELETE_PARTICULAR_FLAG(traceFlagId), { headers: headers });
    };
    MineLogsService.prototype.searchUserForUser = function (name) {
        var url = "Select Id, Name, Profile.Name from User where IsActive = true AND Name like '%" + name + "%'";
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        return this.http.get(this.instanceUrl.currentURL + "/services/data/v35.0/query/?q=" + encodeURIComponent(url));
    };
    MineLogsService.prototype.searchDebugLevel = function (name) {
        var url = "Select Id, DeveloperName from DebugLevel where DeveloperName like '%" + name + "%'";
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        var BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/tooling/query/?q=";
        return this.http.get(BASE_URL + encodeURIComponent(url));
    };
    MineLogsService.prototype.searchUserForClass = function (name) {
        var url = "Select NamespacePrefix, Name, Id From ApexClass Where Name like '%" + name + "%'";
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        return this.http.get(this.instanceUrl.currentURL + "/services/data/v35.0/query/?q=" + encodeURIComponent(url));
    };
    MineLogsService.prototype.searchUserForTrigger = function (name) {
        var url = "Select NamespacePrefix, Name, Id From ApexTrigger Where Name like '%" + name + "%'";
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        return this.http.get(this.instanceUrl.currentURL + "/services/data/v35.0/query/?q=" + encodeURIComponent(url));
    };
    MineLogsService.prototype.create = function (body) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["g" /* HttpHeaders */]();
        headers.append('Api-User-Agent', 'Example/1.0');
        headers.append("Authorization", "Bearer " + this.userSession.token);
        return this.http.post(this.instanceUrl.currentURL + "/services/data/v35.0/tooling/sobjects/TraceFlag/", body);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'Session' }),
        __metadata("design:type", Object)
    ], MineLogsService.prototype, "userSession", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'LogUserId' }),
        __metadata("design:type", Object)
    ], MineLogsService.prototype, "logUserId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'LastSeenTime' }),
        __metadata("design:type", Object)
    ], MineLogsService.prototype, "lastSeenTime", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_storage_provider__["a" /* Cache */])({ pool: 'instance' }),
        __metadata("design:type", Object)
    ], MineLogsService.prototype, "instanceUrl", void 0);
    return MineLogsService;
}());



/***/ }),

/***/ "./src/app/services/oauth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OAuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");


var OAuthGuard = (function () {
    function OAuthGuard(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    OAuthGuard.prototype.canActivate = function () {
        console.log('Activated Guard', this.auth.isAuthenticated());
        if (this.auth.isAuthenticated()) {
            return this.auth.isAuthenticated();
        }
        else {
            this.router.navigate(['/auth/callback']);
        }
    };
    return OAuthGuard;
}());



/***/ }),

/***/ "./src/app/services/toast-message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastMessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_toasty__ = __webpack_require__("./node_modules/ng2-toasty/index.js");

var ToastMessageService = (function () {
    function ToastMessageService(toastyService) {
        this.toastyService = toastyService;
    }
    ToastMessageService.prototype.showSuccess = function (message, details) {
        this.toastyService.success({
            title: message,
            msg: details || ' ',
            showClose: false,
            timeout: 3000,
            theme: 'default'
        });
    };
    ToastMessageService.prototype.showError = function (message, details) {
        this.toastyService.error({
            title: message,
            msg: details || ' ',
            showClose: false,
            timeout: 3000,
            theme: 'default'
        });
    };
    return ToastMessageService;
}());



/***/ }),

/***/ "./src/app/services/toolbar-title.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarTitleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");

var ToolbarTitleService = (function () {
    function ToolbarTitleService() {
        this.listener = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]('');
    }
    ToolbarTitleService.prototype.getCurrentTitle = function () {
        return this.title;
    };
    ToolbarTitleService.prototype.setCurrentTitle = function (newTitle) {
        this.title = newTitle;
        this.listener.next(this.title);
    };
    ToolbarTitleService.prototype.onTitleChange = function () {
        return this.listener;
    };
    return ToolbarTitleService;
}());



/***/ }),

/***/ "./src/app/spalsh-loader/spalsh-loader.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_SplashLoaderComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_SplashLoaderComponent_0;
/* unused harmony export View_SplashLoaderComponent_Host_0 */
/* unused harmony export SplashLoaderComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__splash_loader_component_scss_shim_ngstyle__ = __webpack_require__("./src/app/spalsh-loader/splash-loader.component.scss.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spalsh_loader_component__ = __webpack_require__("./src/app/spalsh-loader/spalsh-loader.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



var styles_SplashLoaderComponent = [__WEBPACK_IMPORTED_MODULE_0__splash_loader_component_scss_shim_ngstyle__["a" /* styles */]];
var RenderType_SplashLoaderComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_SplashLoaderComponent, data: {} });

function View_SplashLoaderComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 6, "div", [["class", "wrap"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 3, "div", [["class", "loading outer"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 0, "div", [["class", "loading inner"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], null, null); }
function View_SplashLoaderComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-splash-loader", [], null, null, null, View_SplashLoaderComponent_0, RenderType_SplashLoaderComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_2__spalsh_loader_component__["a" /* SplashLoaderComponent */], [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var SplashLoaderComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-splash-loader", __WEBPACK_IMPORTED_MODULE_2__spalsh_loader_component__["a" /* SplashLoaderComponent */], View_SplashLoaderComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/spalsh-loader/spalsh-loader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashLoaderComponent; });
var SplashLoaderComponent = (function () {
    function SplashLoaderComponent() {
    }
    SplashLoaderComponent.prototype.ngOnInit = function () {
    };
    return SplashLoaderComponent;
}());



/***/ }),

/***/ "./src/app/spalsh-loader/splash-loader.component.scss.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["[_nghost-%COMP%] {\n  width: 100%;\n  height: 100vh;\n  margin: 0; }\n\n.wrap[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 48%; }\n\n.loading[_ngcontent-%COMP%] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: relative;\n  display: inline-block;\n  padding: 1em;\n  vertical-align: middle;\n  text-align: center;\n  background-color: transparent;\n  border: 5px solid transparent;\n  border-top-color: #FFA726;\n  border-bottom-color: #FFA726;\n  border-radius: 50%; }\n\n.outer[_ngcontent-%COMP%] {\n  -webkit-animation: spin 1s infinite;\n          animation: spin 1s infinite; }\n\n.inner[_ngcontent-%COMP%] {\n  -webkit-animation: spin 1s infinite;\n          animation: spin 1s infinite; }\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg); }\n  100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg); } }\n\n@keyframes spin {\n  0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg); }\n  100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg); } }"];



/***/ }),

/***/ "./src/app/toolbar/toolbar.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_ToolbarComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_ToolbarComponent_0;
/* unused harmony export View_ToolbarComponent_Host_0 */
/* unused harmony export ToolbarComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolbar_component_scss_shim_ngstyle__ = __webpack_require__("./src/app/toolbar/toolbar.component.scss.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_primeng_components_dialog_dialog_ngfactory__ = __webpack_require__("./node_modules/primeng/components/dialog/dialog.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler__ = __webpack_require__("./node_modules/primeng/components/dom/domhandler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_components_dialog_dialog__ = __webpack_require__("./node_modules/primeng/components/dialog/dialog.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_components_dialog_dialog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_components_dialog_dialog__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_primeng_components_common_shared_ngfactory__ = __webpack_require__("./node_modules/primeng/components/common/shared.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_components_common_shared__ = __webpack_require__("./node_modules/primeng/components/common/shared.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_components_common_shared___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_components_common_shared__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_components_button_button__ = __webpack_require__("./node_modules/primeng/components/button/button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_components_button_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_primeng_components_button_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__toolbar_component__ = __webpack_require__("./src/app/toolbar/toolbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










var styles_ToolbarComponent = [__WEBPACK_IMPORTED_MODULE_0__toolbar_component_scss_shim_ngstyle__["a" /* styles */]];
var RenderType_ToolbarComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_ToolbarComponent, data: {} });

function View_ToolbarComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 59, "nav", [["class", "navbar navbar-default navbar-fixed-top"], ["style", "margin-bottom:0px;"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, null, 56, "div", [["class", "navbar"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 38, "ul", [["class", "nav navbar-nav"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 3, "a", [["class", "navbar-brand"], ["ga-click-event", "Visit Concretio"], ["gacat", "Container"], ["href", "http://concret.io"], ["style", "padding:0px;outline:0;"], ["target", "_blank"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, null, 0, "img", [["height", "60"], ["src", "../../assets/logo.png"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 6, "li", [["ui-sref-active", "active"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 3, "a", [["ga-click-event", "View Debug Logs Tab"], ["gacat", "Container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](16, 0, null, null, 0, "i", [["class", "ion-bug"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, [" Debug "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](20, 0, null, null, 5, "li", [["ui-sref-active", "active"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, null, 2, "a", [["ga-click-event", "View Event Monitoring Tab"], ["gacat", "Container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](23, 0, null, null, 0, "i", [["class", "ion-arrow-graph-up-right"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, [" Events (beta)"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](28, 0, null, null, 3, "li", [["ui-sref-active", "active"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](29, 0, null, null, 1, "a", [["ga-click-event", "View Discussions Tab"], ["gacat", "Container"], ["href", ""], ["ui-sref", "unauth.disgus"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Discussions"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](33, 0, null, null, 9, "li", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](35, 0, null, null, 6, "a", [["ga-click-event", "Open in new window"], ["gacat", "Container"], ["ng-click", "openInNewWindow()"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](36, 0, null, null, 0, "i", [["class", "glyphicon glyphicon-new-window"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n               "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](38, 0, null, null, 2, "small", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](39, 0, null, null, 1, "i", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["New window"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](45, 0, null, null, 13, "ul", [["class", "nav navbar-nav navbar-right"], ["style", "margin-right:10px;"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](47, 0, null, null, 4, "li", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](49, 0, null, null, 1, "small", [["ga-click-event", "Social Share"], ["gacat", "Container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](50, 0, null, null, 0, "i", [["class", "text-primary ion-android-share-alt"], ["style", "font-size:16px;"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, [" \u00A0\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](53, 0, null, null, 4, "li", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](55, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["ap5"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](63, 0, null, null, 31, "p-dialog", [["header", "Share with devs/admins !"]], null, [[null, "visibleChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("visibleChange" === en)) {
        var pd_0 = ((_co.showDialog = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_primeng_components_dialog_dialog_ngfactory__["b" /* View_Dialog_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_primeng_components_dialog_dialog_ngfactory__["a" /* RenderType_Dialog */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler__["DomHandler"], __WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler__["DomHandler"], []), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](65, 12763136, null, 2, __WEBPACK_IMPORTED_MODULE_4_primeng_components_dialog_dialog__["Dialog"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler__["DomHandler"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"]], { header: [0, "header"], width: [1, "width"], height: [2, "height"], modal: [3, "modal"], responsive: [4, "responsive"], minY: [5, "minY"], visible: [6, "visible"] }, { visibleChange: "visibleChange" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 1, { headerFacet: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 2, { footerFacet: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](69, 0, null, 1, 1, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Hope you are liking the extension, why don't spread word about this extension and let other developers benefit as well."])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](72, 0, null, 2, 21, "p-footer", [], null, null, null, __WEBPACK_IMPORTED_MODULE_5__node_modules_primeng_components_common_shared_ngfactory__["c" /* View_Footer_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_primeng_components_common_shared_ngfactory__["a" /* RenderType_Footer */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](73, 49152, [[2, 4]], 0, __WEBPACK_IMPORTED_MODULE_6_primeng_components_common_shared__["Footer"], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](75, 0, null, 0, 13, "div", [["class", "dropdown"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](77, 0, null, null, 1, "button", [["class", "dropbtn"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Share"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](80, 0, null, null, 7, "div", [["class", "dropdown-content"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](82, 0, null, null, 1, "a", [["href", "https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/salesforce-developer-tool/boadeeihehociaicnjjegenhdbifbllm/"], ["target", "_blank"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Facebook"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](85, 0, null, null, 1, "a", [["href", "https://twitter.com/home?status=https://chrome.google.com/webstore/detail/salesforce-developer-tool/boadeeihehociaicnjjegenhdbifbllm/"], ["target", "_blank"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Twitter"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](90, 0, null, 0, 2, "button", [["class", "ui-button-secondary"], ["label", "Close"], ["pButton", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.close() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler__["DomHandler"], __WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler__["DomHandler"], []), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](92, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_7_primeng_components_button_button__["ButtonDirective"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_3_primeng_components_dom_domhandler__["DomHandler"]], { label: [0, "label"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "Share with devs/admins !"; var currVal_1 = 400; var currVal_2 = 250; var currVal_3 = true; var currVal_4 = true; var currVal_5 = 70; var currVal_6 = _co.showDialog; _ck(_v, 65, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_7 = "Close"; _ck(_v, 92, 0, currVal_7); }, null); }
function View_ToolbarComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-toolbar", [], null, null, null, View_ToolbarComponent_0, RenderType_ToolbarComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_8__toolbar_component__["a" /* ToolbarComponent */], [__WEBPACK_IMPORTED_MODULE_9__angular_router__["Router"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ToolbarComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-toolbar", __WEBPACK_IMPORTED_MODULE_8__toolbar_component__["a" /* ToolbarComponent */], View_ToolbarComponent_Host_0, { menu: "menu" }, {}, []);



/***/ }),

/***/ "./src/app/toolbar/toolbar.component.scss.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/toolbar/toolbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_storage_provider__ = __webpack_require__("./src/app/utils/storage.provider.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToolbarComponent = (function () {
    function ToolbarComponent(rourter) {
        this.rourter = rourter;
        this.showDialog = false;
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        console.log("instance url from toolbar", this.salesforcePodName);
        this.label = this.salesforcePodName.name;
    };
    ToolbarComponent.prototype.openInNewWindow = function (event) {
        console.log("new window event", event);
        chrome.windows.create({
            url: "index.html",
            type: 'panel',
            width: 1200,
            height: 800,
        }, function () { });
    };
    ToolbarComponent.prototype.go = function () {
        this.showDialog = true;
    };
    ToolbarComponent.prototype.close = function () {
        this.showDialog = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_storage_provider__["a" /* Cache */])({ pool: 'salesforcePodName' }),
        __metadata("design:type", Object)
    ], ToolbarComponent.prototype, "salesforcePodName", void 0);
    return ToolbarComponent;
}());



/***/ }),

/***/ "./src/app/utils/auto-unsubscribe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AutoUnsubscribe;
function AutoUnsubscribe(blackList) {
    if (blackList === void 0) { blackList = []; }
    return function (constructor) {
        var original = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = function () {
            for (var prop in this) {
                var property = this[prop];
                if (!blackList.includes(prop)) {
                    if (property && (typeof property.unsubscribe === "function")) {
                        property.unsubscribe();
                    }
                }
            }
            original && typeof original === 'function' && original.apply(this, arguments);
        };
    };
}


/***/ }),

/***/ "./src/app/utils/storage.provider.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MemoryCacheService */
/* unused harmony export MemoryCacheFactory */
/* unused harmony export DEFAULT_STORAGE_POOL_KEY */
/* unused harmony export StorageType */
/* unused harmony export WebStorage */
/* unused harmony export MemoryStorage */
/* unused harmony export StorageService */
/* unused harmony export StorageFactory */
/* unused harmony export MemCache */
/* unused harmony export Cacheable */
/* harmony export (immutable) */ __webpack_exports__["a"] = Cache;
/* unused harmony export STORAGE_PROVIDERS */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/fromPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);



var MemoryCacheService = (function () {
    function MemoryCacheService() {
        this.cache = new Map();
        this.inFlightObservables = new Map();
        this.DEFAULT_MAX_AGE = 10000;
    }
    /**
     * Gets the value from cache if the key is provided.
     * If no value exists in cache, then check if the same call exists
     * in flight, if so return the subject. If not create a new
     * Subject inFlightObservable and return the source observable.
     */
    MemoryCacheService.prototype.get = function (key, fallback, maxAge) {
        var _this = this;
        if (this.hasValidCachedValue(key)) {
            console.log("%cGetting from cache " + key, 'color: green');
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["a" /* Observable */].of(this.cache.get(key).value);
        }
        if (!maxAge) {
            maxAge = this.DEFAULT_MAX_AGE;
        }
        if (this.inFlightObservables.has(key)) {
            return this.inFlightObservables.get(key);
        }
        else if (fallback && fallback instanceof __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["a" /* Observable */]) {
            this.inFlightObservables.set(key, new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]());
            console.log("%c Calling api for " + key, 'color: purple');
            return fallback.do(function (value) { _this.set(key, value, maxAge); });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["a" /* Observable */].throw('Requested key is not available in Cache');
        }
    };
    /**
     * Sets the value with key in the cache
     * Notifies all observers of the new value
     */
    MemoryCacheService.prototype.set = function (key, value, maxAge) {
        if (maxAge === void 0) { maxAge = this.DEFAULT_MAX_AGE; }
        this.cache.set(key, { value: value, expiry: Date.now() + maxAge });
        this.notifyInFlightObservers(key, value);
    };
    /**
     * Checks if the a key exists in cache
     */
    MemoryCacheService.prototype.has = function (key) {
        return this.cache.has(key);
    };
    /**
     * Publishes the value to all observers of the given
     * in progress observables if observers exist.
     */
    MemoryCacheService.prototype.notifyInFlightObservers = function (key, value) {
        if (this.inFlightObservables.has(key)) {
            var inFlight = this.inFlightObservables.get(key);
            var observersCount = inFlight.observers.length;
            if (observersCount) {
                console.log("%cNotifying " + inFlight.observers.length + " flight subscribers for " + key, 'color: blue');
                inFlight.next(value);
            }
            inFlight.complete();
            this.inFlightObservables.delete(key);
        }
    };
    /**
     * Checks if the key exists and   has not expired.
     */
    MemoryCacheService.prototype.hasValidCachedValue = function (key) {
        if (this.cache.has(key)) {
            if (this.cache.get(key).expiry < Date.now()) {
                this.cache.delete(key);
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    };
    return MemoryCacheService;
}());

var MemoryCacheFactory = (function () {
    function MemoryCacheFactory() {
    }
    MemoryCacheFactory.getStorageService = function () {
        return MemoryCacheFactory.memCacheService;
    };
    MemoryCacheFactory.memCacheService = new MemoryCacheService();
    return MemoryCacheFactory;
}());

function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
}
var DEFAULT_STORAGE_POOL_KEY = 'salesforce';
var StorageType;
(function (StorageType) {
    StorageType[StorageType["memory"] = 0] = "memory";
    StorageType[StorageType["sessionStorage"] = 1] = "sessionStorage";
    StorageType[StorageType["localStorage"] = 2] = "localStorage";
})(StorageType || (StorageType = {}));
var RxDataCacheStrategy = (function () {
    function RxDataCacheStrategy() {
    }
    RxDataCacheStrategy.prototype.name = function () {
        return 'RxDataCacheStrategy';
    };
    RxDataCacheStrategy.prototype.match = function (result) {
        return result && result.subscribe;
    };
    RxDataCacheStrategy.prototype.put = function (result, putStorage) {
        return result.map(function (data) {
            putStorage(data);
            return data;
        });
    };
    RxDataCacheStrategy.prototype.get = function (result) {
        return Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__["a" /* fromPromise */])(Promise.resolve(result));
    };
    return RxDataCacheStrategy;
}());
var PromiseDataCacheStrategy = (function () {
    function PromiseDataCacheStrategy() {
    }
    PromiseDataCacheStrategy.prototype.name = function () {
        return 'PromiseDataCacheStrategy';
    };
    PromiseDataCacheStrategy.prototype.match = function (result) {
        return result && result.then;
    };
    PromiseDataCacheStrategy.prototype.put = function (result, putStorage) {
        return result.then(function (data) { return putStorage(data); });
    };
    PromiseDataCacheStrategy.prototype.get = function (result) {
        return Promise.resolve(result);
    };
    return PromiseDataCacheStrategy;
}());
var DataCacheStrategyFactory = (function () {
    function DataCacheStrategyFactory() {
        this.dataCacheStrategies = [new RxDataCacheStrategy(), new PromiseDataCacheStrategy()];
    }
    DataCacheStrategyFactory.getInstance = function () {
        return DataCacheStrategyFactory.factory;
    };
    DataCacheStrategyFactory.prototype.put = function (options, value, storage) {
        var strategy = this.dataCacheStrategies.find(function (t) { return t.match(value); });
        if (strategy) {
            return strategy.put(value, function (result) { return storage.put(options, { type: strategy.name(), result: result }); });
        }
        storage.put(options, value);
        return value;
    };
    DataCacheStrategyFactory.prototype.get = function (data) {
        if (data && data.type) {
            var strategy = this.dataCacheStrategies.find(function (t) { return t.name() === data.type; });
            if (strategy) {
                return strategy.get(data.result);
            }
        }
        return data;
    };
    DataCacheStrategyFactory.factory = new DataCacheStrategyFactory();
    return DataCacheStrategyFactory;
}());
var WebStorage = (function () {
    function WebStorage(webStorage) {
        this.webStorage = webStorage;
    }
    WebStorage.prototype.getAll = function (pool) {
        var json = this.webStorage.getItem(pool);
        return json ? JSON.parse(json) : {};
    };
    WebStorage.prototype.saveAll = function (pool, storage) {
        this.webStorage.setItem(pool, JSON.stringify(storage));
    };
    WebStorage.prototype.get = function (_a) {
        var _b = _a.pool, pool = _b === void 0 ? DEFAULT_STORAGE_POOL_KEY : _b, key = _a.key;
        var storage = this.getAll(pool);
        return storage[key];
    };
    WebStorage.prototype.put = function (_a, value) {
        var _b = _a.pool, pool = _b === void 0 ? DEFAULT_STORAGE_POOL_KEY : _b, key = _a.key;
        var storage = this.getAll(pool);
        storage[key] = value;
        return this.saveAll(pool, storage);
    };
    WebStorage.prototype.remove = function (_a) {
        var _b = _a.pool, pool = _b === void 0 ? DEFAULT_STORAGE_POOL_KEY : _b, key = _a.key;
        if (!key) {
            this.webStorage.removeItem(pool);
            return;
        }
        this.put({ pool: pool, key: key }, null);
    };
    WebStorage.prototype.removeAll = function () {
        this.webStorage.clear();
    };
    return WebStorage;
}());

var MemoryStorage = (function () {
    function MemoryStorage() {
        this.storage = new Map();
    }
    MemoryStorage.prototype.getAll = function (pool) {
        return this.storage.has(pool) ? this.storage.get(pool) : new Map();
    };
    MemoryStorage.prototype.get = function (_a) {
        var _b = _a.pool, pool = _b === void 0 ? DEFAULT_STORAGE_POOL_KEY : _b, key = _a.key;
        var storage = this.getAll(pool);
        return storage.has(key) ? cloneDeep(storage.get(key)) : null;
    };
    MemoryStorage.prototype.put = function (_a, value) {
        var _b = _a.pool, pool = _b === void 0 ? DEFAULT_STORAGE_POOL_KEY : _b, key = _a.key;
        if (!this.storage.has(pool)) {
            this.storage.set(pool, new Map());
        }
        this.storage.get(pool).set(key, cloneDeep(value));
    };
    MemoryStorage.prototype.remove = function (_a) {
        var _b = _a.pool, pool = _b === void 0 ? DEFAULT_STORAGE_POOL_KEY : _b, key = _a.key;
        if (!key) {
            this.storage.delete(pool);
            return;
        }
        var poolStorage = this.storage.get(pool);
        if (poolStorage) {
            poolStorage.delete(key);
        }
    };
    MemoryStorage.prototype.removeAll = function () {
        this.storage = new Map();
    };
    return MemoryStorage;
}());

var StorageService = (function () {
    function StorageService() {
        this.defaultStorageType = StorageType.memory;
        this.setupStorages();
    }
    StorageService.prototype.setDefaultStorageType = function (storageType) {
        this.defaultStorageType = storageType;
    };
    StorageService.prototype.getAll = function (_a) {
        var pool = _a.pool, storageType = _a.storageType;
        var storage = this.storages.get(storageType || this.defaultStorageType);
        return storage.getAll(pool);
    };
    StorageService.prototype.get = function (_a) {
        var pool = _a.pool, key = _a.key, storageType = _a.storageType;
        var data = this.storages.get(storageType || this.defaultStorageType).get({ pool: pool, key: key });
        return DataCacheStrategyFactory.getInstance().get(data);
    };
    StorageService.prototype.put = function (_a, value) {
        var pool = _a.pool, key = _a.key, storageType = _a.storageType;
        var storage = this.storages.get(storageType || this.defaultStorageType);
        return DataCacheStrategyFactory.getInstance().put({ pool: pool, key: key }, value, storage);
    };
    StorageService.prototype.remove = function (_a) {
        var pool = _a.pool, key = _a.key, storageType = _a.storageType;
        return this.storages.get(storageType || this.defaultStorageType).remove({ pool: pool, key: key });
    };
    StorageService.prototype.removeAll = function (_a) {
        var storageType = _a.storageType;
        return this.storages.get(storageType || this.defaultStorageType).removeAll();
    };
    StorageService.prototype.setupStorages = function () {
        this.storages = new Map();
        this.memoryStorage = new MemoryStorage();
        if (window) {
            this.sessionStorage = window.sessionStorage;
            this.localStorage = window.localStorage;
            this.storages.set(StorageType.memory, this.memoryStorage)
                .set(StorageType.sessionStorage, new WebStorage(this.sessionStorage))
                .set(StorageType.localStorage, new WebStorage(this.localStorage));
            return;
        }
        this.storages.set(StorageType.memory, this.memoryStorage)
            .set(StorageType.sessionStorage, this.memoryStorage)
            .set(StorageType.localStorage, this.memoryStorage);
    };
    return StorageService;
}());

var StorageFactory = (function () {
    function StorageFactory() {
    }
    StorageFactory.getStorageService = function () {
        return StorageFactory.storageService;
    };
    StorageFactory.storageService = new StorageService();
    return StorageFactory;
}());

/**
 * This is used to cache observable funtions in memory. Default Timeout is 10000 seconds.
 * Usage:
 * @MemCache()
 * getSomeDataFromHTTP()
 * -----------------------
 * @MemCache({key:'myKey'})
 * getSomeDataFromHTTP()
 *
 */
function MemCache(_a) {
    var _b = _a === void 0 ? {} : _a, key = _b.key, _c = _b.ttl, ttl = _c === void 0 ? 10000 : _c;
    var memCache = MemoryCacheFactory.getStorageService();
    var getKey = function (target, method, args) {
        // TODO: we can change this code or override object toString method;
        var prefix = key || target.constructor.name + "." + method;
        return prefix + ":" + args.join('-');
    };
    return function (target, name, methodInfo) {
        var method = methodInfo.value;
        var proxy = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var storeKey = getKey(target, name, args || []);
            var result = method.apply(this, args || []);
            var data = memCache.get(storeKey, result, ttl);
            if (data) {
                return data;
            }
        };
        return {
            value: proxy
        };
    };
}
/**
 * This is used to cache any method in localstorage | memory | sessionStorage based on the value passed in the parameter.
 * Usage:
 * @Cacheable()
 * someFunction()
 * -----------------------
 * @Cacheable({pool:'MyPool'})
 * someFunction()
 * -----------------------
 * @Cacheable({pool:'MyPool',key:'SomeKey',storageType: memory}) // This will cache in memory
 * someFunction()
 */
function Cacheable(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.pool, pool = _c === void 0 ? DEFAULT_STORAGE_POOL_KEY : _c, key = _b.key, _d = _b.storageType, storageType = _d === void 0 ? StorageType.localStorage : _d;
    var storageService = StorageFactory.getStorageService();
    var getKey = function (target, method, args) {
        // TODO: we can change this code or override object toString method;
        var prefix = key || target.constructor.name + "." + method;
        return prefix + ":" + args.join('-');
    };
    return function (target, name, methodInfo) {
        var method = methodInfo.value;
        var proxy = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var key = getKey(target, name, args || []);
            var data = storageService.get({ pool: pool, key: key, storageType: storageType });
            if (data) {
                return data;
            }
            var result = method.apply(this, args || []);
            return storageService.put({ pool: pool, key: key, storageType: storageType }, result);
        };
        proxy.cacheEvict = function () {
            storageService.remove({ pool: pool, key: key });
        };
        return {
            value: proxy
        };
    };
}
/**
 * This is used to cache any variable in localstorage | memory | sessionStorage based on the value passed in the parameter.
 * Usage:
 * @Cache()
 * someVariable:any;
 * -----------------------
 * @Cache({pool:'MyPool'})
 * someVariable:any;
 * -----------------------
 * @Cache({pool:'MyPool',key:'SomeKey',storageType: sessionStorage}) // This will cache in session. Closing tab will clear value.
 * someVariable:any;
 */
function Cache(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.pool, pool = _c === void 0 ? DEFAULT_STORAGE_POOL_KEY : _c, key = _b.key, _d = _b.storageType, storageType = _d === void 0 ? StorageType.localStorage : _d;
    var storageService = StorageFactory.getStorageService();
    return function (target, key) {
        // property value
        var _val = target[key];
        // property getter
        var getter = function () {
            var data = storageService.get({ pool: pool, key: key, storageType: storageType });
            if (data) {
                return data;
            }
            return storageService.put({ pool: pool, key: key, storageType: storageType }, _val);
        };
        // property setter
        var setter = function (newVal) {
            storageService.put({ pool: pool, key: key, storageType: storageType }, newVal);
            _val = newVal;
        };
        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: true,
            get: getter,
            set: setter
        });
    };
}
var STORAGE_PROVIDERS = [
    {
        provide: StorageService,
        useClass: StorageService
    },
];


/***/ }),

/***/ "./src/app/view-debug-level-log/view-debug-level-log.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewDebugLevelLogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_debug_level_service__ = __webpack_require__("./src/app/services/debug-level.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_debug_level__ = __webpack_require__("./src/app/model/debug-level.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr__ = __webpack_require__("./node_modules/ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr__);




var ViewDebugLevelLogComponent = (function () {
    function ViewDebugLevelLogComponent(debugLevel, toast, vcr) {
        this.debugLevel = debugLevel;
        this.toast = toast;
        this.fetchDebugLevel$ = [];
        this.config = [];
        this.debug = new __WEBPACK_IMPORTED_MODULE_2__model_debug_level__["a" /* CreateDebugLevel */]();
        this.toast.setRootViewContainerRef(vcr);
    }
    ViewDebugLevelLogComponent.prototype.ngOnInit = function () {
        this.config = [
            { label: 'FINEST', value: 'FINEST' },
            { label: 'FINER', value: 'FINER' },
            { label: 'FINE', value: 'FINE' },
            { label: 'DEBUG', value: 'DEBUG' },
            { label: 'INFO', value: 'INFO' },
            { label: 'WARN', value: 'WARN' },
            { label: 'ERROR', value: 'ERROR' },
        ];
        this.setValue();
        this.getDebugLevel();
    };
    ViewDebugLevelLogComponent.prototype.getDebugLevel = function () {
        var _this = this;
        this.loading = true;
        this.debugLevel.getDebugLevel().subscribe(function (res) {
            console.log("debug level", res);
            _this.fetchDebugLevel$ = res.records;
            _this.loading = false;
        });
    };
    ViewDebugLevelLogComponent.prototype.getParticularLogLevelData = function () {
        var _this = this;
        console.log(this.debugLevelId);
        this.debugLevel.getparticularDebugLevelData(this.debugLevelId).subscribe(function (res) {
            console.log(res);
            _this.debug = res;
        });
    };
    ViewDebugLevelLogComponent.prototype.viewDetails = function (event) {
        this.displayDialog = true;
        console.log(event.data.Id);
        this.debugLevelId = event.data.Id;
        this.getParticularLogLevelData();
    };
    ViewDebugLevelLogComponent.prototype.deleteDebugLevelLog = function (event) {
        var _this = this;
        this.debugLevel.deleteDebugLogLevelById(event.Id).subscribe(function (res) {
            console.log(res);
            _this.toast.success("successfully deleted");
            _this.getDebugLevel();
        }, function (err) {
            _this.toast.error(err);
        });
    };
    ViewDebugLevelLogComponent.prototype.updateLogLevelId = function (event) {
        var _this = this;
        console.log(event);
        this.debug.ApexCode = event.ApexCode;
        this.debug.ApexProfiling = event.ApexProfiling;
        this.debug.Callout = event.Callout;
        this.debug.Database = event.Database;
        this.debug.DeveloperName = event.DeveloperName;
        this.debug.MasterLabel = event.MasterLabel;
        this.debug.System = event.System;
        this.debug.Validation = event.Validation;
        this.debug.Visualforce = event.Visualforce;
        this.debug.Workflow = event.Workflow;
        console.log(this.debug);
        this.debugLevel.updateDebugLevelData(event.Id, this.debug).subscribe(function (res) {
            console.log("update", res);
            _this.toast.success("Successfully Updated");
            _this.getDebugLevel();
        }, function (err) {
            _this.toast.error(err.error[0].message);
        });
    };
    ViewDebugLevelLogComponent.prototype.setValue = function () {
        this.debug.ApexCode = this.config[0].value;
        this.debug.ApexProfiling = this.config[0].value;
        this.debug.Callout = this.config[0].value;
        this.debug.Database = this.config[0].value;
        this.debug.MasterLabel = this.config[0].value;
        this.debug.System = this.config[0].value;
        this.debug.Validation = this.config[0].value;
        this.debug.Visualforce = this.config[0].value;
        this.debug.Workflow = this.config[0].value;
        this.debug.MasterLabel = this.config[0].value;
    };
    ViewDebugLevelLogComponent.prototype.createNewDebugLevel = function () {
        var _this = this;
        this.debugLevel.createDebugLevel(this.debug).subscribe(function (res) {
            console.log(res);
            _this.displayDialog = false;
            _this.toast.success("successfully created");
            _this.debug = new __WEBPACK_IMPORTED_MODULE_2__model_debug_level__["a" /* CreateDebugLevel */]();
            _this.getDebugLevel();
        }, function (err) {
            _this.toast.error(err.error[0].message);
        });
    };
    ViewDebugLevelLogComponent.prototype.setApexCodeData = function (event) {
        console.log(event.value);
        this.debug.ApexCode = event.value;
    };
    ViewDebugLevelLogComponent.prototype.setVisualForceData = function (event) {
        console.log(event.value);
        this.debug.Visualforce = event.value;
    };
    ViewDebugLevelLogComponent.prototype.setSystemData = function (event) {
        console.log(event.value);
        this.debug.System = event.value;
    };
    ViewDebugLevelLogComponent.prototype.setValidationData = function (event) {
        console.log(event.value);
        this.debug.Validation = event.value;
    };
    ViewDebugLevelLogComponent.prototype.setMasterData = function (event) {
        console.log(event.value);
        this.debug.MasterLabel = event.value;
    };
    ViewDebugLevelLogComponent.prototype.setWorkflowData = function (event) {
        console.log(event.value);
        this.debug.Workflow = event.value;
    };
    ViewDebugLevelLogComponent.prototype.setApexProfillingData = function (event) {
        console.log(event.value);
        this.debug.ApexProfiling = event.value;
    };
    ViewDebugLevelLogComponent.prototype.setCalloutData = function (event) {
        this.debug.Callout = event.value;
    };
    ViewDebugLevelLogComponent.prototype.setDatabaseData = function (event) {
        console.log(event.value);
        this.debug.Database = event.value;
    };
    ViewDebugLevelLogComponent.prototype.modelChange = function (event) {
        console.log("model change ", event);
    };
    return ViewDebugLevelLogComponent;
}());



/***/ }),

/***/ "./src/app/view-log-detail/view-log-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewLogDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mine_logs_service__ = __webpack_require__("./src/app/services/mine-logs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_toast_message_service__ = __webpack_require__("./src/app/services/toast-message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_root__ = __webpack_require__("./src/app/model/root.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_node__ = __webpack_require__("./src/app/model/node.ts");






var ViewLogDetailComponent = (function () {
    function ViewLogDetailComponent(mine, toast, route, elementRef) {
        this.mine = mine;
        this.toast = toast;
        this.route = route;
        this.elementRef = elementRef;
        this.time = [];
        this.root = new __WEBPACK_IMPORTED_MODULE_4__model_root__["Root"]();
        this.node = new __WEBPACK_IMPORTED_MODULE_5__model_node__["Node"]();
        this.nodeStack = [];
        this.clearedInput = '';
        this.indent = 0;
        this.timeRegex = /\d\d:\d\d:\d\d\.\d*/i;
        this.microsecondsRegex = /\(\d\d*\)/i;
        this.categoryRegex = /\|[^|]*/i;
        this.subcategoryRegex = /\|\[\w*\]/i;
        this.objectIdRegex = /\|[A-Z0-9]{15}\|/i;
        this.warned = false;
        this.selectedCategories = ['Technology', 'Sports'];
    }
    ViewLogDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub$ = this.route.params.subscribe(function (params) {
            _this.id = params['recordId'];
            console.log("id is", _this.id);
        });
        this.getParticularLog();
        //this.hero = JSON.stringify(this.root)
    };
    ViewLogDetailComponent.prototype.getParticularLog = function () {
        var _this = this;
        this.mine.getParticularLog(this.id).subscribe(function (res) {
            console.log("success", res);
        }, function (err) {
            console.log("error is", err);
            _this.data = _this.realParse(err.error.text);
        });
    };
    ViewLogDetailComponent.prototype.realParse = function (input) {
        delete this.root.children;
        this.root.children = [];
        this.nodeStack = [this.root];
        var lines = input.split('\n');
        var numOk = 0;
        this.indent = 0;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (this.timeRegex.test(line)) {
                var node4Line = this.parseLine(line, false);
                if (line.indexOf('USER_DEBUG') > 0) {
                    while (!this.timeRegex.test(lines[++i])) {
                        this.node4Line = this.parseLine(lines[i], true);
                    }
                    --i;
                }
                if (line.indexOf('CUMULATIVE_LIMIT_USAGE') > 0 && line.indexOf('CUMULATIVE_LIMIT_USAGE_END') < 0) {
                    while (lines[++i].indexOf('CUMULATIVE_LIMIT_USAGE_END') < 0) {
                        // node4Line.children.push({
                        //     time: '',
                        //     line: '',
                        //     microseconds: '',
                        //     objectId: '',
                        //     category: '',
                        //     leaf: true,
                        //     text: '\r\n' + lines[i],
                        //     isEntry: false,
                        //     isExit : false,
                        //     isException : false,
                        //     isDebug : false
                        // });
                    }
                    --i;
                }
                ++numOk;
            }
        }
        if (this.indent !== 0) {
            //        alert('Either your log was truncated or something went wrong. (Non-zero indent at end: ' + indent + ')');
        }
        if (input && input.length > 0 && numOk === 0) {
            alert("Didn't understand the input.");
        }
        alert("got data");
        this.render();
    };
    ViewLogDetailComponent.prototype.parseLine = function (line, isDebug) {
        this.node.leaf = false;
        this.node.children = [];
        this.node.time = this.format(this.timeRegex.exec(line));
        this.node.microseconds = this.format(this.microsecondsRegex.exec(line));
        this.node.category = this.format(this.categoryRegex.exec(line));
        this.node.line = this.format(this.subcategoryRegex.exec(line));
        this.node.objectId = this.format(this.objectIdRegex.exec(line));
        line = line.replace(this.timeRegex, '');
        line = line.replace(this.microsecondsRegex, '');
        line = line.replace(this.categoryRegex, '');
        line = line.replace(this.subcategoryRegex, '');
        line = line.replace(this.objectIdRegex, '');
        var isEntry = false;
        var isExit = false;
        if (line.trim().length === 0) {
            line = this.node.category;
        }
        this.node.isEntry = false;
        this.node.isExit = false;
        this.node.isException = false;
        if (isDebug == true) {
            this.node.isDebug = true;
        }
        else {
            this.node.isDebug = false;
        }
        if (this.node.category.length > 0) {
            if (/METHOD_ENTRY|CONSTRUCTOR_ENTRY|DML_BEGIN|SOQL_EXECUTE_BEGIN|CODE_UNIT_STARTED|VF_DESERIALIZE_VIEWSTATE_BEGIN|CUMULATIVE_LIMIT_USAGE/.test(this.node.category)) {
                this.node.isEntry = true;
            }
            else if (/METHOD_EXIT|CONSTRUCTOR_EXIT|DML_END|SOQL_EXECUTE_END|CODE_UNIT_FINISHED|VF_DESERIALIZE_VIEWSTATE_END|CUMULATIVE_LIMIT_USAGE_END/.test(this.node.category)) {
                this.node.isExit = true;
            }
            else if (/EXCEPTION_THROWN|FATAL_ERROR/.test(this.node.category)) {
                this.node.isException = true;
                this.node.icon = 'http://extjs-public.googlecode.com/svn/tags/extjs-4.1.1a/release/resources/themes/images/default/form/exclamation.gif';
            }
            else if (/USER_DEBUG/.test(this.node.category)) {
                this.node.isDebug = true;
                this.node.icon = 'http://extjs-public.googlecode.com/svn/tags/extjs-4.1.1a/release/resources/themes/images/default/shared/warning.gif';
            }
        }
        if (this.node.isEntry) {
            this.indent++;
            this.nodeStack[this.nodeStack.length - 1].children.push(this.node);
            this.nodeStack.push(__WEBPACK_IMPORTED_MODULE_5__model_node__);
        }
        else if (this.node.isExit) {
            this.indent--;
            var offNode = this.nodeStack.pop();
            if (offNode.children.length === 0) {
                offNode.leaf = true;
            }
            else {
                offNode.expanded = true;
            }
        }
        else {
            this.node.leaf = true;
            this.nodeStack[this.nodeStack.length - 1].children.push(this.node);
        }
        if (this.indent < 0) {
            line += " NEGATIVE INDENT ";
        }
        this.node.text = this.format([line]);
        console.log("node is", this.node);
        return this.node;
    };
    ViewLogDetailComponent.prototype.format = function (resultsArray) {
        if (resultsArray && resultsArray[0]) {
            var text = resultsArray[0];
            if (text === null || text === undefined) {
                return '';
            }
            return (text.replace(/\|/, '').replace(/\|$/, ''));
        }
        else {
            return '';
        }
    };
    ViewLogDetailComponent.prototype.render = function () {
        this.realRender();
    };
    ViewLogDetailComponent.prototype.realRender = function () {
        var table = document.getElementById('output');
        table.innerHTML = ''; // Remove existing output
        // Faster plain table rendering
        var includeTime = true;
        var includeMicroseconds = true;
        var includeCategory = true;
        var includeSubcategory = true;
        var includeObjectId = true;
        if (!this.root.children || this.root.children.length == 0) {
            return;
        }
        this.renderNode(table, __WEBPACK_IMPORTED_MODULE_4__model_root__, -1, includeTime, includeMicroseconds, includeCategory, includeSubcategory, includeObjectId);
    };
    ViewLogDetailComponent.prototype.renderNode = function (table, node, depth, includeTime, includeMicroseconds, includeCategory, includeSubcategory, includeObjectId) {
        var tr = document.createElement('tr');
        node.tr = tr;
        tr['node'] = node;
        console.log("node in render node", node);
        if (includeTime)
            this.createCell(tr, node.time);
        if (includeMicroseconds)
            this.createCell(tr, node.microseconds);
        if (includeObjectId)
            this.createCell(tr, node.objectId);
        if (includeSubcategory)
            this.createCell(tr, node.line);
        if (includeCategory)
            this.createCell(tr, node.category);
        var paddingLeft = 30 * depth;
        if (true)
            this.createCell(tr, node.text);
        if (node.isException) {
            tr.className = 'exception';
        }
        else if (node.isDebug) {
            tr.className = 'debug';
        }
        else if (node.isHeader) {
            tr.className = 'header';
        }
        else {
            tr.className = 'logRow';
        }
        table.appendChild(tr);
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                this.renderNode(table, node.children[i], depth + 1, includeTime, includeMicroseconds, includeCategory, includeSubcategory, includeObjectId);
            }
        }
    };
    ViewLogDetailComponent.prototype.createCell = function (tr, text) {
        var td = document.createElement('td');
        td.className = 'logCell';
        td.appendChild(document.createTextNode((text)));
        tr.appendChild(td);
    };
    ViewLogDetailComponent.prototype.handleToggle = function (e) {
        var event = e ? e : window.event;
        var target = event.target ? event.target : event.srcElement;
        var row = target.parentElement.parentElement;
        var node = row['node'];
        var isExpand = !node.expanded;
        node.expanded = isExpand;
        //previously image change function used as given below... 
        //node.tr.src = isExpand ? 'expand.png' : 'collapse.png';
        //Now its changed...
        var numberOfNodeTrChilds = node.tr.children.length;
        node.tr.children[numberOfNodeTrChilds - 1].children[0].src = isExpand ? 'collapse.png' : 'expand.png';
        node.tr.style.backgroundColor = isExpand ? '#eee' : '#fdf';
        this.toggle(node, isExpand);
    };
    ViewLogDetailComponent.prototype.toggle = function (node, isExpand) {
        for (var i = 0; node.children && i < node.children.length; i++) {
            var child = node.children[i];
            if (!isExpand) {
                child.tr.style.display = 'none';
                this.toggle(child, isExpand);
            }
            else {
                child.tr.style.display = '';
                if (child.expanded) {
                    this.toggle(child, isExpand);
                }
            }
        }
    };
    return ViewLogDetailComponent;
}());



/***/ }),

/***/ "./src/app/view-logs-by-user/view-logs-by-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewLogsByUserComponent; });
var ViewLogsByUserComponent = (function () {
    function ViewLogsByUserComponent() {
    }
    ViewLogsByUserComponent.prototype.ngOnInit = function () {
    };
    return ViewLogsByUserComponent;
}());



/***/ }),

/***/ "./src/app/widgets/widget.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WidgetsModule; });
var WidgetsModule = (function () {
    function WidgetsModule() {
    }
    return WidgetsModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
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


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module_ngfactory__ = __webpack_require__("./src/app/app.module.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");




if (__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["platformBrowser"]().bootstrapModuleFactory(__WEBPACK_IMPORTED_MODULE_2__app_app_module_ngfactory__["a" /* AppModuleNgFactory */]);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map