import { Component, OnInit } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { DomSanitizer } from "@angular/platform-browser"
import { forkJoin, merge, from, Observable } from "rxjs"
import { toArray } from "rxjs/operators"
import { environment } from "../../environments/environment"
@Component({
  selector: "app-http",
  templateUrl: "./http.component.html",
  styleUrls: ["./http.component.css"],
})
export class HttpComponent implements OnInit {
  apiUrl = environment.api
  filename = null
  files = null
  contenido = null
  datosFichero = null
  base64data: any
  imagenes = []
  imagenes$: any
  ficheros$: Observable<Object>
  constructor(private _http: HttpClient, private _sanitize: DomSanitizer) {}

  loadData(filename, tipo) {
    this._http
      .get(`${this.apiUrl}/loadData/${filename}`, { responseType: tipo })
      .subscribe((datos: any) => {
        console.log(datos)
        if (tipo == "blob") {
          var reader = new FileReader()
          reader.readAsDataURL(datos)
          reader.onloadend = () => {
            this.base64data = this._sanitize.bypassSecurityTrustUrl(
              reader.result,
            )
          }
        }
        this.datosFichero = datos
      })
  }

  uploadContent() {
    var formData = new FormData()
    var parte = ['<a id="a"><b id="b">hey!</b></a>'] // an array consisting of a single DOMString
    var myBlob = new Blob(parte, { type: "text/html" }) // the blob
    formData.append("file", myBlob, "contenido.html")
    this._http.post(`${this.apiUrl}/upload`, formData).subscribe((i: any) => {
      console.log(i)
      this.contenido = i
    })
  }

  uploadData($event) {
    // tomamos el primer fichero
    var file = $event.target.files[0]
    // creamos el formdata
    var formData = new FormData()
    //var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // an array consisting of a single DOMString
    //var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob
    formData.append("file", file, file.name)
    this._http.post(`${this.apiUrl}/upload`, formData).subscribe((i: any) => {
      console.log(i)

      this.filename = i
    })
  }
  uploadDataMultiple($event) {
    // tomamos el primer fichero
    var formData = new FormData()
    const files = $event.target.files
    for (let index = 0; index < files.length; index++) {
      const file = files.item(index)
      formData.append("file", file, file.name)
    }
    this._http
      .post(`${this.apiUrl}/uploadMultiple`, formData)
      .subscribe((i: any) => {
        this.files = i
        console.log(i)
        const llamadas = this.files.file.map(i =>
          this._http.get(`${this.apiUrl}/loadData/${i.filename}`, {
            responseType: "blob",
          }),
        )
        forkJoin(llamadas).subscribe(async imagenes => {
          imagenes.forEach(async (imagen: any) => {
            var reader = new FileReader()
            reader.readAsDataURL(imagen)
            reader.onloadend = () => {
              this.imagenes.push(
                this._sanitize.bypassSecurityTrustUrl(reader.result),
              )
            }
          })
        })
      })
  }
  getFicheros() {
    this.ficheros$ = this._http.get(`${this.apiUrl}/ficheros`)
  }
  ngOnInit() {}
}
