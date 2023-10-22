import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { InputControl, MessageHandler, StatusCode } from 'toco-lib';

@Component({
  selector: 'app-input-file-avatar',
  templateUrl: './input-file-avatar.component.html',
  styleUrls: ['./input-file-avatar.component.scss']
})
export class InputFileAvatarComponent extends InputControl implements OnInit {

  constructor(private _snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.init('', '', false, true);
  }
  /**
   * handleFileInput, emit file in a variable
   * @param files is a `FileList` object
   */
  public handleFileInput(files: FileList){
    const m = new MessageHandler(this._snackBar);
    if (files && files.item(0)){
      if (!files.item(0).type.match(/image-*/)){
          m.showMessage(
            StatusCode.OK,
            "Formato de imagen no válido"
          );
        return;
      }
      if (files.item(0).size > 220000 ){ /** 220000 bytes = 220 kb */
          m.showMessage(
            StatusCode.OK,
            "El tamaño de la imagen debe ser menor a 220 kb"
          );
        return;
      }
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(files.item(0));

    } else {
      m.showMessage(
        StatusCode.OK,
        "Imagen no seleccionada"
      );
    }
  }
  private _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.content.formControl.setValue("data:image/jpeg;base64," + btoa(binaryString)); //Converting binary string data.
    }

  avatar(){
    return this.sanitizer.bypassSecurityTrustUrl(this.content.formControl.value);
  }

  onClick(){

  }

}
