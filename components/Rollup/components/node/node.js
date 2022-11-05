/**
 * This module is designed to load rollup it self as would it be a component.
 * it gets reused by many components to supply components as args for rollup
 * fetch the rollup source turn it into modules as rollup is a modular bundler
 * expose it as RollupComponent that u can use like Rollup.createChunk() 
 */

import Bundle from './modules/Bundle.js';
import Graph from './modules/Graph.js';
import type { PluginDriver } from './modules/PluginDriver.js';
import { getSortedValidatedPlugins } from './modules/PluginDriver.js';
import {
	error,
	errorAlreadyClosed,
	errorCannotEmitFromOptionsHook,
	// eslint-disable-next-line unicorn/prevent-abbreviations
	errorMissingFileOrDirOption
} from './modules//error.js';
import { promises as fs } from './modules/fs';
import { catchUnfinishedHookActions } from './modules/hookActions';
import { normalizeInputOptions } from './modules/options/normalizeInputOptions';
import { normalizeOutputOptions } from './modules/options/normalizeOutputOptions';
import { normalizePluginOption } from './modules/options/options';
import { dirname, resolve } from './modules/path';
import { ANONYMOUS_OUTPUT_PLUGIN_PREFIX, ANONYMOUS_PLUGIN_PREFIX } from '../utils/pluginUtils';
import { getTimings, initialiseTimers, timeEnd, timeStart } from '../utils/timers';
import type {
	InputOptions,
	NormalizedInputOptions,
	NormalizedOutputOptions,
	OutputAsset,
	OutputBundle,
	OutputChunk,
	OutputOptions,
	Plugin,
	RollupBuild,
	RollupOptions,
	RollupOutput,
	RollupWatcher
} from './types';
