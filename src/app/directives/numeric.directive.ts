import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {

  constructor(private el: ElementRef) {
    console.log('test');
   }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): boolean {
    const charCode = event.which;
    if (
      (charCode > 31 && (charCode < 48 || charCode > 57)) &&
      (charCode < 96 || charCode > 105)
    ) {
      return false;
    }
    return true;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pasteData = clipboardData.getData('text');
    if (!/^\d+$/.test(pasteData)) {
      event.preventDefault();
    }
  }
}