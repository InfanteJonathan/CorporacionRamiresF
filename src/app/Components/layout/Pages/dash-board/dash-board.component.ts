import { Component, OnInit } from '@angular/core';

import { Chart,registerables } from 'chart.js';
import { DashBoardService } from 'src/app/Services/dash-board.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  totalIngresos:string="0";
  totalVentas:string="0";
  totalProductos:string ="0";
  totalUsuarios:string ="0";

  constructor(
    private _dashboardServicio: DashBoardService
  ) { }


  mostrarGrafico(labelGrafico: any[], dataGrafico: any[]) {
    const chartBarras = new Chart('chartBarras', {
      type: 'pie',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: "# de Ventas",
          data: dataGrafico,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',  // Cambia el color de la primera barra
            'rgba(54, 162, 235, 0.2)',  // Cambia el color de la segunda barra
            'rgba(75, 192, 192, 0.2)',  // Cambia el color de la tercera barra
            // Agrega más colores si hay más barras
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',   // Cambia el color del borde de la primera barra
            'rgba(54, 162, 235, 1)',   // Cambia el color del borde de la segunda barra
            'rgba(75, 192, 192, 1)',   // Cambia el color del borde de la tercera barra
            // Agrega más colores si hay más barras
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


    const chartBarras2 = new Chart('chartBarras2', {
      type: 'bar',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: "# de Ventas",
          data: dataGrafico,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',  // Cambia el color de la primera barra
            'rgba(54, 162, 235, 0.2)',  // Cambia el color de la segunda barra
            'rgba(75, 192, 192, 0.2)',  // Cambia el color de la tercera barra
            // Agrega más colores si hay más barras
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',   // Cambia el color del borde de la primera barra
            'rgba(54, 162, 235, 1)',   // Cambia el color del borde de la segunda barra
            'rgba(75, 192, 192, 1)',   // Cambia el color del borde de la tercera barra
            // Agrega más colores si hay más barras
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  ngOnInit(): void {

    this._dashboardServicio.resumen().subscribe({
      next:(data) =>{
        if(data.status){
          this.totalIngresos = data.value.totalIngresos;
          this.totalVentas = data.value.totalVentas;
          this.totalProductos = data.value.totalProductos;
          this.totalUsuarios = data.value.totalUsuarios;

          const arrayData : any[] = data.value.ventasUltimaSemana;
          

          const labelTemp = arrayData.map((value) => value.fecha);
          const dataTemp = arrayData.map((value) => value.total);
          console.log(labelTemp,dataTemp);
          this.mostrarGrafico(labelTemp,dataTemp);
        }

      },
      error:(e) =>{}

    })

  }

}
