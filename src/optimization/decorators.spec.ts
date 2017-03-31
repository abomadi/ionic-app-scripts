import { join } from 'path';
import * as decorators from './decorators';
import * as Constants from '../util/constants';
import * as helpers from '../util/helpers';

import * as MagicString from 'magic-string';

const baseDir = join(process.cwd(), 'myApp');
const ionicAngular = join(baseDir, 'node_modules', 'ionic-angular');
const angularDir = join(baseDir, 'node_modules', '@angular');
const srcDir = join(baseDir, 'src');


describe('optimization', () => {
  describe('purgeStaticFieldDecorators', () => {

    it('should remove the static decorator', () => {
      // arrange
      const decoratorStatement = `
      IonicModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule],
                exports: [
                    BrowserModule,
                    HttpModule,
                    FormsModule,
                    ReactiveFormsModule,
                    Avatar,
                    Backdrop,
                    Badge,
                    Button,
                    Card,
                    CardContent,
                    CardHeader,
                    CardTitle,
                    Checkbox,
                    Chip,
                    ClickBlock,
                    Col,
                    Content,
                    // DateTime,
                    FabContainer,
                    FabButton,
                    FabList,
                    Footer,
                    Grid,
                    Header,
                    HideWhen,
                    Icon,
                    Img,
                    InfiniteScroll,
                    InfiniteScrollContent,
                    IonicApp,
                    Item,
                    ItemContent,
                    ItemDivider,
                    ItemGroup,
                    ItemOptions,
                    ItemReorder,
                    ItemSliding,
                    Label,
                    List,
                    ListHeader,
                    Menu,
                    MenuClose,
                    MenuToggle,
                    NativeInput,
                    Nav,
                    Navbar,
                    NavPop,
                    NavPopAnchor,
                    NavPush,
                    NavPushAnchor,
                    NextInput,
                    Note,
                    Option,
                    OverlayPortal,
                    PickerColumnCmp,
                    RadioButton,
                    RadioGroup,
                    Range,
                    RangeKnob,
                    Refresher,
                    RefresherContent,
                    Reorder,
                    Row,
                    Scroll,
                    Searchbar,
                    Segment,
                    SegmentButton,
                    // Select,
                    ShowWhen,
                    Slide,
                    Slides,
                    Spinner,
                    Tab,
                    Tabs,
                    TabButton,
                    TabHighlight,
                    TextInput,
                    Thumbnail,
                    Toggle,
                    Toolbar,
                    ToolbarItem,
                    ToolbarTitle,
                    Typography,
                    VirtualFooter,
                    VirtualHeader,
                    VirtualItem,
                    VirtualScroll,
                ],
                declarations: [
                    ActionSheetCmp,
                    AlertCmp,
                    ClickBlock,
                    LoadingCmp,
                    ModalCmp,
                    PickerCmp,
                    PopoverCmp,
                    ToastCmp,
                    Avatar,
                    Backdrop,
                    Badge,
                    Button,
                    Card,
                    CardContent,
                    CardHeader,
                    CardTitle,
                    Checkbox,
                    Chip,
                    ClickBlock,
                    Col,
                    Content,
                    // DateTime,
                    FabContainer,
                    FabButton,
                    FabList,
                    Footer,
                    Grid,
                    Header,
                    HideWhen,
                    Icon,
                    Img,
                    InfiniteScroll,
                    InfiniteScrollContent,
                    IonicApp,
                    Item,
                    ItemContent,
                    ItemDivider,
                    ItemGroup,
                    ItemOptions,
                    ItemReorder,
                    ItemSliding,
                    Label,
                    List,
                    ListHeader,
                    Menu,
                    MenuClose,
                    MenuToggle,
                    NativeInput,
                    Nav,
                    Navbar,
                    NavPop,
                    NavPopAnchor,
                    NavPush,
                    NavPushAnchor,
                    NextInput,
                    Note,
                    Option,
                    OverlayPortal,
                    PickerColumnCmp,
                    RadioButton,
                    RadioGroup,
                    Range,
                    RangeKnob,
                    Refresher,
                    RefresherContent,
                    Reorder,
                    Row,
                    Scroll,
                    Searchbar,
                    Segment,
                    SegmentButton,
                    // Select,
                    ShowWhen,
                    Slide,
                    Slides,
                    Spinner,
                    Tab,
                    Tabs,
                    TabButton,
                    TabHighlight,
                    TextInput,
                    Thumbnail,
                    Toggle,
                    Toolbar,
                    ToolbarItem,
                    ToolbarTitle,
                    Typography,
                    VirtualFooter,
                    VirtualHeader,
                    VirtualItem,
                    VirtualScroll,
                ],
                entryComponents: []
            },] },
];
      `;

      const additionalGeneratedContent = `
      /** @nocollapse */
IonicModule.ctorParameters = () => [];
function IonicModule_tsickle_Closure_declarations() {
    /** @type {?} */
    IonicModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    IonicModule.ctorParameters;
}
** @nocollapse */
LazyModule.ctorParameters = () => [];
function LazyModule_tsickle_Closure_declarations() {
    /** @type {?} */
    LazyModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    LazyModule.ctorParameters;
}
      `;


      const knownContent = `
      some various content
${decoratorStatement}
${additionalGeneratedContent}

some more content
      `;

      // act
      let magicString = new MagicString(knownContent);
      const entryPoint = join(ionicAngular, 'index.js');
      magicString = decorators.purgeStaticFieldDecorators(entryPoint, knownContent, ionicAngular, angularDir, srcDir, magicString);
      const result = magicString.toString();

      // assert
      expect(result).not.toEqual(knownContent);
      const regex = decorators.getDecoratorRegex('NgModule');
      const matches = regex.exec(result);
      expect(matches).toBeFalsy();
      expect(result.indexOf(additionalGeneratedContent)).toBeGreaterThan(-1);
    });

    it('should not remove decorators when it has an injectable statement in it', () => {
        const knownContent = `
var ActionSheetController = (function () {
    /**
     * @param {?} _app
     * @param {?} config
     */
    function ActionSheetController(_app, config) {
        this._app = _app;
        this.config = config;
    }
    /**
     * Open an action sheet with a title, subTitle, and an array of buttons
     * @param {?=} opts
     * @return {?}
     */
    ActionSheetController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new ActionSheet(this._app, opts, this.config);
    };
    return ActionSheetController;
}());
export { ActionSheetController };
ActionSheetController.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ActionSheetController.ctorParameters = function () { return [
    { type: App, },
    { type: Config, },
]; };
        `;

      let magicString = new MagicString(knownContent);
      const entryPoint = join(ionicAngular, 'index.js');
      magicString = decorators.purgeStaticFieldDecorators(entryPoint, knownContent, ionicAngular, angularDir, srcDir, magicString);
      const result = magicString.toString();
      expect(result).toEqual(knownContent);
    });
  });

  describe('removeTSickleClosureDeclarations', () => {
    it('should get original data back when not in ionic-angular or src directories', () => {
        const knownContent = `
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { isTrueProperty } from '../../util/util';
/**
 * \@name Scroll
 * \@description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. \`ion-Scroll\` Can be used in places where you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 * \@usage
 * \`\`\`html
 * <ion-scroll scrollX="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollY="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollX="true" scrollY="true">
 * </ion-scroll>
 * \`\`\`
 * \@demo /docs/v2/demos/src/scroll/
 */
export class Scroll {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._scrollX = false;
        this._scrollY = false;
        this._zoom = false;
        this._maxZoom = 1;
        /**
         * @hidden
         */
        this.maxScale = 3;
        /**
         * @hidden
         */
        this.zoomDuration = 250;
    }
    /**
     * \@input {boolean} If true, scrolling along the X axis is enabled.
     * @return {?}
     */
    get scrollX() {
        return this._scrollX;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set scrollX(val) {
        this._scrollX = isTrueProperty(val);
    }
    /**
     * \@input {boolean} If true, scrolling along the Y axis is enabled; requires the following CSS declaration: ion-scroll { white-space: nowrap; }
     * @return {?}
     */
    get scrollY() {
        return this._scrollY;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set scrollY(val) {
        this._scrollY = isTrueProperty(val);
    }
    /**
     * \@input {boolean} If true, zooming is enabled.
     * @return {?}
     */
    get zoom() {
        return this._zoom;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set zoom(val) {
        this._zoom = isTrueProperty(val);
    }
    /**
     * \@input {number} Set the max zoom amount.
     * @return {?}
     */
    get maxZoom() {
        return this._maxZoom;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set maxZoom(val) {
        this._maxZoom = val;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.scrollElement = this._elementRef.nativeElement.children[0];
    }
    /**
     * @hidden
     * Add a scroll event handler to the scroll element if it exists.
     * undefined if the scroll element doesn't exist.
     * @param {?} handler
     * @return {?}
     */
    addScrollEventListener(handler) {
        if (!this.scrollElement) {
            return;
        }
        this.scrollElement.addEventListener('scroll', handler);
        return () => {
            this.scrollElement.removeEventListener('scroll', handler);
        };
    }
}
Scroll.decorators = [
    { type: Component, args: [{
                selector: 'ion-scroll',
                template: '<div class="scroll-content">' +
                    '<div class="scroll-zoom-wrapper">' +
                    '<ng-content></ng-content>' +
                    '</div>' +
                    '</div>',
                host: {
                    '[class.scroll-x]': 'scrollX',
                    '[class.scroll-y]': 'scrollY'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
Scroll.ctorParameters = () => [
    { type: ElementRef, },
];
Scroll.propDecorators = {
    'scrollX': [{ type: Input },],
    'scrollY': [{ type: Input },],
    'zoom': [{ type: Input },],
    'maxZoom': [{ type: Input },],
};
function Scroll_tsickle_Closure_declarations() {
    /** @type {?} */
    Scroll.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Scroll.ctorParameters;
    /** @type {?} */
    Scroll.propDecorators;
    /** @type {?} */
    Scroll.prototype._scrollX;
    /** @type {?} */
    Scroll.prototype._scrollY;
    /** @type {?} */
    Scroll.prototype._zoom;
    /** @type {?} */
    Scroll.prototype._maxZoom;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.maxScale;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.zoomDuration;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.scrollElement;
    /** @type {?} */
    Scroll.prototype._elementRef;
}
//# sourceMappingURL=scroll.js.map
        `;

        const knownPath = '/some/fake/path/scroll.js';
        const ionicAngularDir = '/ionic-angular/dir';
        const srcDir = '/myApp/src';

        const result = decorators.removeTSickleClosureDeclarations(knownPath, knownContent, ionicAngularDir, srcDir);
        expect(result).toEqual(knownContent);
    });

    it('should purge the function declaration when in ionic-angular dir', () => {
        const knownContent = `
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { isTrueProperty } from '../../util/util';
/**
 * \@name Scroll
 * \@description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. \`ion-Scroll\` Can be used in places where you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 * \@usage
 * \`\`\`html
 * <ion-scroll scrollX="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollY="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollX="true" scrollY="true">
 * </ion-scroll>
 * \`\`\`
 * \@demo /docs/v2/demos/src/scroll/
 */
export class Scroll {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._scrollX = false;
        this._scrollY = false;
        this._zoom = false;
        this._maxZoom = 1;
        /**
         * @hidden
         */
        this.maxScale = 3;
        /**
         * @hidden
         */
        this.zoomDuration = 250;
    }
    /**
     * \@input {boolean} If true, scrolling along the X axis is enabled.
     * @return {?}
     */
    get scrollX() {
        return this._scrollX;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set scrollX(val) {
        this._scrollX = isTrueProperty(val);
    }
    /**
     * \@input {boolean} If true, scrolling along the Y axis is enabled; requires the following CSS declaration: ion-scroll { white-space: nowrap; }
     * @return {?}
     */
    get scrollY() {
        return this._scrollY;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set scrollY(val) {
        this._scrollY = isTrueProperty(val);
    }
    /**
     * \@input {boolean} If true, zooming is enabled.
     * @return {?}
     */
    get zoom() {
        return this._zoom;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set zoom(val) {
        this._zoom = isTrueProperty(val);
    }
    /**
     * \@input {number} Set the max zoom amount.
     * @return {?}
     */
    get maxZoom() {
        return this._maxZoom;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set maxZoom(val) {
        this._maxZoom = val;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.scrollElement = this._elementRef.nativeElement.children[0];
    }
    /**
     * @hidden
     * Add a scroll event handler to the scroll element if it exists.
     * undefined if the scroll element doesn't exist.
     * @param {?} handler
     * @return {?}
     */
    addScrollEventListener(handler) {
        if (!this.scrollElement) {
            return;
        }
        this.scrollElement.addEventListener('scroll', handler);
        return () => {
            this.scrollElement.removeEventListener('scroll', handler);
        };
    }
}
Scroll.decorators = [
    { type: Component, args: [{
                selector: 'ion-scroll',
                template: '<div class="scroll-content">' +
                    '<div class="scroll-zoom-wrapper">' +
                    '<ng-content></ng-content>' +
                    '</div>' +
                    '</div>',
                host: {
                    '[class.scroll-x]': 'scrollX',
                    '[class.scroll-y]': 'scrollY'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
Scroll.ctorParameters = () => [
    { type: ElementRef, },
];
Scroll.propDecorators = {
    'scrollX': [{ type: Input },],
    'scrollY': [{ type: Input },],
    'zoom': [{ type: Input },],
    'maxZoom': [{ type: Input },],
};
function Scroll_tsickle_Closure_declarations() {
    /** @type {?} */
    Scroll.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Scroll.ctorParameters;
    /** @type {?} */
    Scroll.propDecorators;
    /** @type {?} */
    Scroll.prototype._scrollX;
    /** @type {?} */
    Scroll.prototype._scrollY;
    /** @type {?} */
    Scroll.prototype._zoom;
    /** @type {?} */
    Scroll.prototype._maxZoom;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.maxScale;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.zoomDuration;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.scrollElement;
    /** @type {?} */
    Scroll.prototype._elementRef;
}
//# sourceMappingURL=scroll.js.map
        `;

        const knownPath = '/ionic-angular/dir/components/scroll/scroll.js';
        const ionicAngularDir = '/ionic-angular/dir';

        const result = decorators.removeTSickleClosureDeclarations(knownPath, knownContent, ionicAngularDir, '');
        expect(result).not.toEqual(knownContent);
        const matches = decorators.getTSickleclosureDeclarationRegex().exec(knownContent);
        expect(result.indexOf(`/*${matches[0]}*/`)).toBeGreaterThanOrEqual(0);
    });

    it('should purge the function declaration when in src dir', () => {
        const knownContent = `
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { isTrueProperty } from '../../util/util';
/**
 * \@name Scroll
 * \@description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. \`ion-Scroll\` Can be used in places where you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 * \@usage
 * \`\`\`html
 * <ion-scroll scrollX="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollY="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollX="true" scrollY="true">
 * </ion-scroll>
 * \`\`\`
 * \@demo /docs/v2/demos/src/scroll/
 */
export class Scroll {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._scrollX = false;
        this._scrollY = false;
        this._zoom = false;
        this._maxZoom = 1;
        /**
         * @hidden
         */
        this.maxScale = 3;
        /**
         * @hidden
         */
        this.zoomDuration = 250;
    }
    /**
     * \@input {boolean} If true, scrolling along the X axis is enabled.
     * @return {?}
     */
    get scrollX() {
        return this._scrollX;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set scrollX(val) {
        this._scrollX = isTrueProperty(val);
    }
    /**
     * \@input {boolean} If true, scrolling along the Y axis is enabled; requires the following CSS declaration: ion-scroll { white-space: nowrap; }
     * @return {?}
     */
    get scrollY() {
        return this._scrollY;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set scrollY(val) {
        this._scrollY = isTrueProperty(val);
    }
    /**
     * \@input {boolean} If true, zooming is enabled.
     * @return {?}
     */
    get zoom() {
        return this._zoom;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set zoom(val) {
        this._zoom = isTrueProperty(val);
    }
    /**
     * \@input {number} Set the max zoom amount.
     * @return {?}
     */
    get maxZoom() {
        return this._maxZoom;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set maxZoom(val) {
        this._maxZoom = val;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.scrollElement = this._elementRef.nativeElement.children[0];
    }
    /**
     * @hidden
     * Add a scroll event handler to the scroll element if it exists.
     * undefined if the scroll element doesn't exist.
     * @param {?} handler
     * @return {?}
     */
    addScrollEventListener(handler) {
        if (!this.scrollElement) {
            return;
        }
        this.scrollElement.addEventListener('scroll', handler);
        return () => {
            this.scrollElement.removeEventListener('scroll', handler);
        };
    }
}
Scroll.decorators = [
    { type: Component, args: [{
                selector: 'ion-scroll',
                template: '<div class="scroll-content">' +
                    '<div class="scroll-zoom-wrapper">' +
                    '<ng-content></ng-content>' +
                    '</div>' +
                    '</div>',
                host: {
                    '[class.scroll-x]': 'scrollX',
                    '[class.scroll-y]': 'scrollY'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
Scroll.ctorParameters = () => [
    { type: ElementRef, },
];
Scroll.propDecorators = {
    'scrollX': [{ type: Input },],
    'scrollY': [{ type: Input },],
    'zoom': [{ type: Input },],
    'maxZoom': [{ type: Input },],
};
function Scroll_tsickle_Closure_declarations() {
    /** @type {?} */
    Scroll.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Scroll.ctorParameters;
    /** @type {?} */
    Scroll.propDecorators;
    /** @type {?} */
    Scroll.prototype._scrollX;
    /** @type {?} */
    Scroll.prototype._scrollY;
    /** @type {?} */
    Scroll.prototype._zoom;
    /** @type {?} */
    Scroll.prototype._maxZoom;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.maxScale;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.zoomDuration;
    /**
     * @hidden
     * @type {?}
     */
    Scroll.prototype.scrollElement;
    /** @type {?} */
    Scroll.prototype._elementRef;
}
//# sourceMappingURL=scroll.js.map
        `;

        const srcDir = join(process.cwd(), 'some', 'fake', 'path');
        const knownPath = join(srcDir, 'scroll.js');
        const ionicAngularDir = '';

        const result = decorators.removeTSickleClosureDeclarations(knownPath, knownContent, ionicAngularDir, srcDir);
        expect(result).not.toEqual(knownContent);
        const matches = decorators.getTSickleclosureDeclarationRegex().exec(knownContent);
        expect(result.indexOf(`/*${matches[0]}*/`)).toBeGreaterThanOrEqual(0);
    });
  });
});
