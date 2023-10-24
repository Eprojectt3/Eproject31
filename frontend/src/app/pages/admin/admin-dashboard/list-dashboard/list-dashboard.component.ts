import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Route, Router } from '@angular/router';
// import { months } from 'moment';
import { forkJoin } from 'rxjs';
import { Filter, filter, monthss } from 'src/app/models/filter.model';
import { Order } from 'src/app/models/order.model';
import { Tour_10 } from 'src/app/models/top10-tour.model';
import { TourDetail } from 'src/app/models/tour-detail.model';
import { OrderService } from 'src/app/services/order.service';
import { TourDetailService } from 'src/app/services/tour-detail.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrls: ['./list-dashboard.component.scss'],
})
export class ListDashboardComponent implements OnInit {
  public dashboard!: Tour_10[];
  public amount!: any[];
  filters: Filter[] = filter;
  Months: Filter[] = monthss;
  selectedFilter: string = 'month';
  selectedMonth: number = 1;
  // months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public displayedColumns: string[] = [
    'id',
    'name',
    'category_id',
    'quantity_limit',
  ];
  public years: number[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data: any;
  options: any;
  form!: FormGroup;

  constructor(
    private dashboardService: TourService,
    private ListCharService: OrderService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      select: [''],
      filterMonth: [''],
    });

    this.getListTop10();

    this.getMonthYear();
  }

  public onSubmit = () => {};

  public selectionChange = (e: any) => {
    if (e.value === 'year') {
      this.getDataForYears();
    } else if (e.value === 'month') {
      this.getMonthYear();
    } else if (e.value === 'day') {
      this.getDataForDays();
    }
  };

  onMonthChange(selectedMonths: any) {
    this.selectedMonth = selectedMonths.value; // Cập nhật giá trị tháng đã chọn.
    this.getDataForDayschange(this.selectedMonth); // Gọi hàm để lấy dữ liệu dựa trên tháng đã chọn.
    console.log(this.selectedMonth);
  }

   getDaysInMonth(month: number, year: number): number {
    console.log(typeof month);
    if (Number(month)  === 2) {
      console.log(typeof month);

      // Tháng 2 có thể có 28 hoặc 29 ngày tùy thuộc vào năm nhuận.
      return (Number(year) % 4 === 0 && Number(year) % 100 !== 0) || (Number(year) % 400 === 0) ? 29 : 28;

    } else if ([4, 6, 9, 11].includes(Number(month))) {
      // Các tháng 4, 6, 9, 11 có 30 ngày.
      return 30;
    } else {
      // Các tháng còn lại (1, 3, 5, 7, 8, 10, 12) có 31 ngày.
      return 31;
    }
  }
  // chon tháng
  getDataForDayschange(month: number) {
    const year: number = new Date().getFullYear();
    const daysInMonth = this.getDaysInMonth( month,year);
    console.log(daysInMonth);

    const requests = [];

    for (let day = 1; day <= daysInMonth; ++day) {
      requests.push(this.ListCharService.getDataForDays(year, month, day));
    }

    forkJoin(requests).subscribe((results: any) => {
      const labelData: string[] = [];
      const amount: number[] = [];

      results.forEach((data: any, day: number) => {
        labelData.push(`${day + 1}-${month}-${year}`);
        amount.push(data.revenueForDay);
      });
      console.log(labelData);
      console.log(amount);

      this.RenderChart(labelData, amount);
    });
  }

  // Get list FeedBack
  public getListTop10 = () => {
    this.dashboardService.getTop10Tour().subscribe((val: any) => {
      this.dashboard = val;
    });
  };

  public getMonthYear = () => {
    const labelData: string[] = [];
    const amount: number[] = [];
    const year: number = new Date().getFullYear();

    const requests = [];

    for (let i = 1; i <= 12; ++i) {
      requests.push(this.ListCharService.getListMonthWeek(year, i));
    }

    forkJoin(requests).subscribe((results: any) => {
      results.forEach((data: any, i: number) => {
        // console.log(`i: ${i + 1}, year: ${year}`);
        amount.push(data.revenueForMonth);
        labelData.push(`${i + 1}-${year}`);
      });
      // console.log(amount);
      // console.log(labelData);

      // Sau khi đã lấy tất cả dữ liệu, bạn có thể vẽ biểu đồ tại đây.
      this.RenderChart(labelData, amount);
    });
  };

  getDataForYears() {
    const labelData: string[] = [];
    const amount: number[] = [];
    const requests = [];
    const year: number = new Date().getFullYear();

    requests.push(this.ListCharService.getListYear(year));

    forkJoin(requests).subscribe((results: any) => {
      results.forEach((data: any) => {
        amount.push(data.revenueForYear);
        // this.years.push(years[index]);
        labelData.push(`${year}`);
      });
      console.log(amount);

      console.log(labelData);

      this.RenderChart(labelData, amount);
    });
  }
  getDataForDays() {
    const year: number = new Date().getFullYear();
    const requests = [];

    for (let month = 1; month <= 12; ++month) {
      // Lặp qua từng ngày trong tháng
      for (let day = 1; day <= 31; ++day) {
        requests.push(this.ListCharService.getDataForDays(year, month, day));
      }
    }

    forkJoin(requests).subscribe((results: any) => {
      const labelData: string[] = [];
      const amount: number[] = [];

      results.forEach((data: any, index: number) => {
        // Tính tổng doanh thu hàng ngày

        const month = Math.floor(index / 31) + 1; // Tính tháng
        const day = (index % 31) + 1; // Tính ngày

        // Thêm ngày, tháng và năm và doanh thu hàng ngày vào mảng labelData và amount
        labelData.push(`${day}-${month}-${year}`);
        amount.push(data.revenueForDay);
      });
      console.log(labelData);
      console.log(amount);

      // Sau khi đã lấy tất cả dữ liệu, bạn có thể sử dụng labelData và amount để vẽ biểu đồ.
      this.RenderChart(labelData, amount);
    });
  }

  RenderChart(labelData: string[], Amount: number[]) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: labelData,
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: Amount,
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: Amount,
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: Amount,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
