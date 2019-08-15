const User = (function() {

	const _ = function(userId, docsReportResult, imageIntegrityResult, imageQuality, docReportSubResult, country) {
		this.userId = userId;
		this.docsReportResult = docsReportResult;
		this.imageIntegrityResult = imageIntegrityResult;
		this.imageQuality = imageQuality;
		this.facialResult = undefined;
		this.docReportSubResult = docReportSubResult;
		this.country = country;
	};

	_.prototype = {
		passedDocReport : function() {
			return 'clear' === this.docsReportResult;
		},
		considerDocReport : function() {
			return 'consider' === this.docsReportResult;
		},
		failedImageIntegrity : function() {
			return 'clear' !== this.imageIntegrityResult;
		},
		imageQualityNotClear : function() {
			return 'clear' !== this.imageQuality;
		},
		passedFacialReport : function() {
			return 'clear' === this.facialResult;
		},
		failedFacialResult : function() {
			return 'consider' === this.facialResult;
		},
		setFacialResult : function(facialResult) {
			this.facialResult = facialResult;
		},
		rejectedDocSubResult : function() {
			return 'rejected' === this.docReportSubResult;
		},
		passedConsideringDocAndFacialScan : function() {
			return ('clear' === this.docsReportResult) && ('clear' === this.facialResult);
		},
		getUserCountry : function() {
			return this.country;
		}
	};

	return _;

})();


module.exports = User;