import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(
    private angularFirestore: AngularFirestore
  ) {
  }

  public getBooks() {
    return this.angularFirestore.collection('book-list').snapshotChanges();
  }

  public createBook(book: Book) {
    return this.angularFirestore.collection('book-list').add(book);
  }

}