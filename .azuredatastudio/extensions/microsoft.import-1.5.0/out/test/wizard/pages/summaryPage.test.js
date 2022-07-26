"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const TypeMoq = require("typemoq");
const azdata = require("azdata");
const sinon = require("sinon");
const constants = require("../../../common/constants");
const flatFileWizard_1 = require("../../../wizard/flatFileWizard");
const should = require("should");
const utils_test_1 = require("../../utils.test");
const summaryPage_1 = require("../../../wizard/pages/summaryPage");
describe('import extension summary page tests', function () {
    let mockFlatFileWizard;
    let mockImportModel;
    let mockFlatFileProvider;
    let summaryPage;
    let wizard;
    let page;
    let pages = new Map();
    beforeEach(async function () {
        mockFlatFileProvider = TypeMoq.Mock.ofType(utils_test_1.TestFlatFileProvider);
        mockFlatFileWizard = TypeMoq.Mock.ofType(flatFileWizard_1.FlatFileWizard, TypeMoq.MockBehavior.Loose, undefined, mockFlatFileProvider.object);
        mockImportModel = TypeMoq.Mock.ofType(utils_test_1.TestImportDataModel, TypeMoq.MockBehavior.Loose);
        wizard = azdata.window.createWizard(constants.wizardNameText);
        page = azdata.window.createWizardPage(constants.page4NameText);
        sinon.stub(azdata.accounts, 'getAllAccounts').returns(Promise.resolve(utils_test_1.getAzureAccounts()));
        sinon.stub(azdata.accounts, 'getAccountSecurityToken').returns(Promise.resolve({
            token: 'azureToken',
            tokenType: 'token'
        }));
        sinon.stub(azdata.connection, 'getConnectionString').returns(Promise.resolve('testConnectionString'));
    });
    this.afterEach(async () => {
        sinon.restore();
    });
    it('checking if all components are initialized properly', async function () {
        await new Promise(function (resolve) {
            page.registerContent(async (view) => {
                summaryPage = new summaryPage_1.SummaryPage(mockFlatFileWizard.object, page, mockImportModel.object, view, TypeMoq.It.isAny());
                pages.set(1, summaryPage);
                await summaryPage.start();
                resolve();
            });
            wizard.generateScriptButton.hidden = true;
            wizard.pages = [page];
            wizard.open();
        });
        // checking if all the required components are correctly initialized
        should.notEqual(summaryPage.table, undefined, 'table should not be undefined');
        should.notEqual(summaryPage.statusText, undefined, 'statusText should not be undefined');
        should.notEqual(summaryPage.loading, undefined, 'loading should not be undefined');
        should.notEqual(summaryPage.form, undefined, 'form should not be undefined');
        await summaryPage.onPageLeave();
        await summaryPage.cleanup();
    });
    it('handle import updates status Text correctly', async function () {
        // Creating a test Connection
        let testServerConnection = {
            providerName: 'testProviderName',
            connectionId: 'testConnectionId',
            options: {}
        };
        // setting up connection objects in model
        mockImportModel.object.server = testServerConnection;
        mockImportModel.object.database = 'testDatabase';
        mockImportModel.object.schema = 'testSchema';
        mockImportModel.object.filePath = 'testFilePath';
        // Creating test columns
        let testProseColumns = [
            {
                columnName: 'column1',
                dataType: 'nvarchar(50)',
                primaryKey: false,
                nullable: false
            },
            {
                columnName: 'column2',
                dataType: 'nvarchar(50)',
                primaryKey: false,
                nullable: false
            }
        ];
        mockImportModel.object.proseColumns = testProseColumns;
        // setting up a test table insert response from FlatFileProvider
        let testSendInsertDataRequestResponse = {
            result: {
                success: true,
                errorMessage: ''
            }
        };
        mockFlatFileProvider.setup(x => x.sendInsertDataRequest(TypeMoq.It.isAny())).returns(async () => { return testSendInsertDataRequestResponse; });
        await new Promise(function (resolve) {
            page.registerContent(async (view) => {
                summaryPage = new summaryPage_1.SummaryPage(mockFlatFileWizard.object, page, mockImportModel.object, view, mockFlatFileProvider.object);
                pages.set(1, summaryPage);
                await summaryPage.start();
                summaryPage.setupNavigationValidator();
                resolve();
            });
            wizard.generateScriptButton.hidden = true;
            wizard.pages = [page];
            wizard.open();
        });
        // Entering the page. This method will try to create table using FlatFileProvider
        await summaryPage.onPageEnter();
        // In case of success we should see the success message
        should.equal(summaryPage.statusText.value, constants.updateText);
        // In case of a failure we should see the error message
        testSendInsertDataRequestResponse = {
            result: {
                success: false,
                errorMessage: 'testError'
            }
        };
        // mocking the insertDataRequest to fail
        mockFlatFileProvider.setup(x => x.sendInsertDataRequest(TypeMoq.It.isAny())).returns(async () => { return testSendInsertDataRequestResponse; });
        // Entering the page. This method will try to create table using FlatFileProvider
        await summaryPage.onPageEnter();
        should.equal(summaryPage.statusText.value, constants.summaryErrorSymbol + 'testError');
    });
    it('Data is inserted with correct account access token in case of Azure MFA connections', async () => {
        // Creating a test AAD MFA connection
        let testServerConnection = {
            providerName: 'testProviderName',
            connectionId: 'testConnectionId',
            options: {
                azureAccount: utils_test_1.getAzureAccounts()[1].key.accountId,
                azureTenantId: 'azureAccount2Tenant',
                authenticationType: 'AzureMFA'
            }
        };
        // Overriding the behavior of getAccountSecurityToken and making sure
        // it returns only when called with second azure test account and
        // azureTenantId from test connection.
        azdata.accounts['getAccountSecurityToken'].restore();
        sinon.stub(azdata.accounts, 'getAccountSecurityToken')
            .withArgs(utils_test_1.getAzureAccounts()[1], 'azureAccount2Tenant', sinon.match.any).returns(Promise.resolve({
            token: 'token2',
            tokenType: 'azureTokenType'
        }));
        // setting up connection objects in model
        mockImportModel.object.server = testServerConnection;
        mockImportModel.object.database = 'testDatabase';
        mockImportModel.object.schema = 'testSchema';
        mockImportModel.object.filePath = 'testFilePath';
        let testSendInsertDataRequestResponse = {
            result: {
                success: true,
                errorMessage: ''
            }
        };
        // Creating test columns
        let testProseColumns = [];
        mockImportModel.object.proseColumns = testProseColumns;
        // Creating a test request params with azure account 2 token
        let testSendInsertDataRequest = {
            connectionString: 'testConnectionString',
            batchSize: 500,
            azureAccessToken: 'token2'
        };
        mockFlatFileProvider.setup(x => x.sendInsertDataRequest(testSendInsertDataRequest)).returns(async () => { return testSendInsertDataRequestResponse; });
        await new Promise(function (resolve) {
            page.registerContent(async (view) => {
                summaryPage = new summaryPage_1.SummaryPage(mockFlatFileWizard.object, page, mockImportModel.object, view, mockFlatFileProvider.object);
                pages.set(1, summaryPage);
                await summaryPage.start();
                summaryPage.setupNavigationValidator();
                resolve();
            });
            wizard.generateScriptButton.hidden = true;
            wizard.pages = [page];
            wizard.open();
        });
        await summaryPage.onPageEnter();
        // Verifying insert data request is called with expected parameters once.
        mockFlatFileProvider.verify(x => x.sendInsertDataRequest(testSendInsertDataRequest), TypeMoq.Times.once());
    });
});
//# sourceMappingURL=https://sqlopsbuilds.blob.core.windows.net/sourcemaps/626eecf964d392704e8203067080127bb7607dc9/extensions/import/out/test/wizard/pages/summaryPage.test.js.map
