"use strict";

const UserAnalyser = (function() {

	const _ = function(userArray, allAttempts) {
		var clearDocResults = 0;
		var considerDocResults = 0;
		var failedImageInterityResults = 0;
		var imageQualityNotClear = 0;
		var facialReportClear = 0;
		var passedDocAndFacialScan = 0;
		var rejectedSubResultDocs = 0;
		userArray.forEach(function(item, index, array) {
			if(item.passedDocReport()) {
				clearDocResults++
			}
			if(item.considerDocReport()) {
				considerDocResults++
			}
			if(item.failedImageIntegrity()) {
				failedImageInterityResults++;
			}
			if(item.imageQualityNotClear()) {
				imageQualityNotClear++;
			}
			if(item.passedFacialReport()) {
				facialReportClear++;
			}
			if(item.passedConsideringDocAndFacialScan()) {
				passedDocAndFacialScan++;
			}
			if(item.rejectedDocSubResult()) {
				rejectedSubResultDocs++;
			}
		});
		

		this.clearDocResults = clearDocResults;
		this.totalUniqueUsers = userArray.length;
		this.totalAttempts = allAttempts.length;
		this.considerDocResults = considerDocResults;
		this.failedImageInterityResults = failedImageInterityResults;
		this.imageQualityNotClear = imageQualityNotClear;
		this.facialReportClear = facialReportClear;
		this.passedDocAndFacialScan = passedDocAndFacialScan;
		this.rejectedSubResultDocs = rejectedSubResultDocs;
	};

	_.prototype = {
		printPassAndFails : function() {
			console.log('Clear result for doc scan: ' + this.clearDocResults);
			console.log('Consider result for doc scan: ' + this.considerDocResults);
		},
		printTotalUniqueUsers : function() {
			console.log('Total unique users : ' + this.totalUniqueUsers);
		},
		printTotalAttempts : function() {
			console.log('Total KYC attempts : ' + this.totalAttempts);
		},
		printTotalImageIntegrityFails : function() {
			console.log('Total failed imeage integrity results: ' + this.failedImageInterityResults);
		},
		printTotalImagetQualityNotClear : function() {
			console.log('Total image quality not clear: ' + this.imageQualityNotClear);
		},
		printTotalFacialReportClear : function() {
			console.log('Total facial repport clear: ' + this.facialReportClear);
		},
		printTotalDocAndFacialScanPass : function() {
			console.log('Actual customer pass (doc and facial scan): ' + this.passedDocAndFacialScan);
		},
		printTotalDocSubResultRejected : function() {
			console.log('Total Doc Scan rejected sub result : ' + this.rejectedSubResultDocs);
		}
	};

	return _;

})();

module.exports = UserAnalyser;