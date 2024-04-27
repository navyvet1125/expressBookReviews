class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items:[],
        selectedIsbn: "",
        isbnBookList: []
      };
      this.updateState = this.updateState.bind(this);
      this.isbnSelected = this.isbnSelected.bind(this);
      this.updateState();
    }
    async updateState() {
        const res = await axios.get("http://localhost:5000");
        this.setState(() => ({items: Object.values(res.data)}));
     }

    async isbnSelected(event) {
        event.preventDefault();
    }
    render() {
      return (
        <main class="container">
            <section class="row">
                <h1> Book Review </h1>
                <p class="tagline"> With Axios, Async, and Await</p>
            </section>
            <section class="row table-responsive">
                <DatabaseList items={this.state.items}/>
                <br/>
            </section>
            <section class="row">
                <div class="col-md-4">
                <h2>ISBN Search</h2>
                <p>Search for book information by ISBN</p>
                <OptionSelector searchBy={'ISBN'} data={Object.values(this.state.items).map((item) => item.isbn)}/>
                </div>
                <div class="col-md-4">
                    <h2>Author Search</h2>
                    <p>Search for book information by Author</p>
                    <OptionSelector searchBy={'Author'} data={[...new Set(Object.values(this.state.items).map((item) => item.author))]}/>
                    {/* <OptionSelector searchBy={'Author'} data={Object.values(this.state.items).map((item) => item.author)}/> */}
                </div>
                <div class="col-md-4">
                    <h2>Title Search</h2>
                    <p>Search for book information by Title</p>
                    <OptionSelector searchBy={'Title'} data={Object.values(this.state.items).map((item) => item.title)}/>
                </div>

            </section>

        </main>
      );
    }
  }


  function DatabaseList(props) {
    return(
        <table class="table table-bordered table-striped align-middle table-primary">
            <thead class="table-dark table-group-divider">
                <tr>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Reviews</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                {props.items.map((item, key) => (
                    <DatabaseItem
                        key={key}
                        author={item.author}
                        title={item.title}
                        reviews={Object.values(item.reviews).length}
                        isbn={item.isbn}/>
                ))}
            </tbody>
        </table>
    );
}

  function DatabaseItem(props) {
        return(
            <tr key={props.id}>
                <td>{props.author}</td>
                <td>{props.title}</td>
                <td>{props.reviews}</td>
                <td>{props.isbn}</td>
            </tr>
            );
    }

    class OptionSelector extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                books:[]
            };
            this.handleChange = this.handleChange.bind(this);
        }
        async handleChange (event) {
            let searchBy = this.props.searchBy.toLowerCase();
            let value = event.target.value.split(' ').join('%20');
            if(value === "") {
                this.setState({books:[]});
                return;
            }
            let res = await axios.get(`http://localhost:5000/${searchBy}/${value}`);
            if(!Array.isArray(res.data)) this.setState({books: [res.data]});
            else this.setState({books: res.data});
        }
        render(){
         return(
            <section class="row">
            <div class="form-floating">
                <select id="search-select" class="form-select" onChange={this.handleChange}>
                <option value="">Select {this.props.searchBy}</option>
                {this.props.data.map((item) => (
                    <OptionSelectItem item={item} />
                ))} 
                </select>
                <label for="search-select">Choose a books by {this.props.searchBy}:</label>
            </div>
            <div>
                <BookList books={this.state.books} />
                {/* <BookInfo book={this.state.book} searchBy={this.props.searchBy}/> */}
            </div>
            </section>
        );
    }
}

    function OptionSelectItem(props) {
        return(
            <option value={props.item}>{props.item}</option>
        );
    }

    function BookInfo(props) {
       if(Object.keys(props.book).length > 0) {
                return (
                    <div>
                        <h5>{props.book.title}</h5>
                        <p>{props.book.author}</p>
                        <p>{props.book.isbn}</p>
                        <div class="row">
                            <h6>Reviews</h6>
                        {Object.entries(props.book.reviews).map(([key, value]) => (
                                <p>Reviewed By: {key}<br/> Review: {value}</p>
                            ))}
                            <hr/>
                        </div>
                    </div>
                );
        }
    }

function BookList(props) {
    if(props.books.length > 0) return(
        <div>
            <br/>
            <h5>Results</h5>
            <hr/>

            {props.books.map((book) => (
                <BookInfo book={book}/>
            ))}
        </div>
    );
}

ReactDOM.render(<App/>,document.getElementById("root"));  