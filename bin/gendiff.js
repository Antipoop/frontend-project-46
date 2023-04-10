#!/usr/bin/env node
import { Command } from 'commander';

const  program  = new Command();

program
.description('Compares two configuration files and shows a difference.')
.version('0.01')
.option('-f, --format <type>', 'output format');
program.parse();