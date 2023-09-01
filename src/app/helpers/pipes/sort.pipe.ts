import { Injectable, Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Injectable()
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(
    values: any[],
    sortOrder: SortOrder | string = 'asc',
    sortKey?: string
  ): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!values || (sortOrder !== 'asc' && sortOrder !== 'desc')) return values;

    let numberArray = [];
    let stringArray = [];
    let dateArray = [];

    if (!sortKey) {
      numberArray = values.filter((item) => typeof item === 'number').sort();
      stringArray = values.filter((item) => typeof item === 'string').sort();
    } else {
      numberArray = values
        .filter((item) => typeof item[sortKey] === 'number')
        .sort((a, b) => a[sortKey] - b[sortKey]);
      stringArray = values
        .filter((item) => typeof item[sortKey] === 'string')
        .sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return -1;
          else if (a[sortKey] > b[sortKey]) return 1;
          else return 0;
        });
      dateArray = values
        .filter((item) => typeof item[sortKey] === 'object')
        .sort((a, b) => {
          if (a[sortKey].toISOString() < b[sortKey].toISOString()) return -1;
          else if (a[sortKey].toISOString() > b[sortKey].toISOString()) return 1;
          else return 0;
        });
    }
    const sorted = numberArray.concat(stringArray).concat(dateArray);
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }
}
