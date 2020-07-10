'use strict';
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const ejs = require('ejs')
async function cli() {
    // TODO
	let anwsers = await inquirer.prompt([
		{
			 type: 'input',
			 name: 'name',
			 message: '项目名称?'
		}
	])
	const tempDir = path.join(__dirname, 'templates')
	const destDir = process.cwd()
	fs.readdir(tempDir,(err, files) => {
		if (err) throw err

		files.forEach(file => {
			ejs.renderFile(path.join(tempDir, file),anwsers, (err,result) => {
				if (err) throw err
				fs.writeFileSync(path.join(destDir,file), result)
			})

		})

	})
}

module.exports = cli;
