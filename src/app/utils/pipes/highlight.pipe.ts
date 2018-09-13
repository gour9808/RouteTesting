import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'cbpHighlight'
})

export class HighlightPipe implements PipeTransform {

    transform(text: string, search): string {
        if (search && text) {
            let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            pattern = pattern.split(' ').filter((t) => {
                return t.length > 0;
            }).join('|');
            const regex = new RegExp(pattern, 'gi');

            return text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`);
        } else {
            return text;
        }
    }
}
