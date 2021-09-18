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
  /**
   * Runs getMovies() upon initialization and gets movie array for app. 
   */
  ngOnInit(): void {
    this.getMovies();
  }
  /**
   * Method that calls API with get request for full movie list. 
   * @returns Movie array with movie objects. 
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * Method that opens genre-view and injects genre name and info.
   * @param name Genre.Name
   * @param description Genre.Description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '450px',
    });
  }
  /**
   * Method that opens director-view and injects director name, bio, birth and death.
   * @param name Director.Name
   * @param bio Director.Bio
   * @param birth Director.Birth
   * @param death Director.Death
   */
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
      width: '450px',
    });
  }
  /**
   * Method that opens synopsis-view and injects movie.title + movie.description.
   * @param title 
   * @param description 
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '450px',
    });
  }
  /**
   * Method that adds movie to user's list of favorite movies. 
   * @param id movie._id
   */
  addMovieToFavorites(id: string): any {
    this.fetchApiData.addFavoriteMovie(id).subscribe((response: any) => {
      this.snackBar.open(
        'Added to favorites!', "OK", { duration: 2000, }
      );
    });
  }
}