const csv = require('csv-parser');
const fs = require('fs');
const HashMap = require('hashmap');
const uniqueUserMap = new HashMap();

const User = require('./models/User.js');
const UserAnalyser = require('./lib/UserAnalyser.js');

const allUserAttempts = [];
const docsReportFileName = 'doc_reports_sample.csv';
const facialReportFileName = 'face_reports_sample.csv';

fs.createReadStream(docsReportFileName)
  .pipe(csv())
  .on('data', (data) => {

  	const obj = JSON.parse(JSON.stringify(data));
  	const user = new User(obj.user_id, obj.result, obj.image_integrity_result, obj.image_quality_result, obj.sub_result);
  	uniqueUserMap.set(obj.user_id, user);
  	allUserAttempts.push(user);
  	
  })
  .on('end', () => {

    fs.createReadStream(facialReportFileName)
  		.pipe(csv())
  		.on('data', (data) => {
  		const obj = JSON.parse(JSON.stringify(data));
  		uniqueUserMap.get(obj.user_id).setFacialResult(obj.result);

  	})
  	.on('end', () => {
  		
  		const analysis = new UserAnalyser(uniqueUserMap.values(), allUserAttempts);
	    analysis.printPassAndFails();
	    analysis.printTotalUniqueUsers();
	    analysis.printTotalAttempts();
	    analysis.printTotalImageIntegrityFails();
	    analysis.printTotalImagetQualityNotClear();
	    analysis.printTotalFacialReportClear();
	    analysis.printTotalDocAndFacialScanPass();
	    analysis.printTotalDocSubResultRejected();

  	});
  });

