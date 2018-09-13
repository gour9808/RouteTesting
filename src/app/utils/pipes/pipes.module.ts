import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterPipe} from './filter.pipe';
import {SortPipe} from './sort.pipe';
import {FiterByPipe} from './fiter-by.pipe';
import {FilterByStatusPipe} from './filter-by-status.pipe';
import {TimeAgoPipe} from './timeAgo.pipe';
import {Capitalize} from './capitalize.pipe';
import {FilterByResponse} from './filter-by-response.pipe';
import {HighlightPipe} from "./highlight.pipe";
import {LimitPipe} from "./limit.pipe";
import {InjectNamePipe} from "./inject-name.pipe";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TimeAgoPipe,
        FiterByPipe,
        FilterPipe,
        SortPipe,
        FilterByStatusPipe,
        Capitalize,
        FilterByResponse,
        HighlightPipe,
        LimitPipe,
        InjectNamePipe
    ],
    exports: [
        TimeAgoPipe,
        FiterByPipe,
        FilterPipe,
        SortPipe,
        FilterByStatusPipe,
        Capitalize,
        FilterByResponse,
        HighlightPipe,
        LimitPipe,
        InjectNamePipe

    ]
})
export class PipesModule {
}
