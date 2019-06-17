(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["protected-protected-module"],{

/***/ "./src/app/protected/chain-info/chain-info.component.html":
/*!****************************************************************!*\
  !*** ./src/app/protected/chain-info/chain-info.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"mat-elevation-z2\">\n  <mat-toolbar-row fxLayout=\"row\">\n    <div fxFlex=\"10\">\n      <button mat-icon-button routerLink=\"../\">\n        <mat-icon>keyboard_backspace</mat-icon>\n      </button>\n    </div>\n    <h1 fxFlex=\"1 1 auto\" fxLayout=\"row\" fxLayoutAlign=\"center\">\n      Details of {{(chain$ | async).id}}\n    </h1>\n    <div fxFlex=\"10\"></div>\n  </mat-toolbar-row>\n  <mat-toolbar-row fxLayout=\"row\" fxLayoutAlign=\"center\" class=\"tabs-row\">\n    <nav mat-tab-nav-bar>\n      <a mat-tab-link *ngFor=\"let link of navLinks\" [routerLink]=\"link.path\" routerLinkActive #rla=\"routerLinkActive\" [active]=\"rla.isActive\">\n        {{link.label}}\n      </a>\n    </nav>\n  </mat-toolbar-row>\n</mat-toolbar>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/protected/chain-info/chain-info.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/protected/chain-info/chain-info.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  padding-top: 128px;\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  overflow: auto; }\n\nmat-toolbar {\n  background: white;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 100; }\n\nh1 {\n  font-weight: 100 !important; }\n\n.tabs-row {\n  height: auto !important; }\n\nnav {\n  border-bottom: none !important; }\n"

/***/ }),

/***/ "./src/app/protected/chain-info/chain-info.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/protected/chain-info/chain-info.component.ts ***!
  \**************************************************************/
/*! exports provided: ChainInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainInfoComponent", function() { return ChainInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_chains_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/chains.service */ "./src/app/services/chains.service.ts");
/* harmony import */ var lto_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lto-api */ "./node_modules/lto-api/dist/lto-api.min.js");
/* harmony import */ var lto_api__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lto_api__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChainInfoComponent = /** @class */ (function () {
    function ChainInfoComponent(route, chainsService) {
        var _this = this;
        this.bodies = {};
        this.navLinks = [
            {
                path: 'events',
                label: 'Events'
            },
            {
                path: 'identities',
                label: 'Identities'
            },
            {
                path: 'comments',
                label: 'Comments'
            }
        ];
        this.chain$ = route.params.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (params) { return chainsService.getChain(params['chainId']); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])());
        this.eventChain$ = this.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (chainJSON) {
            var eventChain = new lto_api__WEBPACK_IMPORTED_MODULE_4__["EventChain"]();
            eventChain.setValues(chainJSON);
            console.log(eventChain);
            return eventChain;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
        setTimeout(function () {
            _this.eventChain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).subscribe(function (chain) {
                chain.events.forEach(function (event) {
                    _this.bodies[event.hash] = event.getBody();
                });
                console.log('All bodies calculated');
            });
        });
    }
    ChainInfoComponent.prototype.ngOnInit = function () { };
    ChainInfoComponent.prototype.getBodyFor = function (hash) {
        return this.bodies[hash] || {};
    };
    ChainInfoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chain-info',
            template: __webpack_require__(/*! ./chain-info.component.html */ "./src/app/protected/chain-info/chain-info.component.html"),
            styles: [__webpack_require__(/*! ./chain-info.component.scss */ "./src/app/protected/chain-info/chain-info.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_chains_service__WEBPACK_IMPORTED_MODULE_3__["ChainsService"]])
    ], ChainInfoComponent);
    return ChainInfoComponent;
}());



/***/ }),

/***/ "./src/app/protected/chain-info/comments/comments.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/protected/chain-info/comments/comments.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2>Comments</h2>\n  <div class=\"comments\" fxLayout=\"column\" fxLayoutGap=\"8px\">\n    <div class=\"comment\" *ngFor=\"let comment of comments$ | async\">\n      Comment:\n      <pre>{{comment | json}}</pre>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/protected/chain-info/comments/comments.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/protected/chain-info/comments/comments.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  width: 100%;\n  max-width: 1000px;\n  padding: 16px;\n  margin: 0 auto;\n  box-sizing: border-box; }\n"

/***/ }),

/***/ "./src/app/protected/chain-info/comments/comments.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/protected/chain-info/comments/comments.component.ts ***!
  \*********************************************************************/
/*! exports provided: CommentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentsComponent", function() { return CommentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _chain_info_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chain-info.component */ "./src/app/protected/chain-info/chain-info.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(_parent) {
        this._parent = _parent;
        this.comments$ = _parent.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (chain) { return chain.comments; }));
    }
    CommentsComponent.prototype.ngOnInit = function () { };
    CommentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-comments',
            template: __webpack_require__(/*! ./comments.component.html */ "./src/app/protected/chain-info/comments/comments.component.html"),
            styles: [__webpack_require__(/*! ./comments.component.scss */ "./src/app/protected/chain-info/comments/comments.component.scss")]
        }),
        __metadata("design:paramtypes", [_chain_info_component__WEBPACK_IMPORTED_MODULE_1__["ChainInfoComponent"]])
    ], CommentsComponent);
    return CommentsComponent;
}());



/***/ }),

/***/ "./src/app/protected/chain-info/events/events.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/protected/chain-info/events/events.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"eventChain$ | async as chain\">\n  <div class=\"events-container\">\n    <ng-container *ngIf=\"chain.events.length === 0\">\n      <h2>Seems like there is no events in this chain</h2>\n    </ng-container>\n    <ng-container *ngFor=\"let event of chain.events; last as isLast; first as isFirst; index as i\">\n      <div class=\"connection\" *ngIf=\"!isFirst\" fxLayout=\"row\">\n        <div class=\"prev\" fxLayout=\"column\" fxLayoutAlign=\"start start\">\n          <div class=\"connection-hash mat-elevation-z1\">\n            <b>HASH:</b> {{chain.events[i-1].hash}}\n          </div>\n        </div>\n        <span fxFlex=\"1 1 auto\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n          <mat-icon>link</mat-icon>\n        </span>\n        <div class=\"current\" fxLayout=\"column\" fxLayoutAlign=\"end end\">\n          <div class=\"connection-hash mat-elevation-z1\">\n            <b>Previous: </b>\n            {{event.previous}}\n          </div>\n        </div>\n      </div>\n      <div class=\"event mat-elevation-z1\">\n        <div class=\"event-content\">\n          <div fxLayout=\"column\" fxLayoutGap=\"8px\" class=\"event-data\">\n            <div class=\"Date\">\n              <span class=\"label\">Event date:</span>\n              <br>\n              <i>{{event.timestamp | date : 'medium'}}</i>\n            </div>\n            <div class=\"signature\">\n              <span class=\"label\">Event signature:</span>\n              <br>\n              <i>{{event.signature}}</i>\n            </div>\n            <div>\n\n            </div>\n\n          </div>\n          <mat-expansion-panel>\n            <mat-expansion-panel-header>\n              <mat-panel-title>Event body</mat-panel-title>\n            </mat-expansion-panel-header>\n            <ng-template matExpansionPanelContent>\n              <pre>{{getBodyFor(event.hash) | json}}</pre>\n            </ng-template>\n          </mat-expansion-panel>\n        </div>\n      </div>\n    </ng-container>\n\n  </div>\n</ng-container>"

/***/ }),

/***/ "./src/app/protected/chain-info/events/events.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/protected/chain-info/events/events.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".events-container {\n  width: 100%;\n  max-width: 1000px;\n  padding: 16px;\n  margin: 0 auto;\n  box-sizing: border-box; }\n\n.label {\n  font-weight: 600; }\n\npre {\n  margin-top: 6px;\n  padding: 8px;\n  border: 1px solid #ebebeb;\n  overflow-x: auto; }\n\n.event {\n  background: white;\n  padding: 8px;\n  box-sizing: border-box;\n  position: relative;\n  z-index: 1; }\n\n.connection-hash {\n  background: white;\n  padding: 8px;\n  box-sizing: border-box; }\n\n.current .connection-hash {\n  position: relative;\n  z-index: 0; }\n\n.prev .connection-hash {\n  position: relative;\n  z-index: 2; }\n\n.connection {\n  height: 48px;\n  font-size: 13px; }\n\n.actions {\n  padding: 8px 0; }\n\n.event-data {\n  padding-bottom: 16px; }\n\nmat-expansion-panel {\n  box-shadow: none !important; }\n"

/***/ }),

/***/ "./src/app/protected/chain-info/events/events.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/protected/chain-info/events/events.component.ts ***!
  \*****************************************************************/
/*! exports provided: EventsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsComponent", function() { return EventsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _chain_info_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chain-info.component */ "./src/app/protected/chain-info/chain-info.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventsComponent = /** @class */ (function () {
    function EventsComponent(_parent) {
        this._parent = _parent;
        this.eventChain$ = _parent.eventChain$;
    }
    EventsComponent.prototype.ngOnInit = function () { };
    EventsComponent.prototype.getBodyFor = function (hash) {
        return this._parent.getBodyFor(hash);
    };
    EventsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-events',
            template: __webpack_require__(/*! ./events.component.html */ "./src/app/protected/chain-info/events/events.component.html"),
            styles: [__webpack_require__(/*! ./events.component.scss */ "./src/app/protected/chain-info/events/events.component.scss")]
        }),
        __metadata("design:paramtypes", [_chain_info_component__WEBPACK_IMPORTED_MODULE_1__["ChainInfoComponent"]])
    ], EventsComponent);
    return EventsComponent;
}());



/***/ }),

/***/ "./src/app/protected/chain-info/identities/identities.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/protected/chain-info/identities/identities.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"identities$ | async as identities\">\n  <div class=\"container\">\n    <ng-container *ngIf=\"identities.length === 0\">\n      <h2>Seems like there is no identities in this chain</h2>\n    </ng-container>\n    <div class=\"identities\" fxLayout=\"column\" fxLayoutGap=\"16px\">\n      <mat-card *ngFor=\"let identity of identities\">\n        <mat-card-content fxLayout=\"column\" fxLayoutGap=\"8px\">\n          <div>\n            <div class=\"label\">id</div>\n            <i>{{identity.id}}</i>\n          </div>\n          <div>\n            <div class=\"label\">Encrypt key</div>\n            <i>{{identity.encryptkey}}</i>\n          </div>\n          <div>\n            <div class=\"label\">Timestamp</div>\n            <i>{{identity.timestamp}}</i>\n          </div>\n          <div>\n            <div class=\"label\">Info</div>\n            <pre>{{identity.info | json}}</pre>\n\n          </div>\n          <div>\n            <div class=\"label\">Sign keys</div>\n            <pre>{{identity.signkeys | json}}</pre>\n          </div>\n        </mat-card-content>\n      </mat-card>\n    </div>\n  </div>\n</ng-container>"

/***/ }),

/***/ "./src/app/protected/chain-info/identities/identities.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/protected/chain-info/identities/identities.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  width: 100%;\n  max-width: 1000px;\n  padding: 16px;\n  margin: 0 auto;\n  box-sizing: border-box; }\n\n.label {\n  font-weight: 600; }\n\npre {\n  margin-top: 6px;\n  padding: 8px;\n  border: 1px solid #ebebeb;\n  overflow-x: auto; }\n"

/***/ }),

/***/ "./src/app/protected/chain-info/identities/identities.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/protected/chain-info/identities/identities.component.ts ***!
  \*************************************************************************/
/*! exports provided: IdentitiesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdentitiesComponent", function() { return IdentitiesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _chain_info_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chain-info.component */ "./src/app/protected/chain-info/chain-info.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IdentitiesComponent = /** @class */ (function () {
    function IdentitiesComponent(_parent) {
        this._parent = _parent;
        this.identities$ = _parent.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (chain) { return chain.identities; }));
    }
    IdentitiesComponent.prototype.ngOnInit = function () { };
    IdentitiesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-identities',
            template: __webpack_require__(/*! ./identities.component.html */ "./src/app/protected/chain-info/identities/identities.component.html"),
            styles: [__webpack_require__(/*! ./identities.component.scss */ "./src/app/protected/chain-info/identities/identities.component.scss")]
        }),
        __metadata("design:paramtypes", [_chain_info_component__WEBPACK_IMPORTED_MODULE_1__["ChainInfoComponent"]])
    ], IdentitiesComponent);
    return IdentitiesComponent;
}());



/***/ }),

/***/ "./src/app/protected/chains-list/chains-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/protected/chains-list/chains-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"mat-elevation-z2\">\n  <mat-toolbar-row fxLayout=\"row\" fxLayoutAlign=\"center center\">\n    <h1>\n      Chains\n    </h1>\n  </mat-toolbar-row>\n</mat-toolbar>\n<div class=\"chains\">\n  <ng-container *ngIf=\"!isError; else errorTpl\">\n    <ng-container *ngIf=\"chains$ | async as chains; else loadingTpl\">\n      <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n        <mat-card class=\"mat-elevation-z1\" [routerLink]=\"chain.id\" *ngFor=\"let chain of chains\">\n          <mat-card-title>ID: {{chain.id}}</mat-card-title>\n          <mat-card-content>\n            <div fxLayout=\"row\" *ngIf=\"chain.events\">\n              <div fxFlex=\"50\">\n                <span class=\"label\" fxFlex=\"1 1 auto\">Events: </span>\n                <span>{{chain.events.length}}</span>\n              </div>\n            </div>\n          </mat-card-content>\n        </mat-card>\n      </div>\n    </ng-container>\n  </ng-container>\n</div>\n\n<ng-template #loadingTpl>\n  <div class=\"progress-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n    <mat-progress-spinner mode=\"indeterminate\" [diameter]=\"100\"></mat-progress-spinner>\n  </div>\n</ng-template>\n\n<ng-template #errorTpl>\n  <div class=\"error\" fxLayout=\"column\" fxLayoutAling=\"center center\" fxLayoutGap=\"64px\">\n    <h3>Cannot load chains</h3>\n    <div class=\"img-container\">\n      <img src=\"assets/chain.jpeg\" alt=\"\">\n    </div>\n  </div>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/protected/chains-list/chains-list.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/protected/chains-list/chains-list.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  padding-top: 64px;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  overflow: auto; }\n\n.chains {\n  max-width: 1000px;\n  width: 100%;\n  margin: 0 auto;\n  box-sizing: border-box;\n  padding: 16px; }\n\n.tile {\n  width: 100%;\n  height: 100%;\n  padding: 8px;\n  box-sizing: border-box; }\n\nmat-card {\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  box-sizing: border-box; }\n\nmat-card:hover {\n    background-color: rgba(0, 0, 0, 0.002); }\n\nmat-toolbar {\n  background: white;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 100; }\n\nh1 {\n  font-weight: 100 !important; }\n\n.progress-container {\n  padding: 100px;\n  box-sizing: border-box; }\n\nmat-card-title {\n  font-size: 16px; }\n\nmat-card-content .label {\n  color: rgba(0, 0, 0, 0.54); }\n\n.error {\n  padding-top: 100px; }\n\n.error h3 {\n    text-align: center;\n    font-weight: normal;\n    font-size: 32px; }\n\n.error img {\n    display: block;\n    max-width: 250px;\n    width: 100%;\n    margin: 0 auto; }\n"

/***/ }),

/***/ "./src/app/protected/chains-list/chains-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/protected/chains-list/chains-list.component.ts ***!
  \****************************************************************/
/*! exports provided: ChainsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainsListComponent", function() { return ChainsListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_chains_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/chains.service */ "./src/app/services/chains.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChainsListComponent = /** @class */ (function () {
    function ChainsListComponent(_chains) {
        var _this = this;
        this._chains = _chains;
        this.isError = false;
        this.chains$ = _chains.chains$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (error) {
            _this.isError = true;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(null);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (chains) { return !!chains; }));
    }
    ChainsListComponent.prototype.ngOnInit = function () { };
    ChainsListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chains-list',
            template: __webpack_require__(/*! ./chains-list.component.html */ "./src/app/protected/chains-list/chains-list.component.html"),
            styles: [__webpack_require__(/*! ./chains-list.component.scss */ "./src/app/protected/chains-list/chains-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_chains_service__WEBPACK_IMPORTED_MODULE_3__["ChainsService"]])
    ], ChainsListComponent);
    return ChainsListComponent;
}());



/***/ }),

/***/ "./src/app/protected/protected.component.html":
/*!****************************************************!*\
  !*** ./src/app/protected/protected.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/protected/protected.component.scss":
/*!****************************************************!*\
  !*** ./src/app/protected/protected.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/protected/protected.component.ts":
/*!**************************************************!*\
  !*** ./src/app/protected/protected.component.ts ***!
  \**************************************************/
/*! exports provided: ProtectedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtectedComponent", function() { return ProtectedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProtectedComponent = /** @class */ (function () {
    function ProtectedComponent() {
    }
    ProtectedComponent.prototype.ngOnInit = function () {
    };
    ProtectedComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-protected',
            template: __webpack_require__(/*! ./protected.component.html */ "./src/app/protected/protected.component.html"),
            styles: [__webpack_require__(/*! ./protected.component.scss */ "./src/app/protected/protected.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProtectedComponent);
    return ProtectedComponent;
}());



/***/ }),

/***/ "./src/app/protected/protected.module.ts":
/*!***********************************************!*\
  !*** ./src/app/protected/protected.module.ts ***!
  \***********************************************/
/*! exports provided: ProtectedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProtectedModule", function() { return ProtectedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _protected_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./protected.component */ "./src/app/protected/protected.component.ts");
/* harmony import */ var _chains_list_chains_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chains-list/chains-list.component */ "./src/app/protected/chains-list/chains-list.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _chain_info_chain_info_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chain-info/chain-info.component */ "./src/app/protected/chain-info/chain-info.component.ts");
/* harmony import */ var _chain_info_events_events_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./chain-info/events/events.component */ "./src/app/protected/chain-info/events/events.component.ts");
/* harmony import */ var _chain_info_identities_identities_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./chain-info/identities/identities.component */ "./src/app/protected/chain-info/identities/identities.component.ts");
/* harmony import */ var _chain_info_comments_comments_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./chain-info/comments/comments.component */ "./src/app/protected/chain-info/comments/comments.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var ProtectedModule = /** @class */ (function () {
    function ProtectedModule() {
    }
    ProtectedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDividerModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _protected_component__WEBPACK_IMPORTED_MODULE_3__["ProtectedComponent"],
                        children: [
                            {
                                path: 'chains',
                                component: _chains_list_chains_list_component__WEBPACK_IMPORTED_MODULE_4__["ChainsListComponent"]
                            },
                            {
                                path: 'chains/:chainId',
                                component: _chain_info_chain_info_component__WEBPACK_IMPORTED_MODULE_7__["ChainInfoComponent"],
                                children: [
                                    {
                                        path: 'events',
                                        component: _chain_info_events_events_component__WEBPACK_IMPORTED_MODULE_8__["EventsComponent"]
                                    },
                                    {
                                        path: 'identities',
                                        component: _chain_info_identities_identities_component__WEBPACK_IMPORTED_MODULE_9__["IdentitiesComponent"]
                                    },
                                    {
                                        path: 'comments',
                                        component: _chain_info_comments_comments_component__WEBPACK_IMPORTED_MODULE_10__["CommentsComponent"]
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'events'
                                    }
                                ]
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'chains'
                            }
                        ]
                    }
                ])
            ],
            declarations: [
                _protected_component__WEBPACK_IMPORTED_MODULE_3__["ProtectedComponent"],
                _chains_list_chains_list_component__WEBPACK_IMPORTED_MODULE_4__["ChainsListComponent"],
                _chain_info_chain_info_component__WEBPACK_IMPORTED_MODULE_7__["ChainInfoComponent"],
                _chain_info_events_events_component__WEBPACK_IMPORTED_MODULE_8__["EventsComponent"],
                _chain_info_identities_identities_component__WEBPACK_IMPORTED_MODULE_9__["IdentitiesComponent"],
                _chain_info_comments_comments_component__WEBPACK_IMPORTED_MODULE_10__["CommentsComponent"]
            ]
        })
    ], ProtectedModule);
    return ProtectedModule;
}());



/***/ }),

/***/ "./src/app/schemas/chain.ts":
/*!**********************************!*\
  !*** ./src/app/schemas/chain.ts ***!
  \**********************************/
/*! exports provided: makeChain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeChain", function() { return makeChain; });
function makeChain(partial) {
    return {
        id: partial.id || '',
        body: partial.body || '',
        hash: partial.hash || '',
        previous: partial.previous || '',
        receipt: partial.receipt,
        signature: partial.signature || '',
        signKey: partial.signKey || '',
        timestamp: partial.timestamp || 0,
        events: partial.events || [],
        identities: partial.identities || [],
        resources: partial.resources || []
    };
}


/***/ }),

/***/ "./src/app/schemas/index.ts":
/*!**********************************!*\
  !*** ./src/app/schemas/index.ts ***!
  \**********************************/
/*! exports provided: makeChain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chain */ "./src/app/schemas/chain.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeChain", function() { return _chain__WEBPACK_IMPORTED_MODULE_0__["makeChain"]; });




/***/ }),

/***/ "./src/app/services/chains.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/chains.service.ts ***!
  \********************************************/
/*! exports provided: ChainsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainsService", function() { return ChainsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens */ "./src/app/tokens.ts");
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../schemas */ "./src/app/schemas/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var ChainsService = /** @class */ (function () {
    function ChainsService(_http, _snackbar, _hostUrl) {
        var _this = this;
        this._snackbar = _snackbar;
        this._hostUrl = _hostUrl;
        this.chains$ = _http.get(this._hostUrl + "/event-chains").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this._snackbar.open('Chains loading error', 'DISMISS', { duration: 3000 });
            throw error;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (chainsData) { return chainsData.map(_schemas__WEBPACK_IMPORTED_MODULE_5__["makeChain"]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
    }
    ChainsService.prototype.getChain = function (id) {
        return this.chains$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (chains) { return chains.find(function (chain) { return chain.id === id; }); }));
    };
    ChainsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_tokens__WEBPACK_IMPORTED_MODULE_4__["HOST_URL"])),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], String])
    ], ChainsService);
    return ChainsService;
}());



/***/ })

}]);
//# sourceMappingURL=protected-protected-module.js.map