/**
 * @license Angular v7.0.0-rc.1-1c561a833c
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */
import { COMPILER_OPTIONS, CompilerFactory, Component, Directive, Inject, Injectable, Injector, NgModule, Pipe, createPlatformFactory, ɵstringify } from '@angular/core';
import { TestComponentRenderer, ɵMetadataOverrider, ɵTestingCompilerFactory } from '@angular/core/testing';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, ɵplatformCoreDynamic } from '@angular/platform-browser-dynamic';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { __extends } from 'tslib';
import { DOCUMENT, ɵgetDOM } from '@angular/platform-browser';
import { CompileReflector, DirectiveResolver, ERROR_COMPONENT_TYPE, NgModuleResolver, PipeResolver } from '@angular/compiler';
import { MockDirectiveResolver, MockNgModuleResolver, MockPipeResolver } from '@angular/compiler/testing';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A DOM based implementation of the TestComponentRenderer.
 */
var DOMTestComponentRenderer = /** @class */ (function (_super) {
    __extends(DOMTestComponentRenderer, _super);
    function DOMTestComponentRenderer(_doc) {
        var _this = _super.call(this) || this;
        _this._doc = _doc;
        return _this;
    }
    /**
     * @param {?} rootElId
     * @return {?}
     */
    DOMTestComponentRenderer.prototype.insertRootElement = /**
     * @param {?} rootElId
     * @return {?}
     */
    function (rootElId) {
        /** @type {?} */
        var rootEl = /** @type {?} */ (ɵgetDOM().firstChild(ɵgetDOM().content(ɵgetDOM().createTemplate("<div id=\"" + rootElId + "\"></div>"))));
        /** @type {?} */
        var oldRoots = ɵgetDOM().querySelectorAll(this._doc, '[id^=root]');
        for (var i = 0; i < oldRoots.length; i++) {
            ɵgetDOM().remove(oldRoots[i]);
        }
        ɵgetDOM().appendChild(this._doc.body, rootEl);
    };
    DOMTestComponentRenderer.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DOMTestComponentRenderer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return DOMTestComponentRenderer;
}(TestComponentRenderer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
var COMPILER_PROVIDERS = [
    { provide: MockPipeResolver, deps: [CompileReflector] },
    { provide: PipeResolver, useExisting: MockPipeResolver },
    { provide: MockDirectiveResolver, deps: [CompileReflector] },
    { provide: DirectiveResolver, useExisting: MockDirectiveResolver },
    { provide: MockNgModuleResolver, deps: [CompileReflector] },
    { provide: NgModuleResolver, useExisting: MockNgModuleResolver },
];
var TestingCompilerFactoryImpl = /** @class */ (function () {
    function TestingCompilerFactoryImpl(_injector, _compilerFactory) {
        this._injector = _injector;
        this._compilerFactory = _compilerFactory;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    TestingCompilerFactoryImpl.prototype.createTestingCompiler = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var compiler = /** @type {?} */ (this._compilerFactory.createCompiler(options));
        return new TestingCompilerImpl(compiler, compiler.injector.get(MockDirectiveResolver), compiler.injector.get(MockPipeResolver), compiler.injector.get(MockNgModuleResolver));
    };
    return TestingCompilerFactoryImpl;
}());
var TestingCompilerImpl = /** @class */ (function () {
    function TestingCompilerImpl(_compiler, _directiveResolver, _pipeResolver, _moduleResolver) {
        this._compiler = _compiler;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._moduleResolver = _moduleResolver;
        this._overrider = new ɵMetadataOverrider();
    }
    Object.defineProperty(TestingCompilerImpl.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () { return this._compiler.injector; },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.compileModuleSync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._compiler.compileModuleSync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.compileModuleAsync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._compiler.compileModuleAsync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.compileModuleAndAllComponentsSync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._compiler.compileModuleAndAllComponentsSync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.compileModuleAndAllComponentsAsync = /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType);
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    TestingCompilerImpl.prototype.getComponentFactory = /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    function (component) {
        return this._compiler.getComponentFactory(component);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    TestingCompilerImpl.prototype.checkOverrideAllowed = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (this._compiler.hasAotSummary(type)) {
            throw new Error(ɵstringify(type) + " was AOT compiled, so its metadata cannot be changed.");
        }
    };
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    TestingCompilerImpl.prototype.overrideModule = /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    function (ngModule, override) {
        this.checkOverrideAllowed(ngModule);
        /** @type {?} */
        var oldMetadata = this._moduleResolver.resolve(ngModule, false);
        this._moduleResolver.setNgModule(ngModule, this._overrider.overrideMetadata(NgModule, oldMetadata, override));
        this.clearCacheFor(ngModule);
    };
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    TestingCompilerImpl.prototype.overrideDirective = /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    function (directive, override) {
        this.checkOverrideAllowed(directive);
        /** @type {?} */
        var oldMetadata = this._directiveResolver.resolve(directive, false);
        this._directiveResolver.setDirective(directive, this._overrider.overrideMetadata(Directive, /** @type {?} */ ((oldMetadata)), override));
        this.clearCacheFor(directive);
    };
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    TestingCompilerImpl.prototype.overrideComponent = /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    function (component, override) {
        this.checkOverrideAllowed(component);
        /** @type {?} */
        var oldMetadata = this._directiveResolver.resolve(component, false);
        this._directiveResolver.setDirective(component, this._overrider.overrideMetadata(Component, /** @type {?} */ ((oldMetadata)), override));
        this.clearCacheFor(component);
    };
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    TestingCompilerImpl.prototype.overridePipe = /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    function (pipe, override) {
        this.checkOverrideAllowed(pipe);
        /** @type {?} */
        var oldMetadata = this._pipeResolver.resolve(pipe, false);
        this._pipeResolver.setPipe(pipe, this._overrider.overrideMetadata(Pipe, oldMetadata, override));
        this.clearCacheFor(pipe);
    };
    /**
     * @param {?} summaries
     * @return {?}
     */
    TestingCompilerImpl.prototype.loadAotSummaries = /**
     * @param {?} summaries
     * @return {?}
     */
    function (summaries) { this._compiler.loadAotSummaries(summaries); };
    /**
     * @return {?}
     */
    TestingCompilerImpl.prototype.clearCache = /**
     * @return {?}
     */
    function () { this._compiler.clearCache(); };
    /**
     * @param {?} type
     * @return {?}
     */
    TestingCompilerImpl.prototype.clearCacheFor = /**
     * @param {?} type
     * @return {?}
     */
    function (type) { this._compiler.clearCacheFor(type); };
    /**
     * @param {?} error
     * @return {?}
     */
    TestingCompilerImpl.prototype.getComponentFromError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) { return (/** @type {?} */ (error))[ERROR_COMPONENT_TYPE] || null; };
    /**
     * @param {?} moduleType
     * @return {?}
     */
    TestingCompilerImpl.prototype.getModuleId = /**
     * @param {?} moduleType
     * @return {?}
     */
    function (moduleType) {
        return this._moduleResolver.resolve(moduleType, true).id;
    };
    return TestingCompilerImpl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** *
 * Platform for dynamic tests
 *
 * \@experimental
  @type {?} */
var platformCoreDynamicTesting = createPlatformFactory(ɵplatformCoreDynamic, 'coreDynamicTesting', [
    { provide: COMPILER_OPTIONS, useValue: { providers: COMPILER_PROVIDERS }, multi: true }, {
        provide: ɵTestingCompilerFactory,
        useClass: TestingCompilerFactoryImpl,
        deps: [Injector, CompilerFactory]
    }
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
var platformBrowserDynamicTesting = createPlatformFactory(platformCoreDynamicTesting, 'browserDynamicTesting', ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 *
 */
var BrowserDynamicTestingModule = /** @class */ (function () {
    function BrowserDynamicTestingModule() {
    }
    BrowserDynamicTestingModule.decorators = [
        { type: NgModule, args: [{
                    exports: [BrowserTestingModule],
                    providers: [
                        { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer },
                    ]
                },] },
    ];
    return BrowserDynamicTestingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { platformBrowserDynamicTesting, BrowserDynamicTestingModule, DOMTestComponentRenderer as ɵDOMTestComponentRenderer, platformCoreDynamicTesting as ɵplatformCoreDynamicTesting, COMPILER_PROVIDERS as ɵa, TestingCompilerFactoryImpl as ɵb };
//# sourceMappingURL=testing.js.map
