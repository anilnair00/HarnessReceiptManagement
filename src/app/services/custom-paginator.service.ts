import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl implements OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  OF_LABEL = 'of';

  constructor(private translate: TranslateService) {
    super();

    this.getAndInitTranslations();
    this.translate.onLangChange.subscribe((langChange) => {
      this.getAndInitTranslations();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translate
      .get([
        'dashboard.items-per-page',
        'dashboard.next-page',
        'dahsboard.previous-page',
        'dashboard.of-label',
      ])
      .subscribe((translation: { [x: string]: string }) => {
        this.itemsPerPageLabel = translation['dashboard.items-per-page'];
        this.nextPageLabel = translation['dashboard.next-page'];
        this.previousPageLabel = translation['dahsboard.previous-page'];
        this.OF_LABEL = translation['dashboard.of-label'];
        this.changes.next();
      });
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.OF_LABEL} ${length}`;
  };
}
