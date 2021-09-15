import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '450px',
    });
  }

  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
      width: '450px',
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '450px',
    });
  }

  addMovieToFavorites(id: string): any {
    this.fetchApiData.addFavoriteMovie(id).subscribe((response: any) => {
      this.snackBar.open(
        'Added to favorites!', "OK", { duration: 2000, }
      );
    });
  }
}