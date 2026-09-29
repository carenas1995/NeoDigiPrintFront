import { MatPaginatorIntl } from '@angular/material/paginator';
export function getPaginatorIntl() {
 const paginatorIntl = new MatPaginatorIntl();
 paginatorIntl.itemsPerPageLabel = 'Items por página:';
 paginatorIntl.nextPageLabel = 'Página siguiente ';
 paginatorIntl.previousPageLabel = 'Página anterior';
 paginatorIntl.firstPageLabel = 'Primera página';
 paginatorIntl.lastPageLabel = 'Última página';
 paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  };
 return paginatorIntl;
}