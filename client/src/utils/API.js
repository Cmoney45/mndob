import axios from "axios";

export default {
  // // Gets all books
  // getShow: function() {
  //   return axios.get("/api/shows");
  // },
  // // Gets the book with the given id
  // getShowById: function(id) {
  //   return axios.get(`/api/shows/${id}`);
  // },
  // // Deletes the book with the given id
  // deleteShow: function(id) {
  //   return axios.delete(`/api/shows/${id}`);
  // },
  // // Saves a book to the database
  // saveShow: function(bookData) {
  //   return axios.post("/api/shows", bookData);
  // },
  getShows: function(title) {
    return axios.get(`/api/external/tvMaze/${title}`);
  }
};
