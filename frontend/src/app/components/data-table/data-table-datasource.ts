import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Product } from 'src/app/Product';

// TODO: replace this with real data from your application
const products: Product[] = [
  {
    "productId": "2182601f-d46f-43fa-8543-138d153cb574",
    "productName": "Project B",
    "productOwnerName": "Hailey Jones",
    "developers": ["Emma Fischer", "Laura Petes", "Marie Chardon ", "Ben Franklin"],
    "scrumMasterName": "Michael Ge",
    "startDate": "2023-03-06",
    "methodology": "agile",
    "location": "https://github.com/bcgov/nr-spar"
  },
  {
    "productId": "93817f4f-3744-4e27-b0a3-ac9cfddf8c54",
    "productName": "Project C",
    "productOwnerName": "Emma Do",
    "developers": ["Anderson Philips", "Pete Backers", "June Moore "],
    "scrumMasterName": "Mike Taylors",
    "startDate": "2022-10-10",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/cirmo-dpia"
  },
  {
    "productId": "484139c9-e89c-4697-9fb6-6a46e03c980c",
    "productName": "Project E",
    "productOwnerName": "Caleb Peterson",
    "developers": ["Amy Philips"],
    "scrumMasterName": "May Junes",
    "startDate": "2023-03-31",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/aries-oca-bundles"
  },
  {
    "productId": "2c57d96b-3bf1-44ca-bf08-11830a5ab518",
    "productName": "Project F",
    "productOwnerName": "Tim Xu",
    "developers": ["George Henry", "Michael Philips", "Gordon Ramsey"],
    "scrumMasterName": "Peter Anderson",
    "startDate": "2020-01-28",
    "methodology": "agile",
    "location": "https://github.com/bcgov/SIMS"
  },
  {
    "productId": "1b28ccb8-9484-451e-b9e5-2a574fce9288",
    "productName": "Project G",
    "productOwnerName": "James Lee",
    "developers": ["Henry Jones"],
    "scrumMasterName": "Caleb Peterson",
    "startDate": "2022-12-11",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/moh-pidp"
  },
  {
    "productId": "a43618f7-8687-447f-9a6a-245aa0f66caa",
    "productName": "Project H",
    "productOwnerName": "Tim Xu",
    "developers": ["Bob Simpson"],
    "scrumMasterName": "May Junes",
    "startDate": "2023-03-31",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/PECSF"
  },
  {
    "productId": "2182601f-d46f-43fa-8543-138d153cb574",
    "productName": "Project B",
    "productOwnerName": "Hailey Jones",
    "developers": ["Emma Fischer", "Laura Petes", "Marie Chardon ", "Ben Franklin"],
    "scrumMasterName": "Michael Ge",
    "startDate": "2023-03-06",
    "methodology": "agile",
    "location": "https://github.com/bcgov/nr-spar"
  },
  {
    "productId": "93817f4f-3744-4e27-b0a3-ac9cfddf8c54",
    "productName": "Project C",
    "productOwnerName": "Emma Do",
    "developers": ["Anderson Philips", "Pete Backers", "June Moore "],
    "scrumMasterName": "Mike Taylors",
    "startDate": "2022-10-10",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/cirmo-dpia"
  },
  {
    "productId": "484139c9-e89c-4697-9fb6-6a46e03c980c",
    "productName": "Project E",
    "productOwnerName": "Caleb Peterson",
    "developers": ["Amy Philips"],
    "scrumMasterName": "May Junes",
    "startDate": "2023-03-31",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/aries-oca-bundles"
  },
  {
    "productId": "2c57d96b-3bf1-44ca-bf08-11830a5ab518",
    "productName": "Project F",
    "productOwnerName": "Tim Xu",
    "developers": ["George Henry", "Michael Philips", "Gordon Ramsey"],
    "scrumMasterName": "Peter Anderson",
    "startDate": "2020-01-28",
    "methodology": "agile",
    "location": "https://github.com/bcgov/SIMS"
  },
  {
    "productId": "1b28ccb8-9484-451e-b9e5-2a574fce9288",
    "productName": "Project G",
    "productOwnerName": "James Lee",
    "developers": ["Henry Jones"],
    "scrumMasterName": "Caleb Peterson",
    "startDate": "2022-12-11",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/moh-pidp"
  },
  {
    "productId": "a43618f7-8687-447f-9a6a-245aa0f66caa",
    "productName": "Project H",
    "productOwnerName": "Tim Xu",
    "developers": ["Bob Simpson"],
    "scrumMasterName": "May Junes",
    "startDate": "2023-03-31",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/PECSF"
  },
  {
    "productId": "2182601f-d46f-43fa-8543-138d153cb574",
    "productName": "Project B",
    "productOwnerName": "Hailey Jones",
    "developers": ["Emma Fischer", "Laura Petes", "Marie Chardon ", "Ben Franklin"],
    "scrumMasterName": "Michael Ge",
    "startDate": "2023-03-06",
    "methodology": "agile",
    "location": "https://github.com/bcgov/nr-spar"
  },
  {
    "productId": "93817f4f-3744-4e27-b0a3-ac9cfddf8c54",
    "productName": "Project C",
    "productOwnerName": "Emma Do",
    "developers": ["Anderson Philips", "Pete Backers", "June Moore "],
    "scrumMasterName": "Mike Taylors",
    "startDate": "2022-10-10",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/cirmo-dpia"
  },
  {
    "productId": "484139c9-e89c-4697-9fb6-6a46e03c980c",
    "productName": "Project E",
    "productOwnerName": "Caleb Peterson",
    "developers": ["Amy Philips"],
    "scrumMasterName": "May Junes",
    "startDate": "2023-03-31",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/aries-oca-bundles"
  },
  {
    "productId": "2c57d96b-3bf1-44ca-bf08-11830a5ab518",
    "productName": "Project F",
    "productOwnerName": "Tim Xu",
    "developers": ["George Henry", "Michael Philips", "Gordon Ramsey"],
    "scrumMasterName": "Peter Anderson",
    "startDate": "2020-01-28",
    "methodology": "agile",
    "location": "https://github.com/bcgov/SIMS"
  },
  {
    "productId": "1b28ccb8-9484-451e-b9e5-2a574fce9288",
    "productName": "Project G",
    "productOwnerName": "James Lee",
    "developers": ["Henry Jones"],
    "scrumMasterName": "Caleb Peterson",
    "startDate": "2022-12-11",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/moh-pidp"
  },
  {
    "productId": "a43618f7-8687-447f-9a6a-245aa0f66caa",
    "productName": "Project H",
    "productOwnerName": "Tim Xu",
    "developers": ["Bob Simpson"],
    "scrumMasterName": "May Junes",
    "startDate": "2023-03-31",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/PECSF"
  },
  {
    "productId": "2182601f-d46f-43fa-8543-138d153cb574",
    "productName": "Project B",
    "productOwnerName": "Hailey Jones",
    "developers": ["Emma Fischer", "Laura Petes", "Marie Chardon ", "Ben Franklin"],
    "scrumMasterName": "Michael Ge",
    "startDate": "2023-03-06",
    "methodology": "agile",
    "location": "https://github.com/bcgov/nr-spar"
  },
  {
    "productId": "93817f4f-3744-4e27-b0a3-ac9cfddf8c54",
    "productName": "Project C",
    "productOwnerName": "Emma Do",
    "developers": ["Anderson Philips", "Pete Backers", "June Moore "],
    "scrumMasterName": "Mike Taylors",
    "startDate": "2022-10-10",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/cirmo-dpia"
  },
  {
    "productId": "484139c9-e89c-4697-9fb6-6a46e03c980c",
    "productName": "Project E",
    "productOwnerName": "Caleb Peterson",
    "developers": ["Amy Philips"],
    "scrumMasterName": "May Junes",
    "startDate": "2023-03-31",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/aries-oca-bundles"
  },
  {
    "productId": "2c57d96b-3bf1-44ca-bf08-11830a5ab518",
    "productName": "Project F",
    "productOwnerName": "Tim Xu",
    "developers": ["George Henry", "Michael Philips", "Gordon Ramsey"],
    "scrumMasterName": "Peter Anderson",
    "startDate": "2020-01-28",
    "methodology": "agile",
    "location": "https://github.com/bcgov/SIMS"
  },
  {
    "productId": "1b28ccb8-9484-451e-b9e5-2a574fce9288",
    "productName": "Project G",
    "productOwnerName": "James Lee",
    "developers": ["Henry Jones"],
    "scrumMasterName": "Caleb Peterson",
    "startDate": "2022-12-11",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/moh-pidp"
  },
  {
    "productId": "a43618f7-8687-447f-9a6a-245aa0f66caa",
    "productName": "Project H",
    "productOwnerName": "Tim Xu",
    "developers": ["Bob Simpson"],
    "scrumMasterName": "May Junes",
    "startDate": "2023-03-31",
    "methodology": "waterfall",
    "location": "https://github.com/bcgov/PECSF"
  }
  ];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<Product> {
  data: Product[] = products;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'productId': return compare(a.productName, b.productName, isAsc);
        case 'productOwnerName': return compare(a.productOwnerName, b.productOwnerName, isAsc);
        case 'scrumMasterName': return compare(a.scrumMasterName, b.scrumMasterName, isAsc);
        case 'methodology': return compare(a.methodology, b.methodology, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
