import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Book } from 'src/app/interfaces/book';
import { FirestoreService } from 'src/app/services/firestore.service';

import { RealTimeDBService } from 'src/app/services/real-time-db.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  allBooksRealTimeDB: any;
  allBooksFirestore: any;

  navigationExtras:NavigationExtras={
    state:{
      value:null
    }}

  constructor(
    private realTimeDBService: RealTimeDBService,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.realTimeDBService.getBooks().valueChanges() // para obtener los libros de la RealTimeDB
      .subscribe((books) => {
        this.allBooksRealTimeDB = books;
      })

    this.getAllBooks(); // para obtener los libros de Firestore
  }

  getAllBooks(): void {
    this.firestoreService.getBooks()
      .subscribe((res) => {
        this.allBooksFirestore = res.map((book: any) => {
          return {
            data: book.payload.doc.data(),
            id: book.payload.doc.id
          } as Book;
        });
      });
      console.log(this.allBooksFirestore);
  }

  getBookDetails(book: any){
    this.navigationExtras.state = book;
    console.log(book);
    this.router.navigate(["book-details"], this.navigationExtras)
  }

  getBookDetailsRTDB(book: any){
    this.navigationExtras.state = book;
    console.log(book);
    this.router.navigate(["book-details-rtdb"], this.navigationExtras)
  }

  getBookEdit(book: any){
    this.navigationExtras.state = book;
    console.log(book);
    this.router.navigate(["edit-book-fire"], this.navigationExtras)
  }

  getBookEditRTDB(book: any){
    this.navigationExtras.state = book;
    console.log(book);
    this.router.navigate(["edit-book-rtdb"], this.navigationExtras)
  }

}
