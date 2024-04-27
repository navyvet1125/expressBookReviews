let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {"reviewer123":"apples"}, "isbn": "978-0385474542"},
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {}, "isbn": "978-1447477728"},
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {}, "isbn": "978-0679433132"},
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {}, "isbn": "978-0141026282"},
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {}, "isbn": "978-0140444512"},
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {}, "isbn": "978-0140449388"},
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {}, "isbn": "978-0140447698"},
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {}, "isbn": "978-0141439518"},
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {}, "isbn": "978-0140443331"},
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {}, "isbn": "978-0802151361"},
      findBy: (key, value) => Object.values(books).filter(book => book[key] === value)
}

module.exports=books;
