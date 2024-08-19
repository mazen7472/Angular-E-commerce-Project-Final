import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products:any[]  ): any[] {
    return products.filter((ele)=> ele.count >0);
  }

}
