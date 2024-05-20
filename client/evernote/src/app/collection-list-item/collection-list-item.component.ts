import {Component, Input} from '@angular/core';
import {Collection} from "../shared/collection";

@Component({
  selector: 'a.en-collection-list-item',
  standalone: true,
  imports: [],
  templateUrl: './collection-list-item.component.html',
  styles: ``
})
export class CollectionListItemComponent {
  @Input() collection:Collection |undefined;
}
