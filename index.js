const fs = require('fs');
const csv = require('csvtojson');
const { Parser } = require('json2csv');

const inputFile = 'MERGED Member Databases 2023-03-02.csv';

(async () => {
	const members = {};

	await csv()
		.fromFile(inputFile)
		.then((rawMembers) => {
			rawMembers.forEach((member) => {
				if (members[member.memberships]) {
					members[member.memberships].push(member);
				} else {
					members[member.memberships] = [member];
				}
			});
		});

	csvOptions = {
		fields: [
			{ label: 'Email', value: 'email' },
			{ label: 'First Name', value: 'first_name' },
			{ label: 'Last Name', value: 'last_name' },
		],
	};

	Object.keys(members).forEach((memberType) => {
		fs.writeFileSync(
			`./output/${memberType}.csv`,
			new Parser(csvOptions).parse(members[memberType])
		);
	});

	// fs.writeFileSync('full.csv', fullMemberCSV);
})();
