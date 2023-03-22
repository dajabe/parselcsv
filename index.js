const fs = require('fs');
const csv = require('csvtojson');
const { Parser } = require('json2csv');

const inputFile = 'MERGED Member Databases.csv';

(async () => {
	const members = {};
	const duplicates = [];

	const rawMembers = await csv().fromFile(inputFile);

	rawMembers.forEach((member) => {
		if (!members[member.memberships]) {
			members[member.memberships] = [member];
		} else if (
			members[member.memberships].some((el) => {
				el.email.trim() == member.email.trim();
			})
		) {
			duplicates.push(member);
		} else {
			members[member.memberships].push(member);
		}
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

	console.log(duplicates);
	// fs.writeFileSync('full.csv', fullMemberCSV);
})();
