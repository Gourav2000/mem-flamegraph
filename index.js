#!/usr/bin/env node

/**
 * mem-flamegraph
 * cpu flamegraphs
 *
 * @author Gourav <https://gourav2000.github.io/MyPortfolio/>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const { spawn } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
var profileStart = false;
var debugPrintcount = 0;
(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
	process.env['NODE_INSPECT_RESUME_ON_START'] = 1
	const appProcess = spawn('node', ['inspect', input], { shell: true });

	appProcess.stdout.on('data', (data) => {

		if (data.includes("debug>") && debugPrintcount < 2) {
			debugPrintcount = debugPrintcount + 1;
		}

		if (debugPrintcount == 2 && profileStart == false) {
			appProcess.stdin.write('profile\n');
			console.log("The package has statred profiling your node app, you can go ahead and hit your api's, once you are done press ctrl+c.")
			profileStart = true;
		}

		if (data.includes("[Profile")) {
			appProcess.stdin.write(`profiles[0].save(filepath = 'node.cpuprofile')\n`)
		}

		if (data.includes("node.cpuprofile")) {
			console.log(`${data}`.split('\n')[0])
			
			const app2Process = spawn('speedscope', ['node.cpuprofile'], { shell: true });
			
			app2Process.stdout.on('data', (data2) => {
				console.log(`${data2}`)
				if (data2.includes(".html in your default browser")) {
					process.exit()
				}
			});
			
			app2Process.stderr.on('data', (err) => {
				console.error(`Error occurred: ${err}`);
				if(err.includes("is not recognized as an internal or external command"))
					console.log("You need to install speedscope npm package globally in order to run this package \nRun- npm install speedscope -g")
				process.exit()
			});


		}
	});

	appProcess.stderr.on('data', (err) => {
		console.error(`Error occurred: ${err}`);
		process.exit()
	});

	rl.on('SIGINT', async () => {
		appProcess.stdin.write('profileEnd\n')

	});

})();

