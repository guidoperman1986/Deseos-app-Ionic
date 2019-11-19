import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  listas : Lista[]=[];

  @Input() terminada = true;
  @ViewChild(IonList,null) lista : IonList
  
  constructor(private deseosService:DeseosService, private router:Router, private alertController:AlertController) { 
    this.listas = this.deseosService.listas;
  }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){   
    if (this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)
      
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)

    }
  }

  borrar(lista:Lista){    
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista:Lista){
        /* this.router.navigateByUrl('/tabs/tab1/agregar') */
        const alert = await this.alertController.create({
          header: 'Editar lista',
          inputs:[
            {
              name:'titulo',
              type:'text',
              placeholder:lista.titulo
            }
          ],      
          buttons: [{
              text:'Cancelar',
              role:'cancel',
              handler:()=>{
                console.log('Cancelar');
                this.lista.closeSlidingItems()
              }
            },
            {
              text:'Actualizar',
              handler:(data)=>{
                console.log(data)
                if (data.titulo.length === 0){
                  return;
                }
    
                lista.titulo = data.titulo;
    
                this.deseosService.guardarStorage();
                this.lista.closeSlidingItems()
              }
            }
          ]
        });
    
        alert.present()
  }

}
