"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProsePreviewPage = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const azdata = require("azdata");
const importPage_1 = require("../api/importPage");
const constants = require("../../common/constants");
const derivedColumnDialog_1 = require("../../dialogs/derivedColumnDialog");
const vscode = require("vscode");
class ProsePreviewPage extends importPage_1.ImportPage {
    get table() {
        return this._table;
    }
    set table(table) {
        this._table = table;
    }
    get loading() {
        return this._loading;
    }
    set loading(loading) {
        this._loading = loading;
    }
    get form() {
        return this._form;
    }
    set form(form) {
        this._form = form;
    }
    get resultTextComponent() {
        return this._resultTextComponent;
    }
    set resultTextComponent(resultTextComponent) {
        this._resultTextComponent = resultTextComponent;
    }
    get isSuccess() {
        return this._isSuccess;
    }
    set isSuccess(isSuccess) {
        this._isSuccess = isSuccess;
    }
    async start() {
        this.table = this.view.modelBuilder.table().withProps({
            data: undefined,
            columns: undefined,
            forceFitColumns: azdata.ColumnSizingMode.DataFit
        }).component();
        this.instance.createDerivedColumnButton.onClick(async (e) => {
            const derivedColumnDialog = new derivedColumnDialog_1.DerivedColumnDialog(this.model, this.provider);
            const response = await derivedColumnDialog.createDerivedColumn();
            if (response) {
                this.model.proseColumns.push({
                    columnName: response.derivedColumnName,
                    dataType: 'nvarchar(MAX)',
                    primaryKey: false,
                    nullable: true
                });
                response.derivedColumnDataPreview.forEach((v, i) => {
                    this.model.proseDataPreview[i].push(v);
                });
                this.populateTable(this.model.proseDataPreview, this.model.proseColumns.map(c => c.columnName));
            }
        });
        this.loading = this.view.modelBuilder.loadingComponent().component();
        this.resultTextComponent = this.view.modelBuilder.text()
            .withProps({
            value: this.isSuccess ? constants.successTitleText : constants.failureTitleText
        }).component();
        this.form = this.view.modelBuilder.formContainer().withFormItems([
            {
                component: this.resultTextComponent,
                title: ''
            },
            {
                component: this.table,
                title: ''
            }
        ]).component();
        this.loading.component = this.form;
        await this.view.initializeModel(this.loading);
        return true;
    }
    async onPageEnter() {
        let proseResult;
        let error;
        const enablePreviewFeatures = vscode.workspace.getConfiguration('workbench').get('enablePreviewFeatures');
        if (this.model.newFileSelected) {
            this.loading.loading = true;
            try {
                proseResult = await this.learnFile();
            }
            catch (ex) {
                error = ex.toString();
                this.instance.wizard.message = {
                    level: azdata.window.MessageLevel.Error,
                    text: error
                };
            }
            this.model.newFileSelected = false;
            this.loading.loading = false;
        }
        if (!this.model.newFileSelected || proseResult) {
            await this.populateTable(this.model.proseDataPreview, this.model.proseColumns.map(c => c.columnName));
            this.isSuccess = true;
            if (this.form) {
                this.resultTextComponent.value = constants.successTitleText;
            }
            this.instance.createDerivedColumnButton.hidden = !enablePreviewFeatures;
            return true;
        }
        else {
            await this.populateTable([], []);
            this.isSuccess = false;
            if (this.form) {
                this.resultTextComponent.value = constants.failureTitleText + '\n' + (error !== null && error !== void 0 ? error : '');
            }
            return false;
        }
    }
    async onPageLeave() {
        this.instance.createDerivedColumnButton.hidden = true;
        return true;
    }
    async cleanup() {
        delete this.model.proseDataPreview;
        return true;
    }
    setupNavigationValidator() {
        this.instance.registerNavigationValidator((info) => {
            if (info) {
                // Prose Preview to Modify Columns
                if (info.lastPage === 1 && info.newPage === 2) {
                    return this.table.data && this.table.data.length > 0;
                }
            }
            return !this.loading.loading;
        });
    }
    async learnFile() {
        const response = await this.provider.sendPROSEDiscoveryRequest({
            filePath: this.model.filePath,
            tableName: this.model.table,
            schemaName: this.model.schema,
            fileType: this.model.fileType
        });
        this.model.proseDataPreview = null;
        if (response.dataPreview) {
            this.model.proseDataPreview = response.dataPreview;
        }
        this.model.proseColumns = [];
        this.model.originalProseColumns = [];
        if (response.columnInfo) {
            response.columnInfo.forEach((column) => {
                this.model.proseColumns.push({
                    columnName: column.name,
                    dataType: column.sqlType,
                    primaryKey: false,
                    nullable: column.isNullable
                });
                this.model.originalProseColumns.push({
                    columnName: column.name,
                    dataType: column.sqlType,
                    primaryKey: false,
                    nullable: column.isNullable
                });
            });
            return true;
        }
        return false;
    }
    async populateTable(tableData, columnHeaders) {
        let rows;
        let rowsLength = tableData.length;
        if (rowsLength > 50) {
            rows = tableData;
        }
        else {
            rows = tableData.slice(0, rowsLength);
        }
        this.table.updateProperties({
            data: rows,
            columns: columnHeaders,
            height: 400,
            width: '700',
        });
    }
}
exports.ProsePreviewPage = ProsePreviewPage;
//# sourceMappingURL=https://sqlopsbuilds.blob.core.windows.net/sourcemaps/626eecf964d392704e8203067080127bb7607dc9/extensions/import/out/wizard/pages/prosePreviewPage.js.map
