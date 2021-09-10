import { Component, OnInit } from '@angular/core';

// Fetch API data
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Components
import { UpdateViewComponent } from '../update-view/update-view.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {};
  movies: any = {};
  favorites: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.getFavoriteMovies();
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    return this.favorites;
  }

  openUpdateViewDialog(): void {
    this.dialog.open(UpdateViewComponent, {
      width: '280px',
    });
  }

  removeFromFavorites(_id: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(_id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed`, 'OK', {
        duration: 2000,
      }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }
}
