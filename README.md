# mem-flamegraph
[![npm version](https://img.shields.io/npm/v/YOUR_PACKAGE_NAME.svg)](https://www.npmjs.com/package/mem-flamegraph)
[![license](https://img.shields.io/npm/l/YOUR_PACKAGE_NAME.svg)](https://github.com/Gourav2000/mem-flamegraph/blob/master/LICENSE)

## Description

A package that can be used to generate flamegraphs for cpu utilizations of each function on your node app.
## Installation

To install the package globally, run the following command:

```bash
npm install -g mem-flamegraph
```

## Dependencies

You need to install [speedscope](https://www.npmjs.com/package/speedscope) globally as it uses speedscope to generate the flamegraph. 

```bash
npm install -g speedscope
```

## Usage

Use mem-flamegraph to run a script and Immediately open the flamegraph in the browser::

```bash
memflamegraph app.js
```

It will create a node.cpuprofile in the root of your node app and generate a flamegraph html.

![image](https://github.com/Gourav2000/mem-flamegraph/assets/56431415/6a34dc54-6685-4063-97e2-ae1477ce1f70)


## License
This project is licensed under the [MIT License](LICENSE).
