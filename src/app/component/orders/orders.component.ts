import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { ProjectInitliazationService } from 'src/app/services/project-initliazation.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private projectService: ProjectInitliazationService) { }
  orderDetails: Order[]
  ngOnInit(): void {
    this.projectService.getOrdersDetail().subscribe((res: Order[]) => {
      this.orderDetails = res;
    })

  }

}
