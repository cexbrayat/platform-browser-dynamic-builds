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
import { Compiler, Inject, InjectionToken, Optional, PACKAGE_ROOT_URL, TRANSLATIONS, isDevMode, ɵConsole as Console, ViewEncapsulation, Injector, TRANSLATIONS_FORMAT, MissingTranslationStrategy, } from '@angular/core';
import { StaticSymbolCache, JitCompiler, ProviderMeta, I18NHtmlParser, ViewCompiler, CompileMetadataResolver, UrlResolver, TemplateParser, NgModuleCompiler, JitSummaryResolver, SummaryResolver, StyleCompiler, PipeResolver, ElementSchemaRegistry, DomElementSchemaRegistry, ResourceLoader, NgModuleResolver, HtmlParser, CompileReflector, CompilerConfig, DirectiveNormalizer, DirectiveResolver, Lexer, Parser } from '@angular/compiler';
import { JitReflector } from './compiler_reflector';
/** @type {?} */
export const ERROR_COLLECTOR_TOKEN = new InjectionToken('ErrorCollector');
/** *
 * A default provider for {\@link PACKAGE_ROOT_URL} that maps to '/'.
  @type {?} */
export const DEFAULT_PACKAGE_URL_PROVIDER = {
    provide: PACKAGE_ROOT_URL,
    useValue: '/'
};
/** @type {?} */
const _NO_RESOURCE_LOADER = {
    /**
     * @param {?} url
     * @return {?}
     */
    get(url) {
        throw new Error(`No ResourceLoader implementation has been provided. Can't read the url "${url}"`);
    }
};
/** @type {?} */
const baseHtmlParser = new InjectionToken('HtmlParser');
export class CompilerImpl {
    /**
     * @param {?} injector
     * @param {?} _metadataResolver
     * @param {?} templateParser
     * @param {?} styleCompiler
     * @param {?} viewCompiler
     * @param {?} ngModuleCompiler
     * @param {?} summaryResolver
     * @param {?} compileReflector
     * @param {?} compilerConfig
     * @param {?} console
     */
    constructor(injector, _metadataResolver, templateParser, styleCompiler, viewCompiler, ngModuleCompiler, summaryResolver, compileReflector, compilerConfig, console) {
        this._metadataResolver = _metadataResolver;
        this._delegate = new JitCompiler(_metadataResolver, templateParser, styleCompiler, viewCompiler, ngModuleCompiler, summaryResolver, compileReflector, compilerConfig, console, this.getExtraNgModuleProviders.bind(this));
        this.injector = injector;
    }
    /**
     * @return {?}
     */
    getExtraNgModuleProviders() {
        return [this._metadataResolver.getProviderMetadata(new ProviderMeta(Compiler, { useValue: this }))];
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleSync(moduleType) {
        return /** @type {?} */ (this._delegate.compileModuleSync(moduleType));
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAsync(moduleType) {
        return /** @type {?} */ (this._delegate.compileModuleAsync(moduleType));
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsSync(moduleType) {
        /** @type {?} */
        const result = this._delegate.compileModuleAndAllComponentsSync(moduleType);
        return {
            ngModuleFactory: /** @type {?} */ (result.ngModuleFactory),
            componentFactories: /** @type {?} */ (result.componentFactories),
        };
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsAsync(moduleType) {
        return this._delegate.compileModuleAndAllComponentsAsync(moduleType)
            .then((result) => ({
            ngModuleFactory: /** @type {?} */ (result.ngModuleFactory),
            componentFactories: /** @type {?} */ (result.componentFactories),
        }));
    }
    /**
     * @param {?} summaries
     * @return {?}
     */
    loadAotSummaries(summaries) { this._delegate.loadAotSummaries(summaries); }
    /**
     * @param {?} ref
     * @return {?}
     */
    hasAotSummary(ref) { return this._delegate.hasAotSummary(ref); }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    getComponentFactory(component) {
        return /** @type {?} */ (this._delegate.getComponentFactory(component));
    }
    /**
     * @return {?}
     */
    clearCache() { this._delegate.clearCache(); }
    /**
     * @param {?} type
     * @return {?}
     */
    clearCacheFor(type) { this._delegate.clearCacheFor(type); }
    /**
     * @param {?} moduleType
     * @return {?}
     */
    getModuleId(moduleType) {
        /** @type {?} */
        const meta = this._metadataResolver.getNgModuleMetadata(moduleType);
        return meta && meta.id || undefined;
    }
}
if (false) {
    /** @type {?} */
    CompilerImpl.prototype._delegate;
    /** @type {?} */
    CompilerImpl.prototype.injector;
    /** @type {?} */
    CompilerImpl.prototype._metadataResolver;
}
/** *
 * A set of providers that provide `JitCompiler` and its dependencies to use for
 * template compilation.
  @type {?} */
export const COMPILER_PROVIDERS = /** @type {?} */ ([
    { provide: CompileReflector, useValue: new JitReflector() },
    { provide: ResourceLoader, useValue: _NO_RESOURCE_LOADER },
    { provide: JitSummaryResolver, deps: [] },
    { provide: SummaryResolver, useExisting: JitSummaryResolver },
    { provide: Console, deps: [] },
    { provide: Lexer, deps: [] },
    { provide: Parser, deps: [Lexer] },
    {
        provide: baseHtmlParser,
        useClass: HtmlParser,
        deps: [],
    },
    {
        provide: I18NHtmlParser,
        useFactory: (parser, translations, format, config, console) => {
            translations = translations || '';
            /** @type {?} */
            const missingTranslation = translations ? /** @type {?} */ ((config.missingTranslation)) : MissingTranslationStrategy.Ignore;
            return new I18NHtmlParser(parser, translations, format, missingTranslation, console);
        },
        deps: [
            baseHtmlParser,
            [new Optional(), new Inject(TRANSLATIONS)],
            [new Optional(), new Inject(TRANSLATIONS_FORMAT)],
            [CompilerConfig],
            [Console],
        ]
    },
    {
        provide: HtmlParser,
        useExisting: I18NHtmlParser,
    },
    {
        provide: TemplateParser, deps: [CompilerConfig, CompileReflector,
            Parser, ElementSchemaRegistry,
            I18NHtmlParser, Console]
    },
    { provide: DirectiveNormalizer, deps: [ResourceLoader, UrlResolver, HtmlParser, CompilerConfig] },
    { provide: CompileMetadataResolver, deps: [CompilerConfig, HtmlParser, NgModuleResolver,
            DirectiveResolver, PipeResolver,
            SummaryResolver,
            ElementSchemaRegistry,
            DirectiveNormalizer, Console,
            [Optional, StaticSymbolCache],
            CompileReflector,
            [Optional, ERROR_COLLECTOR_TOKEN]] },
    DEFAULT_PACKAGE_URL_PROVIDER,
    { provide: StyleCompiler, deps: [UrlResolver] },
    { provide: ViewCompiler, deps: [CompileReflector] },
    { provide: NgModuleCompiler, deps: [CompileReflector] },
    { provide: CompilerConfig, useValue: new CompilerConfig() },
    { provide: Compiler, useClass: CompilerImpl, deps: [Injector, CompileMetadataResolver,
            TemplateParser, StyleCompiler,
            ViewCompiler, NgModuleCompiler,
            SummaryResolver, CompileReflector, CompilerConfig,
            Console] },
    { provide: DomElementSchemaRegistry, deps: [] },
    { provide: ElementSchemaRegistry, useExisting: DomElementSchemaRegistry },
    { provide: UrlResolver, deps: [PACKAGE_ROOT_URL] },
    { provide: DirectiveResolver, deps: [CompileReflector] },
    { provide: PipeResolver, deps: [CompileReflector] },
    { provide: NgModuleResolver, deps: [CompileReflector] },
]);
/**
 * \@experimental
 */
export class JitCompilerFactory {
    /**
     * @param {?} defaultOptions
     */
    constructor(defaultOptions) {
        /** @type {?} */
        const compilerOptions = {
            useJit: true,
            defaultEncapsulation: ViewEncapsulation.Emulated,
            missingTranslation: MissingTranslationStrategy.Warning,
        };
        this._defaultOptions = [compilerOptions, ...defaultOptions];
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    createCompiler(options = []) {
        /** @type {?} */
        const opts = _mergeOptions(this._defaultOptions.concat(options));
        /** @type {?} */
        const injector = Injector.create([
            COMPILER_PROVIDERS, {
                provide: CompilerConfig,
                useFactory: () => {
                    return new CompilerConfig({
                        // let explicit values from the compiler options overwrite options
                        // from the app providers
                        useJit: opts.useJit,
                        jitDevMode: isDevMode(),
                        // let explicit values from the compiler options overwrite options
                        // from the app providers
                        defaultEncapsulation: opts.defaultEncapsulation,
                        missingTranslation: opts.missingTranslation,
                        preserveWhitespaces: opts.preserveWhitespaces,
                    });
                },
                deps: []
            },
            /** @type {?} */ ((opts.providers))
        ]);
        return injector.get(Compiler);
    }
}
if (false) {
    /** @type {?} */
    JitCompilerFactory.prototype._defaultOptions;
}
/**
 * @param {?} optionsArr
 * @return {?}
 */
function _mergeOptions(optionsArr) {
    return {
        useJit: _lastDefined(optionsArr.map(options => options.useJit)),
        defaultEncapsulation: _lastDefined(optionsArr.map(options => options.defaultEncapsulation)),
        providers: _mergeArrays(optionsArr.map(options => /** @type {?} */ ((options.providers)))),
        missingTranslation: _lastDefined(optionsArr.map(options => options.missingTranslation)),
        preserveWhitespaces: _lastDefined(optionsArr.map(options => options.preserveWhitespaces)),
    };
}
/**
 * @template T
 * @param {?} args
 * @return {?}
 */
function _lastDefined(args) {
    for (let i = args.length - 1; i >= 0; i--) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
    return undefined;
}
/**
 * @param {?} parts
 * @return {?}
 */
function _mergeArrays(parts) {
    /** @type {?} */
    const result = [];
    parts.forEach((part) => part && result.push(...part));
    return result;
}
//# sourceMappingURL=compiler_factory.js.map