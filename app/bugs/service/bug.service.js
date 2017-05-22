"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var firebase_config_service_1 = require('../../core/service/firebase-config.service');
var BugService = (function () {
    function BugService(fireService) {
        this.fireService = fireService;
        this.bugsDbRef = this.fireService.database.ref('/bugs');
    }
    BugService.prototype.getAddedBugs = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obsv) {
            _this.bugsDbRef.on('child_added', function (bug) {
                var newBug = bug.val();
                newBug.id = bug.key; // Add id to Bug model
                obsv.next(newBug);
            }, function (err) {
                obsv.throw(err);
            });
        });
    };
    BugService.prototype.onChangeListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obsv) {
            _this.bugsDbRef.on('child_changed', function (bug) {
                var updatedBug = bug.val();
                updatedBug.id = bug.key;
                obsv.next(updatedBug);
            }, function (err) {
                obsv.throw(err);
            });
        });
    };
    BugService.prototype.addBug = function (bug) {
        var newBugRef = this.bugsDbRef.push();
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Dontavious',
            createdDate: Date.now()
        }).catch(function (err) {
            return console.error('Unable to add bug to Firebase - ', err);
        });
    };
    BugService.prototype.updateBug = function (bug) {
        var currentBugRef = this.bugsDbRef.child(bug.id);
        bug.id = null; // Remove id so firease doesn't duplicate
        bug.updatedBy = "Joe"; // Set updating user (hard coded because no auth yet)
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    };
    BugService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], BugService);
    return BugService;
}());
exports.BugService = BugService;
;
//# sourceMappingURL=bug.service.js.map