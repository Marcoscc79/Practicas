"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnTableTitle = exports.previewTransformation = exports.specifyTransformation = exports.specifyDerivedColNameTitle = exports.createDerivedColumn = exports.importNewFileText = exports.page4NameText = exports.page3NameText = exports.page2NameText = exports.page1NameText = exports.wizardNameText = exports.needSqlConnectionText = exports.needConnectionText = exports.updateText = exports.fileImportText = exports.tableSchemaText = exports.tableNameText = exports.databaseText = exports.serverNameText = exports.importStatusText = exports.importInformationText = exports.refreshText = exports.failureTitleText = exports.successTitleText = exports.allowNullsText = exports.primaryKeyText = exports.dataTypeText = exports.columnNameText = exports.nextText = exports.importDataText = exports.schemaTextboxTitleText = exports.tableTextboxTitleText = exports.fileTextboxTitleText = exports.openFileText = exports.browseFilesText = exports.invalidFileLocationError = exports.databaseDropdownTitleText = exports.serverDropDownTitleText = exports.serviceCrashMessageText = exports.crashButtonText = exports.flatFileImportStartCommand = exports.serviceCrashLink = exports.supportedProviders = exports.summaryErrorSymbol = exports.mssqlProvider = exports.sqlConfigSectionName = exports.configLogDebugInfo = exports.providerId = exports.serviceName = exports.extensionConfigSectionName = void 0;
exports.selectSchemaQuery = exports.selectColumn = exports.specifyTransformationForRow = exports.selectAllColumns = exports.deriverColumnInstruction5 = exports.deriverColumnInstruction4 = exports.deriverColumnInstruction3 = exports.deriverColumnInstruction2 = exports.deriverColumnInstruction1 = exports.headerIntructionText = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
exports.extensionConfigSectionName = 'flatFileImport';
exports.serviceName = 'Flat File Import Service';
exports.providerId = 'FlatFileImport';
exports.configLogDebugInfo = 'logDebugInfo';
exports.sqlConfigSectionName = 'sql';
exports.mssqlProvider = 'MSSQL';
exports.summaryErrorSymbol = '✗ ';
exports.supportedProviders = [exports.mssqlProvider];
// Links
exports.serviceCrashLink = 'https://github.com/Microsoft/azuredatastudio/issues/2090';
// Tasks
exports.flatFileImportStartCommand = 'flatFileImport.start';
// Localized texts
exports.crashButtonText = localize(0, null);
exports.serviceCrashMessageText = localize(1, null);
exports.serverDropDownTitleText = localize(2, null);
exports.databaseDropdownTitleText = localize(3, null);
exports.invalidFileLocationError = localize(4, null);
exports.browseFilesText = localize(5, null);
exports.openFileText = localize(6, null);
exports.fileTextboxTitleText = localize(7, null);
exports.tableTextboxTitleText = localize(8, null);
exports.schemaTextboxTitleText = localize(9, null);
exports.importDataText = localize(10, null);
exports.nextText = localize(11, null);
exports.columnNameText = localize(12, null);
exports.dataTypeText = localize(13, null);
exports.primaryKeyText = localize(14, null);
exports.allowNullsText = localize(15, null);
exports.successTitleText = localize(16, null);
exports.failureTitleText = localize(17, null);
exports.refreshText = localize(18, null);
exports.importInformationText = localize(19, null);
exports.importStatusText = localize(20, null);
exports.serverNameText = localize(21, null);
exports.databaseText = localize(22, null);
exports.tableNameText = localize(23, null);
exports.tableSchemaText = localize(24, null);
exports.fileImportText = localize(25, null);
exports.updateText = localize(26, null);
exports.needConnectionText = localize(27, null);
exports.needSqlConnectionText = localize(28, null);
exports.wizardNameText = localize(29, null);
exports.page1NameText = localize(30, null);
exports.page2NameText = localize(31, null);
exports.page3NameText = localize(32, null);
exports.page4NameText = localize(33, null);
exports.importNewFileText = localize(34, null);
exports.createDerivedColumn = localize(35, null);
exports.specifyDerivedColNameTitle = localize(36, null);
exports.specifyTransformation = localize(37, null);
exports.previewTransformation = localize(38, null);
exports.columnTableTitle = localize(39, null);
exports.headerIntructionText = localize(40, null);
exports.deriverColumnInstruction1 = localize(41, null);
exports.deriverColumnInstruction2 = localize(42, null);
exports.deriverColumnInstruction3 = localize(43, null);
exports.deriverColumnInstruction4 = localize(44, null);
exports.deriverColumnInstruction5 = localize(45, null);
exports.selectAllColumns = localize(46, null);
function specifyTransformationForRow(rowIndex) {
    return localize(47, null, rowIndex);
}
exports.specifyTransformationForRow = specifyTransformationForRow;
function selectColumn(colName) {
    return localize(48, null, colName);
}
exports.selectColumn = selectColumn;
// SQL Queries
exports.selectSchemaQuery = `SELECT name FROM sys.schemas`;
//# sourceMappingURL=https://sqlopsbuilds.blob.core.windows.net/sourcemaps/626eecf964d392704e8203067080127bb7607dc9/extensions/import/out/common/constants.js.map
