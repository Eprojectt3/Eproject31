import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageCompressionService {
  constructor() {}

  public compress = (
    file: File,
    maxHeight?: number,
    maxWidth?: number
  ): Observable<File> => {
    const imageType = file.type || 'image/jpg';
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return Observable.create((observer: any) => {
      reader.onload = (ev) => {
        const img = this.createImage(ev);

        setTimeout(() => {
          const canvas = document.createElement('canvas');

          if (img.height < img.width) {
            if (maxWidth) {
              canvas.width = img.width > maxWidth ? maxWidth : img.width;
            } else {
              canvas.width = img.width;
            }

            if (maxHeight) {
              canvas.height = img.height > maxHeight ? maxHeight : img.height;
            } else {
              canvas.height = img.height;
            }
          } else {
            if (maxHeight) {
              canvas.height = img.height > maxHeight ? maxHeight : img.height;
            } else {
              canvas.height = img.height;
            }

            if (maxWidth) {
              canvas.width = (canvas.height * 50) / 100;
            } else {
              canvas.width = canvas.width;
            }
          }

          const canvasCtx = <CanvasRenderingContext2D>canvas.getContext('2d');

          canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvasCtx.canvas.toBlob(
            (blob: any) => {
              observer.next(
                new File([blob], file.name, {
                  type: imageType,

                  lastModified: Date.now(),
                })
              );
            },

            imageType
          );
        });
      };

      reader.onerror = (error) => observer.error(error);
    });
  };

  private createImage(ev: any) {
    const imageContent = ev.target.result;

    const img = new Image();

    img.src = imageContent;

    return img;
  }
}
