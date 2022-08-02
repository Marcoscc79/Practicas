"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const serviceUtils_1 = require("../../services/serviceUtils");
const should = require("should");
describe('Service utitlities test', function () {
    it('ensure returns empty object if property not found ', function () {
        // ensure will return an empty object when key is not found
        should(serviceUtils_1.ensure({ 'testkey1': 'testval' }, 'testkey')).deepEqual({});
    });
    it('ensure returns property value if it is present in target', function () {
        // when property is present it will return the value
        should(serviceUtils_1.ensure({ 'testkey': 'testval' }, 'testkey')).equal('testval');
    });
});
//# sourceMappingURL=https://sqlopsbuilds.blob.core.windows.net/sourcemaps/626eecf964d392704e8203067080127bb7607dc9/extensions/import/out/test/services/serviceClient.test.js.map
