"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportPage = void 0;
const basePage_1 = require("./basePage");
class ImportPage extends basePage_1.BasePage {
    constructor(instance, wizardPage, model, view, provider) {
        super();
        this.instance = instance;
        this.wizardPage = wizardPage;
        this.model = model;
        this.view = view;
        this.provider = provider;
    }
}
exports.ImportPage = ImportPage;
//# sourceMappingURL=https://sqlopsbuilds.blob.core.windows.net/sourcemaps/626eecf964d392704e8203067080127bb7607dc9/extensions/import/out/wizard/api/importPage.js.map
