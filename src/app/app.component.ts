import { QueryList } from "@angular/core";
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewChildren
} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("cardsContainer") cardsContainer: ElementRef;
  @ViewChildren("panel") panelList: QueryList<any>;
  public displayedCards: Array<any> = new Array<any>();

  ngAfterViewInit() {
    this.countVisibleElements();
  }

  public countVisibleElements() {
    this.panelList.forEach((card, index) => {
      if (
        this.isElementVisible(
          this.cardsContainer.nativeElement,
          card.nativeElement
        )
      ) {
        this.displayedCards.push(index);
      }
    });
    console.log(this.displayedCards);
  }

  isElementVisible(el, holder) {
    holder = holder || document.body;
    const { left, right, width } = el.getBoundingClientRect();
    const holderRect = holder.getBoundingClientRect();

    return left <= holderRect.left
      ? holderRect.left - left <= width
      : right - holderRect.right <= width;
  }
}
